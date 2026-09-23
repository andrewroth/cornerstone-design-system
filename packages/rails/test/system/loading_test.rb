# frozen_string_literal: true

require "application_system_test_case"

# The gem's module imports the library only once the page has a cs-* element.
class LoadingTest < ApplicationSystemTestCase
  def library_requests
    evaluate_script(<<~JS)
      performance.getEntriesByType("resource")
        .map(entry => new URL(entry.name).pathname)
        .filter(path => path.includes("/cornerstone/") && path.endsWith(".js") && !path.includes("/cornerstone-rails-"))
    JS
  end

  test "a page with no cs-* element loads no library module and loses its cloak at once" do
    visit plain_path
    assert_text "No Cornerstone component"
    assert_no_selector "html.cs-cloak"
    sleep 0.5 # give a wrongly started import time to show up
    assert_empty library_requests
    refute evaluate_script("!!customElements.get('cs-badge')")
  end

  test "a cs-* element added by a script loads the library and upgrades" do
    visit plain_path
    assert_text "No Cornerstone component"
    execute_script(%(document.getElementById("late").innerHTML = '<div><cs-badge id="added">Late</cs-badge></div>'))

    assert_selector "cs-badge#added:defined"
    assert_predicate find("cs-badge#added").shadow_root, :present?
    assert_includes library_requests, "/cornerstone/#{CornerstoneRails::COMPONENTS_VERSION}/cornerstone.loader.js"
  end

  test "a cs-* element in a Turbo Stream loads the library" do
    visit plain_path
    assert_text "No Cornerstone component"
    execute_script(<<~JS)
      Turbo.renderStreamMessage('<turbo-stream action="append" target="late"><template><cs-callout id="streamed">Streamed</cs-callout></template></turbo-stream>')
    JS
    assert_selector "cs-callout#streamed:defined"
  end

  test "a Drive visit from a page with no components holds the render until the new page's components are registered" do
    visit plain_path
    assert_text "No Cornerstone component"
    execute_script(<<~JS)
      document.addEventListener("turbo:render", () => {
        window.treeDefinedAtRender = document.querySelector("#documents")?.matches(":defined");
      }, { once: true });
    JS
    click_link "Tree page"

    assert_selector "cs-tree#tree:defined"
    assert_equal true, evaluate_script("window.treeDefinedAtRender")
  end

  test "the library is served compressed" do
    visit tree_path
    assert_selector "cs-tree#tree:defined"
    sizes = evaluate_script(<<~JS)
      performance.getEntriesByType("resource")
        .filter(entry => entry.name.includes("/styles/color/variants/cru.css"))
        .map(entry => [entry.encodedBodySize, entry.decodedBodySize])
    JS
    encoded, decoded = sizes.first
    assert_operator encoded, :<, decoded / 5, "cru.css should arrive compressed"
  end
end

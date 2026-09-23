# frozen_string_literal: true

require "application_system_test_case"

# A Turbo 8 page refresh morphs the live page into the new server HTML. These tests record what
# that does to components whose state the user changed, with and without the gem's handling.
class MorphTest < ApplicationSystemTestCase
  setup { PagesController::RENDERS.value = 0 }

  # Checks a box, types into an input and opens a dialog, then refreshes with a morph. Returns
  # every attribute change Turbo proposed for cs-* elements, and whether it was cancelled.
  def change_state_then_refresh(path)
    visit path
    assert_text "render 1"
    cs_check "Remember me"
    cs_fill_in "Name", with: "typed by the user"
    execute_script("document.querySelector('#dialog').open = true")
    assert_selector "cs-dialog#dialog[open]"

    # Registered after the gem's listener, so it sees that listener's decision.
    execute_script(<<~JS)
      window.dialogEvents = [];
      for (const type of ["cs-hide", "cs-after-hide"]) {
        document.querySelector("#dialog").addEventListener(type, () => window.dialogEvents.push(type));
      }
      window.morphLog = [];
      document.addEventListener("turbo:before-morph-attribute", event => {
        if (!event.target.localName.startsWith("cs-")) return;
        const { attributeName, mutationType } = event.detail;
        window.morphLog.push(`${event.target.id} ${mutationType} ${attributeName} ${event.defaultPrevented ? "kept" : "applied"}`);
      });
    JS
    execute_script("Turbo.visit(location.href, { action: 'replace' })")
    assert_text "render 2"
    evaluate_script("window.morphLog")
  end

  def js(expression)
    evaluate_script(expression)
  end

  test "with the gem's handling, a refresh keeps what the client set and applies what the server changed" do
    log = change_state_then_refresh(morph_path)

    assert_includes log, "dialog remove open kept"
    assert_includes log, "server-disabled remove variant kept", "attributes a component reflects itself are left alone"
    assert_includes log, "name update placeholder applied"
    assert_includes log, "server-disabled remove disabled applied"

    assert_equal "render 2", js("document.querySelector('#name').getAttribute('placeholder')")
    assert_equal false, js("document.querySelector('#server-disabled').disabled")
    assert_equal true, js("document.querySelector('#dialog').open")
    assert_equal true, js("document.querySelector('#remember').checked")
    assert_equal "typed by the user", js("document.querySelector('#name').value")
    assert_empty js("window.dialogEvents")
  end

  test "without it, the same refresh strips component-owned attributes and closes the dialog" do
    log = change_state_then_refresh(morph_path(turbo: 0))

    assert_includes log, "dialog remove open applied"
    assert_includes log, "server-disabled remove variant applied"
    assert_no_selector "cs-dialog#dialog[open]"
    assert_equal false, js("document.querySelector('#dialog').open")
    assert_includes js("window.dialogEvents"), "cs-hide"

    # Two things survive either way: neither the checked state nor typed text is an attribute,
    # and components put their reflected defaults (variant, size) straight back.
    assert_equal true, js("document.querySelector('#remember').checked")
    assert_equal "typed by the user", js("document.querySelector('#name').value")
    assert_equal "neutral", js("document.querySelector('#server-disabled').getAttribute('variant')")
  end
end

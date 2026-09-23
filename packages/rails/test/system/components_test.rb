# frozen_string_literal: true

require "application_system_test_case"

class ComponentsTest < ApplicationSystemTestCase
  test "a cs-* element upgrades from the served files and the cloak comes off" do
    visit root_path

    assert_selector "cs-button#save"
    assert_predicate find("cs-button#save").shadow_root, :present?
    assert_selector "cs-button#save[variant=brand]"
    assert evaluate_script("!!customElements.get('cs-icon')"), "the start icon upgraded too"
    assert_no_selector "html.cs-cloak"

    resources = evaluate_script(<<~JS)
      performance.getEntriesByType("resource")
        .filter(entry => entry.name.includes("/cornerstone/"))
        .map(entry => [new URL(entry.name).pathname, entry.responseStatus])
    JS
    assert_operator resources.size, :>, 20, "the loader fetched its chunks"
    assert_empty resources.reject { |_, status| status == 200 }, "every library request succeeded"
  end

  test "Turbo Drive holds the render until the incoming page's components are registered" do
    visit root_path
    assert_selector "cs-button#save"
    refute evaluate_script("!!customElements.get('cs-badge')"), "cs-badge must not be loaded yet"

    execute_script(<<~JS)
      document.addEventListener("turbo:render", () => {
        window.badgeDefinedAtRender = document.querySelector("#arrived")?.matches(":defined");
      }, { once: true });
    JS
    click_link "Other page"

    assert_selector "cs-badge#arrived"
    assert_equal true, evaluate_script("window.badgeDefinedAtRender")
  end

  test "the Capybara helpers fill in cs-* controls and the form submits their values" do
    visit form_path

    cs_fill_in "Full name", with: "Ada Lovelace"
    cs_fill_in "Notes", with: "Line one"
    cs_select "Mexico", from: "Country"
    cs_check "I agree"
    cs_uncheck "Email me"
    cs_choose "Yearly", from: "Plan"

    assert_equal "Ada Lovelace", cs_field_value("Full name")
    assert_equal "mx", cs_field_value("Country")
    assert_equal true, cs_field_value("I agree")
    assert_equal false, cs_field_value("Email me")

    cs_click_button "Send"

    assert_text '"full_name":"Ada Lovelace"'
    params = JSON.parse(find("body").text)
    assert_equal({ "full_name" => "Ada Lovelace", "notes" => "Line one", "country" => "mx", "agree" => "yes", "plan" => "yearly" }, params)
  end
end

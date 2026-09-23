# frozen_string_literal: true

require "capybara"
require "xpath"

module CornerstoneRails
  module Testing
    # Capybara helpers for Cornerstone Components form controls.
    #
    # A cs-* control keeps its native <input> inside a shadow root, where Capybara's fill_in,
    # check and select cannot see it. These helpers find the host element in the light DOM, then
    # act on it the way a user would: typing into the inner input, clicking the host.
    #
    # A locator matches the host's `label`, `name`, `id` or `aria-label` attribute, or the text of
    # a `slot="label"` child. Checkboxes, switches and radios also match their own text, which is
    # where their label lives.
    #
    # Needs a JavaScript driver that can enter shadow roots: Selenium, with Capybara 3.37 or later.
    # Every helper waits as Capybara's own finders do, so a component that has not upgraded yet
    # is retried rather than failed.
    module CapybaraHelpers
      TEXT_CONTROLS = %w[cs-input cs-textarea cs-number-input].freeze
      INNER_FIELD = "input, textarea"

      # Types into a cs-input, cs-textarea or cs-number-input, replacing its value.
      #
      #   cs_fill_in "Email", with: "someone@example.com"
      def cs_fill_in(locator, with:, **options)
        host = cs_find_control(TEXT_CONTROLS, locator, **options)
        cs_wait_for_upgrade(host)
        host.shadow_root.find(:css, INNER_FIELD).set(with)
        host
      end

      # Opens a cs-select and picks the option with the given text (or value).
      #
      #   cs_select "Canada", from: "Country"
      def cs_select(value, from:, **options)
        host = cs_find_control(%w[cs-select], from, **options)
        cs_wait_for_upgrade(host)
        host.click unless host.evaluate_script("this.open")
        host.find(:xpath, XPath.descendant(:"cs-option")[
          XPath.string.n.is(value.to_s) | XPath.attr(:value).equals(value.to_s)
        ], match: :prefer_exact).click
        host
      end

      # Checks a cs-checkbox or cs-switch. Does nothing if it is already checked.
      #
      #   cs_check "I agree to the terms"
      def cs_check(locator, **options)
        cs_toggle(locator, true, **options)
      end

      # Unchecks a cs-checkbox or cs-switch. Does nothing if it is already unchecked.
      def cs_uncheck(locator, **options)
        cs_toggle(locator, false, **options)
      end

      # Picks a cs-radio, optionally inside the cs-radio-group matching `from:`.
      #
      #   cs_choose "Monthly", from: "Billing"
      def cs_choose(locator, from: nil, **options)
        scope = from ? cs_find_control(%w[cs-radio-group], from, **options) : page
        radio = scope.find(:xpath, cs_control_xpath(%w[cs-radio], locator, text: true, value: true), **options)
        radio.click
        radio
      end

      # Clicks a cs-button by its text, id, name, value or aria-label.
      #
      #   cs_click_button "Save"
      def cs_click_button(locator, **options)
        button = find(:xpath, cs_control_xpath(%w[cs-button], locator, text: true, value: true), **options)
        cs_wait_for_upgrade(button)
        button.click
        button
      end

      # The current `value` property of a form control (a String, or an Array for a multiple
      # cs-select). Also works for cs-checkbox and cs-switch, returning `checked`.
      #
      #   expect(cs_field_value("Email")).to eq("someone@example.com")
      def cs_field_value(locator, **options)
        tags = TEXT_CONTROLS + %w[cs-select cs-radio-group cs-checkbox cs-switch cs-slider cs-rating cs-color-picker]
        host = cs_find_control(tags, locator, **options)
        cs_wait_for_upgrade(host)
        host.evaluate_script("['cs-checkbox', 'cs-switch'].includes(this.localName) ? this.checked : this.value")
      end

      # Finds the host element of a cs-* control. `tags` is one tag name or an array of them.
      def cs_find_control(tags, locator, **options)
        tags = Array(tags).map(&:to_s)
        text = tags.any? { |tag| %w[cs-checkbox cs-switch cs-radio].include?(tag) }
        find(:xpath, cs_control_xpath(tags, locator, text: text), **options)
      end

      private

      def cs_toggle(locator, state, **options)
        host = cs_find_control(%w[cs-checkbox cs-switch], locator, **options)
        cs_wait_for_upgrade(host)
        host.click unless host.evaluate_script("this.checked") == state
        host
      end

      # Waits (within Capybara's wait time) for the host to have its shadow root.
      def cs_wait_for_upgrade(host)
        host.synchronize do
          raise Capybara::ExpectationNotMet, "<#{host.tag_name}> has not been registered" unless host.evaluate_script("!!this.shadowRoot && this.matches(':defined')")
        end
      end

      def cs_control_xpath(tags, locator, text: false, value: false)
        locator = locator.to_s
        matches = XPath.attr(:label).equals(locator) |
                  XPath.attr(:name).equals(locator) |
                  XPath.attr(:id).equals(locator) |
                  XPath.attr(:"aria-label").equals(locator) |
                  XPath.child[XPath.attr(:slot).equals("label")][XPath.string.n.is(locator)]
        matches |= XPath.string.n.is(locator) if text
        matches |= XPath.attr(:value).equals(locator) if value
        XPath.descendant(*tags.map(&:to_sym))[matches]
      end
    end
  end
end

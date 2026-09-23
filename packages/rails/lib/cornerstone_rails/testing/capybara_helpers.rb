# frozen_string_literal: true

require "capybara"
require "xpath"

module CornerstoneRails
  module Testing
    # Capybara helpers for Cornerstone Components: form controls, cs-tree and cs-split-panel.
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

      # -- cs-tree ---------------------------------------------------------------------------------
      #
      # A tree item's locator is its id, its aria-label, or the text of its own label: a text node
      # directly inside the item, or any element in its label whose whole text is the locator (so
      # `<cs-tree-item><a href="...">Ohio Valley</a> ...</cs-tree-item>` matches "Ohio Valley").
      # Text inside a nested cs-tree-item belongs to that item. As with Capybara's finders, an item
      # inside a collapsed branch is not visible; expand the branch first, or pass `visible: :all`
      # to the assertions.

      # Finds a cs-tree-item.
      def cs_find_tree_item(locator, **options)
        find(:xpath, cs_tree_item_xpath(locator), **options)
      end

      # Opens a branch by clicking its expand button. Does nothing if it is already open.
      #
      #   cs_expand_tree_item "Documents"
      def cs_expand_tree_item(locator, **options)
        cs_toggle_tree_item(locator, true, **options)
      end

      # Closes a branch by clicking its expand button. Does nothing if it is already closed.
      def cs_collapse_tree_item(locator, **options)
        cs_toggle_tree_item(locator, false, **options)
      end

      # Selects an item by clicking its label, as a user would. Does nothing if it is already
      # selected. What a click does depends on the tree's `selection`: in "leaf" mode a click on a
      # branch opens or closes it instead, and in the multiple modes a click toggles.
      #
      #   cs_select_tree_item "notes.txt"
      def cs_select_tree_item(locator, **options)
        item = cs_find_tree_item(locator, **options)
        cs_wait_for_upgrade(item)
        return item if item.evaluate_script("this.selected")

        # A click on the label's <slot> itself is refused by WebDriver (the point belongs to the
        # slotted light DOM), so click the host at the centre of its label, where a user would.
        dx, dy = item.evaluate_script(<<~JS)
          (() => {
            const label = this.shadowRoot.querySelector('[part~=label]').getBoundingClientRect();
            const host = this.getBoundingClientRect();
            return [label.left + label.width / 2 - (host.left + host.width / 2), label.top + label.height / 2 - (host.top + host.height / 2)];
          })()
        JS
        page.scroll_to(item, align: :center)
        page.driver.browser.action.move_to(item.native, dx.round, dy.round).click.perform
        item
      end

      # Waits for a cs-tree-item to be in the given state, or raises Capybara::ExpectationNotMet.
      # Works in Minitest and RSpec alike, as Capybara's assert_selector does.
      #
      #   assert_cs_tree_item "Documents", expanded: true
      #   assert_cs_tree_item "notes.txt", selected: true, expanded: false
      def assert_cs_tree_item(locator, expanded: nil, selected: nil, **options)
        item = cs_find_tree_item(locator, **options)
        cs_wait_for_upgrade(item)
        expected = { "expanded" => expanded, "selected" => selected }.compact
        item.synchronize(options[:wait]) do
          actual = item.evaluate_script("({ expanded: this.expanded, selected: this.selected })").slice(*expected.keys)
          raise Capybara::ExpectationNotMet, "expected tree item #{locator.inspect} to be #{expected}, was #{actual}" unless actual == expected
        end
        true
      end

      # true or false, after waiting as assert_cs_tree_item does.
      #
      #   expect(has_cs_tree_item?("Documents", expanded: true)).to be(true)
      def has_cs_tree_item?(locator, **state)
        assert_cs_tree_item(locator, **state)
      rescue Capybara::ExpectationNotMet
        false
      end

      # -- cs-split-panel ----------------------------------------------------------------------
      #
      # A split panel's locator is its id or aria-label. Leave it out when the page has one.

      # Finds a cs-split-panel.
      def cs_find_split_panel(locator = nil, **options)
        panels = XPath.descendant(:"cs-split-panel")
        panels = panels[XPath.attr(:id).equals(locator.to_s) | XPath.attr(:"aria-label").equals(locator.to_s)] if locator
        find(:xpath, panels, **options)
      end

      # Moves the divider to `position`, a percentage of the panel's size from the start. It sets
      # the component's `position` property, so the panel emits cs-reposition as it does after a
      # drag.
      #
      #   cs_set_split_panel_position 30
      #   cs_set_split_panel_position 30, "sidebar"
      def cs_set_split_panel_position(position, locator = nil, **options)
        panel = cs_find_split_panel(locator, **options)
        cs_wait_for_upgrade(panel)
        panel.execute_script("this.position = arguments[0]", position.to_f)
        panel
      end

      # The divider's position, a Float percentage of the panel's size from the start.
      def cs_split_panel_position(locator = nil, **options)
        panel = cs_find_split_panel(locator, **options)
        cs_wait_for_upgrade(panel)
        panel.evaluate_script("this.position").to_f
      end

      # Finds the host element of a cs-* control. `tags` is one tag name or an array of them.
      def cs_find_control(tags, locator, **options)
        tags = Array(tags).map(&:to_s)
        text = tags.any? { |tag| %w[cs-checkbox cs-switch cs-radio].include?(tag) }
        find(:xpath, cs_control_xpath(tags, locator, text: text), **options)
      end

      private

      def cs_toggle_tree_item(locator, state, **options)
        item = cs_find_tree_item(locator, **options)
        cs_wait_for_upgrade(item)
        return item if item.evaluate_script("this.expanded") == state

        raise Capybara::ExpectationNotMet, "tree item #{locator.inspect} has no children to show" if item.evaluate_script("this.isLeaf && !this.lazy")

        item.shadow_root.find(:css, ".expand-button").click
        item.synchronize do
          raise Capybara::ExpectationNotMet, "tree item #{locator.inspect} did not #{state ? "expand" : "collapse"}" unless item.evaluate_script("this.expanded") == state
        end
        item
      end

      # Text nodes directly inside an item, and elements in its label (not inside a nested item)
      # whose whole text is the locator.
      def cs_tree_item_xpath(locator)
        literal = cs_xpath_literal(locator.to_s)
        ".//cs-tree-item[@id=#{literal} or @aria-label=#{literal} or text()[normalize-space(.)=#{literal}]]" \
          " | .//*[not(self::cs-tree-item)][not(.//cs-tree-item)][normalize-space(.)=#{literal}]/ancestor::cs-tree-item[1]"
      end

      def cs_xpath_literal(string)
        return "'#{string}'" unless string.include?("'")
        return %("#{string}") unless string.include?('"')

        "concat(#{string.split("'", -1).map { |part| "'#{part}'" }.join(%(, "'", ))})"
      end

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

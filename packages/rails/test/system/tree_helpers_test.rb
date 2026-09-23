# frozen_string_literal: true

require "application_system_test_case"

class TreeHelpersTest < ApplicationSystemTestCase
  test "expand, collapse and select tree items by label, and assert their state" do
    visit tree_path

    assert_cs_tree_item "Documents", expanded: true, selected: false
    assert_cs_tree_item "Photos", expanded: false
    assert_no_selector "cs-tree-item#beach" # inside the closed Photos branch

    cs_expand_tree_item "Photos"
    assert_cs_tree_item "Photos", expanded: true
    assert_selector "cs-tree-item#beach"

    cs_select_tree_item "beach.jpg"
    assert_cs_tree_item "beach.jpg", selected: true
    assert_cs_tree_item "Photos", selected: false, expanded: true

    cs_collapse_tree_item "Documents"
    assert_cs_tree_item "Documents", expanded: false
    assert_no_selector "cs-tree-item#notes"
    assert has_cs_tree_item?("Documents", expanded: false)
    refute has_cs_tree_item?("Documents", expanded: true, wait: 0.2)
  end

  test "a label inside an element, with a quote in it, and an item's id both work as locators" do
    visit tree_path

    assert_equal "music", cs_find_tree_item("Bob's music")[:id]
    assert_equal "music", cs_find_tree_item("music")[:id]
    cs_expand_tree_item "Bob's music"
    assert_cs_tree_item "track.mp3", expanded: false
    assert_equal "track", cs_find_tree_item("track.mp3")[:id]
  end

  test "expanding a leaf and a failed assertion raise Capybara::ExpectationNotMet" do
    visit tree_path

    assert_raises(Capybara::ExpectationNotMet) { cs_expand_tree_item "notes.txt" }
    error = assert_raises(Capybara::ExpectationNotMet) { assert_cs_tree_item "notes.txt", selected: true, wait: 0.2 }
    assert_match(/notes\.txt/, error.message)
  end

  test "set and read a split panel's position" do
    visit tree_path

    assert_in_delta 30.0, cs_split_panel_position, 0.5
    cs_set_split_panel_position 55, "split"
    assert_in_delta 55.0, cs_split_panel_position("split"), 0.5
    assert_selector "cs-split-panel#split[position='55']"
    assert_operator evaluate_script("window.repositions"), :>=, 1, "cs-reposition was emitted"
  end
end

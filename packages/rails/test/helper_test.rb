# frozen_string_literal: true

require "test_helper"

class HelperTest < ActionView::TestCase
  include CornerstoneRails::Helper

  setup { @config = CornerstoneRails.config.dup }
  teardown { CornerstoneRails.config.merge!(@config) }

  test "head tags load the stylesheet, the Turbo handling and then the loader from the versioned path" do
    html = cornerstone_head_tags
    base = "/cornerstone/#{CornerstoneRails::COMPONENTS_VERSION}"

    assert_includes html, %(<link rel="stylesheet" href="#{base}/styles/cornerstone.css" data-turbo-track="reload" />)
    assert_includes html, %(<script src="#{base}/#{CornerstoneRails.glue_filename}" type="module" data-turbo-track="reload"></script>)
    assert_includes html, %(<script src="#{base}/cornerstone.loader.js" type="module" data-turbo-track="reload"></script>)
    assert_operator html.index(CornerstoneRails.glue_filename), :<, html.index("cornerstone.loader.js")
    refute_includes html, "themes/", "the default stylesheet already imports the cru theme"
    refute_includes html, "prefers-color-scheme"
  end

  test "a theme the default stylesheet does not import gets its own link" do
    assert_includes cornerstone_head_tags(theme: :default), "/styles/themes/default.css"
  end

  test "an unknown theme or color scheme raises" do
    assert_raises(ArgumentError) { cornerstone_head_tags(theme: :familylife) }
    assert_raises(ArgumentError) { cornerstone_html_class(color_scheme: :sepia) }
  end

  test "color_scheme: :auto adds the media-query script and leaves the scheme class to it" do
    assert_includes cornerstone_head_tags(color_scheme: :auto), "prefers-color-scheme: dark"
    assert_equal "cs-theme-cru cs-cloak", cornerstone_html_class(color_scheme: :auto)
  end

  test "turbo: false leaves out the Turbo handling" do
    refute_includes cornerstone_head_tags(turbo: false), "cornerstone-rails-"
  end

  test "html class reflects the configuration" do
    assert_equal "cs-theme-cru cs-light cs-cloak", cornerstone_html_class
    CornerstoneRails.config.color_scheme = :dark
    CornerstoneRails.config.cloak = false
    assert_equal "cs-theme-cru cs-dark", cornerstone_html_class
    assert_equal "cs-theme-default cs-dark cs-cloak", cornerstone_html_class(theme: "default", cloak: true)
  end

  test "path_prefix moves every URL" do
    CornerstoneRails.config.path_prefix = "/vendor/cs"
    assert_equal "/vendor/cs/#{CornerstoneRails::COMPONENTS_VERSION}/cornerstone.js", cornerstone_asset_path("cornerstone.js")
  end

  test "cs_tag prefixes and dasherizes, and renders booleans as HTML does" do
    html = cs_tag(:tree_item, "Docs", expanded: true, disabled: false, lazy: nil, with_clear: true, data: { id: 4 }, aria: { current: "page" }, class: %w[a b])
    assert_dom_equal %(<cs-tree-item expanded="" with-clear="" data-id="4" aria-current="page" class="a b">Docs</cs-tree-item>), html
    assert_dom_equal %(<cs-card></cs-card>), cs_tag("cs-card")
  end

  test "cs_tag escapes content and takes a block" do
    assert_dom_equal %(<cs-badge>&lt;b&gt;</cs-badge>), cs_tag(:badge, "<b>")
    assert_dom_equal %(<cs-card><p>Hi</p></cs-card>), cs_tag(:card) { tag.p("Hi") }
  end

  test "cs_button with icons, symbols and a block" do
    assert_dom_equal %(<cs-button variant="brand" type="submit"><cs-icon name="check" slot="start"></cs-icon>Save<cs-icon name="arrow_forward" slot="end"></cs-icon></cs-button>),
                     cs_button("Save", variant: :brand, type: :submit, start_icon: "check", end_icon: "arrow_forward")
    assert_dom_equal %(<cs-button href="/x"><b>Go</b></cs-button>), cs_button(href: "/x") { tag.b("Go") }
  end

  test "cs_icon, cs_badge and cs_callout" do
    assert_dom_equal %(<cs-icon name="check_circle" label="Done"></cs-icon>), cs_icon("check_circle", label: "Done")
    assert_dom_equal %(<cs-badge variant="success" pill="">New</cs-badge>), cs_badge("New", variant: :success, pill: true)
    assert_dom_equal %(<cs-callout variant="warning"><cs-icon name="warning" slot="icon"></cs-icon>Careful</cs-callout>),
                     cs_callout("Careful", variant: :warning, icon: "warning")
  end

  test "cs_dialog puts footer: in the footer slot" do
    assert_dom_equal %(<cs-dialog label="Delete?" light-dismiss="">Gone for good.<div slot="footer"><cs-button variant="danger">Delete</cs-button></div></cs-dialog>),
                     cs_dialog("Gone for good.", label: "Delete?", light_dismiss: true, footer: cs_button("Delete", variant: :danger))
  end

  test "cs_tooltip anchors with for:, or wraps a block in a generated anchor" do
    assert_dom_equal %(<cs-tooltip for="share">Copies the link</cs-tooltip>), cs_tooltip("Copies the link", for: "share")

    html = cs_tooltip("Waiting", placement: :bottom) { cs_badge("Submitted") }
    anchor = html[/id="(cs-tooltip-anchor-\h+)"/, 1]
    assert anchor
    assert_dom_equal %(<span id="#{anchor}"><cs-badge>Submitted</cs-badge></span><cs-tooltip for="#{anchor}" placement="bottom">Waiting</cs-tooltip>), html
  end

  test "cs_tree and cs_tree_item nest" do
    html = cs_tree(selection: :leaf) { cs_tree_item("Docs", expanded: true) { cs_tree_item("a.txt") } }
    assert_dom_equal %(<cs-tree selection="leaf"><cs-tree-item expanded="">Docs<cs-tree-item>a.txt</cs-tree-item></cs-tree-item></cs-tree>), html
  end

  test "cs_split_panel wraps two panes in their slots, or renders a block as-is" do
    assert_dom_equal %(<cs-split-panel position="30"><div slot="start">Nav</div><div slot="end">Detail</div></cs-split-panel>),
                     cs_split_panel("Nav", "Detail", position: 30)
    assert_dom_equal %(<cs-split-panel><nav slot="start"></nav></cs-split-panel>), cs_split_panel { tag.nav(slot: "start") }
  end
end

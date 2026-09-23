# frozen_string_literal: true

require "test_helper"

class HelperTest < ActionView::TestCase
  include CornerstoneRails::Helper

  setup { @config = CornerstoneRails.config.dup }
  teardown { CornerstoneRails.config.merge!(@config) }

  BASE = "/cornerstone/#{CornerstoneRails::COMPONENTS_VERSION}".freeze

  test "head tags load the stylesheet and the gem's module, which loads the library on demand" do
    html = cornerstone_head_tags

    assert_includes html, %(<link rel="stylesheet" href="#{BASE}/styles/cornerstone.css" data-turbo-track="reload" />)
    assert_includes html, %(<script src="#{BASE}/#{CornerstoneRails.glue_filename}" type="module" data-turbo-track="reload"></script>)
    refute_includes html, "cornerstone.loader.js", "lazy by default: the gem's module imports the loader"
    refute_includes html, "themes/", "the default stylesheet already imports the cru theme"
    refute_includes html, "prefers-color-scheme"
  end

  test "eager: true also links the loader, after the gem's module" do
    html = cornerstone_head_tags(eager: true)
    assert_includes html, %(<script src="#{BASE}/cornerstone.loader.js" type="module" data-turbo-track="reload"></script>)
    assert_operator html.index(CornerstoneRails.glue_filename), :<, html.index("cornerstone.loader.js")

    CornerstoneRails.config.eager = true
    assert_includes cornerstone_head_tags, "cornerstone.loader.js"
  end

  test "native: false links layers, utilities and the theme instead of cornerstone.css" do
    links = cornerstone_head_tags(native: false).scan(/href="([^"]+)"/).flatten
    assert_equal %W[#{BASE}/styles/layers.css #{BASE}/styles/utilities.css #{BASE}/styles/themes/cru.css], links

    CornerstoneRails.config.native = false
    CornerstoneRails.config.theme = :default
    links = cornerstone_head_tags.scan(/href="([^"]+)"/).flatten
    assert_equal %W[#{BASE}/styles/layers.css #{BASE}/styles/utilities.css #{BASE}/styles/themes/default.css], links
  end

  test "the native: false stylesheets are what cornerstone.css imports, minus native.css" do
    imports = File.read(File.join(CornerstoneRails::VENDOR_DIR, "styles", "cornerstone.css")).scan(/@import url\('([^']+)'\)/).flatten
    assert_equal %w[layers.css native.css utilities.css themes/cru.css], imports
    assert_equal (imports - ["native.css"]).map { "styles/#{_1}" }, CornerstoneRails::Helper.stylesheets(:cru, native: false)
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

  test "turbo: false tells the gem's module to leave out the Turbo handling" do
    assert_includes cornerstone_head_tags(turbo: false), %(src="#{BASE}/#{CornerstoneRails.glue_filename}?turbo=0")
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

  test "cs_tag prefixes and dasherizes, and renders true as name=\"name\" for every boolean" do
    html = cs_tag(:tree_item, "Docs", expanded: true, selected: true, disabled: false, lazy: nil, with_clear: true, data: { id: 4 }, aria: { current: "page" }, class: %w[a b])
    assert_dom_equal %(<cs-tree-item expanded="expanded" selected="selected" with-clear="with-clear" data-id="4" aria-current="page" class="a b">Docs</cs-tree-item>), html
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
    assert_dom_equal %(<cs-badge variant="success" pill="pill">New</cs-badge>), cs_badge("New", variant: :success, pill: true)
    assert_dom_equal %(<cs-callout variant="warning"><cs-icon name="warning" slot="icon"></cs-icon>Careful</cs-callout>),
                     cs_callout("Careful", variant: :warning, icon: "warning")
  end

  test "cs_dialog puts footer: in the footer slot" do
    assert_dom_equal %(<cs-dialog label="Delete?" light-dismiss="light-dismiss">Gone for good.<div slot="footer"><cs-button variant="danger">Delete</cs-button></div></cs-dialog>),
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
    assert_dom_equal %(<cs-tree selection="leaf"><cs-tree-item expanded="expanded">Docs<cs-tree-item>a.txt</cs-tree-item></cs-tree-item></cs-tree>), html
  end

  test "cs_split_panel wraps two panes in their slots, or renders a block as-is" do
    assert_dom_equal %(<cs-split-panel position="30"><div slot="start">Nav</div><div slot="end">Detail</div></cs-split-panel>),
                     cs_split_panel("Nav", "Detail", position: 30)
    assert_dom_equal %(<cs-split-panel><nav slot="start"></nav></cs-split-panel>), cs_split_panel { tag.nav(slot: "start") }
  end
end

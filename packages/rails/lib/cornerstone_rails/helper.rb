# frozen_string_literal: true

require "securerandom"

module CornerstoneRails
  # View helpers, included into every view by the engine.
  #
  # The layout helpers put Cornerstone Components on the page. The cs_* helpers are thin: each one
  # renders a single cs-* element, passing every other option through as an attribute. Keyword
  # names are dasherized (`with_clear: true` becomes `with-clear`), `true` renders the attribute
  # with its own name as the value (`with-clear="with-clear"`), and `false` or `nil` leaves it out. `data:` and `aria:` hashes, and `class:`
  # arrays, behave as they do in `tag`.
  module Helper
    # Keeps a second copy of the listener out if Turbo re-runs this script after a Drive visit.
    AUTO_COLOR_SCHEME_JS = <<~JS.squish.freeze
      (function () {
        if (window.__cornerstoneColorScheme) return;
        window.__cornerstoneColorScheme = true;
        var root = document.documentElement, query = matchMedia("(prefers-color-scheme: dark)");
        function apply() { root.classList.toggle("cs-dark", query.matches); root.classList.toggle("cs-light", !query.matches); }
        apply();
        query.addEventListener("change", apply);
      })();
    JS

    # -- Layout ----------------------------------------------------------------------------------

    # Everything Cornerstone Components needs in <head>: the stylesheets, the color-scheme script
    # for :auto, and the gem's module, which imports the library the first time the page has a
    # cs-* element and handles Turbo. Defaults come from `config.cornerstone`.
    #
    #   <%= cornerstone_head_tags %>
    #   <%= cornerstone_head_tags theme: :default, color_scheme: :auto, native: false %>
    #
    # native: false leaves out styles/native.css, Cornerstone's styles for plain HTML elements
    # (<button>, <a>, <details>, body text), for an app that styles those itself. It links
    # layers.css, utilities.css and the theme instead of cornerstone.css, which imports all four.
    #
    # eager: true also links cornerstone.loader.js, so the library loads on every page.
    def cornerstone_head_tags(theme: nil, color_scheme: nil, turbo: nil, native: nil, eager: nil)
      theme = cornerstone_theme(theme)
      color_scheme = cornerstone_color_scheme(color_scheme)
      turbo = CornerstoneRails.config.turbo if turbo.nil?
      native = CornerstoneRails.config.native if native.nil?
      eager = CornerstoneRails.config.eager if eager.nil?
      track = { "data-turbo-track": "reload" }

      tags = CornerstoneRails::Helper.stylesheets(theme, native: native).map do |path|
        stylesheet_link_tag(cornerstone_asset_path(path), **track)
      end
      tags << javascript_tag(AUTO_COLOR_SCHEME_JS, **cornerstone_nonce) if color_scheme == :auto
      # One module does both jobs. It must run before the library, so the morph handling records
      # the page before any component upgrades and writes its own attributes.
      glue = cornerstone_asset_path(CornerstoneRails.glue_filename)
      glue += "?turbo=0" unless turbo
      tags << javascript_include_tag(glue, type: "module", **cornerstone_nonce, **track)
      tags << javascript_include_tag(cornerstone_asset_path("cornerstone.loader.js"), type: "module", **cornerstone_nonce, **track) if eager
      safe_join(tags, "\n")
    end

    # Classes for the <html> element: the theme, the color scheme and, by default, cs-cloak, which
    # hides the page on its first load until its components are registered (two seconds at most).
    #
    #   <html class="<%= cornerstone_html_class %>">  # => "cs-theme-cru cs-light cs-cloak"
    def cornerstone_html_class(theme: nil, color_scheme: nil, cloak: nil)
      color_scheme = cornerstone_color_scheme(color_scheme)
      cloak = CornerstoneRails.config.cloak if cloak.nil?
      classes = ["cs-theme-#{cornerstone_theme(theme)}"]
      classes << "cs-#{color_scheme}" unless color_scheme == :auto
      classes << "cs-cloak" if cloak
      classes.join(" ")
    end

    # URL of a file in the served library, e.g. cornerstone_asset_path("cornerstone.js")
    # => "/cornerstone/0.6.2/cornerstone.js". Honours config.asset_host.
    def cornerstone_asset_path(path)
      asset_path("#{CornerstoneRails.base_path}/#{path.to_s.delete_prefix("/")}")
    end

    # -- Components ------------------------------------------------------------------------------

    # Any cs-* element. The prefix is optional: cs_tag(:card) and cs_tag("cs-card") are the same.
    # Given both content and a block, the content comes first, as a tree item's label comes
    # before its children.
    #
    #   <%= cs_tag :card, with_header: true do %> ... <% end %>
    def cs_tag(name, content = nil, **attributes, &block)
      name = name.to_s.dasherize
      name = "cs-#{name}" unless name.start_with?("cs-")
      content = content.nil? ? capture(&block) : safe_join([content, capture(&block)]) if block
      content_tag(name, content, cs_attributes(attributes))
    end

    #   <%= cs_button "Save", variant: :brand, type: :submit %>
    #   <%= cs_button "Next", href: next_path, end_icon: "arrow_forward" %>
    def cs_button(content = nil, start_icon: nil, end_icon: nil, **attributes, &block)
      content = capture(&block) if block
      body = safe_join([
        (cs_icon(start_icon, slot: "start") if start_icon),
        content,
        (cs_icon(end_icon, slot: "end") if end_icon)
      ].compact)
      cs_tag(:button, body, **attributes)
    end

    # Material Symbols name. Give `label:` when the icon carries meaning; without one it is
    # decorative and hidden from assistive technology.
    #
    #   <%= cs_icon "check_circle", label: "Complete" %>
    def cs_icon(name, **attributes)
      cs_tag(:icon, nil, name: name, **attributes)
    end

    #   <%= cs_badge "New", variant: :success, pill: true %>
    def cs_badge(content = nil, **attributes, &block)
      cs_tag(:badge, content, **attributes, &block)
    end

    #   <%= cs_callout "Saved.", variant: :success, icon: "check_circle" %>
    def cs_callout(content = nil, icon: nil, **attributes, &block)
      content = capture(&block) if block
      cs_tag(:callout, safe_join([(cs_icon(icon, slot: "icon") if icon), content].compact), **attributes)
    end

    # `footer:` is rendered into the footer slot.
    #
    #   <%= cs_dialog label: "Delete project?", id: "confirm", footer: cs_button("Delete", variant: :danger) do %>
    #     This cannot be undone.
    #   <% end %>
    def cs_dialog(content = nil, footer: nil, **attributes, &block)
      content = capture(&block) if block
      footer = tag.div(footer, slot: "footer") if footer
      cs_tag(:dialog, safe_join([content, footer].compact), **attributes)
    end

    # A tooltip anchored to the element whose id is `for:`. Given a block instead, it wraps the
    # block in a span with a generated id and anchors to that.
    #
    #   <%= cs_tooltip "Copies the link", for: "share-button" %>
    #   <%= cs_tooltip "Waiting on two references" do %><%= cs_badge "Submitted" %><% end %>
    def cs_tooltip(content, **attributes, &block)
      return cs_tag(:tooltip, content, **attributes) unless block

      anchor_id = attributes.delete(:for) || "cs-tooltip-anchor-#{SecureRandom.hex(4)}"
      safe_join([tag.span(capture(&block), id: anchor_id), cs_tag(:tooltip, content, for: anchor_id, **attributes)])
    end

    #   <%= cs_tree selection: :leaf do %>
    #     <%= cs_tree_item "Documents", expanded: true do %> ... <% end %>
    #   <% end %>
    def cs_tree(**attributes, &block)
      cs_tag(:tree, nil, **attributes, &block)
    end

    def cs_tree_item(content = nil, **attributes, &block)
      cs_tag(:tree_item, content, **attributes, &block)
    end

    # Two panes, each wrapped in a div assigned to its slot. With a block, the block is rendered
    # as-is, so its children set slot="start" and slot="end" themselves.
    #
    #   <%= cs_split_panel render("nav"), render("detail"), position: 30 %>
    def cs_split_panel(start_content = nil, end_content = nil, **attributes, &block)
      return cs_tag(:split_panel, nil, **attributes, &block) if block

      panes = safe_join([tag.div(start_content, slot: "start"), tag.div(end_content, slot: "end")])
      cs_tag(:split_panel, panes, **attributes)
    end

    # -- Internals -------------------------------------------------------------------------------

    # The stylesheets cornerstone_head_tags links, as paths under the served library.
    #
    #   native: true   styles/cornerstone.css (layers, native, utilities and the Cru theme), plus
    #                  the theme's own file when cornerstone.css does not import it
    #   native: false  styles/layers.css, styles/utilities.css and styles/themes/<theme>.css
    def self.stylesheets(theme, native: true)
      if native
        ["styles/cornerstone.css", *("styles/themes/#{theme}.css" unless imported_by_default?(theme))]
      else
        ["styles/layers.css", "styles/utilities.css", "styles/themes/#{theme}.css"]
      end
    end

    def self.imported_by_default?(theme)
      @default_imports ||= File.read(File.join(CornerstoneRails::VENDOR_DIR, "styles", "cornerstone.css"))
      @default_imports.match?(%r{@import url\(['"]?themes/#{Regexp.escape(theme.to_s)}\.css})
    end

    private

    # A nonce for the app's content security policy, where the view can reach one (a mailer
    # view, for one, cannot).
    def cornerstone_nonce
      respond_to?(:content_security_policy_nonce, true) ? { nonce: true } : {}
    end

    def cs_attributes(attributes)
      attributes.each_with_object({}) do |(key, value), result|
        name = key.is_a?(Symbol) ? key.to_s.dasherize : key.to_s
        if %w[data aria].include?(name) || name == "class"
          result[key] = value
        elsif value == true
          # name="name", the form Rails' tag builder already uses for the HTML booleans it knows
          # (selected, disabled, checked, open, ...), so every boolean renders the same way.
          result[name] = name
        elsif value.nil? || value == false
          next
        else
          result[name] = value.is_a?(Symbol) ? value.to_s : value
        end
      end
    end

    def cornerstone_theme(theme)
      theme = (theme || CornerstoneRails.config.theme).to_sym
      return theme if CornerstoneRails.themes.include?(theme)

      raise ArgumentError, "Unknown Cornerstone theme #{theme.inspect}. Available: #{CornerstoneRails.themes.join(", ")}"
    end

    def cornerstone_color_scheme(color_scheme)
      color_scheme = (color_scheme || CornerstoneRails.config.color_scheme).to_sym
      return color_scheme if CornerstoneRails::COLOR_SCHEMES.include?(color_scheme)

      raise ArgumentError, "Unknown color scheme #{color_scheme.inspect}. Use :light, :dark or :auto"
    end
  end
end

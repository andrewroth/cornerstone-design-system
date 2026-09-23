# frozen_string_literal: true

require "rails/generators/base"

module CornerstoneRails
  module Generators
    # rails generate cornerstone:install
    #
    # Adds the head tags and the <html> classes to the application layout and writes an
    # initializer carrying the defaults. Running it twice changes nothing.
    class InstallGenerator < ::Rails::Generators::Base
      namespace "cornerstone:install"
      source_root File.expand_path("templates", __dir__)

      desc "Adds Cornerstone Components to the application layout."

      class_option :layout, type: :string, default: "app/views/layouts/application.html.erb",
                            desc: "Layout to add the head tags to"

      def create_initializer
        template "cornerstone.rb", "config/initializers/cornerstone.rb"
      end

      def add_head_tags
        return say_status(:missing, layout, :red) unless File.exist?(layout_path)
        return say_status(:identical, "#{layout} (head tags)", :blue) if layout_source.include?("cornerstone_head_tags")

        if layout_source.include?("</head>")
          insert_into_file layout, "    <%= cornerstone_head_tags %>\n", before: %r{^\s*</head>}
        else
          manual << "Add <%= cornerstone_head_tags %> inside <head> in #{layout}."
        end
      end

      def add_html_class
        return unless File.exist?(layout_path)
        return if layout_source.include?("cornerstone_html_class")

        html_tag = layout_source[/<html\b[^>]*>/]
        if html_tag && !html_tag.match?(/\sclass=/)
          gsub_file layout, html_tag, html_tag.sub("<html", %(<html class="<%= cornerstone_html_class %>"))
        else
          manual << %(Add <%= cornerstone_html_class %> to the class attribute of <html> in #{layout}.)
        end
      end

      def show_next_steps
        say ""
        say "Cornerstone Components #{CornerstoneRails::COMPONENTS_VERSION} is served from #{CornerstoneRails.base_path}/.", :green
        manual.each { |line| say "  - #{line}", :yellow }
        say <<~TEXT
          Next steps:
            - Use cs-* elements in any view, or the helpers: cs_button, cs_icon, cs_dialog, cs_tag ...
            - Choose the theme and color scheme in config/initializers/cornerstone.rb.
            - Turbo Drive and morph handling is on by default; see the gem README for what morph
              still cannot preserve.
            - System tests: require "cornerstone_rails/testing" and include
              CornerstoneRails::Testing::CapybaraHelpers (README, "Testing").
            - Remove any copy of the library under public/ or app/assets/ from the manual setup.
        TEXT
      end

      private

      def manual
        @manual ||= []
      end

      def layout
        options[:layout]
      end

      def layout_path
        File.join(destination_root, layout)
      end

      def layout_source
        File.read(layout_path)
      end
    end
  end
end

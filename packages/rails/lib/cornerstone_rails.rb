# frozen_string_literal: true

require "digest"
require "active_support"
require "active_support/core_ext/object/blank"
require "cornerstone_rails/version"

# Cornerstone Components for Rails.
#
# The namespace is CornerstoneRails rather than Cornerstone::Rails so that nothing inside it can
# mistake a bare `Rails` for the framework.
module CornerstoneRails
  ROOT = File.expand_path("..", __dir__)
  VENDOR_DIR = File.join(ROOT, "vendor", "cornerstone")
  PUBLIC_DIR = File.join(__dir__, "cornerstone_rails", "public")
  GLUE_FILE = File.join(PUBLIC_DIR, "cornerstone-rails.js")

  THEMES_DIR = File.join(VENDOR_DIR, "styles", "themes")
  COLOR_SCHEMES = %i[light dark auto].freeze

  # Defaults for the layout helpers and the served path. An application reaches the same object as
  # `config.cornerstone`, in config/application.rb or an initializer.
  #
  #   path_prefix   URL prefix, without the version ("/cornerstone")
  #   theme         a theme in vendor/cornerstone/styles/themes (:cru)
  #   color_scheme  :light, :dark or :auto (:light)
  #   cloak         add cs-cloak to <html> for the first page load (true)
  #   turbo         load the Turbo Drive and morph handling (true)
  def self.config
    @config ||= begin
      require "active_support/ordered_options"
      ActiveSupport::OrderedOptions.new.merge!(
        path_prefix: "/cornerstone", theme: :cru, color_scheme: :light, cloak: true, turbo: true
      )
    end
  end

  class << self
    def path_prefix
      config.path_prefix.presence || "/cornerstone"
    end

    # "/cornerstone/0.6.2" — every served URL starts with this, so a new release is a new URL
    # and the long cache lifetime is safe.
    def base_path
      "#{path_prefix.chomp("/")}/#{COMPONENTS_VERSION}"
    end

    # Theme names with a stylesheet in the vendored build, e.g. [:cru, :default].
    def themes
      @themes ||= Dir[File.join(THEMES_DIR, "*.css")].map { |f| File.basename(f, ".css").to_sym }.sort
    end

    # The Rails glue is the one file the npm package does not version, so its URL carries a digest
    # of its contents instead: a gem-only change can never be hidden behind a cached copy.
    def glue_filename
      @glue_filename ||= "cornerstone-rails-#{Digest::SHA256.file(GLUE_FILE).hexdigest[0, 12]}.js"
    end
  end
end

require "cornerstone_rails/static"
require "cornerstone_rails/helper"
require "cornerstone_rails/engine" if defined?(Rails::Engine)

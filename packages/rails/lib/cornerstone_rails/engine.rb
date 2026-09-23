# frozen_string_literal: true

require "rails/engine"

module CornerstoneRails
  class Engine < ::Rails::Engine
    config.cornerstone = CornerstoneRails.config

    # Ahead of Rails' own logger, as ActionDispatch::Static is, so a page's fifty-odd module
    # requests do not each write a log entry.
    initializer "cornerstone_rails.static" do |app|
      app.middleware.insert_before ::Rails::Rack::Logger, CornerstoneRails::Static
    end

    initializer "cornerstone_rails.helper" do
      ActiveSupport.on_load(:action_view) { include CornerstoneRails::Helper }
    end
  end
end

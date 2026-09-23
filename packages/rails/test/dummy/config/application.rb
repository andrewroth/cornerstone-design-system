# frozen_string_literal: true

require "rails"
require "action_controller/railtie"
require "action_view/railtie"
require "propshaft"
require "turbo-rails"
require "cornerstone_rails"

module Dummy
  class Application < Rails::Application
    config.load_defaults Rails::VERSION::STRING.to_f
    config.root = File.expand_path("..", __dir__)
    config.eager_load = false
    config.secret_key_base = "cornerstone-rails-dummy"
    config.logger = Logger.new(nil)
    config.hosts.clear
    config.action_controller.allow_forgery_protection = false
    config.active_support.deprecation = :stderr
  end
end

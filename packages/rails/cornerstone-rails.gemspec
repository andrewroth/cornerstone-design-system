# frozen_string_literal: true

require_relative "lib/cornerstone_rails/version"

Gem::Specification.new do |spec|
  spec.name = "cornerstone-rails"
  spec.version = CornerstoneRails::VERSION
  spec.authors = ["Cru Global"]
  spec.summary = "Cornerstone Components for Rails: served assets, layout and view helpers, Turbo glue, test helpers."
  spec.description = "Vendors the browser build of @cruglobal/cornerstone-components and serves it from a " \
                     "Rails engine without fingerprinting, so the loader's relative chunk imports resolve " \
                     "under Propshaft. Adds layout helpers, thin cs-* view helpers, Turbo Drive and morph " \
                     "handling, an install generator and Capybara helpers for shadow-DOM form controls."
  spec.homepage = "https://cruglobal.github.io/cornerstone-design-system/frameworks/rails/"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.2"

  spec.metadata = {
    "source_code_uri" => "https://github.com/CruGlobal/cornerstone-design-system/tree/main/packages/rails",
    "rubygems_mfa_required" => "true"
  }

  spec.files = Dir.chdir(__dir__) do
    Dir["lib/**/*", "vendor/cornerstone/**/*", "README.md", "LICENSE.md"].select { |f| File.file?(f) }
  end
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", ">= 7.1"
  spec.add_dependency "actionpack", ">= 7.1"
  spec.add_dependency "actionview", ">= 7.1"
end

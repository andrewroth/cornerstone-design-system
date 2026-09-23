# frozen_string_literal: true

require "test_helper"
require "cornerstone_rails/vendor"

class VendorTest < ActiveSupport::TestCase
  MANIFEST = JSON.parse(File.read(File.join(CornerstoneRails::VENDOR_DIR, "manifest.json")))

  test "the vendored files are the release the gem is versioned as" do
    assert_equal CornerstoneRails::COMPONENTS_VERSION, MANIFEST["version"]
    assert_match "Cornerstone Components #{CornerstoneRails::COMPONENTS_VERSION}",
                 File.read(File.join(CornerstoneRails::VENDOR_DIR, "cornerstone.loader.js"))
  end

  test "the gem version is the version the monorepo locks the npm packages to" do
    package = File.expand_path("../../components/package.json", __dir__)
    skip "not inside the Cornerstone monorepo" unless File.exist?(package)
    assert_equal JSON.parse(File.read(package))["version"], CornerstoneRails::VERSION,
                 "Run `VERSION=<new> bundle exec rake cornerstone:vendor` and bump lib/cornerstone_rails/version.rb"
  end

  test "the manifest matches what is on disk" do
    files = Dir.glob("**/*", base: CornerstoneRails::VENDOR_DIR).reject { |f| f == "manifest.json" || File.directory?(File.join(CornerstoneRails::VENDOR_DIR, f)) }
    assert_equal MANIFEST["files"], files.size
  end

  test "only browser-loaded files are kept" do
    keep = %w[cornerstone.js cornerstone.loader.js chunks/chunk.ABC.js components/button/button.js
              styles/themes/cru.css translations/es.js]
    drop = %w[cornerstone.all.js cornerstone.d.ts components/button/button.d.ts react/index.js
              ssr/index.js skills/cornerstone/SKILL.md custom-elements.json llms.txt
              styles/component/host.styles.ts cornerstone.ssr-loader.js]
    keep.each { |path| assert CornerstoneRails::Vendor.runtime_file?(path), path }
    drop.each { |path| refute CornerstoneRails::Vendor.runtime_file?(path), path }
  end
end

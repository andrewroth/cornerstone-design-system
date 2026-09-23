# frozen_string_literal: true

require "test_helper"
require "cornerstone_rails/vendor"
require "zlib"

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

  FILES = Dir.glob("**/*", base: CornerstoneRails::VENDOR_DIR).reject { |f| File.directory?(File.join(CornerstoneRails::VENDOR_DIR, f)) }

  test "the manifest matches what is on disk" do
    files = FILES.reject { |f| f == "manifest.json" || f.end_with?(".br", ".gz") }
    assert_equal MANIFEST["files"], files.size
  end

  test "every .js and .css file has current brotli and gzip copies, where they are smaller" do
    require "brotli"
    sources = FILES.select { |f| f.end_with?(".js", ".css") }
    stale = []
    missing = []
    sources.each do |f|
      data = File.binread(File.join(CornerstoneRails::VENDOR_DIR, f))
      { ".br" => ->(b) { Brotli.inflate(b) }, ".gz" => ->(b) { Zlib.gunzip(b) } }.each do |extension, inflate|
        copy = File.join(CornerstoneRails::VENDOR_DIR, f + extension)
        if File.exist?(copy)
          stale << f + extension unless inflate.call(File.binread(copy)) == data
        elsif data.bytesize > 1024
          missing << f + extension
        end
      end
    end
    assert_empty stale, "Run `bundle exec rake cornerstone:compress`"
    assert_empty missing, "Run `bundle exec rake cornerstone:compress`"
    orphans = FILES.select { |f| f.end_with?(".br", ".gz") && !File.exist?(File.join(CornerstoneRails::VENDOR_DIR, f.delete_suffix(File.extname(f)))) }
    assert_empty orphans
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

# frozen_string_literal: true

require "test_helper"

class StaticTest < ActionDispatch::IntegrationTest
  BASE = "/cornerstone/#{CornerstoneRails::COMPONENTS_VERSION}".freeze

  test "serves a content-hashed chunk under its real name, cacheable for a year" do
    chunk = File.basename(Dir[File.join(CornerstoneRails::VENDOR_DIR, "chunks", "*.js")].first)
    get "#{BASE}/chunks/#{chunk}"

    assert_response :ok
    assert_equal "text/javascript", response.media_type
    assert_equal "public, max-age=31536000, immutable", response.headers["cache-control"]
    assert_equal "*", response.headers["access-control-allow-origin"]
    assert_includes response.body, "Cornerstone Components #{CornerstoneRails::COMPONENTS_VERSION}"
  end

  test "every relative import in the loader resolves" do
    get "#{BASE}/cornerstone.loader.js"
    assert_response :ok
    imports = response.body.scan(%r{"\./(chunks/chunk\.\w+\.js)"}).flatten
    assert_operator imports.size, :>, 10
    imports.each do |path|
      get "#{BASE}/#{path}"
      assert_response :ok, path
    end
  end

  test "the autoloader's component path and the stylesheets resolve" do
    get "#{BASE}/components/button/button.js"
    assert_response :ok
    get "#{BASE}/styles/cornerstone.css"
    assert_response :ok
    assert_equal "text/css", response.media_type
    get "#{BASE}/styles/themes/cru.css"
    assert_response :ok
  end

  test "serves the Rails glue under its digest name" do
    get "#{BASE}/#{CornerstoneRails.glue_filename}"
    assert_response :ok
    assert_equal "text/javascript", response.media_type
    assert_includes response.body, "preventTurboFouce"
  end

  test "missing files, traversal and other versions are 404s; writes are refused" do
    get "#{BASE}/components/nope/nope.js"
    assert_response :not_found
    refute_match(/immutable/, response.headers["cache-control"].to_s)

    get "#{BASE}/%2e%2e/%2e%2e/Gemfile"
    assert_response :not_found
    get "#{BASE}/../../Gemfile"
    assert_response :not_found

    get "/cornerstone/0.0.1/cornerstone.loader.js"
    assert_response :not_found

    post "#{BASE}/cornerstone.loader.js"
    assert_response :method_not_allowed
  end

  test "HEAD returns headers without a body" do
    head "#{BASE}/cornerstone.loader.js"
    assert_response :ok
    assert_empty response.body
  end
end

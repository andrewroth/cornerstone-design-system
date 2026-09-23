# frozen_string_literal: true

require "digest"
require "fileutils"
require "json"
require "net/http"
require "rubygems/package"
require "stringio"
require "uri"
require "zlib"

module CornerstoneRails
  # Copies the runtime files of a published @cruglobal/cornerstone-components release into
  # vendor/cornerstone. Used by `rake cornerstone:vendor`; never runs in a consuming app.
  #
  # Only the bundled build is taken, and only what a browser loads from it: the entry points,
  # the content-hashed chunks, each component's module, and the CSS. Type declarations, React
  # wrappers, the SSR build, the agent files, the JSON manifests and the single-file build are
  # dropped. No file is modified.
  class Vendor
    PACKAGE = "@cruglobal/cornerstone-components"
    REGISTRY = "https://registry.npmjs.org"
    BUNDLED = "package/dist/bundled/"

    # Directories under dist/bundled whose .js files are kept. `chunks` and `components` are what
    # the loader reaches at runtime; the other three are public module entry points a page may
    # import directly (a translation, a utility, an event class).
    JS_DIRS = %w[chunks components events translations utilities].freeze
    JS_ENTRY_POINTS = %w[cornerstone.js cornerstone.loader.js].freeze
    ROOT_FILES = { "package/LICENSE.md" => "LICENSE.md", "package/NOTICE" => "NOTICE" }.freeze

    attr_reader :version, :destination

    def initialize(version:, destination:, tarball: nil, log: $stdout)
      @version = version
      @destination = destination
      @tarball = tarball
      @log = log
    end

    def call
      data, integrity = tarball_bytes
      files = extract(data)
      raise "No runtime files found in #{PACKAGE}@#{version}" if files.empty?

      FileUtils.rm_rf(destination)
      files.each do |path, contents|
        target = File.join(destination, path)
        FileUtils.mkdir_p(File.dirname(target))
        File.binwrite(target, contents)
      end
      write_manifest(files, integrity)
      @log.puts "Vendored #{files.size} files (#{files.values.sum(&:bytesize)} bytes) from #{PACKAGE}@#{version}"
      files
    end

    # true when a dist/bundled-relative path is something a browser loads.
    def self.runtime_file?(path)
      return JS_ENTRY_POINTS.include?(path) if !path.include?("/")
      dir = path.split("/").first
      return path.end_with?(".css") if dir == "styles"
      JS_DIRS.include?(dir) && path.end_with?(".js")
    end

    private

    def tarball_bytes
      if @tarball
        [File.binread(@tarball), nil]
      else
        meta = JSON.parse(http_get("#{REGISTRY}/#{PACKAGE.sub("/", "%2F")}/#{version}"))
        data = http_get(meta.fetch("dist").fetch("tarball"))
        verify!(data, meta.dig("dist", "integrity"))
        [data, meta.dig("dist", "integrity")]
      end
    end

    def verify!(data, integrity)
      return unless integrity&.start_with?("sha512-")
      actual = "sha512-#{Digest::SHA512.base64digest(data)}"
      raise "Integrity mismatch for #{PACKAGE}@#{version}: expected #{integrity}, got #{actual}" unless actual == integrity
    end

    def extract(data)
      files = {}
      Gem::Package::TarReader.new(Zlib::GzipReader.new(StringIO.new(data))) do |tar|
        tar.each do |entry|
          next unless entry.file?
          name = entry.full_name
          if ROOT_FILES.key?(name)
            files[ROOT_FILES[name]] = entry.read
          elsif name.start_with?(BUNDLED)
            relative = name.delete_prefix(BUNDLED)
            files[relative] = entry.read if self.class.runtime_file?(relative)
          end
        end
      end
      header = files["cornerstone.loader.js"].to_s[/Cornerstone Components (\S+)/, 1]
      raise "Tarball is #{header.inspect}, expected #{version}" if header && header != version
      files.sort.to_h
    end

    def write_manifest(files, integrity)
      manifest = {
        "package" => PACKAGE,
        "version" => version,
        "integrity" => integrity,
        "files" => files.size,
        "bytes" => files.values.sum(&:bytesize)
      }
      File.write(File.join(destination, "manifest.json"), JSON.pretty_generate(manifest) + "\n")
    end

    def http_get(url, limit = 5)
      raise "Too many redirects fetching #{url}" if limit.zero?
      response = Net::HTTP.get_response(URI(url))
      case response
      when Net::HTTPSuccess then response.body
      when Net::HTTPRedirection then http_get(response["location"], limit - 1)
      else raise "GET #{url} failed: #{response.code}"
      end
    end
  end
end

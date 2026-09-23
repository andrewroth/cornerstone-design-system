# frozen_string_literal: true

require "rack/files"
require "rack/utils"

module CornerstoneRails
  # Serves the vendored Cornerstone Components files at CornerstoneRails.base_path, byte for byte
  # and under their real names.
  #
  # Propshaft is deliberately not involved. It renames every file with a digest but does not
  # rewrite JavaScript import specifiers, so the loader's `./chunks/chunk.*.js` imports would all
  # 404. Instead the version is in the URL, which makes every response safe to cache forever.
  class Static
    CACHE_CONTROL = "public, max-age=31536000, immutable"

    # base_path is read on each request unless given, so `config.cornerstone.path_prefix` works
    # from an initializer that runs after the middleware stack is built.
    def initialize(app, base_path: nil)
      @app = app
      @base_path = base_path
      headers = { "cache-control" => CACHE_CONTROL, "access-control-allow-origin" => "*" }
      @vendor = Rack::Files.new(VENDOR_DIR, headers)
      @glue = Rack::Files.new(PUBLIC_DIR, headers)
    end

    def call(env)
      path = env[Rack::PATH_INFO].to_s
      prefix = "#{(@base_path || CornerstoneRails.base_path).chomp("/")}/"
      return @app.call(env) unless path.start_with?(prefix)
      return [405, { "content-type" => "text/plain", "allow" => "GET, HEAD" }, ["Method Not Allowed"]] unless %w[GET HEAD].include?(env[Rack::REQUEST_METHOD])

      relative = Rack::Utils.unescape_path(path.delete_prefix(prefix))
      return not_found if !Rack::Utils.valid_path?(relative) || relative.split("/").include?("..")

      if relative == CornerstoneRails.glue_filename
        serve(@glue, env, "cornerstone-rails.js")
      else
        serve(@vendor, env, relative)
      end
    end

    private

    def serve(files, env, relative)
      files.call(env.merge(Rack::PATH_INFO => "/#{relative}", Rack::SCRIPT_NAME => ""))
    end

    def not_found
      [404, { "content-type" => "text/plain" }, ["Not Found"]]
    end
  end
end

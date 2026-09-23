# frozen_string_literal: true

require "stringio"
require "zlib"

module CornerstoneRails
  # Writes a brotli (.br) and a gzip (.gz) copy next to each vendored .js and .css file, for
  # CornerstoneRails::Static to serve to browsers that accept them. Used by `rake cornerstone:vendor`
  # and `rake cornerstone:compress`; never runs in a consuming app. The copies are committed,
  # because a gem installed from git runs no build step.
  #
  # A copy is written only when it is smaller than the file, so tiny files have none. Brotli needs
  # the `brotli` gem, which is in the gem's development Gemfile, not in the gemspec.
  class Compressor
    EXTENSIONS = %w[.js .css].freeze
    VARIANTS = %w[.br .gz].freeze

    attr_reader :directory

    def initialize(directory, log: $stdout)
      @directory = directory
      @log = log
    end

    def call
      require "brotli"
      remove
      totals = Hash.new(0)
      sources.each do |path|
        data = File.binread(path)
        totals[:identity] += data.bytesize
        { ".br" => Brotli.deflate(data, quality: 11), ".gz" => gzip(data) }.each do |extension, compressed|
          next if compressed.bytesize >= data.bytesize

          File.binwrite(path + extension, compressed)
          totals[extension] += compressed.bytesize
          totals[:"#{extension}_files"] += 1
        end
      end
      @log.puts "Compressed #{sources.size} files (#{totals[:identity]} bytes): " \
                "#{totals[:".br_files"]} .br (#{totals[".br"]} bytes), #{totals[:".gz_files"]} .gz (#{totals[".gz"]} bytes)"
      totals
    end

    def remove
      VARIANTS.each { |extension| Dir[File.join(directory, "**", "*#{extension}")].each { |f| File.delete(f) } }
    end

    private

    def sources
      @sources ||= Dir[File.join(directory, "**", "*")].select { |f| EXTENSIONS.include?(File.extname(f)) && File.file?(f) }.sort
    end

    # Level 9 with a fixed mtime of 0, so re-running the task writes byte-identical files.
    def gzip(data)
      io = StringIO.new("".b)
      writer = Zlib::GzipWriter.new(io, Zlib::BEST_COMPRESSION)
      writer.mtime = 0
      writer.write(data)
      writer.finish
      io.string
    end
  end
end

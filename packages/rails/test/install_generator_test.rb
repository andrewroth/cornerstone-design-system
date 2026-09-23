# frozen_string_literal: true

require "test_helper"
require "rails/generators/test_case"
require "generators/cornerstone/install/install_generator"

class InstallGeneratorTest < Rails::Generators::TestCase
  tests CornerstoneRails::Generators::InstallGenerator
  destination File.expand_path("../tmp/generator", __dir__)
  setup :prepare_destination

  LAYOUT = <<~ERB
    <!DOCTYPE html>
    <html>
      <head>
        <title>App</title>
        <%= csrf_meta_tags %>
      </head>
      <body><%= yield %></body>
    </html>
  ERB

  def write_layout(source = LAYOUT)
    path = File.join(destination_root, "app/views/layouts/application.html.erb")
    FileUtils.mkdir_p(File.dirname(path))
    File.write(path, source)
  end

  test "adds head tags, the html class and an initializer" do
    write_layout
    run_generator

    assert_file "app/views/layouts/application.html.erb" do |layout|
      assert_match %(<html class="<%= cornerstone_html_class %>">), layout
      assert_match %r{    <%= cornerstone_head_tags %>\n  </head>}, layout
    end
    assert_file "config/initializers/cornerstone.rb", /cornerstone.theme = :cru/
  end

  test "running twice changes nothing" do
    write_layout
    run_generator
    first = File.read(File.join(destination_root, "app/views/layouts/application.html.erb"))
    run_generator
    assert_equal first, File.read(File.join(destination_root, "app/views/layouts/application.html.erb"))
  end

  test "leaves an existing html class alone and says what to do" do
    write_layout(LAYOUT.sub("<html>", %(<html class="h-full">)))
    output = run_generator

    assert_file "app/views/layouts/application.html.erb", /<html class="h-full">/
    assert_match "Add <%= cornerstone_html_class %> to the class attribute", output
    assert_match "Next steps", output
  end

  test "the generator is found by its namespace" do
    assert_equal CornerstoneRails::Generators::InstallGenerator, Rails::Generators.find_by_namespace("install", "cornerstone")
  end
end

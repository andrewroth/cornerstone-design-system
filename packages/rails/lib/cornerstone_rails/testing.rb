# frozen_string_literal: true

# Opt-in test support. Require it from a test or spec helper:
#
#   require "cornerstone_rails/testing"
#
#   # RSpec
#   RSpec.configure { |config| config.include CornerstoneRails::Testing::CapybaraHelpers, type: :system }
#
#   # Minitest
#   class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
#     include CornerstoneRails::Testing::CapybaraHelpers
#   end
require "cornerstone_rails/testing/capybara_helpers"

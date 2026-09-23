# frozen_string_literal: true

require "test_helper"
require "cornerstone_rails/testing"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include CornerstoneRails::Testing::CapybaraHelpers

  driven_by :selenium, using: :headless_chrome, screen_size: [1200, 900]
end

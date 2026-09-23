# Cornerstone Components (cornerstone-rails <%= CornerstoneRails::VERSION %>)
#
# Defaults for cornerstone_head_tags and cornerstone_html_class. Each helper also takes these as
# keyword arguments, so one page can differ from the rest.
Rails.application.config.cornerstone.tap do |cornerstone|
  # A theme under the gem's vendor/cornerstone/styles/themes: <%= CornerstoneRails.themes.map(&:inspect).join(", ") %>
  cornerstone.theme = :cru

  # :light, :dark, or :auto to follow the operating system setting.
  cornerstone.color_scheme = :light

  # Hide the page on its first load until its components are registered (two seconds at most).
  cornerstone.cloak = true

  # Hold Turbo Drive renders until components are registered, and keep morph refreshes from
  # undoing attributes the components set themselves (an open dialog, a checked box).
  cornerstone.turbo = true

  # URL prefix the library is served under. The version is appended: /cornerstone/<%= CornerstoneRails::COMPONENTS_VERSION %>/
  # cornerstone.path_prefix = "/cornerstone"
end

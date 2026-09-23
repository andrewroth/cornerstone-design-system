# frozen_string_literal: true

class PagesController < ApplicationController
  def home; end
  def form; end
  def other; end
  def plain; end
  def tree; end

  def echo
    render plain: request.query_parameters.except("controller", "action").to_json
  end

  # Counts renders, so a test can tell a morph refresh happened and the server can change one
  # attribute between renders.
  RENDERS = Concurrent::AtomicFixnum.new

  def morph
    @render = RENDERS.increment
  end
end

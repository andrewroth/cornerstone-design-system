# frozen_string_literal: true

Rails.application.routes.draw do
  root "pages#home"
  get "form", to: "pages#form"
  get "echo", to: "pages#echo"
  get "morph", to: "pages#morph"
  get "other", to: "pages#other"
end

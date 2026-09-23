# cornerstone-rails

Cornerstone Components for Rails. The gem vendors the browser build of
`@cruglobal/cornerstone-components`, serves it from a Rails engine, and adds layout helpers, thin view
helpers, Turbo handling, an install generator and Capybara helpers for system tests.

The gem version is always the version of Cornerstone Components it vendors: `cornerstone-rails` 0.6.2
serves `@cruglobal/cornerstone-components` 0.6.2.

**Status: pilot.** It lives in the Cornerstone monorepo but is not published to RubyGems. Install it
from git.

## Install

```ruby
# Gemfile
gem "cornerstone-rails", github: "andrewroth/cornerstone-design-system", branch: "rails", glob: "packages/rails/*.gemspec"
```

`glob:` is needed because the gemspec is not at the repository root. To develop against a local clone
without changing the Gemfile, point Bundler at it (the Gemfile entry must name a `branch:` for this):

```sh
bundle config local.cornerstone-rails ~/Development/cornerstone
```

Undo it with `bundle config unset local.cornerstone-rails`. A plain path also works for a one-off
trial: `gem "cornerstone-rails", path: "~/Development/cornerstone/packages/rails"`.

Then run the generator:

```sh
bin/rails generate cornerstone:install
```

It adds `<%= cornerstone_head_tags %>` before `</head>` and `class="<%= cornerstone_html_class %>"` to
`<html>` in `app/views/layouts/application.html.erb`, and writes `config/initializers/cornerstone.rb`.
If `<html>` already has a class, it tells you to add the helper yourself. Running it twice changes
nothing.

No npm install, no `package.json`, no import map pin and no copy into `public/` is needed. If the app
followed the manual setup in the Rails guide, delete that copy.

## Layout

```erb
<html class="<%= cornerstone_html_class %> h-full">
  <head>
    <%= cornerstone_head_tags %>
  </head>
```

`cornerstone_head_tags(theme:, color_scheme:, turbo:, native:, eager:)` renders, in this order:

- the stylesheets (see below);
- for `color_scheme: :auto`, a small inline script that sets `cs-dark` or `cs-light` on `<html>` from
  the operating system setting and follows changes to it;
- the gem's module, which loads the library when the page needs it and handles Turbo (see below);
- with `eager: true` only, the autoloader, `cornerstone.loader.js`, so the library loads on every page.

Which stylesheets it links:

| `native:` | Files |
| --- | --- |
| `true` (default) | `styles/cornerstone.css`, which imports `layers.css`, `native.css`, `utilities.css` and `themes/cru.css`; plus `styles/themes/<theme>.css` for a theme it does not import |
| `false` | `styles/layers.css`, `styles/utilities.css` and `styles/themes/<theme>.css` |

`native.css` styles plain HTML elements: body text, every `<button>`, `<a>`, `<details>`, form field
and table. Use `native: false` in an app whose own CSS (Tailwind, DaisyUI, Bootstrap) styles those
elements. The components do not need it: they get their tokens from the theme, and `utilities.css`
carries the `cs-cloak` rule. In an app with its own cascade layers, render the head tags before the
app's stylesheet, so Cornerstone's layers are declared first and rank below the app's.

Each stylesheet and script with a URL carries `data-turbo-track="reload"`, so a gem upgrade forces a
full page load. Scripts get the request's CSP nonce when the app has a content security policy.

`cornerstone_html_class(theme:, color_scheme:, cloak:)` returns the classes for `<html>`, for example
`"cs-theme-cru cs-light cs-cloak"`. `cs-cloak` hides the page on its first load until its components are
registered, for two seconds at most; the loader removes it. On a page with no `cs-*` element the gem's
module removes it as soon as it runs, because there is nothing to wait for. The rule hides the page
while any custom element on it is undefined, not only a `cs-*` one (a `turbo-frame` counts), which is
why it is removed rather than left to time out.

Both helpers take their defaults from `config.cornerstone`:

| Option | Default | Values |
| --- | --- | --- |
| `theme` | `:cru` | a stylesheet in `vendor/cornerstone/styles/themes`: `:cru`, `:default` in 0.6.2 |
| `color_scheme` | `:light` | `:light`, `:dark`, `:auto` |
| `cloak` | `true` | |
| `turbo` | `true` | |
| `native` | `true` | `false` leaves out `native.css` |
| `eager` | `false` | `true` loads the library on every page |
| `path_prefix` | `"/cornerstone"` | the version is appended |

An unknown theme raises. No FamilyLife theme ships in 0.6.2; when one does, `theme: :familylife` will
work without a gem change beyond the version bump.

Turbo Drive does not change `<html>` attributes other than `lang` and `dir` on a visit. The classes
from the first page loaded stay for the rest of the session, so a page that needs a different theme
needs a full load (for example, a link with `data-turbo="false"`).

## View helpers

Each helper renders one `cs-*` element. Every option it does not name is passed through as an
attribute: keyword names are dasherized (`with_clear:` becomes `with-clear`), `true` renders the
attribute with its own name as the value (`with-clear="with-clear"`, `selected="selected"`), and
`false` or `nil` leaves it out. `data:`, `aria:` and `class:` behave as they do in `tag`. `true` and
`false` matter here: `pill="false"` would turn a Lit boolean *on*.

Rails' tag builder already renders the HTML booleans it knows (`selected`, `disabled`, `checked`,
`open` and others) as `name="name"`, whatever the value, so the gem renders every boolean that way
rather than two different ways. HTML allows both forms, and a component reads only whether the
attribute is there. When a component sets one of these itself, it writes `name=""`.

```ruby
cs_tag(name, content = nil, **attributes, &block)  # any element: cs_tag(:card), cs_tag("cs-card")
cs_button(content = nil, start_icon: nil, end_icon: nil, **attributes, &block)
cs_icon(name, **attributes)                        # give label: when the icon carries meaning
cs_badge(content = nil, **attributes, &block)
cs_callout(content = nil, icon: nil, **attributes, &block)
cs_dialog(content = nil, footer: nil, **attributes, &block)
cs_tooltip(content, for: "id", **attributes)       # or with a block, which it wraps in an anchor
cs_tree(**attributes, &block)
cs_tree_item(content = nil, **attributes, &block)
cs_split_panel(start_content = nil, end_content = nil, **attributes, &block)
```

```erb
<%= cs_button "Save", variant: :brand, type: :submit, start_icon: "check" %>
<%= cs_badge "New", variant: :success, pill: true %>
<%= cs_callout "Saved.", variant: :success, icon: "check_circle" %>

<%= cs_dialog label: "Delete project?", id: "confirm", footer: cs_button("Delete", variant: :danger) do %>
  This cannot be undone.
<% end %>

<%= cs_tooltip "Waiting on two references" do %><%= cs_badge "Submitted" %><% end %>

<%= cs_tree selection: :leaf do %>
  <%= cs_tree_item "Documents", expanded: true do %>
    <%= cs_tree_item "notes.txt" %>
  <% end %>
<% end %>

<%= cs_split_panel render("nav"), render("detail"), position: 30 %>

<%= cs_tag :input, label: "Email", name: "user[email]", type: :email, required: true %>
```

Writing the `cs-*` tags directly in ERB is just as good; the helpers exist for the boolean handling
and for code that builds attributes in Ruby.

Form controls are form-associated custom elements. A `cs-input name="user[email]"` inside a `<form>`
submits like a native input; the system tests submit one of each control this way. `form_with`
builders do not know about them yet, so write the element with `name:` yourself.

## How the files are served

Propshaft cannot serve this library. It renames every file with a digest but does not rewrite
JavaScript import specifiers, so the loader's relative `./chunks/chunk.*.js` imports all 404 and the
loader never runs. The engine therefore serves the vendored files itself, with a Rack middleware ahead
of Rails' logger:

- URL: `/cornerstone/<version>/…`, for example `/cornerstone/0.6.2/cornerstone.loader.js`. Files keep
  their real names, so relative imports resolve.
- Headers: `cache-control: public, max-age=31536000, immutable`, because a new release is a new URL;
  `access-control-allow-origin: *`, so the modules also load from an asset host or CDN
  (`config.asset_host` is honoured).
- Content types from Rack: `text/javascript` and `text/css`.
- Compression: most `.js` and `.css` files have a brotli (`.br`) and a gzip (`.gz`) copy beside
  them. The middleware sends the best one the request's `Accept-Encoding` allows, with
  `content-encoding` and `vary: accept-encoding`, and the file as is otherwise. Nothing is compressed
  per request.
- Only `GET` and `HEAD`. Anything else under the prefix is a 405, and a missing file is a 404 without
  a cache header.

The one file the gem adds, its Turbo handling, is served next to the library under a name that
includes a digest of its contents, so a gem-only change is never hidden by a cached copy.

### What is vendored

`vendor/cornerstone/` holds the runtime part of the package's bundled build, unmodified: 574 files,
2.0 MB (about 390 KB gzipped). The full `dist/bundled` directory is 1,116 files and 14 MB.

Kept: `cornerstone.loader.js`, `cornerstone.js`, the content-hashed `chunks/`, each component's module
under `components/`, the public `events/`, `translations/` and `utilities/` modules, the CSS under
`styles/`, and the package's `LICENSE.md` and `NOTICE`.

Dropped: TypeScript declarations and sources, the React wrappers, the SSR build and loader, the agent
files (`skills/`, `llms.txt`), the JSON manifests, and `cornerstone.all.js`. The build contains no
source maps. Nothing in the kept files imports a dropped one; the system tests check that a page
loads with no failed request.

The vendored files are committed. A gem installed from git runs no build step, so the files must be
in the repository. The same goes for the compressed copies, which `rake cornerstone:vendor` writes
after it copies the files (`rake cornerstone:compress` writes them again on their own): 572 `.br`
files, 456 KB, and 567 `.gz` files, 542 KB, so about 1 MB more in the repository. A copy is kept only
when it is smaller than its file. A test fails when a copy is missing for a file over 1 KB or does
not decompress to its file.

`vendor/cornerstone/manifest.json` records the version, the npm integrity hash, and the file count.

## Loading on demand

`cornerstone.loader.js` also re-exports the library's utilities, so it imports 17 chunks before it
looks at the page: the animation catalogue (40 KB), the system and brand icon sets (40 KB), the
localizer, the English strings and the autoloader. Linked from every page, that is about 104 KB of
JavaScript on a page with no component.

So the head tags link only the gem's module. It imports the loader the first time the page has a
`cs-*` element or an element with `data-cs-preload`: when the page starts, when one is inserted (a
Turbo Drive render, a frame load, a Turbo Stream, any script; a `MutationObserver` watches until the
library is loaded), or when Turbo Drive is about to render one. From then on the loader registers
each element as it appears, as before. A page that creates `cs-*` elements inside its own shadow
roots, where the observer cannot see them, can import `loadCornerstone` from the gem's module and call
it, or set `eager: true`.

Measured in the dummy app, headless Chrome, empty cache, requests and bytes under `/cornerstone/`
(bytes as sent, and uncompressed):

| Page | Before | After |
| --- | --- | --- |
| no components (`/plain`) | 41 requests (20 JS, 21 CSS), 321 KB | 22 requests (1 JS, 21 CSS), 29 KB (220 KB uncompressed) |
| `cs-split-panel` and `cs-tree` (`/tree`) | 86 requests, 481 KB | 85 requests, 90 KB (482 KB uncompressed) |

The 21 CSS requests are `cornerstone.css` and the files it imports. `native: false` drops
`native.css` (37 KB).

## Turbo

### Drive

Turbo Drive swaps in the new `<body>` before the components in it are registered, so they paint
unstyled for a frame or two. The gem holds each render whose incoming body has a `cs-*` element
until those components are registered, for two seconds at most, loading the library first if the
page did not need it before. This is what Cornerstone's `preventTurboFouce()` does, except that a
render with no `cs-*` element is not held. System tests check that a component first used on the
second page is registered when Turbo renders it, also when the first page had no component.
`cs-cloak` covers the first load, which Turbo is not involved in.

### Morph refreshes

With `<meta name="turbo-refresh-method" content="morph">`, a refresh makes the live page match the
new server HTML instead of replacing it. Idiomorph never enters a shadow root, so a component's
internal DOM is safe. Its host attributes are not. Components write some of their own: `open` on an
open `cs-dialog`, and reflected defaults such as `variant="neutral"` and `size="m"`. The server HTML
does not contain them, so the morph removes them.

Measured in this gem's system tests, without the handling, one refresh:

- closes an open `cs-dialog`, firing `cs-hide` and `cs-after-hide`;
- removes each component's reflected defaults, which the component then puts back after a re-render.

The checked state of a `cs-checkbox` and the text typed into a `cs-input` survived, because neither
is an attribute.

The gem's rule: **on a `cs-*` element, a morph applies only the attributes the server changed between
its previous render and this one.** An attribute the server rendered the same way both times is left
as the client has it. So the dialog stays open, but a `disabled` the server stops rendering is still
removed and a changed `placeholder` still updates. The gem records what the server sent on the first
load, on each Drive render and on each frame render.

What the rule does not cover:

- An element with no recorded server render, such as one inserted by a Turbo Stream or created in
  JavaScript, gets Turbo's default behaviour.
- The server cannot close a dialog by leaving `open` out if it also left it out last time. Close it
  from JavaScript, or render `open` and then remove it.
- Light DOM children are still morphed to the server HTML. A component that moves or adds light DOM
  children of its own can lose them.
- Idiomorph matches elements by `id`. A stateful element without a stable `id` can be removed and
  re-created instead of morphed, which resets its state. Give such elements an `id`, or
  `data-turbo-permanent` to skip them entirely.
- Pages restored from Turbo's cache are clones of an earlier live page, so their recorded attributes
  include the component-written ones. A morph right after a restore can apply less than it should.

Turn the handling off with `config.cornerstone.turbo = false`; the Drive part goes with it. The gem's
module still loads, for the loading on demand, with `?turbo=0` in its URL.

## Stimulus

Cornerstone's events are ordinary DOM events. Form controls emit native names (`change`, `input`),
so `data-action="change->filters#apply"` works on a `cs-select` as on a `select`. Read
`event.target.value`.

## Testing

A `cs-*` form control keeps its native `<input>` in a shadow root, where Capybara's `fill_in`, `check`
and `select` cannot reach it. The gem ships helpers that find the host element and act on it as a user
would. They are opt-in:

```ruby
# spec/rails_helper.rb or spec/support/cornerstone.rb
require "cornerstone_rails/testing"

RSpec.configure do |config|
  config.include CornerstoneRails::Testing::CapybaraHelpers, type: :system
end

# Minitest
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include CornerstoneRails::Testing::CapybaraHelpers
end
```

```ruby
cs_fill_in "Email", with: "someone@example.com"    # cs-input, cs-textarea, cs-number-input
cs_select "Canada", from: "Country"                 # cs-select; option text or value
cs_check "I agree to the terms"                     # cs-checkbox, cs-switch
cs_uncheck "Email me"
cs_choose "Yearly", from: "Plan"                    # cs-radio in a cs-radio-group
cs_click_button "Save"                              # cs-button
cs_field_value "Email"                              # => "someone@example.com" (checked for boxes)
cs_find_control("cs-input", "Email")                # the host element, for anything else
```

A locator matches the host's `label`, `name`, `id` or `aria-label`, or the text of a `slot="label"`
child. Checkboxes, switches, radios and buttons also match their own text. Each helper waits, as
Capybara's finders do, for the element to be registered. They need a driver that can enter shadow
roots: Selenium with Capybara 3.37 or later.

For `cs-tree` and `cs-split-panel`:

```ruby
cs_expand_tree_item "Photos"                        # clicks the expand button; nothing if open
cs_collapse_tree_item "Documents"
cs_select_tree_item "beach.jpg"                     # clicks the label; nothing if selected
assert_cs_tree_item "Photos", expanded: true        # waits, then raises Capybara::ExpectationNotMet
assert_cs_tree_item "beach.jpg", selected: true, expanded: false
has_cs_tree_item?("Photos", expanded: true)         # true or false, for RSpec's expect
cs_find_tree_item("Photos")                         # the cs-tree-item element

cs_set_split_panel_position 30                      # percent; the panel emits cs-reposition
cs_set_split_panel_position 30, "sidebar"           # by id or aria-label when there are several
cs_split_panel_position                             # => 30.0
```

A tree item's locator is its `id`, its `aria-label`, or its label text: a text node directly inside
the item, or an element in its label whose whole text is the locator (`<a>Ohio Valley</a>` matches
"Ohio Valley"). Text inside a nested item belongs to that item. An item in a closed branch is not
visible, so expand the branch first or pass `visible: :all`. What a selecting click does depends on
the tree's `selection`: in `leaf` mode a click on a branch opens or closes it, and in the multiple
modes it toggles. `cs_select_tree_item` clicks with Selenium's action API, so it needs Selenium.

There are no RSpec matchers yet. Use `expect(cs_field_value("Email")).to eq("…")`, or
`assert_cs_tree_item`, which raises the same error as Capybara's `assert_selector`.

## Versioning and updating

The monorepo locks `@cruglobal/cornerstone-design-system` and `@cruglobal/cornerstone-components` to
one version number through a changesets `fixed` group. The gem follows that number by hand: after a
release, from `packages/rails`,

```sh
VERSION=0.7.0 bundle exec rake cornerstone:vendor   # downloads the tarball, checks its integrity, compresses
# then set VERSION in lib/cornerstone_rails/version.rb
bundle exec rake test
```

A test fails when `lib/cornerstone_rails/version.rb` and `packages/components/package.json` disagree.
`TARBALL=path/to/package.tgz` vendors a local tarball instead of downloading one.

`packages/rails` has no `package.json`. npm workspaces and changesets both find packages by
`packages/*/package.json`, so they do not see the gem, and no changeset is needed for it.

## Developing

Ruby 3.4.9 (see `.ruby-version`). Tests use a dummy app in `test/dummy` with Propshaft and
turbo-rails. The `brotli` gem in the Gemfile is for `rake cornerstone:compress` and the tests; the gem
itself does not depend on it.

```sh
bundle install
bundle exec rake test          # helpers, generator, served files, vendored files
bundle exec rake test:system   # headless Chrome: rendering, loading, Drive, test helpers, morph
```

## Known gaps

- Not published to RubyGems.
- `form_with` builder methods for `cs-*` controls do not exist.
- No RSpec matchers.
- The morph handling is the gem's own rule, not something Cornerstone Components or Turbo provide.
  See the limits above.
- `cornerstone.css` reaches its rules through 20 nested `@import`s, one request each. Flattening them
  into one file at vendor time would remove most of the CSS requests.
- The gem's own module is not precompressed (it is about 7 KB).
- Icons still come from the jsDelivr CDN by default. `setIconPath` for self-hosted icons is not
  wired up.
- `cornerstone.all.js` is not vendored. An app that wants one file through Propshaft still copies
  it by hand, as the Rails guide describes.

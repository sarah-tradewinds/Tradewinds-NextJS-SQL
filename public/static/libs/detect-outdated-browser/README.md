# `detect-outdated-browser`

## Note about Next.js

There is no way to provide outdated browser support other than using external JS/CSS files, because everything in `src/components/Head.tsx` is bundled by Next.js,
and ends up bundled together, which completely fails to be loaded by outdated browsers such as IE11 which may not be able to parse the source code.

Because of this, we load an external JS file and CSS file (async if possible for perfs) so that it doesn't get bundled with the rest of the source code, but is executed on its own instead.

## Unused

This module is an experiment and has been **disabled**.

Basically, browser detection works fine, **unless running on a mobile device**,
where apps (facebook, linkedin, medium) display false-positive warnings about **embedded browsers** if they're too old,
and the user can't do anything about it (e.g: Facebook Chrome, Linkedin Chrome, etc.) because those aren't managed by the user but by the vendor instead.

The code has been kept for now, until a better solution comes to light, but it is not being used by the app.

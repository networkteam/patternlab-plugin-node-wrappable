![license](https://img.shields.io/github/license/networkteam/patternlab-plugin-node-wrappable.svg)
[![npm](https://img.shields.io/npm/v/plugin-node-wrappable.svg)](https://www.npmjs.com/package/plugin-node-wrappable)

# Wrapper Plugin for Pattern Lab Node

The Wrapper Plugin allows Pattern Lab Node users to add a wrapper element with class around patterns when shown in the single preview but still allow re-usability in other patterns without the wrapper element.

## Installation

To add the Wrapper Plugin to your project using [npm](http://npmjs.com/) type:

    npm install plugin-node-wrappable --save

Or add it directly to your project's `package.json` file and run `npm install`

During installation, the plugin is added as a key to the `plugins` object in your main Pattern Lab project's `patternlab-config.json` file

> If you don't see this object, try running `npm run postinstall` within the root of your project.

## Configuration

Post-installation, you will see the following in your `patternlab-config.json`:

Example:

```
"plugins": {
  "plugin-node-wrappable": {
    "enabled": true,
    "initialized": false
  }
}
```

## Additional Markdown front matter

With the Wrapper Plugin installed, you can now set an additional `wrap_in` attribute in the pattern Markdown front matter.

For example, if we want to preview a button pattern with a gray wrapper, you have to add the attribute to `00-button.md`:

```
---
title: Button
wrap_in: gray
---
```

This results in an additional `<div class="sg-wrapper-gray">` element around the rendered pattern - but only in the standalone view and not if this pattern is included as an partial in other patterns.

## Enabling / Disabling the Plugin

After install, you may manually enable or disable the plugin by finding the `plugin-node-wrappable` key within your main Pattern Lab project's `patternlab-config.json` file and setting the `enabled` flag. In the future this will be possible via CLI.

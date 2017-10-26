'use strict';

const pluginName = 'plugin-node-wrappable';

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const EOL = require('os').EOL;

function writeConfigToOutput(patternlab, pluginConfig) {
  var pluginConfigPathName = path.resolve(patternlab.config.paths.public.root, 'patternlab-components', 'packages');
  try {
    fs.outputFileSync(pluginConfigPathName + '/' + pluginName + '.json', JSON.stringify(pluginConfig, null, 2));
  } catch (ex) {
    console.trace(pluginName + ': Error occurred while writing pluginFile configuration');
    console.log(ex);
  }
}

function onPatternIterate(patternlab, pattern) {
  const patternData = JSON.parse(pattern.patternData);
  if (patternData.extraOutput && patternData.extraOutput.wrap_in) {
    pattern.patternPartialCode = '<div class="sg-wrapper-' + patternData.extraOutput.wrap_in + '">' + pattern.patternPartialCode + '</div>';
  }
}

/**
 * Define what events you wish to listen to here
 * For a full list of events - check out https://github.com/pattern-lab/patternlab-node/wiki/Creating-Plugins#events
 * @param patternlab - global data store which has the handle to the event emitter
   */
function registerEvents(patternlab) {
  //register our handler at the appropriate time of execution
  patternlab.events.on('patternlab-pattern-write-begin', onPatternIterate);
}

/**
* A single place to define the frontend configuration
* This configuration is outputted to the frontend explicitly as well as included in the plugins object.
*
*/
function getPluginFrontendConfig() {
  return {
    'name':'pattern-lab\/' + pluginName,
    'templates':[],
    'stylesheets':[],
    'javascripts':[],
    'onready':'',
    'callback':''
  };
}

/**
* The entry point for the plugin. You should not have to alter this code much under many circumstances.
* Instead, alter getPluginFrontendConfig() and registerEvents() methods
  */
function pluginInit(patternlab) {

  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  //setup listeners if not already active. we also enable and set the plugin as initialized
  if (!patternlab.config.plugins) {
    patternlab.config.plugins = {};
  }

  //attempt to only register events once
  if (patternlab.config.plugins[pluginName] !== undefined &&
     patternlab.config.plugins[pluginName].enabled &&
     !patternlab.config.plugins[pluginName].initialized) {

    //register events
    registerEvents(patternlab);

    //set the plugin initialized flag to true to indicate it is installed and ready
    patternlab.config.plugins[pluginName].initialized = true;
  }

}

module.exports = pluginInit;

// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  run = require('bespoke-run'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  run = require('bespoke-run'),
  camera = require('bespoke-camera'),
  broker = 'ws://test.mosca.io:80',
  //broker = 'ws://localhost:3000',
  client = require('mqtt').connect(broker),
  forms = require('bespoke-forms');

client.on('connect', function() {
  client.subscribe('$SYS/#/publish/received');
});

client.on('message', function(topic, payload) {
  var el = document.querySelector("#broker-stats");
  if (el && topic.indexOf('publish/received') >= 0) {
    el.textContent = "Total messages " + payload.toString();
  }
})

// Bespoke.js
bespoke.from('article', [
  classes(),
  keys(),
  touch(),
  run(),
  camera({ width: "320px" }),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  hash(),
  progress(),
  forms()
]);

// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
require('prism');

var fakeMqtt = Object.create(require('mqtt'));

fakeMqtt._connect = fakeMqtt.connect;
fakeMqtt.connect = function() {
  return this._connect(broker);
};

window.mqtt = fakeMqtt;


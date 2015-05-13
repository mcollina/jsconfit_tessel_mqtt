var tessel = require('tessel')
var mqtt = require('mqtt').connect('mqtt://test.mosca.io?clientId=YOURNAME')
console.log('starting')
var led1 = tessel.led[0].output(0)

mqtt.on('connect', function () {
  console.log('we are connected!')

  mqtt.publish('tessel/status', 'online')
})

tessel.button.on('press', function (time) {
  mqtt.publish('tessel/button', 'pressed ' + time)
  console.log('the button was pressed!', time)
})

tessel.button.on('release', function (time) {
  mqtt.publish('tessel/button', 'released ' + time)
  console.log('button was released', time);
})

console.log('trying to connect')

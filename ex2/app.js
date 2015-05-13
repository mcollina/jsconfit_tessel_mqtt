var tessel = require('tessel')
var mqtt = require('mqtt').connect('mqtt://test.mosca.io?cliendId=YOURNAME')
console.log('starting')
var led1 = tessel.led[0].output(0)

mqtt.on('connect', function () {
  console.log('we are connected!')

  mqtt.subscribe('tessel/led', function (err) {
    if (err) { throw err }
  })

  mqtt.publish('tessel/status', 'online')
})

mqtt.on('message', function (topic, payload) {
  payload = payload.toString()

  console.log('got message', payload)

  if (payload === 'on') {
    led1.output(true)
  } else {
    led1.output(false)
  }
})

console.log('trying to connect')

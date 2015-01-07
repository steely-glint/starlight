/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);
var relaylib = require('relay-mono');

var relay = relaylib.use(tessel.port['B']);
relay.on('ready', function relayReady() {
    console.log('Ready! Toggling relays on clap.');


    ambient.on('ready', function() {
        ambient.setSoundTrigger(0.1);

        ambient.on('sound-trigger', function(data) {
            console.log("Something happened with sound: ", data);
            relay.toggle(2, function(err) {
                if (err)
                    console.log("Err toggling 2", err);
            });
            // Clear it
            ambient.clearSoundTrigger();

            //After 1.5 seconds reset sound trigger
            setTimeout(function() {

                ambient.setSoundTrigger(0.1);

            }, 1500);

        });
    });
    relay.on('latch', function(channel, value) {
        console.log('latch on relay channel ' + channel + ' switched to', value);
    });
});
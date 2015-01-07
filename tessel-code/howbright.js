/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);
// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var gpio = tessel.port['GPIO']; // select the GPIO port
var pins = [gpio.pin['G1'], gpio.pin['G2'], gpio.pin['G3'], gpio.pin['G4'], gpio.pin['G5']];
console.log("I'm blinking! (Press CTRL + C to stop)");
for (var i in pins) {
    pins[i].pull('pullDown');
}
ambient.on('ready', function() {
    setInterval(function() {
        ambient.getLightLevel(function(err, data) {
            console.log("data =" + data);
            console.log("err =" + err);

            var pinv =  Math.floor(data * 5.0);
            console.log("data =" + pinv);

            for (var i in pins) {
                var ov = 0;
                var diff = pinv -parseInt(i);
                if (diff >= 0) {
                    ov = 1;
                }
                pins[i].output(ov);
            }
        })

        // Toggle the led states
    }, 500);
});

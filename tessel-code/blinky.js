var tessel = require('tessel');

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var gpio = tessel.port['GPIO']; // select the GPIO port
var pins = [gpio.pin['G1'],gpio.pin['G2'],gpio.pin['G3'],gpio.pin['G4'],gpio.pin['G5']];
    console.log("I'm blinking! (Press CTRL + C to stop)");
var c = 0;
for (var i in pins) {
    pins[i].pull('pullDown');
}
setInterval(function () {
    var pinv = c++ % 5;
    for (var i in pins) {
       var ov = 0;
       var diff = pinv - parseInt(i);
       if (diff == 0){ ov = 1; }
       pins[i].output(ov);
    }
    // Toggle the led states
}, 500);


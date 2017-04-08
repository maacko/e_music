window.onload = function () {
    /*
     * This script represents a simple synthesizer using an oscillator to
     * produce sound. Its pitch can be manipulated by moving the mouse over the
     * 'pitch_box' element.
     */

    //reference to the audio api
    var audio_context = window.AudioContext || window.webkitAudioContext;

    //creates a new context - you can think of this as instance of the audio engine
    var context = new audio_context ();

    /*
     * Creates a new oscillator -- I had it before as new
     * context.createOscillator but createOscillator isn't a constructor.
     */
    var oscillator = context.createOscillator();

    /*
     * Calls on the oscillator to connect to the context's audio output
     * I had previous context.connect(context.destination) -- it made no sense to
     * tell the context to connect to itself.
     */
    oscillator.connect(context.destination);

    //We need to start the oscillator to hear it
    oscillator.start();

    //Stops the oscillator after 5000 ms == 5 seconds
    /*setTimeout(function () {
        oscillator.stop ();
    },5000);*/

    //Event functions for page element
    var pitch_box = document.getElementById('pitch_box');
    var stop_button = document.getElementById('stop_box');

    pitch_box.onmousemove = function (event) {
        oscillator.frequency.value = (event.clientX + event.clientY);
    };

    stop_box.onclick = function () {
        console.log('stop');
        oscillator.stop();
    };
};

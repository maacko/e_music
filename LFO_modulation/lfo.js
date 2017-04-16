(function () {
    var on = false;
    var audio_context = window.AudioContext || window.webkitAudioContext;
    var context = new audio_context();
    var osc = context.createOscillator();
    var lfo = context.createOscillator();
    var gain = context.createGain();
    var osc_gain = context.createGain();

    lfo.frequency.value = 10;
    gain.gain.value = 0;
    osc_gain.gain.value = 0;

    lfo.connect(gain)
    gain.connect(osc.frequency)
    //to control osc's volume
    osc.connect(osc_gain);
    osc_gain.connect(context.destination)

    lfo.start();
    osc.start();

    var start = function () {
        /* You can't start an oscillator more than once. Once it's started and
         * stopped, it can't be started again. We have to use the gain to toggle
         * the sound
        lfo.start();
        osc.start();
        */
        gain.gain.value = 200;
        //cool noisy sounds when you increase the gain from 1
        osc_gain.gain.value = 1;
    };

    var stop = function () {
        /*
        lfo.stop();
        osc.stop();
        */
        gain.gain.value = osc_gain.gain.value = 0;
    };

    window.addEventListener('load', function () {
        var control_button = document.getElementById('control_button');
        var modulator = document.getElementById('modulator');
            /*
        stop_button.onclick = function () {
            if (on === false) {
                console.log('starting');
                on = true;
                start();
            }
            else {
                console.log('stopping');
                on = false;
                stop();
            }
        };
        */
        control_button.addEventListener('click', function () {

            if (on === false) {
                on = true;
                start();
            }
            else {
                on = false;
                stop();
            }
        })
        modulator.onmousemove = function (event) {
            lfo.frequency.value = event.clientX;
        }
    });
})()

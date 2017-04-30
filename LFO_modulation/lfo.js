(function start () {
    var on = false;

    function setupLFO () {
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

        return (
        {
            play: function () {
            /* You can't start an oscillator more than once. Once it's started and
            * stopped, it can't be started again. We have to use the gain to toggle
            * the sound
            lfo.start();
            osc.start();
            */
                gain.gain.value = 200;
            //cool noisy lo-fi sounds when you increase the gain from 1
                osc_gain.gain.value = 1;
            },
            stop: function () {
            /*
            lfo.stop();
            osc.stop();
            */
                gain.gain.value = osc_gain.gain.value = 0;
            },

            frequency: function (value){
                lfo.frequency.value = value;
            }
        });
    }

    function setupControls () {
        var changeIcon = function ( icon,
                                    height,
                                    width,
                                    border_top,
                                    border_bottom,
                                    border_left,
                                    background_color)
        {
            icon.style.height = height;
            icon.style.width = width;
            icon.style.borderTop = border_top;
            icon.style.borderBottom = border_bottom;
            icon.style.borderLeft = border_left;
            icon.style.background = background_color;
        };
        var changeToPlayIcon = function (icon) {
            changeIcon(icon, "0", "0", "20px solid transparent",
                "20px solid transparent", "40px solid white", "none");
        };
        var changeToStopIcon = function (icon) {
            changeIcon(icon, "40px", "40px", "", "", "", "white");
        };

        return (
            {
                changeToPlay: changeToPlayIcon,
                changeToStop: changeToStopIcon
            }
        );
    }

    window.addEventListener('load', function () {
        var control_button = document.getElementById('control_button');
        var control_icon = document.getElementById('control_icon');
        var modulator = document.getElementById('modulator');

        var controls = setupControls();
        var lfo_controls = setupLFO();

        control_button.addEventListener('click', function () {

            if (on === false) {
                on = true;
                controls.changeToStop(control_icon);
                lfo_controls.play();
            }
            else {
                on = false;
                controls.changeToPlay(control_icon);
                lfo_controls.stop();
            }
        });

        modulator.onmousemove = function (event) {
            lfo_controls.frequency(event.clientX);
        };
    });

})();

(function () {
    var on = true;
    window.addEventListener('load', function () {
        var control_button = document.getElementById('control_button');
        var control_icon = document.getElementById('control_icon');

        var changeIcon = function (height,
                                    width,
                                    border_top,
                                    border_bottom,
                                    border_left,
                                    background_color)
        {
            control_icon.style.height = height;
            control_icon.style.width = width;
            control_icon.style.borderTop = border_top;
            control_icon.style.borderBottom = border_bottom;
            control_icon.style.borderLeft = border_left;
            control_icon.style.background = background_color;
        };
        var changeToStartIcon = function () {
            changeIcon("0", "0", "20px solid transparent",
                "20px solid transparent", "40px solid white", "none");
        };
        var changeToStopIcon = function () {
            changeIcon("40px", "40px", "", "", "", "white");
        };
            /*
        stop_button.onclick = function () {
            console.log('click');
            if (on === true) {
                on = false;
                changeToStopIcon();
            }
            else {
                on = true;
                changeToStartIcon();
            }
        };
        */
        control_button.addEventListener('click', function () {
            console.log('click');
            if (on === true) {
                on = false;
                changeToStopIcon();
            }
            else {
                on = true;
                changeToStartIcon();
            }
        })
    });
})();


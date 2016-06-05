"use strict";

(function ()
{
    var createCookie = function (name, value, days)
    {
        if (days)
        {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else
            var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    var readCookie = function (name)
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    var eraseCookie = function (name)
    {
        createCookie(name, "", -1);
    };

    var loadScript = function (url, callback)
    {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    };

    var warning64 = function ()
    {
        $("html").css("overflow", "hidden");
        var $div = $("<div id='warning64'><p>为了响应<abbr title='中国共产党'>党和政府</abbr>的号召，本站暂时<a href='https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E4%BA%92%E8%81%94%E7%BD%91%E7%BB%B4%E6%8A%A4%E6%97%A5'>停机维护</a>。</p></div>");
        $div.css({
            position: "fixed",
            color: "white",
            "background-color": "black",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            "z-index": 99999 + 1,
            "text-align": "center"
        });
        $div.append($("<p>预计6月5号回来。</p>"));

        var $image = $("<img alt='民主烈士永垂不朽，八九民运浩气长存' src='https://upload.wikimedia.org/wikipedia/commons/0/02/Candlelight_Vigil_for_June_4_Massacre_2009.JPG'/>");
        $image.css({ height: "70%" });

        $div.append($image);

        var $ignoreButton = $("<button>忽略事件</button>");
        $ignoreButton.click(function ()
        {
            $("#warning64").detach();
            createCookie("warning64ignore", true, 1);
            $("html").css("overflow","");
        });
        $div.append($("<div>").append($ignoreButton));
        $(document.body).append($div);
    };


    var now = new Date();
    if (now.getMonth() != 6 - 1)
        return;

    if (readCookie("warning64ignore") === "true")
        return;

    if (now.getDate() === 4)
    {
        if ($ === undefined)
        {
            loadScript("https://code.jquery.com/jquery-2.2.4.min.js", warning64);
        }
        else
            warning64();
    }
})();
(function ()
{
    var loaded = false;
    ga(function () { loaded = true; });
    setTimeout(function ()
    {
        if (!loaded)
        {
            jQuery.getScript("/scripts/js.cookie-2.1.2.min.js", function ()
            {
                if (!Cookies.get("gaWarning"))
                {
                    var message = "可能由于您的广告屏蔽插件，google的访客分析脚本（https://www.google-analytics.com/analytics.js）未能载入。\n\n"
                                 + "本站用此脚本了解访客的浏览器版本、地区等信息，并对此优化。如果本站没有了解到您的诉求，可能做出对您不利的决定。\n\n"
                                 + "不论您是否允许访客分析脚本，都欢迎您在评论区提供反馈。\n\n"
                                 + "本提示一个月只出现一次。如果您清除cookie，本提示会重新出现。";
                    alert(message);
                    Cookies.set("gaWarning", true, { expires: 30 });
                }
            });
        }
    }, 2000);
})();
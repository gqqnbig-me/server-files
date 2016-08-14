var counters = {};
var counterStyles = {};

function label(counter, labelName, locale, options)
{
    if (typeof (counters[counter]) === "undefined")
        counters[counter] = 1;
    else
        counters[counter]++;

    if(locale!==undefined )
        counterStyles[counter] = { locale: locale };
    if (options !== undefined)
        counterStyles[counter] = { options:options };

    document.write("<span id='numbering-" + labelName + "'>" + new Number(counters[counter]).toLocaleString(counterStyles[counter].locale, counterStyles[counter].options) + "</span>");
    document.currentScript.remove();
}

function ref(labelName)
{
    var currentElement = document.currentScript;
    document.addEventListener("DOMContentLoaded", function()
    {
        currentElement.insertAdjacentHTML('afterend', "<a href='#numbering-" + labelName + "'>" + document.getElementById("numbering-" + labelName).innerText + "</a>");
        currentElement.remove();
    });
}

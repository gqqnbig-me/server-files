//(function ()
//{
//    "use strict";

//    var jq = document.createElement("script");

//    jq.addEventListener("load", proceed); // pass my hoisted function
//    jq.src = "https://code.jquery.com/jquery-3.1.0.min.js";
//    document.querySelector("head").appendChild(jq);

//    function proceed()
//    {
//        // jQuery load complete, do your magic
//    }
//})();

var counters = {};
var counterStyles = {};
var refToProcess = 0;

function label(counter, labelName, locale, options) {
	if (typeof (counters[counter]) === "undefined")
		counters[counter] = 1;
	else
		counters[counter]++;

	if (locale !== undefined)
		counterStyles[counter] = {locale: locale};
	if (options !== undefined)
		counterStyles[counter] = {options: options};

	document.write("<span id='numbering-" + labelName + "'>" + new Number(counters[counter]).toLocaleString(counterStyles[counter].locale, counterStyles[counter].options) + "</span>");
	document.currentScript.remove();
}

function ref(labelName) {
	var currentElement = document.currentScript;
	refToProcess++;
	document.addEventListener("DOMContentLoaded", function () {
		currentElement.insertAdjacentHTML('afterend', "<a href='#numbering-" + labelName + "'>" + document.getElementById("numbering-" + labelName).innerText + "</a>");
		currentElement.remove();
		refToProcess--;
	});
}

document.addEventListener("DOMContentLoaded", function () {
	let st = document.createElement("style");
	st.textContent = `@keyframes anchorFocus {
  0% { border-color: red; border-width: 3px; border-style: solid;}
  99% { border-color: transparent; border-width: 1px; border-style: solid;}
  100% { }
}

.targetElement, .foo, :target {
	animation:1s anchorFocus; 
}`;

	st.type = "text/css";
	document.head.append(st);


	//https://stackoverflow.com/a/5354536/746461
	function checkVisible(elm, threshold, mode) {
		threshold = threshold || 0;
		mode = mode || 'visible';

		var rect = elm.getBoundingClientRect();
		var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		var above = rect.bottom - threshold < 0;
		var below = rect.top - viewHeight + threshold >= 0;

		return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
	}

	let anchorProcessHandler = setInterval(() => {
		if (refToProcess > 0)
			return;

		clearInterval(anchorProcessHandler);
		$(".entry-content a[href^=\'#']").click(function (event) {
			//不能用this.href，因为它会有完整的url。
			let targetId = this.attributes.href.value.substr(1);
			let targetElement = document.getElementById(targetId);
			let margin = 150; //px
			if (!checkVisible(targetElement, margin)) {
				const y = targetElement.getBoundingClientRect().top + window.pageYOffset;
				window.scrollTo(0, y - margin);
			}


			targetElement.parentElement.classList.add("targetElement");
			setTimeout(() => targetElement.parentElement.classList.remove("targetElement"), 2000);
			event.preventDefault();

		});
	}, 100);
});

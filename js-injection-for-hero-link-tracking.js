var slides = document.querySelectorAll(
	".slick-slide [data-content-type='slide']"
);

// Create copies of the a tags in each slide and append them to the slide
// This accounts changes in link targets and the number of slides
function insertHeroClickTargetsToDOM() {
	for (var i = 0; i < slides.length; i++) {
		var originalATag = slides[i].querySelector("a");

		// Insert the a tag for the CTA
		var ctaButtonLink = originalATag.cloneNode(true);
		ctaButtonLink.classList.add("ctaButtonLink");
		ctaButtonLink.innerHTML = `<p style="visibility: hidden;>Hero slide #${i} card link.</p>`;
		slides[i].appendChild(ctaButtonLink);

		// Insert the a tag for the the card image
		var cardLink = originalATag.cloneNode(true);
		cardLink.classList.add("cardLink");
		cardLink.innerHTML = `<p style="visibility: hidden;>Hero slide #${i} CTA link.</p>`;
		slides[i].appendChild(cardLink);
	}
}

// Position a click target in slides
function positionClickTarget(slideNo, aClass, top, left, width, height, testing = false) {
	// Find the slide of the given number
	var slide = slides[slideNo - 1];

	// Find the a tag in the slide
	var aTag = slide.querySelector(aClass);

	aTag.style.position = "absolute";
	aTag.style.top = "294px";
	aTag.style.left = "641px";
	aTag.style.width = "345px";
	aTag.style.minHeight = "42px !important";
	aTag.style.borderRadius = "21px";

	// Reset the testing styles and apply if testing is enabled this time
	aTag.style.background = "none";
	aTag.style.opacity = "0";
	if (testing) {
		aTag.style.background = "red";
		aTag.style.opacity = "0.5";
	}
}


﻿
var positions = {
    slide1: {
        cta: {
            top: 100;
            left: 200;
        },
        card: {
            top: 50;
            left: 30;
        }
    }
};

// Element where the slick slider is initialized on
var slider = document.querySelector(".pagebuilder-slider");

// Elements with background in each slide
var bgHolders = document.querySelectorAll(".pagebuilder-slide-wrapper");

insertHeroClickTargetsToDOM();
positionClickTarget(1, ".ctaButtonLink");

// Listen for changes in the size and loading, reposition the click targets

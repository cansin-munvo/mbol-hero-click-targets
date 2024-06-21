// Testing mode to enable visible click targets
var testing = true;

// Declare the click targets for each slide
// Define positions for full-sized window
var clickTargetsConfig = {
	slides: [
		{
			clickTargets: [
				{
					class: ".ctaButtonLink",
					top: "294px",
					left: "641px",
					width: "345px",
					height: "42px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 1 CTA link</p>',
				},
				{
					class: ".cardLink",
					top: "294px",
					left: "141px",
					width: "345px",
					height: "42px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 1 card link</p>',
				},
			],
		},
		{
			clickTargets: [
				{
					class: ".ctaButtonLink",
					top: "294px",
					left: "641px",
					width: "345px",
					height: "42px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 2 CTA link</p>',
				},
				{
					class: ".cardLink",
					top: "294px",
					left: "141px",
					width: "345px",
					height: "42px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 2 card link</p>',
				},
			],
		},
		{
			clickTargets: [
				{
					class: ".ctaButtonLink",
					top: "294px",
					left: "641px",
					width: "345px",
					height: "42px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 3 CTA link</p>',
				},
				{
					class: ".cardLink",
					top: "294px",
					left: "141px",
					width: "345px",
					height: "42px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 3 card link</p>',
				},
			],
		},
	],
};

// Get all the slides in the slick slider
var slides = document.querySelectorAll(
	".slick-slide [data-content-type='slide']"
);

function isClickTargetsConfIsValid() {
	// if it doesn't have the slides array, return false
	if (!Array.isArray(clickTargetsConfig.slides)) {
		console.error("clickTargetsConfig.slides array is not found");
		return false;
	}
	if (clickTargetsConfig.slides.length != slides.length) {
		console.error(
			"Number of slide configurations is more than the number of slides"
		);
		return false;
	}
	return true;
}

// Create copies of the a tags in each slide and append them to the slide
// This accounts changes in link targets and the number of slides
// TODO: Read class name and # of click targets from the clickTargetsConfig object
function insertHeroClickTargetsToDOM() {
	for (var i = 0; i < slides.length; i++) {
		var originalATag = slides[i].querySelector("a");

		// Insert the a tag for the CTA
		var ctaButtonLink = originalATag.cloneNode(true);
		ctaButtonLink.classList.add("ctaButtonLink");
		ctaButtonLink.removeAttribute("data-element");
		ctaButtonLink.innerHTML = `<p style="visibility: hidden;>Hero slide #${i} card link.</p>`;
		slides[i].appendChild(ctaButtonLink);

		// Insert the a tag for the the card image
		var cardLink = originalATag.cloneNode(true);
		cardLink.classList.add("cardLink");
		ctaButtonLink.removeAttribute("data-element");
		cardLink.innerHTML = `<p style="visibility: hidden;>Hero slide #${i} CTA link.</p>`;
		slides[i].appendChild(cardLink);
	}
}

// Position a click target in slides
// TODO: Read parameters from the clickTargetsConfig object
function positionClickTarget(slideNo, aClass, top, left, width, height) {
	// Find the slide of the given number
	var slide = slides[slideNo];

	// Find the a tag in the slide
	var aTag = slide.querySelector(aClass);

	aTag.style.position = "absolute";
	aTag.style.top = "294px";
	aTag.style.left = "641px";
	aTag.style.height = "42px";
	aTag.style.width = "345px";
	aTag.style.borderRadius = "21px";

	// Reset the testing styles and apply if testing is enabled this time
	aTag.style.background = "none";
	aTag.style.opacity = "0";
	if (testing) {
		aTag.style.background = "red";
		aTag.style.opacity = "0.5";
	}
}

// Iterate over each slide configuration and position the click target
function positionAllClickTargets() {
	// Loop slides
	slideIndex = 0;
	clickTargetsConfig.slides.forEach(function (slide) {
		// Get the element that has the background image
		var bgHolder = slides[slideIndex].querySelector(
			".pagebuilder-slide-wrapper"
		);
		console.log(bgHolder);

		// Loop click targets
		clickTargetIndex = 0;
		slide.clickTargets.forEach(function (clickTarget) {
			// console.log(clickTarget);
			positionClickTarget(slideIndex, ".ctaButtonLink");
		});
		slideIndex++;
	});
}

window.onload = function (e) {
	if (isClickTargetsConfIsValid()) {
		insertHeroClickTargetsToDOM();
		positionAllClickTargets();
	}
};

// Listen for changes in the size and loading, reposition the click targets

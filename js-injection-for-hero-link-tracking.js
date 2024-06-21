// Testing mode to enable visible click targets
var testing = true;
var slides;

// Declare the click targets for each slide
// Define positions for full-sized window
var clickTargetsConfig = {
	slides: [
		{
			backgroundImage: {
				height: "410px",
				width: "1343px",
			},
			clickTargets: [
				{
					className: "ctaButtonLink",
					top: "294px",
					left: "641px",
					width: "345px",
					height: "42px",
					borderRadius: "21px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 1 CTA link</p>',
				},
				{
					className: "cardLink",
					top: "294px",
					left: "141px",
					width: "345px",
					height: "42px",
					borderRadius: "21px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 1 card link</p>',
				},
			],
		},
		{
			backgroundImage: {
				height: "410px",
				width: "1343px",
			},
			clickTargets: [
				{
					className: "ctaButtonLink",
					top: "194px",
					left: "641px",
					width: "345px",
					height: "42px",
					borderRadius: "21px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 2 CTA link</p>',
				},
				{
					className: "cardLink",
					top: "194px",
					left: "141px",
					width: "345px",
					height: "42px",
					borderRadius: "21px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 2 card link</p>',
				},
			],
		},
		{
			backgroundImage: {
				height: "410px",
				width: "1343px",
			},
			clickTargets: [
				{
					className: "ctaButtonLink",
					top: "394px",
					left: "641px",
					width: "345px",
					height: "42px",
					borderRadius: "21px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 3 CTA link</p>',
				},
				{
					className: "cardLink",
					top: "394px",
					left: "141px",
					width: "345px",
					height: "42px",
					borderRadius: "21px",
					innerHTML:
						'<p style="visibility: hidden;>Hero slide 3 card link</p>',
				},
			],
		},
	],
};

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
function insertHeroClickTargetsToDOM() {
	// Loop the slides in the DOM
	slideIndex = 0;
	clickTargetsConfig.slides.forEach(function (slide) {
		// Get the original a tag of this slide
		var originalATag = slides[slideIndex].querySelector("a");

		// Loop click targets
		// Duplicate the original a tag of this slide for each click target defined in the configuration
		clickTargetIndex = 0;
		slide.clickTargets.forEach(function (clickTarget) {
			var ctaButtonLink = originalATag.cloneNode(true);

			// Add the class defined in config to the a tag
			if (testing) {
				console.log(
					`Adding class ${clickTargetsConfig.slides[slideIndex].clickTargets[clickTargetIndex].className} to slide ${slideIndex} click target ${clickTargetIndex}`
				);
			}
			ctaButtonLink.classList.add(
				clickTargetsConfig.slides[slideIndex].clickTargets[
					clickTargetIndex
				].className
			);

			// Remove the attribute that adds min-height css
			ctaButtonLink.removeAttribute("data-element");

			// Add the configured innerHTML to the a tag for analytics
			ctaButtonLink.innerHTML =
				clickTargetsConfig.slides[slideIndex].clickTargets[
					clickTargetIndex
				].innerHTML;

			// Insert the a tag into the slide
			slides[slideIndex].appendChild(ctaButtonLink);
			clickTargetIndex++;
		});
		slideIndex++;
	});
}

// Calculate the position of the click target in the slide
// based on where it should be in full-sized window and the current viewport size
// TODO: Calculations
function calculateClickTargetPosition(clickTargetConfig) {
	if (testing) {
		console.log("Re-calculating click target positions and sizes...");
	}
	return clickTargetConfig;
}

// Position a click target in slides
function positionClickTarget(slideNo, clickTargetConfig, slideNo) {
	// Find the slide of the given number
	var slide = slides[slideNo];

	// Find the a tag in the slide
	var aTag = slide.querySelector("." + clickTargetConfig.className);

	// Find the element that has the background image
	var bgHolder = slides[slideNo].querySelector(".pagebuilder-slide-wrapper");

	// Calculate the position and size based on window size and the original position
	recalculatedConfig = calculateClickTargetPosition(clickTargetConfig);

	aTag.style.position = "absolute";
	aTag.style.top = recalculatedConfig.top;
	aTag.style.left = recalculatedConfig.left;
	aTag.style.height = recalculatedConfig.height;
	aTag.style.width = recalculatedConfig.width;
	aTag.style.borderRadius = recalculatedConfig.borderRadius;

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
	// Loop slides from config
	slideIndex = 0;
	clickTargetsConfig.slides.forEach(function (slide) {
		// Loop click targets from config
		clickTargetIndex = 0;
		slide.clickTargets.forEach(function (clickTarget) {
			positionClickTarget(slideIndex, clickTarget, slideIndex);
			clickTargetIndex++;
		});
		slideIndex++;
	});
}

window.onload = function (e) {
	// Get all the slides in the slick slider
	slides = document.querySelectorAll(
		".slick-slide [data-content-type='slide']"
	);

	if (isClickTargetsConfIsValid()) {
		insertHeroClickTargetsToDOM();
		positionAllClickTargets();
	}
};

// Listen for changes in the size and loading, reposition the click targets
window.addEventListener("resize", positionAllClickTargets);

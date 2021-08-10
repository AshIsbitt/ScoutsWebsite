console.log("carousel.js loaded");

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn--right');
const prevButton = document.querySelector('.carousel-btn--left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//Arrange slides next to each other
const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
	try{
		track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
		currentSlide.classList.remove('current-slide');
		targetSlide.classList.add('current-slide');
	} catch (e) {
		if (e instanceof TypeError) {
			track.style.transform = 'translateX(0)';
			currentSlide.classList.remove('current-slide');
			slides[0].classList.add('current-slide');

		} else {
			throw e;
		}
	}
}

const updateDots = (currentDot, targetDot) => {
	try {	
		currentDot.classList.remove('current-slide');
		targetDot.classList.add('current-slide');
	} catch (e) {
		if (e instanceof TypeError) {
			currentDot.classList.remove('current-slide');
			dots[0].classList.add('current-slide');
		} else {
			throw e;
		}
	}
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
	if (targetIndex === 0 || slides[0].classList.contains('current-slide')) {
		prevButton.classList.add('is-hidden');
		nextButton.classList.remove('is-hidden');
	} else if (targetIndex === slides.length - 1) {
		prevButton.classList.remove('is-hidden');
		nextButton.classList.add('is-hidden');
	} else {
		prevButton.classList.remove('is-hidden');
		nextButton.classList.remove('is-hidden');
	}
}

//When i click left button, move slides left
prevButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;
	const currentDot = dotsNav.querySelector('.current-slide');
	const prevDot = currentDot.previousElementSibling;
	const prevIndex = slides.findIndex(slide => slide === prevSlide);


	moveToSlide(track, currentSlide, prevSlide);
	updateDots(currentDot, prevDot);
	hideShowArrows(slides, prevButton, nextButton, prevIndex);

});


//When i click right button, move slides right

nextButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentDot = dotsNav.querySelector('.current-slide');
	const nextDot = currentDot.nextElementSibling;
	const nextIndex = slides.findIndex(slide => slide === nextSlide);

	moveToSlide(track, currentSlide, nextSlide);
	updateDots(currentDot, nextDot);
	hideShowArrows(slides, prevButton, nextButton, nextIndex);

});

//When I click nav indicators, move to that slide

dotsNav.addEventListener('click', e => {
	const targetDot = e.target.closest('button');

	if (!targetDot) return;

	const currentSlide = track.querySelector('.current-slide');
	const currentDot = dotsNav.querySelector('.current-slide');
	const targetIndex = dots.findIndex(dot => dot == targetDot);
	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);
	updateDots(currentDot, targetDot);
	hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

//Animate motion between images every 2 seconds
setInterval(function(){ 
    const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentDot = dotsNav.querySelector('.current-slide');
	const nextDot = currentDot.nextElementSibling;
	const nextIndex = slides.findIndex(slide => slide === nextSlide);

	moveToSlide(track, currentSlide, nextSlide);
	updateDots(currentDot, nextDot);
	hideShowArrows(slides, prevButton, nextButton, nextIndex);
}, 3000);

//submit button
function submitButtonClicked() {
	alert("Your message has been recieved. Please wait to hear from us.")
	reload()
}



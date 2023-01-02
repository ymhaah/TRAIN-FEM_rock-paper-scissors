import { setSpecialThings, changeAttribute, log } from "./functions.js";
import { header, game } from "./var.js";

let triangle = document.querySelector(".triangle");

let duration = 1;
let delay = 0.2;

function gChosen(ele) {
	gsap.to(ele, {
		duration: duration,
		delay: delay,
		scale: 1.2,
		left: 0,
		top: 0,
	});
}

function gNotChosen(ele) {
	duration = duration - 0.2;
	gsap.to(ele, {
		duration: duration,
		delay: delay,
		ease: "linear",
		scale: 0,
		opacity: 0,
	});
}

function gHouse(ele) {
	delay = duration + 0.5;
	gsap.to(triangle, {
		duration: duration,
		delay: delay,
		opacity: 0,
	});
	gsap.to(ele, {
		duration: duration,
		delay: delay,
		opacity: 1,
		scale: 1.2,
		right: 0,
		top: 0,
	});
}

export { gChosen, gNotChosen, gHouse };

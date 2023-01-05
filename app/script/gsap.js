import { setSpecialThings, changeAttribute, log } from "./functions.js";
import { header, game } from "./var.js";

let triangle = document.querySelector(".triangle");
let shadow = document.querySelector(".shadow");
let pick = document.querySelectorAll(".hero-items > h3");

let duration = 1;
let delay = 0.2;

function gChosen(ele) {
	gsap.to(ele, {
		duration: duration,
		delay: delay,
		scale: 1.2,
		left: 0,
		top: 0,
		bottom: "unset",
		right: "unset",
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
	let tl = gsap.timeline();

	tl.to(triangle, {
		duration: duration,
		delay: delay,
		opacity: 0,
	})
		.to(shadow, {
			duration: duration,
			width: "12vw",
			height: "12vw",
			opacity: 1,
		})
		.to(pick, {
			duration: duration,
			stagger: 0.2,
			opacity: 1,
		})
		.to(ele, {
			duration: duration,
			opacity: 1,
			scale: 1.2,
			right: 0,
			top: 0,
			bottom: "unset",
			left: "unset",
		});
}

function gWinner(ele) {
	duration = duration - 0.2;
	delay = 6;
	let tl = gsap.timeline();

	tl.fromTo(
		ele,
		{
			"box-shadow": "0 0 0 0 hsla(0 0% 100% / 0)",
		},
		{
			duration: duration,
			delay: delay,
			"box-shadow":
				"0 0 0 1rem hsla(0 0% 100% / 0.2), 0 0 0 2rem hsla(0 0% 100% / 0.2),0 0 0 3rem hsla(0 0% 100% / 0.2)",
		}
	);
}

export { gChosen, gNotChosen, gHouse, gWinner };

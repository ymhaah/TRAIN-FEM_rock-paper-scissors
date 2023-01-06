import { setSpecialThings, changeAttribute, log } from "./functions.js";
import { header, game } from "./var.js";

let triangle = document.querySelector(".triangle");
let shadow = document.querySelector(".shadow");

let afterResultSection = document.querySelector("#game-result");

let duration = 1;
let delay = 0.2;

function gChosen(ele) {
	gsap.to(ele, {
		duration: duration,
		delay: delay,
		scale: 1.2,
		left: 0,
		top: `calc(50% - ${ele.offsetHeight / 2}px)`,
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
			width: `${ele.offsetHeight}px`,
			height: `${ele.offsetHeight}px`,
			opacity: 1,
		})
		.to(ele, {
			duration: duration,
			opacity: 1,
			scale: 1.2,
			right: 0,
			top: `calc(50% - ${ele.offsetHeight / 2}px)`,
			bottom: "unset",
			left: "unset",
		});
}

function gWinner(ele) {
	duration = duration - 0.4;
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
				"0 0 0 15px hsla(0 0% 100% / 0.2), 0 0 0 30px hsla(0 0% 100% / 0.2),0 0 0 45px hsla(0 0% 100% / 0.2)",
		}
	).to(afterResultSection, {
		duration: duration,
		opacity: 1,
	});
}

export { gChosen, gNotChosen, gHouse, gWinner };

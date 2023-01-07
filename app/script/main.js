import { setSpecialThings, changeAttribute } from "./functions.js";
import { header, game } from "./var.js";
import { gChosen, gNotChosen, gHouse, gWinner } from "./gsap.js";

console.log(`Made with Love by Youssef Hafnawy`);
////////////////////////////////////////////////////////////////////////

let resetButton = document.querySelector("#resetButton");

window.localStorage.setItem(
	"scoreValue",
	window.localStorage.scoreValue ? window.localStorage.scoreValue : 0
);

let scoreValueNum = window.localStorage.scoreValue;

header.score.value.innerHTML = window.localStorage.scoreValue;

function updateScoreValue(newValue) {
	window.localStorage.scoreValue = newValue;
	header.score.value.innerHTML = window.localStorage.scoreValue;
}

// ############## reset #################
function resetLocalStorage() {
	updateScoreValue(0);
	scoreValueNum = 0;
}
resetButton.onclick = () => {
	resetLocalStorage();
};
// ######################################
let afterResultSection = document.querySelector("#game-result");
let playAgainButton = document.querySelector("#game-result button");
let result = document.querySelector(".Button--result");

result.onclick = () => {
	window.location.reload();
};

function setAfterResultState() {
	changeAttribute(afterResultSection, "aria-hidden", false);
	changeAttribute(playAgainButton, "tabindex", 0);
}

// to pick a random item
function housePicked() {
	let rand = Math.floor(Math.random() * Object.keys(game.items).length);
	return game.items[rand];
}
let house = housePicked();

game.items.forEach((item) => {
	item.button.onclick = () => {
		// to stop clicking after the animation start
		game.items.forEach((item) => {
			item.button.style.pointerEvents = "none";
		});

		// if draw reselect house
		// it is a 3 lire if because there is a possibility of being draw agin
		if (house.name == item.name) {
			house = housePicked();
			if (house.name == item.name) {
				house = housePicked();
				if (house.name == item.name) {
					house = housePicked();
				}
			}
		}

		// ######################################
		// what happen to the item we chose
		setSpecialThings(
			item,
			game.items,
			function (prop) {
				gChosen(prop.body);
			},
			function (prop) {
				gNotChosen(prop.body);
			}
		);

		// ######################################
		// what happen to the item the house chose
		setSpecialThings(
			house,
			game.items,
			function (prop) {
				gHouse(prop.body);
			},
			function () {}
		);
		let chosenItems = item != house ? [item, house] : [item];

		function SetWinner(winner) {
			setSpecialThings(
				chosenItems,
				game.items,
				function (prop) {
					gWinner(winner.body);
					setAfterResultState();
				},
				function () {}
			);
		}

		// ######################################

		if (item.name == house.rules.win) {
			// if you lose

			// to update the score value after the animation is completed
			setTimeout(function () {
				// to stop the score value to get under 0
				if (scoreValueNum < 0) {
					resetLocalStorage();
				} else if (scoreValueNum > 0) {
					updateScoreValue(--scoreValueNum);
				}
			}, 6000);

			SetWinner(house);
			changeAttribute(
				document.querySelector(".you-lose"),
				"aria-hidden",
				false
			);
		} else if (item.name != house.rules.win) {
			// if you win

			// to update the score value after the animation is completed
			setTimeout(function () {
				updateScoreValue(++scoreValueNum);
			}, 6000);

			SetWinner(item);

			changeAttribute(
				document.querySelector(".you-win"),
				"aria-hidden",
				false
			);
		} else {
			// if something go wrong
			resetLocalStorage();
			console.error("something went wrong");
		}
	};
});

// window.localStorage.clear();

// ##############################################################

let openRulesButton = document.querySelector("#rulesButton");
let rulesSection = document.querySelector("#bg-out-Of-Focus");
let closeRulesButton = document.querySelector(".rules-header__close-Button");
let notCloseRulesButton = document.querySelector(
	"button:not(.rules-header__close-Button)"
);

function showRules() {
	changeAttribute(rulesSection, "aria-expanded", true);
	changeAttribute(rulesSection, "aria-hidden", false);
	changeAttribute(closeRulesButton, "tabindex", 0);
	changeAttribute(notCloseRulesButton, "tabindex", -1);
}

function hidRules() {
	changeAttribute(rulesSection, "aria-expanded", false);
	changeAttribute(rulesSection, "aria-hidden", true);
	changeAttribute(closeRulesButton, "tabindex", -1);
	changeAttribute(notCloseRulesButton, "tabindex", 0);
}

openRulesButton.onclick = () => {
	showRules();
};
closeRulesButton.onclick = () => {
	hidRules();
};

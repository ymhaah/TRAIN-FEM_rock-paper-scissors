import { setSpecialThings, changeAttribute, log } from "./functions.js";
import { header, game } from "./var.js";
import { gChosen, gNotChosen, gHouse } from "./gsap.js";

log(`Made with Love by Youssef Hafnawy`);
////////////////////////////////////////////////////////////////////////

let resultTextArr = [...document.querySelectorAll(".game-result__text p")];

function announceResult(result) {
	setSpecialThings(
		result,
		resultTextArr,
		function (test1) {
			changeAttribute(test1, "aria-hidden", false);
		},
		function (test2) {
			changeAttribute(test2, "aria-hidden", true);
		}
	);
}

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
let hero = document.querySelector(".game__hero");

// to pick a random item
function housePicked() {
	let rand = Math.floor(Math.random() * Object.keys(game.items).length);
	return game.items[rand];
}

game.items.forEach((item) => {
	item.button.onclick = () => {
		let house = housePicked();

		if (house.name == item.name) {
			// if draw
			house = housePicked();
		}

		// ######################################
		setSpecialThings(
			item,
			game.items,
			function (prop) {
				// changeAttribute(prop.body, "date-chosen", true);
				gChosen(prop.body);
			},
			function (prop) {
				// changeAttribute(prop.body, "date-chosen", false);
				gNotChosen(prop.body);
			}
		);

		// ######################################

		setSpecialThings(
			house,
			game.items,
			function (prop) {
				// changeAttribute(prop.body, "date-house-chosen", true);
				gHouse(prop.body);
				changeAttribute(hero, "data-animation-start", true);
			},
			function (prop) {
				// changeAttribute(prop.body, "date-house-chosen", false);
			}
		);
		let chosenItems = item != house ? [item, house] : [item];

		function SetWinner(winner) {
			setSpecialThings(
				chosenItems,
				game.items,
				function (prop) {
					if (prop.body == winner.body) {
						// changeAttribute(prop.body, "date-wining", true);
					} else {
						// changeAttribute(prop.body, "date-wining", false);
					}
				},
				function (prop) {
					// changeAttribute(prop.body, "date-wining", false);
				}
			);
		}

		// ######################################

		if (item.name == house.rules.win) {
			// if you lose
			updateScoreValue(--scoreValueNum);
			SetWinner(house);
			announceResult(resultTextArr[1]);
			// to stop the score value to get under 0
			if (scoreValueNum < 0) {
				resetLocalStorage();
			}
			console.log("loser");
		} else if (item.name != house.rules.win) {
			// if you win
			updateScoreValue(++scoreValueNum);
			SetWinner(item);
			announceResult(resultTextArr[0]);
			console.log("winner");
		} else {
			// if something go wrong
			resetLocalStorage();
			console.error("something went wrong");
		}
	};
});

// window.localStorage.clear();

// ##############################################################

let afterResultSection = document.querySelector("#game-result");
let playAgainButton = document.querySelector("#game-result button");

function setAfterResultState() {
	changeAttribute(afterResultSection, "aria-hidden", false);
	changeAttribute(playAgainButton, "tabindex", 0);
}
function setBeforeResultState() {
	changeAttribute(afterResultSection, "aria-hidden", true);
	changeAttribute(playAgainButton, "tabindex", -1);
}

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
rulesSection.onclick = () => {
	hidRules();
};

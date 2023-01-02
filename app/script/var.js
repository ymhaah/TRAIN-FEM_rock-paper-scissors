let header = {
	body: document.querySelector(".main-header"),
	score: {
		button: document.querySelector(".score__button"),
		value: document.querySelector("#scoreValue"),
	},
};

let game = {
	body: document.querySelector(".game__hero"),
	items: [
		{
			name: "rock",
			body: document.querySelector(".hero__item--rock"),
			button: document.querySelector(".hero__item--rock button"),
			rules: {
				win: "scissors",
			},
		},
		{
			name: "paper",
			body: document.querySelector(".hero__item--paper"),
			button: document.querySelector(".hero__item--paper button"),
			rules: {
				win: "rock",
			},
		},
		{
			name: "scissors",
			body: document.querySelector(".hero__item--scissors"),
			button: document.querySelector(".hero__item--scissors button"),
			rules: {
				win: "paper",
			},
		},
	],
};

export { header, game };

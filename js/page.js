(function(){
	
	class Player {
		constructor(id, symbol) {
			this.id = id;
			this.symbol = symbol;
			this.name = "";
			this.isHuman = true;
		}
	}

	class Square {
		constructor(id) {
			this.id = id;
			this.owner = '';
		}
	}

	class Game {
		constructor() {
			this.isStarted = false;
			this.isEnded = false;
			this.players = {
				player1: new Player(1, 'o'), 
				player2: new Player(2, 'x')
			};
			this.activePlayer = this.players.player1;
			this.board = [
				new Square(0),
				new Square(1),
				new Square(2),
				new Square(3),
				new Square(4),
				new Square(5),
				new Square(6),
				new Square(7),
				new Square(8)
			];
		}
	}

	let startDiv = document.querySelector('#start');
		let startGameButton = document.querySelector('#start-game');
	let boardDiv = document.querySelector('#board');
		let player1Li = document.querySelector('#player1');
		let player2Li = document.querySelector('#player2');
		let boxes = document.querySelector('ul.boxes');
	let finishDiv = document.querySelector('#finish');
		let newGameButton = document.querySelector('#new-game');

	let thisGame = new Game();

	const startGame = () => {
		thisGame = new Game();
		thisGame.isStarted = true;
		thisGame.activePlayer = thisGame.players.player1;
	}

	const highlightActivePlayer = () => {
		switch (thisGame.activePlayer) {
			case thisGame.players.player1: 
				player1Li.classList.add('active');
				player2Li.classList.remove('active');
				break;
			case thisGame.players.player2: 
				player1Li.classList.remove('active');
				player2Li.classList.add('active');
				break;
		}
	}

	const drawBoxes = () => {
		boxes.innerHTML = '';
		thisGame.board.forEach(box => {
			let boxLi = document.createElement('li');
			boxes.appendChild(boxLi);
			if (box.owner === '') {
				// Style for active player to mouse over

			} else {
				// style for owner
				boxLi.style.backgroundImage = `url(img/${box.owner.symbol}.svg)`;
				boxLi.classList.add(`box box-filled-${box.owner.id}`);
			}
		});
	}

	const writeStartHtml = () => {
		startDiv.style.display = '';
		boardDiv.style.display = 'none';
		finishDiv.style.display = 'none';
	}

	const writeBoardHtml = () => {
		startDiv.style.display = 'none';
		boardDiv.style.display = '';
		finishDiv.style.display = 'none';

		highlightActivePlayer();

	}
	
	const drawPage = () => {
		if (!thisGame.isStarted) {
			writeStartHtml(thisGame);
		} else if (!thisGame.isEnded) {
			writeBoardHtml(thisGame);
		} else {
			writeFinishHtml(thisGame);
		}
	}

	const writeFinishHtml = () => {
		// foo
	}

	drawPage(thisGame);

	startGameButton.addEventListener('click', () => {
		startGame();
		drawPage(); 
	});

})();
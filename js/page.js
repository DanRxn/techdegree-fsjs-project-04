(function(){
	// Setting vars for relevant DOM elements
	let startDiv = document.querySelector('#start');
		let startGameButton = document.querySelector('#start-game');
	let boardDiv = document.querySelector('#board');
		let player1Li = document.querySelector('#player1');
		let player2Li = document.querySelector('#player2');
		let boxes = document.querySelector('ul.boxes');
	let finishDiv = document.querySelector('#finish');
		let finishMessage = document.querySelector('.message');
		let playAgainButton = document.querySelector('#play-again');
		let newPlayersButton = document.querySelector('#new-players');
	
	// Devining classes
	class Player {
		constructor(id) {
			this.id = id;
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
				player1: new Player('1'), 
				player2: new Player('2')
			};
			this.activePlayer = this.players.player1;
			this.board = (function() {
				let squaresArray = [];
				for (let i = 0; i < 9; i++) {
					squaresArray.push(new Square(i));
				}
				return squaresArray;
			})();
		}

		setupNextGame() { // Keep players' names and isHuman state, reset the rest, start game
			this.isStarted = true;
			this.isEnded = false;
			this.activePlayer = this.players.player1;
			this.board = (function() {
				let squaresArray = [];
				for (let i = 0; i < 9; i++) {
					squaresArray.push(new Square(i));
				}
				return squaresArray;
			})();
		}
		
		get winner() { // Winner is dynamically calculated as this.winner
			let winner = '';
			winningCombinations.forEach((combo) => {
				let comboSquares = this.board.filter(square => combo.includes(square.id));
				let comboSquareOwners = comboSquares.map(square => square.owner);
				if (comboSquareOwners.every(owner => owner === this.players.player1)) {
					winner = this.players.player1;
				} else if (comboSquareOwners.every(owner => owner === this.players.player2)) {
					winner = this.players.player2;
				}
			});
			if (this.board.every(square => square.owner !== '')) {
				winner = 'tie'
			}
			return winner;
		};
	}

	// Functions that drive state and UI changes
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
		const activePlayerId = thisGame.activePlayer.id;
		boxes.innerHTML = '';
		thisGame.board.forEach(box => {
			const boxOwnerId = box.owner.id;
			let boxLi = document.createElement('li');
			boxes.appendChild(boxLi);
			if (box.owner === '') {
				// Style for active player to mouse over
				boxLi.classList.add('box', 'box-unclaimed', `box-active-${activePlayerId}`);
			} else {
				// style for owner
				boxLi.classList.add('box', `box-filled-${boxOwnerId}`);
			}
		});
	}

	const displayWinner = () => {
		if (thisGame.winner === 'tie') {
			finishDiv.classList.add('screen-win-tie');
			finishDiv.classList.remove('screen-win-one', 'screen-win-two');
			finishMessage.textContent = `It's a Tie!`;
		} else if (thisGame.winner === thisGame.players.player1) {
			finishDiv.classList.add('screen-win-one');
			finishDiv.classList.remove('screen-win-tie', 'screen-win-two');
			finishMessage.textContent = `Winner`;
		} else if (thisGame.winner === thisGame.players.player2) {
			finishDiv.classList.add('screen-win-two');
			finishDiv.classList.remove('screen-win-tie', 'screen-win-one');
			finishMessage.textContent = `Winner`;
		}
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
		drawBoxes();
	}

	const writeFinishHtml = () => {
		startDiv.style.display = 'none';
		boardDiv.style.display = 'none';
		finishDiv.style.display = '';
		displayWinner();
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

	const updateClickedSquare = (element) => {
		const squareId = [...element.parentNode.children].indexOf(element);
		// Check if square is unclaimed
		if (thisGame.board[squareId].owner === '') {
			// Update square.owner
			thisGame.board[squareId].owner = thisGame.activePlayer;
			// Check for winner
			if (thisGame.winner != '') {
				thisGame.isEnded = true;
			} else if (thisGame.activePlayer.id === '1') { // If no winner, update active player and redraw squares
				thisGame.activePlayer = thisGame.players.player2;
			} else {
				thisGame.activePlayer = thisGame.players.player1;
			}
		} 
	}

	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[0, 4, 8]
	];

	let thisGame = new Game();
	drawPage(thisGame);

	startGameButton.addEventListener('click', () => {
		thisGame.isStarted = true;
		drawPage(); 
	});

	document.querySelector('.boxes').addEventListener('click', (e) => {
		updateClickedSquare(e.target);
		drawPage();
	});

	playAgainButton.addEventListener('click', () => {
		thisGame.setupNextGame();
		drawPage();
	});

	newPlayersButton.addEventListener('click', () => {
		thisGame = new Game();
		drawPage();
	});

})();
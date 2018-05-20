(function(){
	class Player {
		constructor(id) {
			this.id = id;
			this.name = "";
			this.isHuman = true;
			this.herTurn = false;
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
			this.players = [
				new Player('player1'), 
				new Player('player2')
			];
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

	let newGame = new Game();

	console.log(newGame);
})();
function createPlayer(name, symbol, image_class) {
  return { name, symbol, image_class };
}

function createGame(players) {
  const gameboard = [' ', ' ', ' ',
                    ' ', ' ', ' ',
                    ' ', ' ', ' '];
  let _numMoves = 0; // if total number of moves == 9, game is tied or won
  let _players = players; // list of players in an array
  let _playerTurns = 0;

  const getPlayerTurn = () => {
    return _players[_playerTurns % 2];
  }

  const placeMove = (position, symbol) => {
    if (gameboard[position] != ' ') return false; // if a move was already placed at that position, do not allow it
    gameboard[position] = symbol;
    // printBoard();
    return true;
  }

  const checkWin = (symbol) => {
    // horizontal check
    if (gameboard[0] == symbol && gameboard[1] == symbol && gameboard[2] == symbol) {
      return true;
    }
    else if (gameboard[3] == symbol && gameboard[4] == symbol && gameboard[5] == symbol) {
      return true;
    }
    else if (gameboard[6] == symbol && gameboard[7] == symbol && gameboard[8] == symbol) {
      return true;
    }

    // vertical check
    else if (gameboard[0] == symbol && gameboard[3] == symbol && gameboard[6] == symbol) {
      return true;
    }
    else if (gameboard[1] == symbol && gameboard[4] == symbol && gameboard[7] == symbol) {
      return true;
    }
    else if (gameboard[2] == symbol && gameboard[5] == symbol && gameboard[8] == symbol) {
      return true;
    }

    // cross check
    else if (gameboard[0] == symbol && gameboard[4] == symbol && gameboard[8] == symbol) {
      return true;
    }
    else if(gameboard[2] == symbol && gameboard[4] == symbol && gameboard[6] == symbol) {
      return true;
    }

    // nothing yet
    else {
      return false;
    }
  }

  const checkTie = () => {
    return (_numMoves == 9);
  }

  const resetBoard = () => {
    _numMoves = 0;
    _playerTurns = 0;
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = ' ';
    }
  }

  const printBoard = () => {
    // console.table(gameboard);
    console.log(JSON.stringify(gameboard));
  }

  const gameRound = () => {
    _numMoves++;
    _playerTurns++;
  }

  return { getPlayerTurn, placeMove, checkWin, checkTie, printBoard, gameRound, resetBoard };
}

function createDisplayController() {
  const gameBoard = document.getElementById('game-board');
  const gameBoardField = document.querySelectorAll('.game-board-field');
  const outcome = document.getElementById('outcome');
  const modal = document.getElementById('finish-dialog');
  const closeModal = document.getElementById('close-button');
  const restartGame = document.getElementById('restart-button');
  // or you can add a event listener to each of the child element
  gameBoard.addEventListener('click', e => {
    if (e.target.classList.contains('game-board-field')) {
      let board_index = e.target.getAttribute("board-index");
      let player = game.getPlayerTurn();

      game.gameRound();

      // place symbol on board
      if (game.placeMove(board_index, player.symbol)) {


        e.target.children[0].classList.add(player.image_class);

        if (game.checkWin(player.symbol)) {
          console.log('win')
          outcome.innerHTML = `${player.name} wins!`;
          modal.showModal();

        } else if (game.checkTie()) {
          outcome.innerHTML = `Tie!`;
          modal.showModal();
        }
        // e.target.innerHTML = player.symbol;
      }

      // check for wins

    }
  })

  const resetBoard = () => {
    gameBoardField.forEach((child) => {
      child.children[0].className = '';
      // child.innerHTML = '';
      // child.className = 'game-board-field';
    })
  }

  closeModal.addEventListener("click", () => {
    modal.close();
  });

  restartGame.addEventListener("click", () => {
    modal.close();
    game.resetBoard();
    resetBoard();
  });

  return;
}

const player1 = createPlayer('player1', 'x', 'x-icon');
const player2 = createPlayer('player2', 'o', 'o-icon');

const game = createGame([player1, player2]);

const display = createDisplayController();
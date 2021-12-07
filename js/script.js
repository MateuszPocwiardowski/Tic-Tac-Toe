const scoreAmount = document.querySelector('.score__amount')
const boardFields = document.querySelectorAll('.board__field')
const popUpBackground = document.querySelector('.background')
const playAgainButton = document.querySelector('.pop-up__play-again-btn')
const popUpResult = document.querySelector('.pop-up__result')

let activePlayer = 'X'
let board = ['', '', '', '', '', '', '', '', '']
let score = 0
let gameActive = true

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

//pop-up
const hidePopUp = () => {
	popUpBackground.classList.add('hide')
	popUpResult.classList.remove('win')
	popUpResult.classList.remove('lose')
	popUpResult.classList.remove('draw')
	scoreAmount.textContent = score

	if (activePlayer === 'O') {
		computerMove()
	}
}

const showPopUp = winner => {
	switch (winner) {
		case 'X':
			popUpResult.textContent = 'You win!'
			popUpResult.classList.add('win')
			score += 1
			activePlayer = 'X'
			break
		case 'O':
			popUpResult.textContent = 'You lose!'
			popUpResult.classList.add('lose')
			score > 0 ? (score -= 1) : null
			activePlayer = 'O'
			break
		case 'DRAW':
			popUpResult.textContent = "It's a draw"
			popUpResult.classList.add('draw')
			break
	}

	popUpBackground.classList.remove('hide')
}

//check winner
const checkWinner = () => {
	for (let i = 0; i < winningConditions.length; i++) {
		const [value1, value2, value3] = winningConditions[i]

		if (board[value1] === 'X' && board[value2] === 'X' && board[value3] === 'X') {
			showPopUp('X')
			gameActive = false
		}
		if (board[value1] === 'O' && board[value2] === 'O' && board[value3] === 'O') {
			showPopUp('O')
			gameActive = false
		}
	}
}

const checkDraw = () => {
    if (board.includes('') === false) {
		showPopUp('DRAW')
		gameActive = false
	}
}

//field handler
const fieldHandler = e => {
	let index = e.target.attributes['data-set'].value

	if (board[index] === '') {
		fillField(index)
		checkWinner()
        gameActive === true ? checkDraw() : null
		changePlayer()
	}
}

const fillField = index => {
	board[index] = activePlayer
	boardFields[index].classList.add(`board__field--player${activePlayer}`)
}

const changePlayer = () => {
	activePlayer = activePlayer === 'X' ? 'O' : 'X'

	if (activePlayer === 'O') {
		computerMove()
	}
}

boardFields.forEach(field => {
	field.addEventListener('click', fieldHandler)
})

//set initial conditions
const initialConditions = () => {
	gameActive = true
	board = ['', '', '', '', '', '', '', '', '']
	boardFields.forEach(field => {
		field.classList.remove('board__field--playerX', 'board__field--playerO')
	})
	hidePopUp()
}

playAgainButton.addEventListener('click', initialConditions)
window.addEventListener('DOMContentLoaded', initialConditions)

//computer move
const computerMove = () => {
	let index = Math.floor(Math.random() * 9)

	if (gameActive === true) {
		if (board[index] === '') {
			fillField(index)
			checkWinner()
            gameActive === true ? checkDraw() : null
			changePlayer()
		} else {
			computerMove()
		}
	}
}

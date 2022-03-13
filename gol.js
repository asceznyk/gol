const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const scl = 4;
const ws = canvas.width/scl;
const hs = canvas.height/scl;

ctx.scale(scl, scl);

let grid = []
function initGrid(rows, cols) {	
	for(let i = 0; i < ws; i++) {
		grid[i] = [];
		for(let j = 0; j < hs; j++) {
			grid[i][j] = +(Math.random() < 0.05)
		}
	}
}

function inRange(p, s) {
	return (p+s >= 0 && p+s <= ws-1)
}

function gameOfLife(r,c) {
	let count = 0;
	for(let i = -1; i < 2; i++) {
		for(let j = -1; j < 2; j++) {
			if(inRange(r,i) && inRange(c,j)) {
				count += grid[r+i][c+j];
			} 
		}
	}

	if(count < 2 || count > 3) grid[r][c] = 0;
	if(count == 3) grid[r][c] = 1;	
}

function updateGrid() {
	for(let i = 0; i < ws; i++) {
		for(let j = 0; j < hs; j++) {
			gameOfLife(i, j);
		}
	}
}

function renderGrid() {
	for(let i = 0; i < ws; i++) {
		for(let j = 0; j < hs; j++) {
			if(grid[i][j]) ctx.fillStyle = '#000';
			else ctx.fillStyle = '#fff';	
			ctx.fillRect(i, j, 1, 1)
		}
	}
}


initGrid()
renderGrid()
let start = 0;
function showGame(time) {
	if((time-start) >= 100) {
		start = time
		updateGrid()
		renderGrid()
	}
	window.requestAnimationFrame(showGame);
}
window.requestAnimationFrame(showGame);



//this version is corner constrained so take it lightly

const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const scl = 8;

const ws = canvas.width/scl;
const hs = canvas.height/scl;

ctx.scale(scl, scl);

let grid = []
function initGrid() {	
	for(let i = 0; i < ws; i++) {
		grid[i] = [];
		for(let j = 0; j < hs; j++) {
			grid[i][j] = +(Math.random() < 0.15)
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
				count += (i == 0 && j == 0) ? 0 : grid[r+i][c+j];
			} 
		}
	}

	if(count < 2 || count > 3) {
		refGrid[r][c] = 0;
	} else if(count == 3){ 
		refGrid[r][c] = 1;	
	}
}

function updateGrid() {
	for(let i = 0; i < ws; i++) {
		for(let j = 0; j < hs; j++) {
			gameOfLife(i, j);
		}
	}

	grid = JSON.parse(JSON.stringify(refGrid));
}

function renderGrid() {
	for(let y = 0; y < hs; y++) {
		for(let x = 0; x < ws; x++) {
			ctx.fillStyle = '#fff';
			if(refGrid[y][x]) {
				ctx.fillStyle = '#000';
			} 
			ctx.fillRect(x, y, 1, 1);
		}
	}
}


initGrid()
let refGrid = JSON.parse(JSON.stringify(grid))
renderGrid()
let start = 0;
function timeStep(time) {
	if((time-start) >= 100) {
		start = time
		updateGrid()
		renderGrid()
	}
	window.requestAnimationFrame(timeStep);
}
window.requestAnimationFrame(timeStep);


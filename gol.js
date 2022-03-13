const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const scl = 40;

const ws = canvas.width/scl;
const hs = canvas.height/scl;

ctx.scale(scl, scl);

let grid = []
function initGrid() {	
	/*for(let i = 0; i < ws; i++) {
		grid[i] = [];
		for(let j = 0; j < hs; j++) {
			grid[i][j] = +(Math.random() < 0.05)
		}
	}*/
	grid = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,0,0,0],
		[0,0,1,0,1,0,0,0,0,0],
		[0,0,0,1,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
	]
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
	for(let y = 0; y < hs; y++) {
		for(let x = 0; x < ws; x++) {
			ctx.fillStyle = '#fff';
			if(grid[y][x]) {
				ctx.fillStyle = '#000';
			} 
			ctx.fillRect(x, y, 1, 1);
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


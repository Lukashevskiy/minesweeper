document.addEventListener("DOMContentLoaded", on_create);

let field_x=12
let field_y=12
let mas_of_html_cells;
let mas_of_cells;
class Cell{
	x;
	y;
	type;
	constructor(x,y,type){
		this.x = x;
		this.y = y;
		this.type = type;
	}

	get_type(){
		return this.type;
	}
}

function open_closen_cell(x,y){
	if(x >= 0 && x < field_x && y >= 0 && y < field_y){
		mas_of_html_cells[x][y].classList.remove('closen_cell');
		switch(mas_of_cells[x][y].type){
			case 'empty':
				mas_of_html_cells[x][y].classList.add('empty_open_cell');
				if_is_empty_open_it(x,y);
				break;
			case 'one':
				mas_of_html_cells[x][y].classList.add('one_open_cell');
				mas_of_html_cells[x][y].textContent = 1;
				break;
			case 'two':
				mas_of_html_cells[x][y].classList.add('two_open_cell');
				mas_of_html_cells[x][y].textContent = 2;
				break;
			case 'three':
				mas_of_html_cells[x][y].classList.add('three_open_cell');
				mas_of_html_cells[x][y].textContent = 3;
				break;
			case 'four':
				mas_of_html_cells[x][y].classList.add('four_open_cell');
				mas_of_html_cells[x][y].textContent = 4;
				break;
			case 'five':
				mas_of_html_cells[x][y].classList.add('five_open_cell');
				mas_of_html_cells[x][y].textContent = 5;
				break;
			case 'six':
				mas_of_html_cells[x][y].classList.add('siz_open_cell');
				mas_of_html_cells[x][y].textContent = 6;
				break;
			case 'seven':
				mas_of_html_cells[x][y].classList.add('seven_open_cell');
				mas_of_html_cells[x][y].textContent = 7;
				break;
			case 'eight':
				mas_of_html_cells[x][y].classList.add('eight_open_cell');
				mas_of_html_cells[x][y].textContent = 8;
				break;
			case 'bomb':
				mas_of_html_cells[x][y].classList.add('bomb_open_cell');
				break;
		}
	}
}

function on_create() {
	let field = document.querySelector('.field');
	mas_of_html_cells = [];
	mas_of_cells = [];
	for(let i = 0; i < field_x; i++){
		mas_line = [];
		mas_line_html = []
		for(let j = 0; j < field_y; j++){
			let cell = new Cell(i, j, 'empty');
			mas_line.push(cell);
			
			let cell_html = document.createElement('button');
			cell_html.classList.add('closen_cell');

			field.append(cell_html);
			
			mas_line_html.push(cell_html);
		}
		
		mas_of_cells.push(mas_line);
		mas_of_html_cells.push(mas_line_html);
	}
	/*for(let i = 0; i < field_x; i++){
		s = ""
		for(let j = 0; j < field_y; j++){
			s += mas_of_cells[i][j].type + " "
		}
		console.log(s);
	}*/
	for(let i = 0; i < field_x; i++){
		for(let j = 0; j < field_y; j++){
			mas_of_html_cells[i][j].addEventListener('click', function(){ open_closen_cell(i,j);});
		}
	}
	generate_bombs(12, field_y*field_x);
	get_dependences();
}


function generate_bombs(count, field_count) {
	let field = new Array(field_count);
	for(let i = 0; i < field.lenght; i++){
		field[i] = i;
	}
	for(let i = 0; i < count; i++){
		let index = Math.floor(Math.random() * field_count);
		let current_x = Math.floor(index/field_x);
		let current_y = Math.floor(index%field_y);
		//console.log(current_x+" "+current_y);
		mas_of_cells[current_x][current_y].type = 'bomb';
		field[index] = field[field.lenght-1]

	}
}

function get_dependences(){
	for(let i = 0; i < field_x; i++){
		for(let j = 0; j < field_y; j++){
			if(mas_of_cells[i][j].type !== 'bomb'){
				ch = is_posible_and_is_bomb(i+1,j-1)+
				is_posible_and_is_bomb(i+1,j)+
				is_posible_and_is_bomb(i+1,j+1)+
				is_posible_and_is_bomb(i,j-1)+
				is_posible_and_is_bomb(i,j+1)+
				is_posible_and_is_bomb(i-1,j)+
				is_posible_and_is_bomb(i-1,j-1)+
				is_posible_and_is_bomb(i-1,j+1)+
				is_posible_and_is_bomb(i,j);
				console.log(ch);
				switch(ch){
					case 0: 
						mas_of_cells[i][j].type = 'empty';
						break;
					case 1: 
						mas_of_cells[i][j].type = 'one';
						break;
					case 2: 
						mas_of_cells[i][j].type = 'two';
						break;
					case 3: 
						mas_of_cells[i][j].type = 'three';
						break;
					case 4: 
						mas_of_cells[i][j].type = 'four';
						break;
					case 5: 
						mas_of_cells[i][j].type = 'five';
						break;
					case 6: 
						mas_of_cells[i][j].type = 'six';
						break;
					case 7: 
						mas_of_cells[i][j].type = 'seven';
						break;
					case 8: 
						mas_of_cells[i][j].type = 'eight';
						break;	
				}
			}
		}
	}
}

function is_posible_and_is_bomb(x, y){
	if(x >= 0 && x < field_x && y >= 0 && y < field_y){
		if(mas_of_cells[x][y].type === 'bomb'){
			return true;
		}else{
			return false;
		}
	}
	return false;
}

function if_is_empty_open_it(x,y) {
	if(x >= 0 && x < field_x && y >= 0 && y < field_y){
		if(mas_of_cells[x][y].type === 'empty' && mas_of_html_cells[x][y].classList[0] === 'closen_cell'){

			console.log('f');
			open_closen_cell(x,y);
			if_is_empty_open_it(x-1, y-1);
			if_is_empty_open_it(x-1, y);
			if_is_empty_open_it(x-1, y+1);
			if_is_empty_open_it(x, y-1);
			if_is_empty_open_it(x, y+1);
			if_is_empty_open_it(x+1, y-1);
			if_is_empty_open_it(x+1, y);
			if_is_empty_open_it(x+1, y+1);
		}
	}
}
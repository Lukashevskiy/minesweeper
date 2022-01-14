document.addEventListener("DOMContentLoaded", on_create);

let field_x=12;
let field_y=12;
let count_bombs = 143;
let mas_of_html_cells;
let mas_of_cells;
let bombs_coords;
let field_html;
let first_step = true;
let menu_title;
let flags;
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

function init_mode(mode){
	switch(mode){
		case 'easy':
			field_x = 10;
			field_y = 10;
			count_bombs = 15;
			break;
		case 'medium':
			field_x = 20;
			field_y = 20;
			count_bombs = 50;
			break;
		case 'hard':
			field_x = 29;
			field_y = 29;
			count_bombs = 150;
			break;
	}
	flags = count_bombs;
}

function on_create() {
	init_mode('easy');

	field_html = document.querySelector('.field');
	menu_title = document.querySelector('.title_menu');
	menu_title.children[0].textContent = count_bombs;
	menu_title.children[2].textContent = flags;
	menu_title.children[1].textContent = get_number('smile_ok');
	menu_title.children[1].addEventListener('click', function() { 
																	field_html.innerHTML = "";
																	first_step = true;
																	on_create();
																	console.log('f');
																	});
	menu_title.children[1].addEventListener('mouseenter', function() { EventTarget.textContent = get_number('smile_on_focus');});
	menu_title.children[1].addEventListener('mouseleave', function() { EventTarget.textContent = get_number('smile_ok');});
	document.querySelector('.game_field').style.width = field_x*50+'px';

	field_html.style.gridTemplateColumns = 'repeat('+field_x+', 50px)';
	field_html.style.gridTemplateRows = 'repeat('+field_y+', 50px)';

	field_html.style.width = field_x*50+'px';

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

			field_html.append(cell_html);
			
			mas_line_html.push(cell_html);
		}
		
		mas_of_cells.push(mas_line);
		mas_of_html_cells.push(mas_line_html);
	}

	for(let i = 0; i < field_x; i++){
		for(let j = 0; j < field_y; j++){
			mas_of_html_cells[i][j].addEventListener('click', function(){ open_cell(i,j);});
			mas_of_html_cells[i][j].addEventListener('contextmenu', function(){ 
																				
																				mas_line_html[x][y].classList.remove('closen_cell');
																				mas_of_html_cells[x][y].classList.add('closen_cell_by_flag');
																				mas_of_html_cells[x][y].textContent = get_number('flag');
																				
																				},false);
		}
	}
}


function generate_bombs(count, field_count, first) {
	let field = new Array(field_count);
	bombs_coords = [];
	for(let i = 0; i < field_count; i++){
		field[i] = i;
	}
	field[first] = field[field_count -1];
	field_count--;
	for(let i = 0; i < count; i++){
		let index = Math.floor(Math.random() * field_count);
		let current_x = Math.floor(field[index]/field_x);
		let current_y = Math.floor(field[index]%field_y);
		let coords = [
			current_x,
			current_y
		];
		bombs_coords.push(coords);
		//console.log(current_x+" "+current_y);
		
		mas_of_cells[current_x][current_y].type = 'bomb';
		field[index] = field[field_count-1];
		
		field_count--;

	}
	//console.log(bombs_coords.length);
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
				//console.log(ch);
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

function open_cell(x,y){
	if(first_step){
		generate_bombs(count_bombs, field_y*field_x, x*field_x+y);
		get_dependences();
		first_step = false;
	}
	if(mas_of_cells[x][y].type === 'empty'){
		open_nier_cells(x,y);
	}else{
		mas_of_html_cells[x][y].classList.remove("closen_cell");	
		mas_of_html_cells[x][y].classList.add(mas_of_cells[x][y].type + "_open_cell");
		mas_of_html_cells[x][y].textContent = get_number(mas_of_cells[x][y].type);
		if(mas_of_cells[x][y].type === 'bomb'){
			mas_of_html_cells[x][y].classList.add('bomb_open_cell_is_fatal');
			finish_game(-1);	
		}
	}
}


function get_number(text_interpretation){
	switch(text_interpretation){
		case 'empty':
			return " ";
			break;
		case 'one':
			return "1";
			break;
		case 'two':
			return "2";
			break;
		case 'three':
			return "3";
			break;
		case 'four':
			return "4";
			break;
		case 'five':
			return "5";
			break;
		case 'six':
			return "6";
			break;
		case 'seven':
			return "7";
			break;
		case 'eight':
			return "8";
			break;
		case 'bomb':
			return "💣";
		case 'flag':
			return '🚩';
		case 'smile_ok':
			return '🙂';
		case 'smile_on_focus':
			return '😅';
		case 'smile_unhappy':
			return '😭';
	}
}

function finish_game(mod) {
	if(mod === -1){
		for(let i = 0; i < field_x; i++){
			for(let j = 0; j < field_y; j++){
				mas_of_html_cells[i][j].disabled = true;
			}
		}
		console.log(bombs_coords[0][1]);
		for(let i = 0; i < bombs_coords.length; i++){
			mas_of_html_cells[bombs_coords[i][0]][bombs_coords[i][1]].classList.remove('closen_cell');
			mas_of_html_cells[bombs_coords[i][0]][bombs_coords[i][1]].classList.add('bomb_open_cell');
			mas_of_html_cells[bombs_coords[i][0]][bombs_coords[i][1]].textContent = get_number('bomb');
		}
		menu_title.children[1].textContent = get_number('smile_unhappy');
	}
}

function open_nier_cells(x,y){
	if(x >= 0 && x < field_x && y >= 0 && y < field_y && mas_of_html_cells[x][y].classList[0] === 'closen_cell'){
		if(mas_of_cells[x][y].type === 'empty'){
			mas_of_html_cells[x][y].classList.remove('closen_cell');
			mas_of_html_cells[x][y].classList.add(mas_of_cells[x][y].type+'_open_cell');
			open_nier_cells(x+1, y);
			open_nier_cells(x+1, y+1);
			open_nier_cells(x+1, y-1);
			open_nier_cells(x-1, y);
			open_nier_cells(x-1, y+1);
			open_nier_cells(x-1, y-1);
			open_nier_cells(x, y+1);
			open_nier_cells(x, y-1);
		}else if(mas_of_cells[x][y].type !== 'bomb'){
			mas_of_html_cells[x][y].classList.remove('closen_cell')
			mas_of_html_cells[x][y].classList.add(mas_of_cells[x][y].type+'_open_cell');
			mas_of_html_cells[x][y].textContent = get_number(mas_of_cells[x][y].type);
		}	
	}
}
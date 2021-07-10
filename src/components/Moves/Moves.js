import React, {useEffect} from 'react'; 
import './Moves.css';
import MoveButton from './MoveButton/MoveButton';

// let typeConversion = ['','B','N','R','Q','K'];
// let moveConverter = ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"];
// TYPES 
// PAWN - 1
// BISHOP - 2 
// KNIGHT - 3
// ROOK - 4 
// QUEEN - 5 
// KING - 6
const Moves = ({moves, onClick, selected_move, colorToMove}) => {
	
	// let colorToText = (color) => {
	// 	return color===1 ? 'white' : 'black'; 
	// }

	/**
	 * Scrolls the move-table to the appropriate position	
	 **/
	useEffect(() => {
		if(selected_move===0) return;
		let moves_table = document.querySelector('#moves_table'); 
		let move_offset = Math.floor((selected_move-1)/2)*20+20; 

		if(moves_table.clientHeight+moves_table.scrollTop <= move_offset){
			moves_table.scrollTop = move_offset - moves_table.clientHeight;
		}else if(moves_table.scrollTop >= move_offset){
			moves_table.scrollTop = move_offset-20;
		}
	});

	function moveClicked(i){
		onClick(i);
	}
	let render = []; 

	if(moves && Object.keys(moves).length>0){
		let classes = ['move_white','move_black']; 
		let length = Object.keys(moves).length;
		let count = 1;
		for (let i = 0; i < length; i++) {
			
			let buffer = []; 
			buffer.push(
				React.createElement('div', {className:'move_number', key:'mr'+count}, count)
				);
			buffer.push(
				React.createElement(
					'div', 
					{
						className:(i===selected_move-1)? classes[i%2]+' selected':classes[i%2], 
						id:'m'+i, 
						key:'m'+i, 
						onClick: (e)=>moveClicked(i)
					}, moves[i].san)
				);
			if(i+1<length){
				i+=1; 
				buffer.push(
					React.createElement(
						'div', 
						{
							className:(i===selected_move-1)? classes[i%2]+' selected':classes[i%2], 
							id:'m'+i, 
							key:'m'+i, 
							onClick: (e) => moveClicked(i+1)
						}, moves[i].san)
				);
			}

			render.push(
				React.createElement('div', {className:'move_item', key:'mi'+count}, buffer)
				);
			count++; 
			
		}

	}
	return (
		<div id="moves"> 
			<div id="moves_container">
				<div id="top_row">
					<div className="left">Moves</div>
					<div className="right">
						<span className={'color '+colorToMove} /> to move
					</div>
				</div>
				
				<div id="table_container">
					<div className="move_button_container">
						<MoveButton onClick={()=>moveClicked(0)} altText="Go to first Move" button="first_move" />
						<MoveButton onClick={()=>moveClicked(selected_move-1)} altText="Go to previous Move" button="prev_move" />
						<MoveButton onClick={()=>moveClicked(selected_move+1)} altText="Go to next Move" button="next_move" />
						<MoveButton onClick={()=>moveClicked(999)} altText="Go to last Move" button="last_move" />
					</div>
						<div id="moves_table"> { render } </div>
				</div>
			</div>
		</div>
	)
}

export default Moves; 
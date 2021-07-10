import React from 'react'; 
import './Piece.css';
import Draggable from 'react-draggable';

let colorConv = color => {
	return color==='w' ? 'white' : 'black';
}


// let pieceToColor = piece => {
// 	return piece<0 ? -1 : 1; 
// }


const Piece = ({position, piece, onClick, dragStart, dragEnd, color}) => {
	let pieceClass = `piece ${piece} ${colorConv(color)}`;
	let properties = {'className': pieceClass, onDragEnd:dragEnd, onDragStart: (e)=>dragStart(e, position), onClick: onClick, draggable: 'true'}
	return React.createElement('div', properties);
}

export default Piece; 
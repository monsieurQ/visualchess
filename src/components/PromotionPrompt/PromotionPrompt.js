import React from 'react'; 
import './PromotionPrompt.css';

const PromotionPrompt = ({onClick, color, from, to}) => {
  	let square = document.getElementById(to);
	document.documentElement.style.setProperty('--square_size', square.clientWidth+'px');
  	let left = square.offsetLeft+19; //19px is the margin-left of the chessboard
  	let top = color==='black' 
  		? square.offsetTop-3*square.clientWidth
  		: square.offsetTop;

	return (
		<div className='promotion_prompt' style={{left: left+'px', top: top+'px'}}>
			<div className={`option q promotion_piece ${color}`} onClick={()=>onClick('q', from, to)} />
			<div className={`option n promotion_piece ${color}`}  onClick={()=>onClick('n', from, to)} />
			<div className={`option r promotion_piece ${color}`}  onClick={()=>onClick('r', from, to)} />
			<div className={`option b promotion_piece ${color}`} onClick={()=>onClick('b', from, to)} />
		</div>
	);
}
export default PromotionPrompt; 
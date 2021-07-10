import React from 'react'; 
import './MoveButton.css';

const MoveButton = ({altText, onClick, button}) =>{

	function clicked(e){
		e.preventDefault(); 
		onClick();
	}

	return ( 
		<button title={altText} onClick={clicked} className={button} />
	);
}

export default MoveButton;
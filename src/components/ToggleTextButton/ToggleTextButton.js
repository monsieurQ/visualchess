import React,{ useState } from 'react'; 
import './ToggleTextButton.css';

const ToggleTextButton = ({text, onClick, initialText=0}) => {
	const [display, setDisplay] = useState(initialText);

	function handleClick(){
		let oldDisplay = display; 
		setDisplay(display===0?1:0); 
		onClick(oldDisplay); 
	}

	return (<button onClick={handleClick} title={text[display]} className='toggleTextButton'> {text[display]} </button>);
}

export default ToggleTextButton; 
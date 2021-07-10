import React from 'react'; 
import './Button.css';

const Button = ({text, onClick}) => {
	return <span value={text} onClick={onClick} className='button'>{text}</span>;
}
export default Button; 
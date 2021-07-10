import React from 'react'; 
import './ImageButton.css';

const ImageButton = ({button, state, onClick, altText}) => {
	return (
		<button title={altText} className={'img_button '+button+' '+state} onClick={()=>onClick()} />
	);
}
export default ImageButton; 
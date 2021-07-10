import React from 'react';  
import './PopUp.css';  

const PopUp  = (props) => {
	return ( 
		<div id="popup" className='popup' onClick={()=>props.props.closePopup(false)}>  
			<div className='popup_inner' onClick={(e)=>e.stopPropagation()}>
				<span id="closepopup" className='pointer' value="Close Pop-up" onClick={()=>props.props.closePopup(false)}>X</span>  			
				{props.props.content}
				{/*<div className="input">
					<div className="input_title"> PGN </div>
					<div className="input_box"> 
						<textarea placeholder="Enter PGN" id="inputpgn"></textarea> 
					</div>
					<div class="inputsubmit">
						<span id="popupsubmit" class="pointer" value="submit">Import</span>
					</div>
				</div>  

				<div className="input">
					<div className="input_title"> Famous Games </div>
					<div className="collapsed"> 

					</div>
				</div>*/}
			</div>  
		</div>
	);  
}
export default PopUp;
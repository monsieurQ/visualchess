import React, {Component} from 'react'; 
import './PGNDialog.css';
import GamesList from './../GamesList/GamesList';


class PGNDialog extends Component{
	constructor(props){
		super(props);
		this.state = {
			closePopup: props.closePopup,
			input: '',
			games: '',
			loading: true
		}
	}

	componentDidMount(){
		this.loadStudy(); 
	}

	render(){
		return ( 
			<>
				<h1>PGN</h1> 
				<div className="inputclass">		
					<div className="inputbox"> 
						<textarea 
							placeholder="Enter PGN" 
							onChange={(e) => this.setInput(e.target.value)} 
							value={this.state.input}
							// value="https://lichess.org/game/export/6dFspuKY" 
							id="inputpgn" /> 
					</div>
					<div className="inputsubmit">
						<span 
							id="popupsubmit" 
							className='pointer popup_button' 
							value="submit" 
							onClick={()=>this.state.closePopup(this.state.input)}>
							Import
						</span>
					</div>
				</div>

				<h1> Famous Games  </h1>  
				{ this.state.loading ? <div class="loading_container" /> : '' }
				<GamesList games={this.state.games} closePopup={this.state.closePopup} />
			</>
		);
	}

	setInput(input){
		this.setState({input});
	}
	setGames(games){
		console.log('setGames', games);
		this.setState({games});
	}

	loadStudy = () => {
		fetch('https://morning-reef-63921.herokuapp.com/game?all=true')
	      	.then(res => res.json())
	     	.then(res => {
	        	this.setState({ loading: false, games: res});
        	});
	}


}

export default PGNDialog;
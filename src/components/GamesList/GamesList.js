import React from 'react'; 
import './GamesList.css';

const GamesList = ({games, close_popup}) => {

	let whiteplayer = /\[White\s"?(.*?)"?\]/; 
	let blackplayer = /\[Black\s"?(.*?)"?\]/; 
	let date = /\[Date\s"?(.*?)"?\]/; 
	let result = /\[Result\s"?(.*?)"?\]/;

	return (
		<div className="games_container">
			{ games && 	 
				games.map((i, c) => {
					return (
						<div key={c+'game'} onClick={() => close_popup(i)} className="game">
							<div className="players">
								{i.match(whiteplayer)[1] + " vs. " + i.match(blackplayer)[1] + " ("+i.match(result)[1]+")"} 
							</div>
							<div className="date">{i.match(date)[1]}</div>

						</div>
					);
				}) 
			}
		</div>
	);
}
export default GamesList;
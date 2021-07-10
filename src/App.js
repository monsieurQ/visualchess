import './App.css';
import React, { Component } from 'react';
import Moves from './components/Moves/Moves';
import PopUp from './components/PopUp/PopUp';
import ToggleTextButton from './components/ToggleTextButton/ToggleTextButton';
import ImageButton from './components/ImageButton/ImageButton';
import PGNDialog from './components/PGNDialog/PGNDialog';
import GamesList from './components/GamesList/GamesList';
import PromotionPrompt from './components/PromotionPrompt/PromotionPrompt';
import Draggable from 'react-draggable';

import * as ChessJS from 'chess.js';
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
const chess = new Chess();

const squareID = ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"];
const BOARD_ID = 'chessboard'; 
const AUTOPLAY_SPEED = 500; 
const SQUARE_SIZE = 100;
const CONTROL_CLASS = '--control'; // Variable in CSS for storing the ratio of attackers/defenders on a square 


class App extends Component {

  /*
  ----------------------------------------------------------------------------------------------------------------------------------
  ------------------------------------------------------------ REACT ---------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------
  */


  constructor(){
    super();

    this.state = {
      selected_move: 0,
      piece_clicked: false,
      fen_history: [chess.fen()], // all moves, each represented by fen 
      flipped: false,
      history: {}, // Single moves, each with from and to-squares and in SAN format 
      loaded_game: null, //PGN of loaded game 
      popUp: false, 
      show_control: true,
      weighted: false,
      players: false,
      result: '',
      show_pieces: true,
      promotion: {
        from: null,
        to: null,
        color: null
      },
      autoplay: false
    };  
  }

  /**
   * 
   * Each render gets every piece from chess.js. Pieces are rendered as children into the squares 
   * Board control is realized through the .square-bg children
   * List of played moves is passed to the Moves-component, which also displays game results 
   * 
   **/
  render(){
    chess.load(this.state.fen_history[this.state.selected_move]);
    let colorToMove = chess.turn();
    let arr = this.state.flipped ? Array.prototype.reverse.call(chess.board().flat()) : chess.board().flat();
    let squares_ids = this.state.flipped ? squareID.reverse() : squareID;

    let square_classes = ['light', 'dark'];
    let c = 0; 
    let players = this.state.players;
    return(
      <div className='container'>
        <h1 id="title">
          visual chess
        </h1>
        <div className="main"> 
          <div id={BOARD_ID} className='chessboard'> 
            {
              arr.map((square, i)=>{
                return square 
                ? 
                <div 
                  onDragOver={this.dragOverHandler} 
                  onDragLeave={this.dragLeaveHandler} 
                  onDrop={this.dropHandler} 
                  id={squares_ids[i]}
                  data-position={squares_ids[i]}
                  data-count={i}
                  key={squares_ids[i]} 
                  className={`square ${square_classes[c%2]}`}> 
                    <div className='square-bg'>
                      <div className='control-dark' /> 
                      <div className='control-light' />
                    </div> 
                    <div 
                      className={`piece ${this.colorConv(square.color)} ${square.type}`}
                      draggable='true'
                      data-position={squares_ids[i]}
                      onDragStart={this.dragStartHandler}
                      onDragEnd={this.dragEndHandler}
                      onClick={this.handlePieceClick}
                    />  
                </div>
                : 
                <div 
                  data-position={squares_ids[i]}
                  id={squares_ids[i]}
                  data-count={i}
                  onDragOver={this.dragOverHandler} 
                  onTouchStart={this.touchStartHandler}
                  onDragLeave={this.dragLeaveHandler} 
                  onClick={this.handleClick} 
                  onDrop={this.dropHandler} 
                  key={squares_ids[i]} 
                  className='square'> 
                    <div className='square-bg'>
                      <div className='control-dark' /> 
                      <div className='control-light' />
                    </div> 
                </div>         
            })
          }
          </div>

          {this.state.promotion.from ? 
            <PromotionPrompt 
              onClick={this.promotionHandler}
              from={this.state.promotion.from}
              to={this.state.promotion.to}
              color={this.state.promotion.color}

              />
              : ''
          }

          <aside>
            <Moves 
              onClick={this.moveClick} 
              selected_move={this.state.selected_move}
              moves={this.state.history}
              colorToMove={colorToMove}
              result={this.state.result}
              whiteplayer={this.state.whiteplayer}
              blackplayer={this.state.blackplayer}
              />

              <div className="cards">
                { players && 
                    <div className="players"> 
                      <div className="whiteplayer">{players.whiteplayer ? players.whiteplayer : 'Anonymous'}</div> 
                      <div className="blackplayer">{players.blackplayer ? players.blackplayer : 'Anonymous'}</div>
                    </div>
                }

                { this.state.result && 
                    <div className="result"> {this.state.result} </div> 
                } 
              </div>
              
              <div className="button_container">
                  <ImageButton 
                    button='pgn_button' 
                    altText='Enter PGN'
                    onClick={this.pgnClick}
                  />
                  <ImageButton 
                    button='play_button' 
                    altText='Turn Autoplay on'
                    state={this.toggleConvert(this.state.autoplay)}
                    onClick={this.handleAutoplayClick}  
                    />
                  <ToggleTextButton 
                    text={['Hide Pieces', 'Show Pieces']} 
                    initialText={0}
                    onClick={this.handleHideClick} />
                  <ToggleTextButton 
                    text={['Hide Board Control', 'Show Board Control']} 
                    initialText={0}
                    onClick={this.handleControlClick} />
              </div>

              {<footer> 
                <p>created using (a modified) <a alt="Chess.JS Github" href="https://github.com/jhlywa/chess.js/blob/master/README.md">chess.js</a></p>
                <p>piece design from <a href="lichess.org" alt="Lichess">lichess.org</a></p>
                <p>contact: <a href = "mailto: quirschnei@gmail.com">quirschnei@gmail.com</a></p>
              </footer>}
           
          </aside>
         
          
        </div>

        {this.state.popUp ?  
          <PopUp
             props={this.state.popUp}
          />  
          : ''}

      </div> 
    );
  } 
  
  componentDidMount(){
    document.addEventListener("keydown", this.keyDownHandler);
    if(this.state.show_control) this.showBoardControl();
  }


  /**
   * If show/hide pieces or show/hide Board control are triggered, no need to re-render (changes are done through DOM / CSS) 
   **/
  shouldComponentUpdate(nextProps, nextState){
    if(this.state.show_pieces!==nextState.show_pieces) return false;
    if(this.state.show_control!==nextState.show_control){
      this.showBoardControl(nextState.show_control);
      return false; 
    }
    return true;
  }

  /**
   * Highlights last move and calls showBoardControl after render 
   **/
  componentDidUpdate() {
    if(this.state.selected_move>0){ // For highlighting the last move
      this.removeClassFromAll('highlighted');
      try{
        this.highlightSquare(this.state.history[this.state.selected_move-1].to);
      }catch(err){
        console.error('Error:', err);
      }
    }
    if(this.state.show_control) this.showBoardControl();
  }

  /*
  ----------------------------------------------------------------------------------------------------------------------------------
  ---------------------------------------------------- EVENT HANLDERS --------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------
  */


  keyDownHandler = (e)=>{
    switch(e.keyCode){
      case 39: // Right arrow 
        e.preventDefault();
        if(this.state.selected_move+1<=this.state.fen_history.length-1){ 
          this.setState(prevState=>({selected_move: prevState.selected_move+1}));                
        }
        break;
      case 37: // Left arrow 
        e.preventDefault();
        if(this.state.selected_move>=1){
          this.setState(prevState=>({selected_move: prevState.selected_move-1}));
        }
        break;
      case 27: // esc-key
        e.preventDefault(); 
        if(this.state.popUp){
          this.setState({popUp: false});
        } else if(this.state.promotion){
          this.closePromotionPrompt();
        }
        break;
      default: break; 
    }
  }

  dragStartHandler = (e) => { // e: dragEvent
    console.log('dragStart', e);
    let square = e.target.dataset.position;
    e.dataTransfer.effectAllowed = "all"
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", square);
    requestAnimationFrame(function () {
      e.target.classList.add('hide');
    });
    this.highlightMoves(square);   
  }

  dragEndHandler = (e) =>{
    e.preventDefault();
    requestAnimationFrame(function () {
      e.target.classList.remove('hide');
    }); 
  }

  dropHandler = (e) => {
    e.preventDefault();
    let target = e.target.dataset.position;
     requestAnimationFrame(function () {
      e.target.classList.remove('dragover');
    });
    this.removeClassesFromAll('dragover', 'moveable'); 
    let origin = e.dataTransfer.getData('text/plain');
    if(this.newMove(origin, target)){
      this.removeClassesFromAll('moveable', 'active');
    }
  }

  dragOverHandler = (e) => {
    e.preventDefault(e);
    requestAnimationFrame(function () { 
      e.target.classList.add('dragover');
    });
  }
  
  dragLeaveHandler = (e) => {
    e.preventDefault(); 
    requestAnimationFrame(function () {
      e.target.classList.remove('dragover');
    }); 
  }

  handleControlClick = () => {  
    this.setState(prevState=> ({show_control: !prevState.show_control}));  
  }

  handleHideClick = () => {
    if(this.state.show_pieces){
      document.getElementById('chessboard').classList.add('hidepieces');
      this.setState({show_pieces: false});
    }else{
      document.getElementById('chessboard').classList.remove('hidepieces');
      this.setState({show_pieces: true});
    }
  }

  pgnClick = () =>{
    this.setState({popUp: {content: <PGNDialog closePopup={this.closePopup} />, closePopup: this.closePopup}});
  }

  moveClick = (number) => {
    if(number===999) number=this.state.history.length; // Last move 
    else if(number>this.state.history.length || number<0) return;  
    this.setState({selected_move:number});
  }

  /**
   * Calls the recursive autoplay function or updates state to stop autoplay-execution 
   **/
  handleAutoplayClick = () => {
    if(!this.state.autoplay){ 
      this.setState(state => ({
        autoplay: !state.autoplay 
      }), ()=>this.autoplay(this.state.selected_move, Object.keys(this.state.history).length));
    }else{
      this.setState(state => ({
        autoplay: !state.autoplay 
      }));
    } 
  }

  /**
   * Click-Listener for squares, calls newMove function 
   **/
  handleClick = (e) => {
    if(this.state.promotion.from){
      this.closePromotionPrompt(); 
      return;
    }

    let square = e.target.dataset.position;
    let clicked = this.state.piece_clicked; 

    if(clicked){
      if(this.newMove(clicked, square)){
        this.removeClassesFromAll('moveable', 'active');
        this.setState({piece_clicked: false});
      }else{
        console.log('Error in handleClick');
      }
    }
  }

  /**
   * Click-Listener for pieces
   **/
  handlePieceClick = (e) => {
    if(this.state.promotion.from){
      this.closePromotionPrompt(); 
      return;
    }

    let square = e.target.dataset.position;
    let clicked = this.state.piece_clicked;
    if(square===clicked){
      this.removeClassesFromAll('active', 'moveable');
      this.setState({piece_clicked: null});
      return; 
    }
    if(!clicked){
      if(this.pieceIsTurnColor(square)){
        document.getElementById(square).classList.add('active');
        this.highlightMoves(square);
        this.setState({piece_clicked: square});
      }
    }else{
      this.removeClassesFromAll('active', 'moveable');
      if(this.squaresOfSameColor(square, clicked)){ // If another piece of the same color is clicked, switch to that piece being active  
          document.getElementById(square).classList.add('active');
          this.highlightMoves(square);
          this.setState({piece_clicked: square});
      }else{ // Capture 
        if(this.newMove(clicked, square)){
          this.setState({piece_clicked: null});
        }
      }
    }
  }

  closePopup = (text) => {
    this.setState({popUp: false});
    if(text) this.loadPGN(text);
  }

  /*
  ----------------------------------------------------------------------------------------------------------------------------------
  ----------------------------------------------------        UTILITY        -------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------
  */


  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  /**
   * Recursive method, goes through all played moves, as long as uninterrupted by state 
   **/
  autoplay(point, end){
    console.log(point, end);
    ++point;
    if(point>end || !this.state.autoplay){
      this.setState({autoplay:false});
      return false;
    } 
    this.setState({selected_move: point});
    setTimeout(() => this.autoplay(point, end), AUTOPLAY_SPEED);
  }

  toggleConvert = (toggle) => toggle ? 'on' : 'off';  

  loadPGNfromServer(url){
    fetch(url)
      .then(res => res.text())
      .then(res => this.loadPGN(res));
  }

  /**
   * Loads a proveded PGN (format to save chess-games)
   * Passes it to chess.js and extracts titles and names of players and game result (if available) to display
   * Loads moves into state (history and fen_history), as chess.js does not allow to browse through 
   * the move history. As such, each position in the game is saved via the corresponding FEN-string  
   * Afterwards, chess.js is reset to the starting position 
   **/
  loadPGN(pgn){
    let load_result = chess.load_pgn(pgn);
    let headers = chess.header(); 
    let players = {};

    if(headers.Black){
      let content = headers.BlackTitle ? `[${headers.BlackTitle}] ${headers.Black}` : headers.Black; 
      players.whiteplayer = content; 
    }if(headers.White){
      let content = headers.WhiteTitle ? `[${headers.WhiteTitle}] ${headers.White}` : headers.White; 
      players.blackplayer = content;   
    }

    let result = headers.Result ? 'Result: ' + headers.Result : '';
    if(headers.Termination) result += ` (${headers.Termination})`; 
    
    if(load_result){
      let history = chess.history({verbose:true});
      let new_history = {}; 
      chess.reset();
      let fen_history = [chess.fen()];
      history.forEach((e, i)=>{
        chess.move(e);
        fen_history.push(chess.fen());
        new_history[i] = {from: e.from, to:e.to, san:e.san};
      });
      chess.load(fen_history[0]);
      this.setState({history: new_history, fen_history, loaded_game: pgn, selected_move: 0, result, players});

    }else console.log(load_result);
  }

  loadFEN(fen){
    let load_result = chess.load(fen);
    let fen_history = [chess.fen()];
    let history = {}; 
    this.setState({fen_history, history, selected_move: 0});
  }

  // If square is of format piece-square, remove piece (e.g. ba8 => a8) 
  cleanUpSquare = (square) => square.length>2 ? square.slice(1) : square;

  getOtherChessColor = () => chess.turn() === chess.WHITE ? chess.BLACK : chess.WHITE;
  
  getRatio(w, b){
    if(w===0&&b===0) return 0;  
    let sum = w + b; 
    let whiteshare = w/sum*100; 
    return whiteshare; 
  }

  colorConv = color => color==='w' ? 'white' : 'black';

  squaresOfSameColor = (one, two) => chess.get(one).color===chess.get(two).color;

  pieceIsTurnColor = (piece) => chess.get(piece).color === chess.turn();

  getRowFromSquare(square){ return Number(square.charAt(1)); }

  isOnPromotionSquare(square, color){
    return color==='w' ? this.getRowFromSquare(square)==8 : this.getRowFromSquare(square)==1; 
  }

  /*
  ----------------------------------------------------------------------------------------------------------------------------------
  ----------------------------------------------------     CHESS     ---------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------
  */


  /**
   * Called by the PromotionPromt-component, passes clicked option to newMove function and 
   **/
  promotionHandler = (piece, from, to) => {
    this.setState({promotion: {from: null, to:null, color:null}});
    this.newMove(from, to, piece);
  }

  openPromotionPrompt(from, to, color){ this.setState({promotion: {from, to, color}}); }

  closePromotionPrompt = () => { this.setState({promotion: {from: null, to:null, color:null}, piece_clicked: false}); }


  makeRandomMove(){
    let possible_moves = chess.moves({verbose:true});
    let move = possible_moves[this.getRandomInt(possible_moves.length)]; 
    this.newMove(move.from, move.to)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  /**
   * Method for handling new moves. Updates history (overrides if necessary) 
   * Checks for promotion (if a pawn reaches a respective square)
   * otherwise passes move to chess.js and updates state 
   **/
  newMove(from, to, promoteTo = false){
    let fen_history = [...this.state.fen_history]; 
    let history = Object.assign({}, this.state.history);
    let options = {from, to}; 

    if(this.state.selected_move<this.state.fen_history.length){ // Override if a previous move was selected
      fen_history = fen_history.slice(0, this.state.selected_move+1);
      let new_history = {}; 
      for(let [key, value] of Object.entries(history)){
        if(key>=this.state.selected_move) break; 
        new_history[key] = value; 
      }
        history = Object.assign({}, new_history);
    }

    if(promoteTo) options.promotion = promoteTo;
    else{
      if(this.isOnPromotionSquare(to, chess.turn()) && chess.get(from).type === 'p'){
        if(this.state.promotion.from===null){ 
          this.openPromotionPrompt(from, to, this.colorConv(chess.turn()));
          return;
        }else{
          options.promotion = promoteTo;
        } 
      }
    }

    let res = chess.move(options);
    
    if(res){
      fen_history.push(chess.fen());
      history[this.state.selected_move] = {from: options.from, to: options.to, san: res.san};
      if(chess.result()){ // If game over (for any reason)  
        this.setState(prevState => (
          {selected_move: prevState.selected_move+1, history, fen_history, result: chess.result()}
        ));
        return; 
      }
      this.setState(prevState => (
        {selected_move: prevState.selected_move+1, history, fen_history}
      ));
      return res.san; 
    }else{
      console.log('Error making new move: '+res);
      return false; 
    } 
  }

  /*
  ----------------------------------------------------------------------------------------------------------------------------------
  ----------------------------------------------------         DOM            ------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------------------------
  */


  highlightMoves(piece){
    chess.moves({square:piece, verbose:true}).forEach(move=>{
      this.highlightSquare(move.to, 'moveable'); 
    });
  }

  highlightSquare(square, highlightClass = 'highlighted'){
    document.getElementById(square).classList.add(highlightClass);
  }

  removeClassFromAll = remove => {
    document.querySelectorAll('.'+remove).forEach(el=>el.classList.remove(remove));
  }

  removeClassesFromAll = (...classes) => {
    classes.forEach(e => document.querySelectorAll('.'+e).forEach(el=>el.classList.remove(e)));
  }

  hideBoardControl = () => {
     this.removeClassFromAll('attacked');
  }

  /**
   * Shows which squares are controlled how much by which color
   * First removes all 
   * If a king is currently in check, only available moves (including blocks) are highlighted
   * Otherwise calls the defended_pieces_all funtion from chess.js, which returns the number of attackers 
   * and defenders for each square. 
   * The ratio for each square is calculated and displayed by updating the respective variable in CSS for
   * each square.  
   **/
  showBoardControl = (control_flag=undefined) => { 
    let show_control = (control_flag===undefined) ? this.state.show_control : control_flag;
    this.removeClassesFromAll('attacked', 'kingcheck');
    if(chess.in_check()){
      let square = document.getElementById(chess.get_king());
      square.classList.add('kingcheck');

      if(!show_control) return; 
      chess.moves({verbose:true}).forEach(move=>{
        let dom = document.getElementById(move.to);
        dom.classList.add('attacked');
        dom.style.setProperty(CONTROL_CLASS, '100%');
      });
      return;

    }
    if(!show_control) return; 
    let control = chess.defended_pieces_all(true, true, false);

    for(let [square, value] of Object.entries(control)){
      if(value.w>0||value.b>0){ 
        let dom = document.getElementById(square);
        dom.classList.add('attacked');
        let ratio = this.getRatio(value.w,value.b);
        dom.style.setProperty(CONTROL_CLASS, ratio+'%');
      }
    } 
  }  
}

export default App;

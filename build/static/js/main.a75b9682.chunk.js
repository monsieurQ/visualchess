(this.webpackJsonpvisualchess=this.webpackJsonpvisualchess||[]).push([[0],{23:function(e,t,o){},24:function(e,t,o){},25:function(e,t,o){},26:function(e,t,o){},27:function(e,t,o){},28:function(e,t,o){},29:function(e,t,o){},30:function(e,t,o){},31:function(e,t,o){},32:function(e,t,o){},46:function(e,t,o){"use strict";o.r(t);var n=o(0),s=o(1),a=o.n(s),i=o(5),r=o.n(i),c=(o(23),o(17)),l=o(3),u=o(7),d=o(8),h=o(10),m=o(9),p=(o(24),o(25),o(26),function(e){var t=e.altText,o=e.onClick,s=e.button;return Object(n.jsx)("button",{title:t,onClick:function(e){e.preventDefault(),o()},className:s})}),v=function(e){var t=e.moves,o=e.onClick,i=e.selected_move,r=e.colorToMove;function c(e){o(e)}Object(s.useEffect)((function(){if(0!==i){var e=document.querySelector("#moves_table"),t=20*Math.floor((i-1)/2)+20;e.clientHeight+e.scrollTop<=t?e.scrollTop=t-e.clientHeight:e.scrollTop>=t&&(e.scrollTop=t-20)}}));var l=[];if(t&&Object.keys(t).length>0)for(var u=["move_white","move_black"],d=Object.keys(t).length,h=1,m=function(e){var o=[];o.push(a.a.createElement("div",{className:"move_number",key:"mr"+h},h)),o.push(a.a.createElement("div",{className:e===i-1?u[e%2]+" selected":u[e%2],id:"m"+e,key:"m"+e,onClick:function(t){return c(e)}},t[e].san)),e+1<d&&(e+=1,o.push(a.a.createElement("div",{className:e===i-1?u[e%2]+" selected":u[e%2],id:"m"+e,key:"m"+e,onClick:function(t){return c(e+1)}},t[e].san))),l.push(a.a.createElement("div",{className:"move_item",key:"mi"+h},o)),h++,v=e},v=0;v<d;v++)m(v);return Object(n.jsx)("div",{id:"moves",children:Object(n.jsxs)("div",{id:"moves_container",children:[Object(n.jsxs)("div",{id:"top_row",children:[Object(n.jsx)("div",{className:"left",children:"Moves"}),Object(n.jsxs)("div",{className:"right",children:[Object(n.jsx)("span",{className:"color "+r})," to move"]})]}),Object(n.jsxs)("div",{id:"table_container",children:[Object(n.jsxs)("div",{className:"move_button_container",children:[Object(n.jsx)(p,{onClick:function(){return c(0)},altText:"Go to first Move",button:"first_move"}),Object(n.jsx)(p,{onClick:function(){return c(i-1)},altText:"Go to previous Move",button:"prev_move"}),Object(n.jsx)(p,{onClick:function(){return c(i+1)},altText:"Go to next Move",button:"next_move"}),Object(n.jsx)(p,{onClick:function(){return c(999)},altText:"Go to last Move",button:"last_move"})]}),Object(n.jsxs)("div",{id:"moves_table",children:[" ",l," "]})]})]})})},f=(o(27),function(e){return Object(n.jsx)("div",{id:"popup",className:"popup",onClick:function(){return e.props.closePopup(!1)},children:Object(n.jsxs)("div",{className:"popup_inner",onClick:function(e){return e.stopPropagation()},children:[Object(n.jsx)("span",{id:"closepopup",className:"pointer",value:"Close Pop-up",onClick:function(){return e.props.closePopup(!1)},children:"X"}),e.props.content]})})}),j=(o(28),function(e){var t=e.text,o=e.onClick,a=e.initialText,i=void 0===a?0:a,r=Object(s.useState)(i),c=Object(l.a)(r,2),u=c[0],d=c[1];return Object(n.jsxs)("button",{onClick:function(){var e=u;d(0===u?1:0),o(e)},title:t[u],className:"toggleTextButton",children:[" ",t[u]," "]})}),b=(o(29),function(e){var t=e.button,o=e.state,s=e.onClick,a=e.altText;return Object(n.jsx)("button",{title:a,className:"img_button "+t+" "+o,onClick:function(){return s()}})}),g=(o(30),o(31),function(e){var t=e.games,o=e.close_popup,s=/\[White\s"?(.*?)"?\]/,a=/\[Black\s"?(.*?)"?\]/,i=/\[Date\s"?(.*?)"?\]/,r=/\[Result\s"?(.*?)"?\]/;return Object(n.jsx)("div",{className:"games_container",children:t&&t.map((function(e,t){return Object(n.jsxs)("div",{onClick:function(){return o(e)},className:"game",children:[Object(n.jsx)("div",{className:"players",children:e.match(s)[1]+" vs. "+e.match(a)[1]+" ("+e.match(r)[1]+")"}),Object(n.jsx)("div",{className:"date",children:e.match(i)[1]})]},t+"game")}))})}),k=function(e){Object(h.a)(o,e);var t=Object(m.a)(o);function o(e){var n;return Object(u.a)(this,o),(n=t.call(this,e)).loadStudy=function(){fetch("https://morning-reef-63921.herokuapp.com/game?all=true").then((function(e){return e.json()})).then((function(e){n.setState({games:e})}))},n.state={closePopup:e.closePopup,input:"",games:""},n}return Object(d.a)(o,[{key:"componentDidMount",value:function(){this.loadStudy()}},{key:"render",value:function(){var e=this;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{children:"PGN"}),Object(n.jsxs)("div",{className:"inputclass",children:[Object(n.jsx)("div",{className:"inputbox",children:Object(n.jsx)("textarea",{placeholder:"Enter PGN",onChange:function(t){return e.setInput(t.target.value)},value:this.state.input,id:"inputpgn"})}),Object(n.jsx)("div",{className:"inputsubmit",children:Object(n.jsx)("span",{id:"popupsubmit",className:"pointer popup_button",value:"submit",onClick:function(){return e.state.closePopup(e.state.input)},children:"Import"})})]}),Object(n.jsx)("h1",{children:" Famous Games "}),Object(n.jsx)(g,{games:this.state.games,closePopup:this.state.closePopup})]})}},{key:"setInput",value:function(e){this.setState({input:e})}},{key:"setGames",value:function(e){console.log("setGames",e),this.setState({games:e})}}]),o}(s.Component),y=(o(32),function(e){var t=e.onClick,o=e.color,s=e.from,a=e.to,i=document.getElementById(a);document.documentElement.style.setProperty("--square_size",i.clientWidth+"px");var r=i.offsetLeft+19,c="black"===o?i.offsetTop-3*i.clientWidth:i.offsetTop;return Object(n.jsxs)("div",{className:"promotion_prompt",style:{left:r+"px",top:c+"px"},children:[Object(n.jsx)("div",{className:"option q promotion_piece ".concat(o),onClick:function(){return t("q",s,a)}}),Object(n.jsx)("div",{className:"option n promotion_piece ".concat(o),onClick:function(){return t("n",s,a)}}),Object(n.jsx)("div",{className:"option r promotion_piece ".concat(o),onClick:function(){return t("r",s,a)}}),Object(n.jsx)("div",{className:"option b promotion_piece ".concat(o),onClick:function(){return t("b",s,a)}})]})}),O=(o(33),o(11)),x=new("function"===typeof O?O:O.Chess),_=["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"],C="--control",S=function(e){Object(h.a)(o,e);var t=Object(m.a)(o);function o(){var e;return Object(u.a)(this,o),(e=t.call(this)).keyDownHandler=function(t){switch(t.keyCode){case 39:t.preventDefault(),e.state.selected_move+1<=e.state.fen_history.length-1&&e.setState((function(e){return{selected_move:e.selected_move+1}}));break;case 37:t.preventDefault(),e.state.selected_move>=1&&e.setState((function(e){return{selected_move:e.selected_move-1}}));break;case 27:t.preventDefault(),e.state.popUp?e.setState({popUp:!1}):e.state.promotion&&e.closePromotionPrompt()}},e.dragStartHandler=function(t){console.log("dragStart",t);var o=t.target.dataset.position;t.dataTransfer.effectAllowed="all",t.dataTransfer.dropEffect="move",t.dataTransfer.setData("text/plain",o),requestAnimationFrame((function(){t.target.classList.add("hide")})),e.highlightMoves(o)},e.dragEndHandler=function(e){e.preventDefault(),requestAnimationFrame((function(){e.target.classList.remove("hide")}))},e.dropHandler=function(t){t.preventDefault();var o=t.target.dataset.position;requestAnimationFrame((function(){t.target.classList.remove("dragover")})),e.removeClassesFromAll("dragover","moveable");var n=t.dataTransfer.getData("text/plain");e.newMove(n,o)&&e.removeClassesFromAll("moveable","active")},e.dragOverHandler=function(e){e.preventDefault(e),requestAnimationFrame((function(){e.target.classList.add("dragover")}))},e.dragLeaveHandler=function(e){e.preventDefault(),requestAnimationFrame((function(){e.target.classList.remove("dragover")}))},e.handleControlClick=function(){e.setState((function(e){return{show_control:!e.show_control}}))},e.handleHideClick=function(){e.state.show_pieces?(document.getElementById("chessboard").classList.add("hidepieces"),e.setState({show_pieces:!1})):(document.getElementById("chessboard").classList.remove("hidepieces"),e.setState({show_pieces:!0}))},e.pgnClick=function(){e.setState({popUp:{content:Object(n.jsx)(k,{closePopup:e.closePopup}),closePopup:e.closePopup}})},e.moveClick=function(t){if(999===t)t=e.state.history.length;else if(t>e.state.history.length||t<0)return;e.setState({selected_move:t})},e.handleAutoplayClick=function(){e.state.autoplay?e.setState((function(e){return{autoplay:!e.autoplay}})):e.setState((function(e){return{autoplay:!e.autoplay}}),(function(){return e.autoplay(e.state.selected_move,Object.keys(e.state.history).length)}))},e.handleClick=function(t){if(e.state.promotion.from)e.closePromotionPrompt();else{var o=t.target.dataset.position,n=e.state.piece_clicked;n&&(e.newMove(n,o)?(e.removeClassesFromAll("moveable","active"),e.setState({piece_clicked:!1})):console.log("Error in handleClick"))}},e.handlePieceClick=function(t){if(e.state.promotion.from)e.closePromotionPrompt();else{var o=t.target.dataset.position,n=e.state.piece_clicked;if(o===n)return e.removeClassesFromAll("active","moveable"),void e.setState({piece_clicked:null});n?(e.removeClassesFromAll("active","moveable"),e.squaresOfSameColor(o,n)?(document.getElementById(o).classList.add("active"),e.highlightMoves(o),e.setState({piece_clicked:o})):e.newMove(n,o)&&e.setState({piece_clicked:null})):e.pieceIsTurnColor(o)&&(document.getElementById(o).classList.add("active"),e.highlightMoves(o),e.setState({piece_clicked:o}))}},e.closePopup=function(t){e.setState({popUp:!1}),t&&e.loadPGN(t)},e.toggleConvert=function(e){return e?"on":"off"},e.cleanUpSquare=function(e){return e.length>2?e.slice(1):e},e.getOtherChessColor=function(){return x.turn()===x.WHITE?x.BLACK:x.WHITE},e.colorConv=function(e){return"w"===e?"white":"black"},e.squaresOfSameColor=function(e,t){return x.get(e).color===x.get(t).color},e.pieceIsTurnColor=function(e){return x.get(e).color===x.turn()},e.promotionHandler=function(t,o,n){e.setState({promotion:{from:null,to:null,color:null}}),e.newMove(o,n,t)},e.closePromotionPrompt=function(){e.setState({promotion:{from:null,to:null,color:null},piece_clicked:!1})},e.removeClassFromAll=function(e){document.querySelectorAll("."+e).forEach((function(t){return t.classList.remove(e)}))},e.removeClassesFromAll=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];t.forEach((function(e){return document.querySelectorAll("."+e).forEach((function(t){return t.classList.remove(e)}))}))},e.hideBoardControl=function(){e.removeClassFromAll("attacked")},e.showBoardControl=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,o=void 0===t?e.state.show_control:t;if(e.removeClassesFromAll("attacked","kingcheck"),x.in_check()){var n=document.getElementById(x.get_king());if(n.classList.add("kingcheck"),!o)return;x.moves({verbose:!0}).forEach((function(e){var t=document.getElementById(e.to);t.classList.add("attacked"),t.style.setProperty(C,"100%")}))}else if(o)for(var s=x.defended_pieces_all(!0,!0,!1),a=0,i=Object.entries(s);a<i.length;a++){var r=Object(l.a)(i[a],2),c=r[0],u=r[1];if(u.w>0||u.b>0){var d=document.getElementById(c);d.classList.add("attacked");var h=e.getRatio(u.w,u.b);d.style.setProperty(C,h+"%")}}},e.state={selected_move:0,piece_clicked:!1,fen_history:[x.fen()],flipped:!1,history:{},loaded_game:null,popUp:!1,show_control:!0,weighted:!1,players:!1,result:"",show_pieces:!0,promotion:{from:null,to:null,color:null},autoplay:!1},e}return Object(d.a)(o,[{key:"render",value:function(){var e=this;x.load(this.state.fen_history[this.state.selected_move]);var t=x.turn(),o=this.state.flipped?Array.prototype.reverse.call(x.board().flat()):x.board().flat(),s=this.state.flipped?_.reverse():_,a=["light","dark"],i=this.state.players;return Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("h1",{id:"title",children:"visual chess"}),Object(n.jsxs)("div",{className:"main",children:[Object(n.jsx)("div",{id:"chessboard",className:"chessboard",children:o.map((function(t,o){return t?Object(n.jsxs)("div",{onDragOver:e.dragOverHandler,onDragLeave:e.dragLeaveHandler,onDrop:e.dropHandler,id:s[o],"data-position":s[o],"data-count":o,className:"square ".concat(a[0]),children:[Object(n.jsxs)("div",{className:"square-bg",children:[Object(n.jsx)("div",{className:"control-dark"}),Object(n.jsx)("div",{className:"control-light"})]}),Object(n.jsx)("div",{className:"piece ".concat(e.colorConv(t.color)," ").concat(t.type),draggable:"true","data-position":s[o],onDragStart:e.dragStartHandler,onDragEnd:e.dragEndHandler,onClick:e.handlePieceClick})]},s[o]):Object(n.jsx)("div",{"data-position":s[o],id:s[o],"data-count":o,onDragOver:e.dragOverHandler,onTouchStart:e.touchStartHandler,onDragLeave:e.dragLeaveHandler,onClick:e.handleClick,onDrop:e.dropHandler,className:"square",children:Object(n.jsxs)("div",{className:"square-bg",children:[Object(n.jsx)("div",{className:"control-dark"}),Object(n.jsx)("div",{className:"control-light"})]})},s[o])}))}),this.state.promotion.from?Object(n.jsx)(y,{onClick:this.promotionHandler,from:this.state.promotion.from,to:this.state.promotion.to,color:this.state.promotion.color}):"",Object(n.jsxs)("aside",{children:[Object(n.jsx)(v,{onClick:this.moveClick,selected_move:this.state.selected_move,moves:this.state.history,colorToMove:t,result:this.state.result,whiteplayer:this.state.whiteplayer,blackplayer:this.state.blackplayer}),Object(n.jsxs)("div",{className:"cards",children:[i&&Object(n.jsxs)("div",{className:"players",children:[Object(n.jsx)("div",{className:"whiteplayer",children:i.whiteplayer?i.whiteplayer:"Anonymous"}),Object(n.jsx)("div",{className:"blackplayer",children:i.blackplayer?i.blackplayer:"Anonymous"})]}),this.state.result&&Object(n.jsxs)("div",{className:"result",children:[" ",this.state.result," "]})]}),Object(n.jsxs)("div",{className:"button_container",children:[Object(n.jsx)(b,{button:"pgn_button",altText:"Enter PGN",onClick:this.pgnClick}),Object(n.jsx)(b,{button:"play_button",altText:"Turn Autoplay on",state:this.toggleConvert(this.state.autoplay),onClick:this.handleAutoplayClick}),Object(n.jsx)(j,{text:["Hide Pieces","Show Pieces"],initialText:0,onClick:this.handleHideClick}),Object(n.jsx)(j,{text:["Hide Board Control","Show Board Control"],initialText:0,onClick:this.handleControlClick})]}),Object(n.jsxs)("footer",{children:[Object(n.jsxs)("p",{children:["created using (a modified) ",Object(n.jsx)("a",{alt:"Chess.JS Github",href:"https://github.com/jhlywa/chess.js/blob/master/README.md",children:"chess.js"})]}),Object(n.jsxs)("p",{children:["piece design from ",Object(n.jsx)("a",{href:"lichess.org",alt:"Lichess",children:"lichess.org"})]}),Object(n.jsxs)("p",{children:["contact: ",Object(n.jsx)("a",{href:"mailto: quirschnei@gmail.com",children:"quirschnei@gmail.com"})]})]})]})]}),this.state.popUp?Object(n.jsx)(f,{props:this.state.popUp}):""]})}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.keyDownHandler),this.state.show_control&&this.showBoardControl()}},{key:"shouldComponentUpdate",value:function(e,t){return this.state.show_pieces===t.show_pieces&&(this.state.show_control===t.show_control||(this.showBoardControl(t.show_control),!1))}},{key:"componentDidUpdate",value:function(){if(this.state.selected_move>0){this.removeClassFromAll("highlighted");try{this.highlightSquare(this.state.history[this.state.selected_move-1].to)}catch(e){console.error("Error:",e)}}this.state.show_control&&this.showBoardControl()}},{key:"getRandomIntInclusive",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1)+e)}},{key:"autoplay",value:function(e,t){var o=this;if(console.log(e,t),++e>t||!this.state.autoplay)return this.setState({autoplay:!1}),!1;this.setState({selected_move:e}),setTimeout((function(){return o.autoplay(e,t)}),500)}},{key:"loadPGNfromServer",value:function(e){var t=this;fetch(e).then((function(e){return e.text()})).then((function(e){return t.loadPGN(e)}))}},{key:"loadPGN",value:function(e){var t=x.load_pgn(e),o=x.header(),n={};if(o.Black){var s=o.BlackTitle?"[".concat(o.BlackTitle,"] ").concat(o.Black):o.Black;n.whiteplayer=s}if(o.White){var a=o.WhiteTitle?"[".concat(o.WhiteTitle,"] ").concat(o.White):o.White;n.blackplayer=a}var i=o.Result?"Result: "+o.Result:"";if(o.Termination&&(i+=" (".concat(o.Termination,")")),t){var r=x.history({verbose:!0}),c={};x.reset();var l=[x.fen()];r.forEach((function(e,t){x.move(e),l.push(x.fen()),c[t]={from:e.from,to:e.to,san:e.san}})),x.load(l[0]),this.setState({history:c,fen_history:l,loaded_game:e,selected_move:0,result:i,players:n})}else console.log(t)}},{key:"loadFEN",value:function(e){x.load(e);var t=[x.fen()];this.setState({fen_history:t,history:{},selected_move:0})}},{key:"getRatio",value:function(e,t){return 0===e&&0===t?0:e/(e+t)*100}},{key:"getRowFromSquare",value:function(e){return Number(e.charAt(1))}},{key:"isOnPromotionSquare",value:function(e,t){return"w"===t?8==this.getRowFromSquare(e):1==this.getRowFromSquare(e)}},{key:"openPromotionPrompt",value:function(e,t,o){this.setState({promotion:{from:e,to:t,color:o}})}},{key:"makeRandomMove",value:function(){var e=x.moves({verbose:!0}),t=e[this.getRandomInt(e.length)];this.newMove(t.from,t.to)}},{key:"getRandomInt",value:function(e){return Math.floor(Math.random()*e)}},{key:"newMove",value:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=Object(c.a)(this.state.fen_history),s=Object.assign({},this.state.history),a={from:e,to:t};if(this.state.selected_move<this.state.fen_history.length){n=n.slice(0,this.state.selected_move+1);for(var i={},r=0,u=Object.entries(s);r<u.length;r++){var d=Object(l.a)(u[r],2),h=d[0],m=d[1];if(h>=this.state.selected_move)break;i[h]=m}s=Object.assign({},i)}if(o)a.promotion=o;else if(this.isOnPromotionSquare(t,x.turn())&&"p"===x.get(e).type){if(null===this.state.promotion.from)return void this.openPromotionPrompt(e,t,this.colorConv(x.turn()));a.promotion=o}var p=x.move(a);return p?(n.push(x.fen()),s[this.state.selected_move]={from:a.from,to:a.to,san:p.san},x.result()?void this.setState((function(e){return{selected_move:e.selected_move+1,history:s,fen_history:n,result:x.result()}})):(this.setState((function(e){return{selected_move:e.selected_move+1,history:s,fen_history:n}})),p.san)):(console.log("Error making new move: "+p),!1)}},{key:"highlightMoves",value:function(e){var t=this;x.moves({square:e,verbose:!0}).forEach((function(e){t.highlightSquare(e.to,"moveable")}))}},{key:"highlightSquare",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"highlighted";document.getElementById(e).classList.add(t)}}]),o}(s.Component),w=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,47)).then((function(t){var o=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;o(e),n(e),s(e),a(e),i(e)}))};r.a.render(Object(n.jsx)(S,{}),document.getElementById("root")),w()}},[[46,1,2]]]);
//# sourceMappingURL=main.a75b9682.chunk.js.map
////////////////////////////////////////////////////////////
// GAME v1.0
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

//puzzle settings
var waterPuzzleSettings = {
						colors:[
									{fill:'#009687', top:'#4cb5ab'},
									{fill:'#2DB200', top:'#00D900'},
									{fill:'#B200B2', top:'#FF00FF'},
									{fill:'#FF7F00', top:'#FFB366'},
						]
	
};

var keypadPuzzleSettings = {
						puzzle:[
									{type:'even', text:'PRESS EVEN NUM'},
									{type:'odd', text:'PRESS ODD NUM'},
									{type:'even', text:'DON\'T PRESS ODD NUM'},
									{type:'odd', text:'DON\'T PRESS EVEN NUM'},
									{type:'random', text:'PRESS NUM [NUMBER]'},
									{type:'keycode', text:'PRESS NUM [NUMBER]'},
									{type:'exclude', text:'DON\'T PRESS NUM [NUMBER]'},
									{type:'range', text:'PRESS NUM [NUMBER] - [NUMBER2]'},
						]
	
}

var wirePuzzleSettings = {
						colors:['#f2900f','#2352af','#d6131d','#26a895'],
						stroke:15
	
}

var colorPuzzleSettings = {
						radius:25,
						colors:['#f2900f','#2352af','#d6131d','#26a895'],
	
}

var mazePuzzleSettings = {
						stroke:5,
						moveStroke:5,
						color:'#767A7D',
						moveColor:'#26DD67',
						puzzle:[
									{tween:5, lines:[{x:130, y:155}, {x:115, y:140}, {x:0, y:140}, {x:0, y:116}, {x:-96, y:116}, {x:-72, y:88}, {x:0, y:88},{x:0, y:65},{x:27, y:65},{x:28, y:113},{x:102, y:113},{x:37, y:45},{x:0, y:45},{x:0, y:0}]},
									{tween:5, lines:[{x:-133, y:155}, {x:-73, y:85}, {x:-27, y:85}, {x:-52, y:130}, {x:44, y:130}, {x:21, y:85},{x:69, y:85},{x:41, y:54},{x:-45, y:54},{x:0, y:0}]},
									{tween:5, lines:[{x:-140, y:155}, {x:-119, y:134}, {x:87, y:134}, {x:70, y:110}, {x:-65, y:110}, {x:-48, y:89}, {x:53, y:89},{x:0, y:63},{x:0, y:0}]},
									{tween:5, lines:[{x:0, y:155}, {x:0, y:109}, {x:-94, y:109}, {x:-66, y:76}, {x:72, y:76}, {x:49, y:50},{x:0, y:50},{x:0, y:0}]},
									{tween:5, lines:[{x:-76, y:155}, {x:-62, y:130}, {x:55, y:130}, {x:46, y:108}, {x:-33, y:108}, {x:-23, y:80},{x:28, y:80},{x:19, y:57},{x:0, y:57},{x:0, y:0}]},
									{tween:5, lines:[{x:140, y:155}, {x:128, y:137}, {x:-121, y:137}, {x:-99, y:112}, {x:98, y:112}, {x:80, y:91}, {x:0, y:91},{x:0, y:0}]},
						]//tween speed, lines last point always be x:0, y:0 which is the center point.
	
}

//level settings
var levelSettings = {
					level:[
							{timer:25000, interface:2},
							{timer:45000, interface:3},
							{timer:60000, interface:4},
							{timer:85000, interface:5},
							{timer:120000, interface:6},
							{timer:150000, interface:6},
							{timer:120000, interface:6},
							{timer:90000, interface:6},
							{timer:80000, interface:6},
							{timer:60000, interface:6},
					],
					waterLevel:[2,3,3,4], //not more than 4 tubes
					keypadLevel:[
							{increase:20, decrease:20, decreaseSpeed:.05},
							{increase:15, decrease:20, decreaseSpeed:.05},
							{increase:10, decrease:25, decreaseSpeed:.05},
							{increase:10, decrease:30, decreaseSpeed:.05},
					],
					wireLevel:[3,4,5,6], //not more than 6 wires
					colorLevel:[
							{progress:1, total:3, color:1, others:false},	
							{progress:1, total:4, color:1, others:false},			
							{progress:1, total:5, color:2, others:false},				
							{progress:1, total:6, color:3, others:false},							
							{progress:1, total:6, color:3, others:true},							
					],
					mazeLevel:[1,2,3,4] //not more than 4 puzzles
	
}

//game text display
var textDisplay = {
					insturction:'PRESS TO MOVE',
					defused:'DEFUSED',
					stage:'BOMB [NUMBER]',
					exitTitle:'EXIT GAME',
					exitMessage:'ARE YOU SURE YOU WANT\nTO QUIT GAME?',
					share:'SHARE YOUR SCORE',
					resultTitle:'BOMB [NUMBER]',
				}

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'Highscore on Defuse the Bomb is level [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Defuse the Bomb! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
var gameData = {paused:true, stageNum:0, surfaceW:545, surfaceH:510, container:[], puzzleNum:0, puzzle:['water','wire','color','maze','keypad'], finalPuzzle:[], instruction:false};
var levelData = {
					complete:false,
					puzzle:0,
					water:{level:0, status:true, total:0, meters:[]},
					wire:{level:0, status:true, total:0, power:0},
					color:{level:0, status:true, progress:0, total:0, select:[], collect:0},
					keypad:{level:0, status:true, solve:'', number:'', press:'', decrease:20, decreaseSpeed:.05, increase:20, progress:0, complete:100},
					maze:{level:0, status:true, total:0, puzzle:[]},
}

var interfaceData = {drag:false, gameDrag:false,zoom:false};
var timeData = {enable:false, startDate:null, nowDate:null, timer:0, oldTimer:0};
var waterData = {obj:[], colors:[], colorNum:0, speed:5, levelTopY:0, levelBottomY:130, rotateStart:-175, rotateMax:170, rotateRange:120, rotateDivide:6};
var wireData = {colors:[], colorNum:0, lines_arr:[], connect_arr:[], lineNum:0, dragW:270, dragH:340, indY:154, endY:-85, maxPower:400, safePower:250};
var colorData = {obj:[], array:[], rotateStart:-90, rotateMax:180};
var keyData = {obj:[], array:[], indX:160, endX:-100};
var mazeData = {obj:[], array:[], position:[], completeDelay:1}; 

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){	
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('main');
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		togglePop(true);
		toggleOption();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
		
		stopAudio();
		stopGame();
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
	});
	
	buttonDefuse.cursor = "pointer";
	buttonDefuse.addEventListener("click", function(evt) {
		playSound('soundSwitch');
		endGame(true);
	});
	
	buttonZoomout.cursor = "pointer";
	buttonZoomout.addEventListener("click", function(evt) {
		zoomInterface(true)
	});
	
	itemDefuseCover.addEventListener("click", function(evt) {
		
	});
	
	for(var n=0; n<waterData.obj.length; n++){
		waterData.obj[n].dec.tubeID = n;
		waterData.obj[n].dec.cursor = "pointer";
		waterData.obj[n].dec.addEventListener("click", function(evt) {
			playSound('soundSteam');
			toggleTubeLevel(evt.currentTarget.tubeID, false);
		});
		waterData.obj[n].dec.addEventListener("pressup", function(evt) {
			evt.currentTarget.gotoAndStop('default');
		});
		waterData.obj[n].dec.addEventListener("mousedown", function(evt) {
			evt.currentTarget.gotoAndStop('press');
		});
		
		waterData.obj[n].inc.tubeID = n;
		waterData.obj[n].inc.cursor = "pointer";
		waterData.obj[n].inc.addEventListener("click", function(evt) {
			playSound('soundSteam');
			toggleTubeLevel(evt.currentTarget.tubeID, true);
		});
		waterData.obj[n].inc.addEventListener("pressup", function(evt) {
			evt.currentTarget.gotoAndStop('default');
		});
		waterData.obj[n].inc.addEventListener("mousedown", function(evt) {
			evt.currentTarget.gotoAndStop('press');
		});
	}
	
	for(var n=0; n<colorData.obj.length; n++){
		colorData.obj[n].obj.colorID = n;
		colorData.obj[n].obj.cursor = "pointer";
		colorData.obj[n].obj.addEventListener("click", function(evt) {
			playSound('soundHover')
			toggleColor(evt.currentTarget.colorID, false);
		});
	}
	
	for(var n=0; n<keyData.obj.length; n++){
		keyData.obj[n].button.keyID = n;
		keyData.obj[n].button.cursor = "pointer";
		keyData.obj[n].button.addEventListener("mousedown", function(evt) {
			evt.currentTarget.gotoAndStop('press');
			keyData.obj[evt.currentTarget.keyID].text.y = keyData.obj[evt.currentTarget.keyID].text.oriY + 5;
		});
		keyData.obj[n].button.addEventListener("pressup", function(evt) {
			evt.currentTarget.gotoAndStop('default');
			keyData.obj[evt.currentTarget.keyID].text.y = keyData.obj[evt.currentTarget.keyID].text.oriY;
		});
		keyData.obj[n].button.addEventListener("click", function(evt) {
			playSound('soundKeypad');
			checkKeypadComplete(evt.currentTarget.keyID);
		});
	}
	
	var mazeButton = [buttonMazeLeft, buttonMazeRight, buttonMazeTop, buttonMazeBottom];
	for(var n=0; n<mazeButton.length; n++){
		mazeButton[n].cursor = "pointer";
		mazeButton[n].addEventListener("mousedown", function(evt) {
			evt.currentTarget.gotoAndStop('press');
		});
		mazeButton[n].addEventListener("pressup", function(evt) {
			evt.currentTarget.gotoAndStop('default');
		});
		mazeButton[n].addEventListener("click", function(evt) {
			playSound('soundMaze');
			startMazePuzzle(evt.currentTarget.mazeID);
		});
	}
	
	for(var n=0; n<6; n++){
		$.obj['surfaceBlock'+n].index = n;
		$.obj['surfaceBlock'+n].addEventListener("click", function(evt) {
			focusInterface(evt.target.index);
		});
	}
}

/*!
 * 
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 * 
 */
function togglePop(con){
	confirmContainer.visible = con;
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
		break;
			
		case 'game':
			gameContainer.visible = true;
			stopSoundLoop('musicMain');
			
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			stopGame();
			playSound('soundResult');
			
			resultTitleTxt.text = textDisplay.stage.replace('[NUMBER]', gameData.stageNum+1);
			
			saveGame(gameData.stageNum+1);
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

function setupGames(){
	for(var n=0; n<keypadPuzzleSettings.puzzle.length; n++){
		keyData.array.push(n);
	}
	
	for(var n=0; n<colorPuzzleSettings.colors.length; n++){
		wireData.colors.push(n);
	}
	
	for(var n=0; n<waterPuzzleSettings.colors.length; n++){
		waterData.colors.push(n);
	}
	
	mazeData.position = [
						{button:buttonMazeBottom, rotation:0},
						{button:buttonMazeTop, rotation:-180},
						{button:buttonMazeLeft, rotation:90},
						{button:buttonMazeRight, rotation:-90},
						
		
	];
}

/*!
 * 
 * START GAME - This is the function that runs to start game
 * 
 */
function startGame(){
	gameData.paused = false;
	
	gameData.stageNum = 0;
	levelData.level = 0;
	levelData.wire.level = 0;
	levelData.keypad.level = 0;
	levelData.maze.level = 0;
	levelData.color.level = 0;
	levelData.water.level = 0;
	
	instructionContainer.visible = false;
	shuffle(gameData.puzzle);
	
	prepareGame();
	//itemDefuseCover.visible = false;
	//buttonDefuseLock.visible = false;
}

/*!
 * 
 * BUILD INTERFACE - This is the function that runs to build interface
 * 
 */
function buildInterface(totalPuzzle){
	keypadContainer.visible = false;
	mazeContainer.visible = false;
	colorContainer.visible = false;
	wireContainer.visible = false;
	waterContainer.visible = false;
	
	for(var n=0; n<5; n++){
		$.obj['led'+n].gotoAndStop('default');
	}
	
	gameData.finalPuzzle = ['defuse'];
	gameData.container = [bombContainer];
	gameData.totalPuzzle = totalPuzzle;
	bombContainer.name = 'defuse';
	
	
	var gridLayout = [2,4,6];
	for(var n = 0; n<gridLayout.length; n++){
		if(totalPuzzle <= gridLayout[n]){
			gameData.grid = gridLayout[n];
			n = gridLayout.length;
		}
	}
	
	for(var n = 0; n<totalPuzzle; n++){
		if(gameData.finalPuzzle.length < totalPuzzle){
			if(gameData.finalPuzzle.indexOf(gameData.puzzle[gameData.puzzleNum]) == -1){
				var tagetContainer = null;
				if(gameData.puzzle[gameData.puzzleNum] == 'wire'){
					tagetContainer = wireContainer;
				}else if(gameData.puzzle[gameData.puzzleNum] == 'color'){
					tagetContainer = colorContainer;
				}else if(gameData.puzzle[gameData.puzzleNum] == 'water'){
					tagetContainer = waterContainer;
				}else if(gameData.puzzle[gameData.puzzleNum] == 'maze'){
					tagetContainer = mazeContainer;
				}else if(gameData.puzzle[gameData.puzzleNum] == 'keypad'){
					tagetContainer = keypadContainer;
				}
				
				levelData[gameData.puzzle[gameData.puzzleNum]].status = true;

				tagetContainer.name = gameData.puzzle[gameData.puzzleNum];
				gameData.container.push(tagetContainer);
				gameData.finalPuzzle.push(gameData.puzzle[gameData.puzzleNum]);
				gameData.puzzleNum++;
				if(gameData.puzzleNum > gameData.puzzle.length-1){
					shuffle(gameData.puzzle);
					gameData.puzzleNum = 0;
				}
			}else{
				gameData.puzzleNum++;
				n--;
			}
		}
	}
	
	for(var n=0; n<totalPuzzle-1; n++){
		$.obj['led'+n].gotoAndStop('off');
	}
	
	shuffle(gameData.container);
	positionInterface();
	
	stage.addEventListener("mousedown", function(evt) {
		toggleInterfaceEvent(evt, 'drag')
	});
	stage.addEventListener("pressmove", function(evt) {
		toggleInterfaceEvent(evt, 'move')
	});
	stage.addEventListener("pressup", function(evt) {
		toggleInterfaceEvent(evt, 'drop')
	});
}

function positionInterface(){	
	var pos = {x:0, y:0, startX:0, startY:0, spaceX:0, spaceY:0, col:2, row:2};
	var dragW = (pos.col * gameData.surfaceW);
	var dragH = (pos.row * gameData.surfaceH);
	
	if(viewport.isLandscape){
		if(gameData.grid == 2){
			pos.startX = pos.x = -(gameData.surfaceW/2);
			pos.spaceX = gameData.surfaceW;
		}else if(gameData.grid == 4){
			pos.startX = pos.x = -(gameData.surfaceW/2);
			pos.startY = pos.y = -(gameData.surfaceH/2);
			pos.spaceX = gameData.surfaceW;
			pos.spaceY = gameData.surfaceH;
		}else if(gameData.grid == 6){
			pos.col = 3;
			pos.startX = pos.x = -((gameData.surfaceW/2) * 2);
			pos.startY = pos.y = -(gameData.surfaceH/2);
			pos.spaceX = gameData.surfaceW;
			pos.spaceY = gameData.surfaceH;
		}
		
		interfaceData.areaX = (canvasW/2) - (dragW/2);
		interfaceData.areaY = (canvasH/2) - (dragH/4);
		interfaceData.areaW = (canvasW/2) + (dragW/2);
		interfaceData.areaH = (canvasH/2) + (dragH/4);
	}else{
		if(gameData.grid == 2){
			pos.col = 1;
			pos.startX = pos.x = 0;
			pos.startY = pos.y = -(gameData.surfaceH/2);
			pos.spaceY = gameData.surfaceH;
		}else if(gameData.grid == 4){
			pos.startX = pos.x = -(gameData.surfaceW/2);
			pos.startY = pos.y = -(gameData.surfaceH/2);
			pos.spaceX = gameData.surfaceW;
			pos.spaceY = gameData.surfaceH;
		}else if(gameData.grid == 6){
			pos.col = 2;
			pos.startX = pos.x = -((gameData.surfaceW/2));
			pos.startY = pos.y = -((gameData.surfaceH/2) * 2);
			pos.spaceX = gameData.surfaceW;
			pos.spaceY = gameData.surfaceH;
		}
		
		interfaceData.areaX = (canvasW/2) - (dragW/4);
		interfaceData.areaY = (canvasH/2) - (dragH/2);
		interfaceData.areaW = (canvasW/2) + (dragW/4);
		interfaceData.areaH = (canvasH/2) + (dragH/2);
	}
	
	for(var n = 0; n<6; n++){
		$.obj['surface'+n].visible = false;
		$.obj['surfaceBlock'+n].visible = false;
		$.obj['surfaceBlock'+n].hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, 0, 0));	
	}
	
	var countCol = 0;
	for(var n = 0; n<gameData.grid; n++){
		$.obj['surface'+n].visible = true;
		$.obj['surfaceBlock'+n].visible = true;
		$.obj['surfaceBlock'+n].hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-(gameData.surfaceW/2), -(gameData.surfaceH/2), gameData.surfaceW, gameData.surfaceH));	
		
		$.obj['surface'+n].x = pos.x;
		$.obj['surface'+n].y = pos.y;
		$.obj['surfaceBlock'+n].x = pos.x;
		$.obj['surfaceBlock'+n].y = pos.y;
		
		if(gameData.container[n] != undefined){
			gameData.container[n].x = pos.x;
			gameData.container[n].y = pos.y;
			gameData.container[n].visible = true;
		}
		
		pos.x += pos.spaceX;
		countCol++;
		
		if(countCol > pos.col-1){
			pos.x = pos.startX;
			
			countCol = 0;
			pos.y += pos.spaceY;
		}
	}
	
	for(var n = 0; n<6; n++){
		$.obj['surfaceBlock'+n].visible = false;	
	}
	interfaceData.zoom = false;
	buttonZoomout.visible = false;
	zoomInterface(false);
}

/*!
 * 
 * ZOOM PAN FUNC - This is the function that runs to zoom and pan interface
 * 
 */
function focusInterface(id){
	if(interfaceData.zoom){
		return;
	}
	
	buttonZoomout.visible = true;
	interfaceData.zoom = true;
	
	for(var n = 0; n<6; n++){
		$.obj['surfaceBlock'+n].visible = false;	
	}
	
	var pos = {x:(canvasW/2) - $.obj['surfaceBlock'+id].x, y:(canvasH/2) - $.obj['surfaceBlock'+id].y};
	if(gameData.grid == 2){
		buttonZoomout.visible = false;
		interfaceData.zoom = false;
		
		pos.x = canvasW/2;
		pos.y = canvasH/2;
	}
	
	if(!gameData.instruction && buttonZoomout.visible){
		gameData.instruction = true;
		toggleInstruction(true);
	}
	
	TweenMax.to(interfaceContainer, .5, {x:pos.x, y:pos.y, scaleX:1, scaleY:1, overwrite:true});
}

function zoomInterface(con){
	for(var n = 0; n<6; n++){
		$.obj['surfaceBlock'+n].visible = true;	
	}

	var pos = {x:(canvasW/2), y:(canvasH/2), scale:.55};
	if(con){
		interfaceData.zoom = false;
		buttonZoomout.visible = false;
		pos.scale = 1;
	}
	
	TweenMax.to(interfaceContainer, .5, {x:pos.x, y:pos.y, scaleX:.55, scaleY:.55, overwrite:true});
}

function toggleInterfaceEvent(obj, con){
	if(!interfaceData.zoom){
		return;
	}
	
	if(interfaceData.gameDrag){
		return;
	}
	
	switch(con){
		case 'drag':
			toggleInstruction(false);
			interfaceContainer.offset = {x:interfaceContainer.x-(obj.stageX), y:interfaceContainer.y-(obj.stageY)};
		break;
		
		case 'move':
			interfaceContainer.x = (obj.stageX) + interfaceContainer.offset.x;
			interfaceContainer.y = (obj.stageY) + interfaceContainer.offset.y;
			
			var dragW = (3 * gameData.surfaceW)/2;
			dragWithinArea(interfaceContainer, interfaceData.areaX, interfaceData.areaW, interfaceData.areaY, interfaceData.areaH);
		break;
		
		case 'drop':
		break;
	}
}

function toggleInstruction(con){
	if(con){
		instructionContainer.visible = true;
		startAnimateIcon(instructionContainer, .3);
	}else{
		instructionContainer.visible = false;
		stopAnimateIcon(instructionContainer);
	}
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateIcon(obj, speed){
	TweenMax.to(obj, speed, {alpha:.5, overwrite:true, onComplete:function(){
		TweenMax.to(obj, speed, {alpha:1, overwrite:true, onComplete:function(){
			startAnimateIcon(obj, speed);
		}});	
	}});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateIcon(obj){
	TweenMax.killTweensOf(obj);
	obj.alpha = 1;
}

/*!
 * 
 * PREPARE GAME - This is the function that runs to prepare game
 * 
 */
function prepareGame(){
	//reset
	levelData.puzzle = 0;
	levelData.complete = false;
	itemDefuseCover.visible = true;
	buttonDefuseLock.visible = true;
	bombTimerTxt.visible = true;
	bombDefusedTxt.visible = false;
	stageTxt.visible = false;
	interfaceContainer.visible = true;
	itemExplode.visible = false;
	
	$.obj['waterled'].gotoAndStop('off');
	$.obj['wireled'].gotoAndStop('off');
	$.obj['keypadled'].gotoAndStop('off');
	$.obj['mazeled'].gotoAndStop('off');
	$.obj['colorled'].gotoAndStop('off');
	
	//water
	levelData.water.total = levelSettings.waterLevel[levelData.water.level];
	waterData.colorNum = 0;
	shuffle(waterData.colors);
	
	for(var n=0; n<4; n++){
		var randomLevel = randomIntFromInterval(waterData.levelTopY, waterData.levelBottomY);		
		waterData.obj[n].top.y = waterData.obj[n].fill.y = waterData.obj[n].fill.level = randomLevel;
		waterData.obj[n].con.level = randomIntFromInterval(waterData.levelTopY, waterData.levelBottomY);
		
		var randomIndex = waterData.colors[waterData.colorNum];
		waterData.obj[n].fill.graphics.beginFill(waterPuzzleSettings.colors[randomIndex].fill).drawRect(0, 0, 43, 215);
		waterData.obj[n].top.graphics.beginFill(waterPuzzleSettings.colors[randomIndex].top).drawCircle(0,0,21);
		waterData.colorNum++;
		if(waterData.colorNum > waterData.colors.length-1){
			waterData.colorNum = 0;
			shuffle(waterData.colors);
		}

		if(n < levelData.water.total){
			waterData.obj[n].con.visible = true;
		}else{
			waterData.obj[n].con.visible = false;
		}
	}
	
	if(levelData.water.total == 2){
		waterTubeContainer.x = 320 - ((levelData.water.total) * 80);
		waterTubeContainer.x -= 80;
	}else if(levelData.water.total == 3){
		waterTubeContainer.x = 320 - ((levelData.water.total) * 80);
		waterTubeContainer.x -= 40;
	}else if(levelData.water.total == 4){
		waterTubeContainer.x = 0;
	}
	
	levelData.water.meters = [];
	var waterDescString = '';
	var waterDivide = waterData.rotateRange / waterData.rotateDivide;
	for(var n=0; n<levelData.water.total; n++){
		if(n > 0){
			waterDescString += ' , ';
		}
		
		var newMeter = waterDivide * randomIntFromInterval(0,waterData.rotateDivide);
		waterDescString += newMeter;
		levelData.water.meters.push(newMeter);
	}
	waterDescTxt.text = waterDescString;
	updateWaterLevel();
	
	//keypad
	keyData.arrayIndex = 0;
	itemKeypadInd.x = keyData.indX;
	
	levelData.keypad.progress = 0;
	levelData.keypad.decrease = levelSettings.keypadLevel[levelData.keypad.level].decrease;
	levelData.keypad.decreaseSpeed = levelSettings.keypadLevel[levelData.keypad.level].decreaseSpeed;
	levelData.keypad.increase = levelSettings.keypadLevel[levelData.keypad.level].increase;
	
	shuffle(keyData.array);
	startRandomKeypad();
	
	//wire
	levelData.wire.total = levelSettings.wireLevel[levelData.wire.level];
	levelData.wire.power = 0;
	itemWireInd.y = wireData.indY;
	
	wireData.colorNum = 0;
	shuffle(wireData.colors);
	
	var availableHole = [];
	var availablePlug = [];
	
	var pos = {startX:18, startY:((wireData.dragH/2) - ((levelData.wire.total * 50)/2))+25, spaceX:250, spaceY:50};
	for(var n=0; n<6; n++){		
		wireData.connect_arr[n].hole.x = pos.startX;
		wireData.connect_arr[n].hole.y = pos.startY;
		
		wireData.connect_arr[n].connector.x = pos.startX+pos.spaceX;
		wireData.connect_arr[n].connector.y = pos.startY;
		
		wireData.lines_arr[n].lines[0].point.x = pos.startX + pos.spaceX + 40;
		wireData.lines_arr[n].lines[0].point.y = pos.startY;
		
		wireData.connect_arr[n].connector.x = randomIntFromInterval(100,200);
		wireData.connect_arr[n].connector.y = randomIntFromInterval(100,300);
			
		pos.startY += pos.spaceY;
		
		if(n < levelData.wire.total){
			availableHole.push(n);
			availablePlug.push(n);
			
			wireData.connect_arr[n].hole.visible = true;
			wireData.connect_arr[n].connector.connected = null;
			wireData.connect_arr[n].connector.gotoAndStop('default');
			wireData.connect_arr[n].connector.visible = true;
			wireData.lines_arr[n].drawLine.visible = true;
			wireData.lines_arr[n].drawLine.colorHex = wirePuzzleSettings.colors[wireData.colors[wireData.colorNum]];
			wireData.colorNum++;
			if(wireData.colorNum > wireData.colors.length-1){
				wireData.colorNum = 0;
				shuffle(wireData.colors);
			}
		}else{
			wireData.connect_arr[n].hole.visible = false;
			wireData.connect_arr[n].connector.visible = false;
			wireData.lines_arr[n].drawLine.visible = false;
		}
		
		adjustCenterPoint(n);
	}
	
	shuffle(availableHole);
	shuffle(availablePlug);
	
	var totalMinWire = availableHole.length-2;
	totalMinWire = totalMinWire < 2 ? 2 : totalMinWire;
	var totalWirePower = randomIntFromInterval(totalMinWire,availableHole.length);
	
	var totalPower = Math.round(wireData.safePower / totalWirePower);
	for(var n=0; n<availableHole.length; n++){
		var holeIndex = availableHole[n];
		wireData.connect_arr[holeIndex].hole.powerIndex = availablePlug[n];
		wireData.connect_arr[holeIndex].hole.powerNum = totalPower;
		wireData.connect_arr[holeIndex].hole.powerIncorrectNum = randomBoolean() == true ? 0 : wireData.maxPower;
		wireData.connect_arr[holeIndex].hole.powerConnectIndex = -1;
		wireData.connect_arr[holeIndex].hole.connected = false;
	}
	
	checkWirePlugComplete();
	
	//color
	levelData.color.progress = levelSettings.colorLevel[levelData.color.level].progress;
	startRandomColor();
	
	//maze
	levelData.maze.total = levelSettings.mazeLevel[levelData.maze.level];
	
	shuffle(mazeData.array);
	for(var n=0; n<mazePuzzleSettings.puzzle.length; n++){
		mazeData.obj[n].con.visible = false;
	}
	for(var n=0; n<mazeData.position.length; n++){
		mazeData.position[n].button.visible = false;
	}

	levelData.maze.puzzle = [];
	
	for(var n = 0; n<levelData.maze.total; n++){
		var mazeIndex = mazeData.array[n];
		mazeData.position[n].button.visible = true;
		mazeData.position[n].button.mazeID = mazeIndex;
		
		mazeData.obj[mazeIndex].con.visible = true;
		mazeData.obj[mazeIndex].con.rotation = mazeData.position[n].rotation;
		mazeData.obj[mazeIndex].tween = randomIntFromInterval(mazePuzzleSettings.puzzle[mazeIndex].tween-2,mazePuzzleSettings.puzzle[mazeIndex].tween+2);
		resetMazePuzzle(mazeIndex);
		
		levelData.maze.puzzle.push(mazeIndex);
	}
	
	//ready
	timeData.oldTimer = -1;
	timeData.countdown = levelSettings.level[levelData.level].timer + 1000;
	
	stageTxt.text = textDisplay.stage.replace('[NUMBER]', gameData.stageNum+1);
	stageTxt.visible = true;
	interfaceContainer.visible = false;
	buttonZoomout.visible = false;
	
	TweenMax.to(bombContainer, 2, {overwrite:true, onComplete:function(){
		buildInterface( levelSettings.level[levelData.level].interface);
		toggleGameTimer(true);
		playSound('soundNew');
		
		stageTxt.visible = false;
		interfaceContainer.visible = true;
	}});
}

/*!
 * 
 * MAZE GAME - This is the function that runs to for maze game funcs
 * 
 */
function resetMazePuzzle(id){
	mazeData.obj[id].move.x = mazeData.obj[id].move.lastX = mazePuzzleSettings.puzzle[id].lines[0].x;
	mazeData.obj[id].move.y = mazeData.obj[id].move.lastY = mazePuzzleSettings.puzzle[id].lines[0].y;
	mazeData.obj[id].stroke.graphics.clear();
}

function startMazePuzzle(id){
	if(!levelData.maze.status){
		return;	
	}
	
	mazeData.obj[id].move.x = mazeData.obj[id].move.lastX = mazePuzzleSettings.puzzle[id].lines[0].x;
	mazeData.obj[id].move.y = mazeData.obj[id].move.lastY = mazePuzzleSettings.puzzle[id].lines[0].y;
	
	mazeData.obj[id].stroke.graphics.clear();
	TweenMax.to(mazeData.obj[id].move, mazeData.obj[id].tween, {bezier:{type:"thru", values:mazePuzzleSettings.puzzle[id].lines, curviness:0, autoRotate:false}, ease:Linear.easeNone, repeat:0, overwrite:true, onComplete:onMazePuzzleComplete, onCompleteParams:[id], onUpdate:moveMazePuzzle, onUpdateParams:[id]});
}

function moveMazePuzzle(id){
	mazeData.obj[id].stroke.graphics.setStrokeStyle(mazePuzzleSettings.moveStroke);
	mazeData.obj[id].stroke.graphics.beginStroke(mazePuzzleSettings.moveColor);
	mazeData.obj[id].stroke.graphics.mt(mazeData.obj[id].move.lastX, mazeData.obj[id].move.lastY);
	mazeData.obj[id].stroke.graphics.lt(mazeData.obj[id].move.x, mazeData.obj[id].move.y);
	
	mazeData.obj[id].move.lastX = mazeData.obj[id].move.x;
	mazeData.obj[id].move.lastY = mazeData.obj[id].move.y;
}

function onMazePuzzleComplete(id){
	TweenMax.to(mazeData.obj[id].move, mazeData.completeDelay, {overwrite:true, onComplete:checkMazeComplete, onCompleteParams:[id]});
}

function checkMazeComplete(id){
	if(levelData.maze.status){
		var mazeComplete = 0;
		for(var n=0; n<levelData.maze.puzzle.length; n++){
			var mazeIndex = levelData.maze.puzzle[n];
			var distanceNum = getDistance(0, 0, mazeData.obj[mazeIndex].move.x, mazeData.obj[mazeIndex].move.y);
			if(distanceNum < 20){
				mazeComplete++;
			}
		}

		if(mazeComplete == levelData.maze.puzzle.length){
			checkGameComplete('maze');
		}else{
			resetMazePuzzle(id);	
		}
	}
}

/*!
 * 
 * KEYPAD GAME - This is the function that runs to for keypad game funcs
 * 
 */
function startRandomKeypad(){
	var randomIndex = keyData.array[keyData.arrayIndex];
	keyData.arrayIndex++;
	if(keyData.arrayIndex > keyData.array.length-1){
		keyData.arrayIndex = 0;
		shuffle(keyData.array);
	}
	
	var totalNumbers = '';
	var totalNumbers2 = '';
	levelData.keypad.number = '';
	levelData.keypad.type = '';
	levelData.keypad.press = '';
	levelData.keypad.array = [];
	
	var numbersArray = [0,1,2,3,4,5,6,7,8,9];
	if(keypadPuzzleSettings.puzzle[randomIndex].type == 'even'){
		
	}else if(keypadPuzzleSettings.puzzle[randomIndex].type == 'odd'){
		
	}else if(keypadPuzzleSettings.puzzle[randomIndex].type == 'random'){
		totalNumbers = randomIntFromInterval(1, 9);
		levelData.keypad.number = totalNumbers;
	}else if(keypadPuzzleSettings.puzzle[randomIndex].type == 'keycode'){
		var randomLength = randomIntFromInterval(1, 5);
		var randomNumbers = '';
		for(var n = 0; n<randomLength; n++){
			randomNumbers += '9';
		}
		totalNumbers = randomIntFromInterval(1, Number(randomNumbers));
		levelData.keypad.number = totalNumbers;
	}else if(keypadPuzzleSettings.puzzle[randomIndex].type == 'exclude'){
		var randomLength = randomIntFromInterval(1, 3);
		shuffle(numbersArray);
		
		for(var n = 0; n<randomLength; n++){
			levelData.keypad.array.push(numbersArray[n]);
			
			var comma = n == randomLength-1 ? '' : ',';
			totalNumbers += numbersArray[n] + comma;
		}
	}else if(keypadPuzzleSettings.puzzle[randomIndex].type == 'range'){
		var randomNumber = randomIntFromInterval(0, 9);
		var randomRange = randomIntFromInterval(2, 5);
		
		if((randomNumber+randomRange) > 9){
			levelData.keypad.array.push(randomNumber-randomRange);
			levelData.keypad.array.push(randomNumber);
		}else{
			levelData.keypad.array.push(randomNumber);
			levelData.keypad.array.push(randomNumber+randomRange);
		}
		totalNumbers = levelData.keypad.array[0];
		totalNumbers2 = levelData.keypad.array[1];
	}
	
	levelData.keypad.type = keypadPuzzleSettings.puzzle[randomIndex].type;
	
	var finalTest = keypadPuzzleSettings.puzzle[randomIndex].text.replace('[NUMBER]', totalNumbers)
	finalTest = finalTest.replace('[NUMBER2]', totalNumbers2)
	keypadDescTxt.text = finalTest;
}

function checkKeypadComplete(number){
	if(!levelData.keypad.status){
		return;
	}
	
	if(levelData.keypad.type == 'even'){
		if(isEven(number)){
			playSound('soundKeypadComplete');
			levelData.keypad.progress += levelData.keypad.increase;
		}else{
			playSound('soundKeypadError');
			levelData.keypad.progress -= levelData.keypad.decrease;
		}
		startRandomKeypad();
	}else if(levelData.keypad.type == 'odd'){
		if(!isEven(number)){
			playSound('soundKeypadComplete');
			levelData.keypad.progress += levelData.keypad.increase;
		}else{
			playSound('soundKeypadError');
			levelData.keypad.progress -= levelData.keypad.decrease;
		}
		startRandomKeypad();
	}else if(levelData.keypad.type == 'random' || levelData.keypad.type == 'keycode'){
		levelData.keypad.press += String(number);
		
		if(levelData.keypad.press.length == String(levelData.keypad.number).length){
			if(levelData.keypad.press == String(levelData.keypad.number)){
				playSound('soundKeypadComplete');
				levelData.keypad.progress += levelData.keypad.increase;
			}else{
				playSound('soundKeypadError');
				levelData.keypad.progress -= levelData.keypad.decrease;
			}
			startRandomKeypad();
			levelData.keypad.press = '';
		}
	}else if(levelData.keypad.type == 'exclude'){
		if(levelData.keypad.array.indexOf(number) == -1){
			playSound('soundKeypadComplete');
			levelData.keypad.progress += levelData.keypad.increase;
		}else{
			levelData.keypad.progress -= levelData.keypad.decrease;
		}
		startRandomKeypad();
	}else if(levelData.keypad.type == 'range'){
		if(number >= levelData.keypad.array[0] && number <= levelData.keypad.array[1]){
			playSound('soundKeypadComplete');
			levelData.keypad.progress += levelData.keypad.increase;
		}else{
			levelData.keypad.progress -= levelData.keypad.decrease;
		}
		startRandomKeypad();
	}
	
	if(levelData.keypad.progress > levelData.keypad.complete){
		keypadDescTxt.text = '';
		levelData.keypad.progress = 100;
		checkGameComplete('keypad');
	}
}

/*!
 * 
 * COLOR GAME - This is the function that runs to for color game funcs
 * 
 */
function startRandomColor(){
	itemColorPin.rotation = colorData.rotateStart;
	
	levelData.color.collect = 0;
	levelData.color.total = levelSettings.colorLevel[levelData.color.level].total;
	levelData.color.others = levelSettings.colorLevel[levelData.color.level].others;
	levelData.color.color = levelSettings.colorLevel[levelData.color.level].color;
	
	levelData.color.select = [];
	
	var colorSelect = [];
	var colorAll = [];
	for(var n=0; n<colorPuzzleSettings.colors.length; n++){
		colorAll.push(colorPuzzleSettings.colors[n]);
	}
	for(var n=0; n<6; n++){
		$.obj['color'+n].visible = false;
	}
	shuffle(colorAll);
	
	var pos = {x:135, y:-135, spaceX:60, scale:1};
	if(levelData.color.color == 2){
		 pos.x -= pos.spaceX/2;  
	}else if(levelData.color.color == 3){
		pos.spaceX = 40;
		pos.scale = .7;
		pos.x -= (pos.spaceX * 2)/2;  
	}
	
	for(var n=0; n<levelData.color.color; n++){
		colorSelect.push(colorAll[n]);
		$.obj['color'+n].visible = true;
		$.obj['color'+n].graphics.clear();
		$.obj['color'+n].graphics.beginFill(colorAll[n]).drawCircle(0, 0, colorPuzzleSettings.radius);
		$.obj['color'+n].x = pos.x;
		$.obj['color'+n].y = pos.y;
		$.obj['color'+n].scaleX = $.obj['color'+n].scaleY = pos.scale;
		
		pos.x += pos.spaceX;
	}
	
	for(var c=0; c<colorSelect.length; c++){
		var colorIndex = colorAll.indexOf(colorSelect[c]);
		if(colorIndex != -1){
			colorAll.splice(colorIndex, 1);
		}
	}	
	
	shuffle(colorData.array);
	for(var n=0; n<colorData.obj.length; n++){
		var colorIndex = colorData.array[n];
		colorData.obj[colorIndex].color.alpha = 0;
		colorData.obj[colorIndex].obj.correct = false;
		
		colorData.obj[colorIndex].color.graphics.clear();
		if(n < levelData.color.total){
			var randomColor = colorSelect[Math.floor(Math.random()*colorSelect.length)];
			colorData.obj[colorIndex].obj.correct = true;
			colorData.obj[colorIndex].color.graphics.beginFill(randomColor).drawCircle(0, 0, colorPuzzleSettings.radius);
		}else{
			if(levelData.color.others){
				var randomColor = colorAll[Math.floor(Math.random()*colorAll.length)];
				colorData.obj[colorIndex].color.graphics.beginFill(randomColor).drawCircle(0, 0, colorPuzzleSettings.radius);
			}
		}
	}
}

function toggleColor(id){
	if(!levelData.color.status){
		return;
	}
	
	var obj = colorData.obj[id].obj;
	var colorShape = colorData.obj[id].color;
	
	TweenMax.to(colorShape, .5, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(colorShape, .5, {delay:1, alpha:0, overwrite:true, onComplete:function(){
		
		}});
	}});
	
	if(obj.correct){
		if(levelData.color.select.indexOf(id) == -1){
			levelData.color.select.push(id);
			levelData.color.collect++;
		}
	}else{
		levelData.color.select = [];
		levelData.color.collect = 0;
	}
	
	checkColorComplete();
}

function checkColorComplete(){
	var colorProgress = levelData.color.collect / levelData.color.total * (180);
	TweenMax.to(itemColorPin, .5, {rotation:colorData.rotateStart + colorProgress, overwrite:true});
	
	if(levelData.color.collect == levelData.color.total){
		if(levelData.color.progress <= 1){
			for(var n=0; n<6; n++){
				$.obj['color'+n].visible = false;
			}	
			checkGameComplete('color');
		}else{
			levelData.color.progress--;
			startRandomColor();
			checkColorComplete();
		}
	}
}

/*!
 * 
 * CHECK PUZZLE COMPLETE - This is the function that runs to check puzzle complete
 * 
 */
function checkGameComplete(stage){
	playSound('soundUnlock');
	levelData[stage].status = false;
	
	levelData.puzzle++;
	$.obj[stage+'led'].gotoAndStop('on');
	
	for(var n=0; n<levelData.puzzle; n++){
		$.obj['led'+n].gotoAndStop('on');
	}
	
	if(levelData.puzzle == gameData.totalPuzzle-1){
		playSound('soundCover');
		itemDefuseCover.visible = false; 
		buttonDefuseLock.visible = false;
	}
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
	gameData.paused = true;
	TweenMax.killAll(false, true, false);
}

function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * WATER GAME - This is the function that runs for water game funcs
 * 
 */

function toggleTubeLevel(id, con){
	if(!levelData.water.status){
		return;
	}
	
	if(con){
		waterData.obj[id].fill.level -= waterData.speed;
	}else{
		waterData.obj[id].fill.level += waterData.speed;
	}
	
	waterData.obj[id].fill.level = waterData.obj[id].fill.level >= waterData.levelBottomY ? waterData.levelBottomY : waterData.obj[id].fill.level;
	waterData.obj[id].fill.level = waterData.obj[id].fill.level <= waterData.levelTopY ? waterData.levelTopY : waterData.obj[id].fill.level;
	
	TweenMax.to(waterData.obj[id].fill, .5, {y:waterData.obj[id].fill.level, overwrite:true, onUpdate:updateWaterLevel, onComplete:checkWaterMeterComplete});
	TweenMax.to(waterData.obj[id].top, .5, {y:waterData.obj[id].fill.level, overwrite:true});
}

function updateWaterLevel(){
	for(var n=0; n<4; n++){
		var distanceNum = getDistance(waterData.obj[n].fill.x, waterData.obj[n].fill.y, waterData.obj[n].fill.x, waterData.obj[n].con.level);		
		var newRotate = waterData.rotateStart;
		
		if(distanceNum < waterData.rotateMax){
			distanceNum = distanceNum / 100 * 250;
			newRotate = waterData.rotateStart + (waterData.rotateMax - distanceNum);
			newRotate = newRotate < waterData.rotateStart ? waterData.rotateStart : newRotate;
			newRotate = newRotate > waterData.rotateMax ? waterData.rotateMax : newRotate;
		}
		waterData.obj[n].pin.rotation = newRotate;
	}
}

function checkWaterMeterComplete(){
	
	var tubeComplete = 0;
	var range = 8;
	
	for(var n=0; n<levelData.water.total; n++){
		var getMeter = Math.round((waterData.obj[n].pin.rotation - waterData.rotateStart) / waterData.rotateMax * waterData.rotateRange);
		if(getMeter >= levelData.water.meters[n]-range && getMeter <= levelData.water.meters[n]+range){
			tubeComplete++;
		}
	}
	
	if(tubeComplete >= levelData.water.total){
		waterDescTxt.text = '';
		checkGameComplete('water');
	}
}

/*!
 * 
 * WIRE GAME - This is the function that runs for wire game funcs
 * 
 */
function checkWirePlugComplete(){	
	levelData.wire.power = 0;
	for(var n=0; n<levelData.wire.total; n++){
		if(wireData.connect_arr[n].hole.powerConnectIndex != -1){
			if(wireData.connect_arr[n].hole.powerIndex == wireData.connect_arr[n].hole.powerConnectIndex){
				levelData.wire.power += wireData.connect_arr[n].hole.powerNum;
			}else{
				levelData.wire.power += wireData.connect_arr[n].hole.powerIncorrectNum;
			}
		}
	}
	
	levelData.wire.power = levelData.wire.power > wireData.maxPower ? wireData.maxPower : levelData.wire.power;
	
	var powerLevel = levelData.wire.power / wireData.maxPower * (wireData.indY - wireData.endY);
	TweenMax.to(itemWireInd, 1, {y:wireData.indY - powerLevel, ease: Elastic.easeOut, overwrite:true, onComplete:function(){
		
	}});
	
	if(levelData.wire.power > 220 && levelData.wire.power < 280){
		checkGameComplete('wire');
	}
}

function toggleWireEvent(obj, con){
	if(gameData.paused){
		return;	
	}
	
	if(!levelData.wire.status){
		return;
	}
	
	switch(con){
		case 'drag':
			interfaceData.gameDrag = true;
			obj.target.offset = {x:obj.target.x-(obj.stageX), y:obj.target.y-(obj.stageY)};
			obj.target.gotoAndStop('default');
			if(obj.target.connected != null){
				obj.target.connected.connected = false;
				obj.target.connected.powerConnectIndex = -1;
				obj.target.connected = null
				
				checkWirePlugComplete();
				playSound('soundElectric');
			}
			wirePlugContainer.setChildIndex(obj.target, wirePlugContainer.getNumChildren()-1);
		break;
		
		case 'move':
			obj.target.x = (obj.stageX) + obj.target.offset.x;
			obj.target.y = (obj.stageY) + obj.target.offset.y;
			
			dragWithinArea(obj.target, 0, wireData.dragW, 0, wireData.dragH);
			adjustCenterPoint(obj.target.plugID);
		break;
		
		case 'drop':
			interfaceData.gameDrag = false;
			checkPlugConnect(obj.target);
			adjustCenterPoint(obj.target.plugID);
		break;
	}
}

function dragWithinArea(obj, startX, endX, startY, endY){
	if(obj.x <= startX){
		obj.x = startX;
	}else if(obj.x >= endX){
		obj.x = endX;
	}
	
	if(obj.y <= startY){
		obj.y = startY;
	}else if(obj.y >= endY){
		obj.y = endY;
	}
}

/*!
 * 
 * DRAW LINES - This is the function that runs to draw lines
 * 
 */
function createPlugLines(startX, startY, endX, endY){
	wireData.lines_arr.push({lines:[], drawLine:0});
	
	addPoint(startX, startY, true);
	addPoint(startX, startY, false);
	addPoint(startX, startY, false);
	addPoint(startX, startY, false);
	addPoint(endX, endY, true);
	
	wireData.lines_arr[wireData.lineNum].drawLine = new createjs.Shape();
	wirePlugLineContainer.addChild(wireData.lines_arr[wireData.lineNum].drawLine);
	
	wireData.lineNum++;
}
 
function addPoint(x, y, drag){
	var newPoint = new createjs.Shape();
	newPoint.x = x;
	newPoint.y = y;
	newPoint.lineNum = wireData.lineNum;
	wireData.lines_arr[wireData.lineNum].lines.push({point:newPoint});
	wirePlugLineContainer.addChild(newPoint); 
}

/*!
 * 
 * CHECK CONNECTOR - This is the function that runs to check connector
 * 
 */
function checkPlugConnect(connector){
	for(var n=0; n<wireData.connect_arr.length;n++){
		var targetPlugHole = wireData.connect_arr[n].hole;
		var distanceNum = getDistance(connector.x, connector.y, targetPlugHole.x, targetPlugHole.y);
		
		if(distanceNum < 50 && targetPlugHole.visible){
			if(targetPlugHole.connected == false){
				playSound('soundElectric');
				
				connector.x = targetPlugHole.x + 40;
				connector.y = targetPlugHole.y;
				connector.gotoAndStop('connected');
				connector.connected = targetPlugHole;
				targetPlugHole.connected = true;
				targetPlugHole.powerConnectIndex = connector.plugID;
				
				checkWirePlugComplete();
			}
		}
	}
}

function adjustCenterPoint(lineNum){
	var startPoint = wireData.lines_arr[lineNum].lines[0].point;
	var startCurvePoint = wireData.lines_arr[lineNum].lines[1].point;
	var centerPoint = wireData.lines_arr[lineNum].lines[2].point;
	var endCurvePoint = wireData.lines_arr[lineNum].lines[3].point;
	var endPoint = wireData.lines_arr[lineNum].lines[4].point;
	var extraNum = wireData.connect_arr[lineNum].connector.extraNum;
	
	endPoint.x = wireData.connect_arr[lineNum].connector.x+70;
	endPoint.y = wireData.connect_arr[lineNum].connector.y;
	
	startCurvePoint.x = startPoint.x + ((endPoint.x - startPoint.x)/100 * 30);
	startCurvePoint.y = startPoint.y - ((endPoint.y - startPoint.y)/100 * (50+extraNum));
	
	centerPoint.x = startPoint.x + ((endPoint.x - startPoint.x)/2);
	centerPoint.y = startPoint.y + ((endPoint.y - startPoint.y)/2);
	
	endCurvePoint.x = startPoint.x + ((endPoint.x - startPoint.x)/100 * 70);
	endCurvePoint.y = endPoint.y + ((endPoint.y - startPoint.y)/100 * (50+extraNum));
	
	redrawWireLine();
}

function redrawWireLine(){
	for(var n=0; n<wireData.lines_arr.length; n++){
		wireData.lines_arr[n].drawLine.graphics.clear();
		wireData.lines_arr[n].drawLine.graphics.setStrokeStyle(wirePuzzleSettings.stroke);
		wireData.lines_arr[n].drawLine.graphics.beginStroke(wireData.lines_arr[n].drawLine.colorHex);
		
		wireData.lines_arr[n].drawLine.graphics.moveTo(wireData.lines_arr[n].lines[0].point.x, wireData.lines_arr[n].lines[0].point.y);
		for(var p=0; p<wireData.lines_arr[n].lines.length; p++){
			if(wireData.lines_arr[n].lines.length - p > 2 && isEven(p)){
				wireData.lines_arr[n].drawLine.graphics.curveTo(wireData.lines_arr[n].lines[p+1].point.x, wireData.lines_arr[n].lines[p+1].point.y, wireData.lines_arr[n].lines[p+2].point.x, wireData.lines_arr[n].lines[p+2].point.y);
			}
		}
	}
}

/*!
 * 
 * END GAME - This is the function that runs for game end
 * 
 */
function endGame(con){
	if(!levelData.complete){
		levelData.wire.status = false;
		levelData.keypad.status = false;
		levelData.maze.status = false;
		levelData.color.status = false;
		levelData.water.status = false;

		levelData.complete = true;
		toggleGameTimer(false);
		buttonZoomout.visible = false;
		
		if(con){
			bombTimerTxt.visible = false;
			bombDefusedTxt.visible = true;
			
			playSound('soundDefuse');
			TweenMax.to(bombContainer, 3, {overwrite:true, onComplete:function(){
				updateGameLevel();
				prepareGame();
			}});
		}else{
			levelData.complete = true;
			playSound('soundExplode');
			
			itemExplode.visible = true;
			itemExplode.alpha = 0;
			TweenMax.to(itemExplode, .5, {alpha:1, overwrite:true, onComplete:function(){
				interfaceContainer.visible = false;
				TweenMax.to(itemExplode, 1, {delay:1, alpha:0, overwrite:true, onComplete:function(){
					goPage('result');
				}});
			}});
		}
	}
}

function updateGameLevel(){
	gameData.stageNum++;
	
	levelData.level++;
	levelData.level = levelData.level > levelSettings.level.length-1 ? levelSettings.level.length-1 : levelData.level;
	
	for(var n=0; n<gameData.finalPuzzle.length; n++){
		var currentPuzzle = gameData.finalPuzzle[n];
		if(currentPuzzle == 'wire'){
			levelData.wire.level++;
			levelData.wire.level = levelData.wire.level > levelSettings.wireLevel.length-1 ? levelSettings.wireLevel.length-1 : levelData.wire.level; 
		}else if(currentPuzzle == 'keypad'){
			levelData.keypad.level++;
			levelData.keypad.level = levelData.keypad.level > levelSettings.keypadLevel.length-1 ? levelSettings.keypadLevel.length-1 : levelData.keypad.level; 
		}else if(currentPuzzle == 'water'){
			levelData.water.level++;
			levelData.water.level = levelData.water.level > levelSettings.waterLevel.length-1 ? levelSettings.waterLevel.length-1 : levelData.water.level; 
		}else if(currentPuzzle == 'maze'){
			levelData.maze.level++;
			levelData.maze.level = levelData.maze.level > levelSettings.mazeLevel.length-1 ? levelSettings.mazeLevel.length-1 : levelData.maze.level; 
		}else if(currentPuzzle == 'color'){
			levelData.color.level++;
			levelData.color.level = levelData.color.level > levelSettings.colorLevel.length-1 ? levelSettings.colorLevel.length-1 : levelData.color.level; 
		}
	}
}

/*!
 * 
 * UPDATE GAME - This is the function that runs to loop game update
 * 
 */
function updateGame(){
	if(!gameData.paused){
		
	}
	
	if(timeData.enable){
		timeData.nowDate = new Date();
		timeData.elapsedTime = Math.floor((timeData.nowDate.getTime() - timeData.startDate.getTime()));
		timeData.timer = Math.floor((timeData.countdown) - (timeData.elapsedTime));
		
		if(timeData.oldTimer == -1){
			timeData.oldTimer = timeData.timer;
		}

		if(timeData.timer <= 0){
			//stop
			endGame(false);
		}else{
			if((timeData.oldTimer - timeData.timer) > 1000){
				if(timeData.timer < 1000){
					playSound('soundCountdownEnd');
				}else if(timeData.timer < 11000){
					playSound('soundCountdownClose');
				}else{
					playSound('soundCountdown');	
				}
				timeData.oldTimer = timeData.timer;
			}
			
			bombTimerTxt.text = millisecondsToTime(timeData.timer);
		}
	}
	
	//loop keypad
	var keyProgress = levelData.keypad.progress / levelData.keypad.complete * (keyData.indX - keyData.endX);
	TweenMax.to(itemKeypadInd, .5, {x:keyData.indX - keyProgress, overwrite:true});
	
	if(levelData.keypad.status){
		levelData.keypad.progress -= levelData.keypad.decreaseSpeed;
		levelData.keypad.progress = levelData.keypad.progress < 0 ? 0 : levelData.keypad.progress;
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
function toggleGameTimer(con){
	if($.editor.enable){
		return;	
	}
	
	if(con){
		timeData.startDate = new Date();
	}else{
		
	}
	timeData.enable = con;
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	return minutes+':'+seconds;
}
/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}


/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", gameData.stageNum+1);
	text = shareMessage.replace("[SCORE]", gameData.stageNum+1);
	
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}
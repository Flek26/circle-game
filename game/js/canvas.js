////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, instructionContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.obj = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	centerReg(logo);
	logoP = new createjs.Bitmap(loader.getResult('logoP'));
	centerReg(logoP);
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);	
	
	//game
	instructionContainer = new createjs.Container();
	itemInstruction = new createjs.Bitmap(loader.getResult('itemInstruction'));
	centerReg(itemInstruction);
	
	bombTimerTxt = new createjs.Text();
	bombTimerTxt.font = "25px liquid_crystalbold";
	bombTimerTxt.color = '#ffd400';
	bombTimerTxt.textAlign = "center";
	bombTimerTxt.textBaseline='alphabetic';
	bombTimerTxt.text = textDisplay.insturction;
	bombTimerTxt.y = 8;
	
	instructionContainer.addChild(itemInstruction, bombTimerTxt);
	
	var _frameW = 60;
	var _frameH = 64;
	var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":3, "width":_frameW, "height":_frameH};
	var _animations = {
						default: {
							frames: [0],
							speed: .2
						},
						off: {
							frames: [1],
							speed: .2
						},
						on: {
							frames: [2],
							speed: .2
						}
	};

	ledData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemLed').src],
		"frames": _frame,
		"animations": _animations
	});

    ledLight = new createjs.Sprite(ledData, "default");
	ledLight.framerate = 20;
	
	interfaceContainer = new createjs.Container();
	
	itemBomb = new createjs.Bitmap(loader.getResult('itemBomb'));
	centerReg(itemBomb);
	interfaceContainer.addChild(itemBomb);
	
	//bomb
	for(var n=0; n<6; n++){
		$.obj['surface'+n] = new createjs.Bitmap(loader.getResult('itemSurface'));
		centerReg($.obj['surface'+n]);
		interfaceContainer.addChild($.obj['surface'+n]);
	}
	
	bombContainer = new createjs.Container();
	itemInterfaceBomb = new createjs.Bitmap(loader.getResult('itemInterfaceBomb'));
	centerReg(itemInterfaceBomb);
	itemDefuseCover = new createjs.Bitmap(loader.getResult('itemDefuseCover'));
	centerReg(itemDefuseCover);
	
	buttonDefuse = new createjs.Bitmap(loader.getResult('buttonDefuse'));
	centerReg(buttonDefuse);
	buttonDefuse.x = 80;
	buttonDefuse.y = 70;
	
	buttonDefuseLock = new createjs.Bitmap(loader.getResult('buttonDefuseLock'));
	centerReg(buttonDefuseLock);
	buttonDefuseLock.x = 80;
	buttonDefuseLock.y = 70;
	
	bombTimerTxt = new createjs.Text();
	bombTimerTxt.font = "120px liquid_crystalbold";
	bombTimerTxt.color = '#ff0000';
	bombTimerTxt.textAlign = "center";
	bombTimerTxt.textBaseline='alphabetic';
	bombTimerTxt.text = '00:00';
	bombTimerTxt.x = 45;
	bombTimerTxt.y = -65;
	
	bombDefusedTxt = new createjs.Text();
	bombDefusedTxt.font = "80px liquid_crystalbold";
	bombDefusedTxt.color = '#ff0000';
	bombDefusedTxt.textAlign = "center";
	bombDefusedTxt.textBaseline='alphabetic';
	bombDefusedTxt.text = textDisplay.defused;
	bombDefusedTxt.x = 45;
	bombDefusedTxt.y = -80;
	
	bombContainer.addChild(itemInterfaceBomb, buttonDefuse, buttonDefuseLock, itemDefuseCover, bombTimerTxt, bombDefusedTxt);
	
	var pos = {startX:-180, startY:145, spaceX:0, spaceY:75};
	for(var n=0; n<5; n++){
		$.obj['led'+n] = ledLight.clone();
		
		$.obj['led'+n].x = pos.startX;
		$.obj['led'+n].y = pos.startY;
		
		pos.startX += pos.spaceX;
		pos.startY -= pos.spaceY;
		
		bombContainer.addChild($.obj['led'+n]);
	}
	
	//water
	waterContainer = new createjs.Container();
	waterTubeContainer = new createjs.Container();
	
	itemInterfaceWater = new createjs.Bitmap(loader.getResult('itemInterfaceWater'));
	centerReg(itemInterfaceWater);
	itemInterfaceWaterShine = new createjs.Bitmap(loader.getResult('itemInterfaceWaterShine'));
	centerReg(itemInterfaceWaterShine);
	
	$.obj['waterled'] = ledLight.clone();
	$.obj['waterled'].x = 160;
	$.obj['waterled'].y = 145;
	
	waterDescTxt = new createjs.Text();
	waterDescTxt.font = "35px liquid_crystalbold";
	waterDescTxt.color = '#fff';
	waterDescTxt.textAlign = "center";
	waterDescTxt.textBaseline='alphabetic';
	waterDescTxt.text = '22 , 20 , 20 , 20';
	waterDescTxt.x = -30;
	waterDescTxt.y = 160;
	
	waterContainer.addChild(itemInterfaceWater, waterTubeContainer, waterDescTxt, itemInterfaceWaterShine, $.obj['waterled']);
	
	var pos = {startX:-140, startY:-147, spaceX:80, spaceY:0};
	for(var n=0; n<4; n++){
		var newContainer = new createjs.Container();
		newContainer.x = pos.startX;
		newContainer.y = pos.startY;
		
		var newTube = new createjs.Bitmap(loader.getResult('itemTube'));
		var itemTubeShine = new createjs.Bitmap(loader.getResult('itemTubeShine'));
		newTube.x = 0;
		newTube.y = 0;

		var newTubeShape = new createjs.Shape();
		var newTubeFill = new createjs.Shape();
		var newTubeTop = new createjs.Shape();

		var radius = 20;
		newTubeShape.graphics.beginFill('red').drawRoundRectComplex(0, 0, 43, 140, 0, 0, radius, radius);
		newTubeShape.x = 18;
		newTubeShape.y = 5;

		newTubeFill.graphics.beginFill('green').drawRect(0, 0, 43, 180);
		newTubeFill.x = 18;
		newTubeFill.y = 0;
		newTubeFill.mask = newTubeShape;

		newTubeTop.graphics.beginFill('yellow').drawCircle(0,0,21);
		newTubeTop.x = 40;
		newTubeTop.y = 0;
		newTubeTop.mask = newTubeShape;
		newTubeTop.scaleY = .2;

		var _frameW = 34;
		var _frameH = 37;
		var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
		var _animations = {
							default: {
								frames: [0],
								speed: .2
							},
							press: {
								frames: [1],
								speed: .2
							}
		};

		buttonDecreaseData = new createjs.SpriteSheet({
			"images": [loader.getResult('buttonDecrease').src],
			"frames": _frame,
			"animations": _animations
		});

		buttonDecrease = new createjs.Sprite(buttonDecreaseData, "default");
		buttonDecrease.framerate = 20;
		buttonDecrease.x = 40 - 20;
		buttonDecrease.y = -28;

		var _frameW = 33;
		var _frameH = 37;
		var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
		var _animations = {
							default: {
								frames: [0],
								speed: .2
							},
							press: {
								frames: [1],
								speed: .2
							}
		};

		buttonIncreaseData = new createjs.SpriteSheet({
			"images": [loader.getResult('buttonIncrease').src],
			"frames": _frame,
			"animations": _animations
		});

		buttonIncrease = new createjs.Sprite(buttonIncreaseData, "default");
		buttonIncrease.framerate = 20;
		buttonIncrease.x = 40 + 20;
		buttonIncrease.y = -28;
		
		itemTubeMeter = new createjs.Bitmap(loader.getResult('itemTubeMeter'));
		centerReg(itemTubeMeter);
		itemTubeMeter.x = 40;
		itemTubeMeter.y = 200;
		
		itemTubeMeterPin = new createjs.Bitmap(loader.getResult('itemTubeMeterPin'));
		centerReg(itemTubeMeterPin);
		itemTubeMeterPin.x = 50;
		itemTubeMeterPin.y = 195;
		itemTubeMeterPin.regY = 23;
		
		waterData.obj.push({con:newContainer, dec:buttonDecrease, inc:buttonIncrease, pin:itemTubeMeterPin, fill:newTubeFill, top:newTubeTop});

		newContainer.addChild(newTube, newTubeFill, newTubeTop, itemTubeShine, buttonDecrease, buttonIncrease, itemTubeMeter, itemTubeMeterPin);
		waterTubeContainer.addChild(newContainer);
		
		pos.startX += pos.spaceX;
		pos.startY += pos.spaceY;
	}
	
	//wire
	wireContainer = new createjs.Container();
	wirePlugContainer = new createjs.Container();
	wirePlugLineContainer = new createjs.Container();
	
	itemInterfaceWire = new createjs.Bitmap(loader.getResult('itemInterfaceWire'));
	centerReg(itemInterfaceWire);
	
	$.obj['wireled'] = ledLight.clone();
	$.obj['wireled'].x = -160;
	$.obj['wireled'].y = -150;
	
	wireIndShape = new createjs.Shape();
	wireIndShape.graphics.beginFill('red').drawRoundRectComplex(0, 0, 43, 275, radius, radius, radius, radius);
	wireIndShape.x = -182;
	wireIndShape.y = -105;
	
	itemWireInd = new createjs.Bitmap(loader.getResult('itemWireInd'));
	centerReg(itemWireInd);
	itemWireInd.x = -150;
	itemWireInd.mask = wireIndShape;
	
	var radius = 40;
	wireLineShape = new createjs.Shape();
	wireLineShape.graphics.beginFill('red').drawRoundRectComplex(0, 0, 305, 340, radius, radius, radius, radius);
	wireLineShape.x = 0;
	wireLineShape.y = 0;
	
	wirePlugContainer.x = -100;
	wirePlugContainer.y = -170;
	wirePlugLineContainer.mask = wireLineShape;
	wirePlugContainer.addChild(wirePlugLineContainer);
	wireContainer.addChild(itemInterfaceWire, $.obj['wireled'], wirePlugContainer, itemWireInd);
	
	var _frameW = 150;
	var _frameH = 47;
	var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
	var _animations = {
						default: {
							frames: [0],
							speed: .2
						},
						connected: {
							frames: [1],
							speed: .2
						}
	};

	plugData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemWirePlug').src],
		"frames": _frame,
		"animations": _animations
	});
	
	plugWire = new createjs.Sprite(plugData, "default");
	plugWire.framerate = 20;
	
	for(var n=0; n<6; n++){
		var connector = plugWire.clone();
		var connectHole = new createjs.Bitmap(loader.getResult('itemWirePlugHole'));
		centerReg(connectHole);
		connectHole.connected = false;
		
		connector.plugID = n;
		connector.extraNum = randomIntFromInterval(-20,20);
		connector.connected = null;
		connector.cursor = "pointer";
		connector.addEventListener("mousedown", function(evt) {
			toggleWireEvent(evt, 'drag')
		});
		connector.addEventListener("pressmove", function(evt) {
			toggleWireEvent(evt, 'move')
		});
		connector.addEventListener("pressup", function(evt) {
			toggleWireEvent(evt, 'drop')
		});
		
		createPlugLines(pos.startX, pos.startY, pos.startX, pos.startY);
		
		wireData.connect_arr.push({hole:connectHole, connector:connector});
		wirePlugContainer.addChild(connector, connectHole);
	}
	
	//color
	colorContainer = new createjs.Container();
	colorDisplayContainer = new createjs.Container();
	colorSelectContainer = new createjs.Container();
	
	itemInterfaceColor = new createjs.Bitmap(loader.getResult('itemInterfaceColor'));
	centerReg(itemInterfaceColor);
	itemInterfaceColorShine = new createjs.Bitmap(loader.getResult('itemInterfaceColorShine'));
	centerReg(itemInterfaceColorShine);
	
	$.obj['colorled'] = ledLight.clone();
	$.obj['colorled'].x = -170;
	$.obj['colorled'].y = -140;
	
	itemColorPin = new createjs.Bitmap(loader.getResult('itemColorPin'));
	centerReg(itemColorPin);
	itemColorPin.regY = 42;
	itemColorPin.x = -35;
	itemColorPin.y = -110;
	
	for(var n=0; n<6; n++){
		$.obj['color'+n] = new createjs.Shape();
		$.obj['color'+n].graphics.beginFill('red').drawCircle(0, 0, 25);
		colorDisplayContainer.addChild($.obj['color'+n]);
	}	
	colorContainer.addChild(itemInterfaceColor, colorDisplayContainer, itemInterfaceColorShine, colorSelectContainer, itemColorPin, $.obj['colorled']);
	
	var pos = {resetX:-165, startX:-165, startY:-40, spaceX:84, spaceY:80, col:5};
	var colCount = 0;
	for(var n=0; n<15; n++){
		var newColor = new createjs.Bitmap(loader.getResult('itemColor'));
		centerReg(newColor);
		
		newColor.x = pos.startX;
		newColor.y = pos.startY;
		
		var newColorShape = new createjs.Shape();
		newColorShape.graphics.beginFill('red').drawCircle(0, 0, 25);
		newColorShape.x = pos.startX;
		newColorShape.y = pos.startY+2;
		
		pos.startX += pos.spaceX;
		colCount++;
		
		if(colCount >= pos.col){
			colCount = 0;
			pos.startX = pos.resetX;
			pos.startY += pos.spaceY;
		}
		
		colorData.obj.push({color:newColorShape, obj:newColor})
		colorSelectContainer.addChild(newColor, newColorShape);
		
		colorData.array.push(n);
	}
	
	//maze
	mazeContainer = new createjs.Container();
	mazePuzzleContainer = new createjs.Container();
	
	itemInterfaceMaze = new createjs.Bitmap(loader.getResult('itemInterfaceMaze'));
	centerReg(itemInterfaceMaze);
	
	$.obj['mazeled'] = ledLight.clone();
	$.obj['mazeled'].x = 0;
	$.obj['mazeled'].y = 0;
	
	var _frameW = 28;
	var _frameH = 76;
	var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
	var _animations = {
						default: {
							frames: [0],
							speed: .2
						},
						press: {
							frames: [1],
							speed: .2
						}
	};

	buttonLeftData = new createjs.SpriteSheet({
		"images": [loader.getResult('buttonMazeLeft').src],
		"frames": _frame,
		"animations": _animations
	});
	
	buttonMazeLeft = new createjs.Sprite(buttonLeftData, "default");
	buttonMazeLeft.framerate = 20;
	
	buttonMazeRight = new createjs.Sprite(buttonLeftData, "default");
	buttonMazeRight.framerate = 20;
	
	var _frameW = 66;
	var _frameH = 37;
	var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
	var _animations = {
						default: {
							frames: [0],
							speed: .2
						},
						press: {
							frames: [1],
							speed: .2
						}
	};

	buttonTopData = new createjs.SpriteSheet({
		"images": [loader.getResult('buttonMazeTop').src],
		"frames": _frame,
		"animations": _animations
	});
	
	buttonMazeTop = new createjs.Sprite(buttonTopData, "default");
	buttonMazeTop.framerate = 20;
	
	var _frameW = 66;
	var _frameH = 37;
	var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
	var _animations = {
						default: {
							frames: [0],
							speed: .2
						},
						press: {
							frames: [1],
							speed: .2
						}
	};

	buttonBottomData = new createjs.SpriteSheet({
		"images": [loader.getResult('buttonMazeBottom').src],
		"frames": _frame,
		"animations": _animations
	});
	
	buttonMazeBottom = new createjs.Sprite(buttonBottomData, "default");
	buttonMazeBottom.framerate = 20;
	
	buttonMazeLeft.x = -180;
	buttonMazeRight.x = 180;
	buttonMazeRight.scaleX = -1;
	buttonMazeTop.y = -180;
	buttonMazeBottom.y = 170;
	
	var radius = 35;
	var maskW = 305;
	mazeMask = new createjs.Shape();
	mazeMask.graphics.beginFill('red').drawRoundRectComplex(-(maskW/2), -(maskW/2), maskW, maskW, radius, radius, radius, radius);
	
	mazeContainer.addChild(itemInterfaceMaze, mazePuzzleContainer, $.obj['mazeled'], buttonMazeLeft, buttonMazeRight, buttonMazeTop, buttonMazeBottom);
	
	for(var n=0; n<mazePuzzleSettings.puzzle.length; n++){
		var newMazeContainer = new createjs.Container();
		var newMazeStroke = new createjs.Shape();
		var newMazeGuide = new createjs.Shape();
		newMazeGuide.graphics.clear();
		newMazeGuide.graphics.setStrokeStyle(mazePuzzleSettings.stroke);
		newMazeGuide.graphics.beginStroke(mazePuzzleSettings.color);
		newMazeGuide.graphics.moveTo(mazePuzzleSettings.puzzle[n].lines[0].x, mazePuzzleSettings.puzzle[n].lines[0].y);
		
		for(var l=0; l<mazePuzzleSettings.puzzle[n].lines.length; l++){
			newMazeGuide.graphics.lineTo(mazePuzzleSettings.puzzle[n].lines[l].x, mazePuzzleSettings.puzzle[n].lines[l].y);
		}
		
		mazeData.array.push(n);
		mazeData.obj.push({con:newMazeContainer, stroke:newMazeStroke, move:{x:0, y:0}});
		newMazeContainer.addChild(newMazeGuide, newMazeStroke);
		newMazeContainer.mask = mazeMask;
		mazePuzzleContainer.addChild(newMazeContainer);
	}
	
	//keypad
	keypadContainer = new createjs.Container();
	
	itemInterfaceKeypadShine = new createjs.Bitmap(loader.getResult('itemInterfaceKeypadShine'));
	centerReg(itemInterfaceKeypadShine);
	itemInterfaceKeypad = new createjs.Bitmap(loader.getResult('itemInterfaceKeypad'));
	centerReg(itemInterfaceKeypad);
	itemKeypadInd = new createjs.Bitmap(loader.getResult('itemKeypadInd'));
	centerReg(itemKeypadInd);
	
	$.obj['keypadled'] = ledLight.clone();
	$.obj['keypadled'].x = -170;
	$.obj['keypadled'].y = -135;
	
	itemKeypadInd.x = 0;
	itemKeypadInd.y = -144;
	
	keypadDescTxt = new createjs.Text();
	keypadDescTxt.font = "35px liquid_crystalbold";
	keypadDescTxt.color = '#fff';
	keypadDescTxt.textAlign = "center";
	keypadDescTxt.textBaseline='alphabetic';
	keypadDescTxt.text = '22 , 20 , 20 , 20';
	keypadDescTxt.x = 0;
	keypadDescTxt.y = -40;
	
	keypadContainer.addChild(itemInterfaceKeypad, itemInterfaceKeypadShine, itemKeypadInd, keypadDescTxt, $.obj['keypadled']);
	
	var _frameW = 70;
	var _frameH = 72;
	var _frame = {"regX":_frameW/2, "regY":_frameH/2, "count":2, "width":_frameW, "height":_frameH};
	var _animations = {
						default: {
							frames: [0],
							speed: .2
						},
						press: {
							frames: [1],
							speed: .2
						}
	};

	keypadData = new createjs.SpriteSheet({
		"images": [loader.getResult('buttonKeypad').src],
		"frames": _frame,
		"animations": _animations
	});
	
	keypad = new createjs.Sprite(keypadData, "default");
	keypad.framerate = 20;
	
	var pos = {resetX:-170, startX:-170, startY:120, spaceX:84, spaceY:80, col:5};
	var colCount = 0;
	for(var n=0; n<10; n++){
		var newKeypad = keypad.clone();		
		newKeypad.x = pos.startX;
		newKeypad.y = pos.startY;
		
		var newKeyText = new createjs.Text();
		newKeyText.font = "35px odin_roundedbold";
		newKeyText.color = '#3a4245';
		newKeyText.textAlign = "center";
		newKeyText.textBaseline='alphabetic';
		newKeyText.text = n;
		newKeyText.x = pos.startX;
		newKeyText.y = newKeyText.oriY = pos.startY+8;
		newKeyText.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, 0,0));	
		
		pos.startX += pos.spaceX;
		colCount++
		
		if(colCount >= pos.col){
			colCount = 0;
			pos.startX = pos.resetX;
			pos.startY -= pos.spaceY;
		}
		
		keyData.obj.push({button:newKeypad, text:newKeyText})
		keypadContainer.addChild(newKeypad, newKeyText);
	}
	
	buttonZoomout = new createjs.Bitmap(loader.getResult('buttonZoomout'));
	centerReg(buttonZoomout);
	
	stageTxt = new createjs.Text();
	stageTxt.font = "50px liquid_crystalbold";
	stageTxt.color = '#fff';
	stageTxt.textAlign = "center";
	stageTxt.textBaseline='alphabetic';
	
	itemExplode = new createjs.Shape();	
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
	itemResultP = new createjs.Bitmap(loader.getResult('itemResultP'));
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "35px odin_roundedbold";
	resultShareTxt.color = '#4d5256';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "90px liquid_crystalbold";
	resultTitleTxt.color = '#ff0000';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = 'TITLE';	
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	itemExitP = new createjs.Bitmap(loader.getResult('itemExitP'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	
	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "90px liquid_crystalbold";
	popTitleTxt.color = "#ff0000";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "40px odin_roundedbold";
	popDescTxt.color = "#4d5256";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	mainContainer.addChild(logo, logoP, buttonStart);
	interfaceContainer.addChild(bombContainer, waterContainer, wireContainer, colorContainer, mazeContainer, keypadContainer);
	
	//click
	for(var n=0; n<6; n++){
		$.obj['surfaceBlock'+n] = new createjs.Shape();
		//$.obj['surfaceBlock'+n] = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-(gameData.surfaceW/2), -(gameData.surfaceH/2), gameData.surfaceW, gameData.surfaceH));	
		interfaceContainer.addChild($.obj['surfaceBlock'+n]);
	}
	
	gameContainer.addChild(stageTxt, interfaceContainer, instructionContainer, buttonZoomout, itemExplode);
	resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleTxt);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	changeViewport(viewport.isLandscape);
	resizeGameFunc();
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}
	
	gameCanvas.width = stageW;
	gameCanvas.height = stageH;
	
	canvasW=stageW;
	canvasH=stageH;
	
	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){		
		interfaceContainer.x = canvasW/2;
		interfaceContainer.y = canvasH/2;
		
		stageTxt.x = canvasW/2;
		stageTxt.y = canvasH/2;
		
		itemExplode.graphics.clear();
		itemExplode.graphics.beginFill('white').drawRect(0, 0, canvasW, canvasH);
		
		if(curPage == 'game'){
			positionInterface();
		}
		
		if(viewport.isLandscape){
			bg.visible = false;
			bgP.visible = false;
			
			logo.visible = false;
			logoP.visible = false;
			
			logo.x = canvasW/2;
			logo.y = canvasW/100 * 26;
			
			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 75;
			
			//game
			itemBomb.rotation = 0;
			
			//result
			itemResult.visible = true;
			itemResultP.visible = false;
			
			buttonFacebook.x = canvasW/100*45;
			buttonFacebook.y = canvasH/100*55;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*55;
			buttonWhatsapp.x = canvasW/100*55;
			buttonWhatsapp.y = canvasH/100*55;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 67;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 50;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 40;
			
			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = (canvasW/2) - 110;
			buttonConfirm.y = (canvasH/100 * 65);
			
			buttonCancel.x = (canvasW/2) + 110;
			buttonCancel.y = (canvasH/100 * 65);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 40;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 52;
		}else{
			bg.visible = false;
			bgP.visible = false;
			
			logo.visible = false;
			logoP.visible = false;
			
			logoP.x = canvasW/2;
			logoP.y = canvasW/100 * 60;
			
			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 68;
			
			//game
			itemBomb.rotation = 90;
			
			//result
			itemResult.visible = false;
			itemResultP.visible = true;
			
			buttonFacebook.x = canvasW/100*41;
			buttonFacebook.y = canvasH/100*55;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*55;
			buttonWhatsapp.x = canvasW/100*59;
			buttonWhatsapp.y = canvasH/100*55;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 63;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 51;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 42;
			
			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = (canvasW/2) - 110;
			buttonConfirm.y = (canvasH/100 * 63);
			
			buttonCancel.x = (canvasW/2) + 110;
			buttonCancel.y = (canvasH/100 * 63);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 42;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 51;
		}
	}
}



/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		buttonZoomout.x = (canvasW - offset.x) - 50;
		buttonZoomout.y = (canvasH - offset.y) - 50;
		
		instructionContainer.x = (canvasW/2);
		instructionContainer.y = (canvasH - offset.y) - 55;
		
		var distanceNum = 58;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}
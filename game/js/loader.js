////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/logo_p.png', id:'logoP'},
			{src:'assets/button_start.png', id:'buttonStart'},
		
			{src:'assets/item_surface.png', id:'itemSurface'},
			{src:'assets/item_interface_bomb.png', id:'itemInterfaceBomb'},
			{src:'assets/item_interface_water.png', id:'itemInterfaceWater'},
			{src:'assets/item_interface_water_shine.png', id:'itemInterfaceWaterShine'},
			{src:'assets/item_interface_wire.png', id:'itemInterfaceWire'},
			{src:'assets/item_interface_color.png', id:'itemInterfaceColor'},
			{src:'assets/item_interface_color_shine.png', id:'itemInterfaceColorShine'},
			{src:'assets/item_interface_maze.png', id:'itemInterfaceMaze'},
			{src:'assets/item_interface_keypad.png', id:'itemInterfaceKeypad'},
			{src:'assets/item_interface_keypad_shine.png', id:'itemInterfaceKeypadShine'},
			{src:'assets/item_defuse_cover.png', id:'itemDefuseCover'},
			{src:'assets/item_led.png', id:'itemLed'},
			{src:'assets/item_tube.png', id:'itemTube'},
			{src:'assets/item_tube_shine.png', id:'itemTubeShine'},
			{src:'assets/item_tube_meter.png', id:'itemTubeMeter'},
			{src:'assets/item_tube_meter_pin.png', id:'itemTubeMeterPin'},
			{src:'assets/item_wire_plug.png', id:'itemWirePlug'},
			{src:'assets/item_wire_plug_hole.png', id:'itemWirePlugHole'},
			{src:'assets/item_color_pin.png', id:'itemColorPin'},
			{src:'assets/item_color.png', id:'itemColor'},
			{src:'assets/item_keypad_ind.png', id:'itemKeypadInd'},
			{src:'assets/item_wire_ind.png', id:'itemWireInd'},
			{src:'assets/item_bomb.png', id:'itemBomb'},
			{src:'assets/item_instruction.png', id:'itemInstruction'},
			{src:'assets/button_decrease.png', id:'buttonDecrease'},
			{src:'assets/button_increase.png', id:'buttonIncrease'},
			{src:'assets/button_maze_left.png', id:'buttonMazeLeft'},
			{src:'assets/button_maze_top.png', id:'buttonMazeTop'},
			{src:'assets/button_maze_bottom.png', id:'buttonMazeBottom'},
			{src:'assets/button_keypad.png', id:'buttonKeypad'},
			{src:'assets/button_defuse.png', id:'buttonDefuse'},
			{src:'assets/button_defuse_lock.png', id:'buttonDefuseLock'},
			{src:'assets/button_zoomout.png', id:'buttonZoomout'},
		
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/item_result_p.png', id:'itemResultP'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/item_exit_p.png', id:'itemExitP'},
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
	];
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/sound_maze.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/sound_keypad.ogg', id:'soundKeypad'});
		manifest.push({src:'assets/sounds/sound_keypad_error.ogg', id:'soundKeypadError'});
		manifest.push({src:'assets/sounds/sound_keypad_complete.ogg', id:'soundKeypadComplete'});
		manifest.push({src:'assets/sounds/sound_cover.ogg', id:'soundCover'});
		manifest.push({src:'assets/sounds/sound_electric.ogg', id:'soundElectric'});
		manifest.push({src:'assets/sounds/sound_unlock.ogg', id:'soundUnlock'});
		manifest.push({src:'assets/sounds/sound_hover.ogg', id:'soundHover'});
		manifest.push({src:'assets/sounds/sound_steam.ogg', id:'soundSteam'});
		manifest.push({src:'assets/sounds/sound_maze.ogg', id:'soundMaze'});
		manifest.push({src:'assets/sounds/sound_explode.ogg', id:'soundExplode'});
		manifest.push({src:'assets/sounds/sound_defuse.ogg', id:'soundDefuse'});
		manifest.push({src:'assets/sounds/sound_switch.ogg', id:'soundSwitch'});
		manifest.push({src:'assets/sounds/sound_beep.ogg', id:'soundCountdown'});
		manifest.push({src:'assets/sounds/sound_beep_end.ogg', id:'soundCountdownEnd'});
		manifest.push({src:'assets/sounds/sound_beep_close.ogg', id:'soundCountdownClose'});
		manifest.push({src:'assets/sounds/sound_new.ogg', id:'soundNew'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}
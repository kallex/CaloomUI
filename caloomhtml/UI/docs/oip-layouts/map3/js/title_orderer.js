//controllers
var show_resultants = true; //turns on the visibility of the calculated resultants


//variables
var titleBorder = new Object();
var mapData = new Object();

titleBorder.elements_x = 5;
titleBorder.elements_y = 5;

titleBorder.elements = new Object();
titleBorder.titles = new Object();

// Basic data sample for the titles
var titleDataArray = new Array ();

// Basic data sample for the spots
var spotDataArray = new Array();

createSampleData(3, -500, 500, -150, 150, 1, "Venues", "#C30");
createSampleData(2, -500, 500, -150, 150, 2, "Events", "#F5D");
createSampleData(3, -500, 500, -150, 150, 3, "Monkeys", "#B34");
createSampleData(4, -500, 500, -150, 150, 4, "Zebras", "#666");
createSampleData(3, -500, 500, -150, 150, 5, "Lions", "#865");
createSampleData(3, -500, 500, -150, 150, 6, "Monkeys", "#266");
createSampleData(4, -500, 500, -150, 150, 7, "Zebras", "#45F");
createSampleData(3, -500, 500, -150, 150, 8, "Lions", "#2D3");

//canvas setup
var spot_canvas;
var spot_layer;

var spot_drag = new Object();
spot_drag.dragged = false;

var mapMoveTimer;

//init
$(document).ready(function(){
	
	spot_canvas = document.getElementById("spot_holder");
	spot_layer = spot_canvas.getContext("2d");
	
	titleBorder.w = $('#map_frame').width();
	titleBorder.h = $('#map_frame').height();
	
	spot_canvas.width = $('#map_frame').width();
	spot_canvas.height = $('#map_frame').height();
	
	mapData.src = document.getElementById("src_map");
	
	mapData.zoom = 1;
	mapData.zoom_level = 0;
	mapData.xc = 0;
	mapData.yc = 0;
	mapData.target_x = 0;
	mapData.target_y = 0;
	
	mapData.src.onload = function(){
		mapData.w = $('#src_map').width();
		mapData.h = $('#src_map').height();
		redrawSpots();
		$('#src_map').hide(0);
	}
	
	buildTitles();
	
	$('#title_border_holder').bind('mousedown', function(e){
		spot_drag.dragged = true;
		spot_drag.start_x = e.clientX;
		spot_drag.start_y = e.clientY;
	});
	$('#title_border_holder').bind('mouseup', function(e){ spot_drag.dragged = false;});
	$('#title_border_holder').bind('mousemove', function(e){
		
		if (!spot_drag.dragged) return;
		
		dx = (e.clientX - spot_drag.start_x) / mapData.zoom;
		dy = (e.clientY - spot_drag.start_y) / mapData.zoom;
		
		nudgeMap(dx,dy);
		
		spot_drag.start_x = e.clientX;
		spot_drag.start_y = e.clientY;
		
	});
	
	$('#title_border_holder').bind('mousewheel', function(e){
		
		//console.log(mapData.zoom);	
		
		mapData.zoom_level = mapData.zoom_level + (e.originalEvent.wheelDelta)/120;
		
		if (mapData.zoom_level > 2) mapData.zoom_level = 2;
		if (mapData.zoom_level < -2) mapData.zoom_level = -2;
		
		mapData.zoom = Math.pow(2, mapData.zoom_level);
		
		//console.log(mapData.zoom_level, mapData.zoom);
		
		buildTitles();
	});
	
});

//functions
function buildTitles(){
	
	//separates the spots by group
	titleBorder.elements = new Object();
	titleBorder.titles = new Object();
	
	$.each(spotDataArray, function(i,data){
		if(!titleBorder.titles[data.grp]) {
			titleBorder.titles[data.grp] = new Object();
			titleBorder.titles[data.grp].title =  titleDataArray[data.grp].name;
			titleBorder.titles[data.grp].color =  titleDataArray[data.grp].color;
			titleBorder.titles[data.grp].id_list = new Array();
		}
		titleBorder.titles[data.grp].id_list.push(i);
	});
	
	//calculates the resulting coordinates and the weight
	$.each(titleBorder.titles, function(k,tit){
		
		rx = 0;
		ry = 0;
		rc = 0;
		
		$.each(tit.id_list, function(i,id){
			rx += spotDataArray[id].xc;
			ry += spotDataArray[id].yc;
			rc ++;
		});
		
		tit.rx = rx/rc;
		tit.ry = ry/rc;
		tit.cnt = rc;
	});
	
	titleBorder.elements = new Object();
	//the list of the possible locations sorted by weight.
	titleBorder.wlist = new Array();
	
	titleBorder.step_x = titleBorder.w/titleBorder.elements_x;
	titleBorder.step_y = titleBorder.h/titleBorder.elements_y;
	
	//iterates through the border points and attach the weighted titles to each of them
	ic = 1;
	
	//horizontal up
	iy = 0;
	for (ix = 0; ix < titleBorder.elements_x; ix++){
		addNewBorderElement(ic, ix, iy);
		ic ++;
	}
	
	//horizontal down
	iy = titleBorder.elements_y-1;
	for (ix = 0; ix < titleBorder.elements_x; ix++){
		addNewBorderElement(ic, ix, iy);
		ic ++;
	}
	
	//verical_left
	ix = titleBorder.elements_x-1;
	for (iy = 1; iy < titleBorder.elements_y - 1; iy++){
		addNewBorderElement(ic, ix, iy);
		ic ++;
	}
	
	//verical_right
	ix = 0;
	for (iy = 1; iy < titleBorder.elements_y - 1; iy++){
		addNewBorderElement(ic, ix, iy);
		ic ++;
	}
	
	titleBorder.wlist.sort(function(a,b) { return a.w - b.w });
	
	$.each(titleBorder.wlist, function(k, witem){
		if(!titleBorder.elements[witem.eid].display && witem.active){
			titleBorder.elements[witem.eid].display = witem.tid;
			titleBorder.elements[witem.eid].weight = witem.w;
			titleBorder.titles[witem.tid].mytitle = witem.eid;
			
			$.each(titleBorder.wlist, function(l, witem_deactivate){
				if (witem_deactivate.tid == witem.tid) witem_deactivate.active = false;
				if (witem_deactivate.eid == witem.eid) witem_deactivate.active = false;
			});
		} 
	});
	
	//resets the border
	//$('#title_border_holder').html('');
	
	$('.border_title').hide(0);
	
	//draws the border titles
	$.each(titleBorder.elements, function(k, element){
		if (element.display){
			if ($('#spot_grp_'+element.display).length){
				$('#spot_grp_'+element.display).show(0);
			}else{
				$('#title_border_holder').append('<div class="border_title" id="spot_grp_'+element.display+'"></div>');
				$('#spot_grp_'+element.display).css({backgroundColor: titleBorder.titles[element.display].color});
				$('#spot_grp_'+element.display).html('<span class="text">'+titleBorder.titles[element.display].title+'</span><span class="counter">'+titleBorder.titles[element.display].cnt+'</span></div>');
				$('#spot_grp_'+element.display).css({top: 0, left: spot_canvas.width/2-titleBorder.step_x/2});
			}
			
			$('#spot_grp_'+element.display).stop(0,0).animate({top: element.dy, left: element.dx}, 'fast');
			//$('#title_border_holder').append('<div class="border_title" id="spot_grp_'+element.display+'" style="background-color: '+titleBorder.titles[element.display].color+'; top: '+element.dy+'px; left: '+element.dx+'px"><span class="text">'+titleBorder.titles[element.display].title+'</span><span class="counter">'+titleBorder.titles[element.display].cnt+'</span></div>');
		}
	});
	
	$('.border_title').css({width: titleBorder.step_x-10});
	
	$('.border_title').bind('mouseover',function(){
		var id_array = $(this).attr('id').split('_');
		redrawSpots(id_array[2]);
	});
	
	$('.border_title').bind('mouseout',function(){
		redrawSpots();
	});
	
	//bugged
	/*$('.border_title').bind('click',function(){
		var id_array = $(this).attr('id').split('_');
		centerMap(id_array[2]);
	});*/
	
	redrawSpots();
	
	//console.log(titleBorder.titles);
}

//sets up a new border element
function addNewBorderElement(ic, ix, iy){
	titleBorder.elements[ic] = new Object();
	
	//local coordinates to place on the border
	titleBorder.elements[ic].x = titleBorder.step_x * ix;
	titleBorder.elements[ic].y = titleBorder.step_y * iy;
	
	//relative coordinates to calculate the distances
	titleBorder.elements[ic].rx = titleBorder.step_x * ix + titleBorder.step_x/2 - spot_canvas.width/2;
	titleBorder.elements[ic].ry = titleBorder.step_y * iy + titleBorder.step_y/2 - spot_canvas.height/2;
	
	titleBorder.elements[ic].dx = titleBorder.step_x * ix;
	titleBorder.elements[ic].dy = titleBorder.step_y * iy;
	titleBorder.elements[ic].display = null;
		
	$.each(titleBorder.titles, function(k,tit){
		d = Math.round(Math.sqrt(Math.pow(tit.rx - titleBorder.elements[ic].rx, 2) + Math.pow(tit.ry - titleBorder.elements[ic].ry, 2)) / tit.cnt);
		titleBorder.wlist.push({tid:k, eid:ic, w:d, active:true});
	});
}

function createSampleData(cnt, xr_min, xr_max, yr_min, yr_max, grp, name, color){
	titleDataArray[grp] = {"name": name, "color": color};
	for (i = 0; i < cnt; i++){
		spotDataArray.push({ "grp": grp, "name": name+" "+i, xc: Math.round(Math.random()*(xr_max-xr_min))+xr_min, yc: Math.round(Math.random()*(yr_max-yr_min))+yr_min, data:"Further data" });
	}
}

function redrawSpots(selected_id){
	
	//clears the canvas
	spot_layer.clearRect(0, 0, spot_canvas.width, spot_canvas.height);
	
	//draws the map
	//console.log(mapData.src.width/2);
	spot_layer.drawImage(mapData.src, (mapData.xc - mapData.src.width/2)*mapData.zoom + spot_canvas.width/2 , (mapData.yc - mapData.src.height/2)*mapData.zoom + spot_canvas.height/2, mapData.src.width * mapData.zoom, mapData.src.height * mapData.zoom);
	
	//draws the spots
	$.each(spotDataArray, function(k, spot){
		rad = 5;
		if(spot.grp == selected_id) rad = 10;
		
		spot_layer.beginPath();
		spot_layer.fillStyle = titleBorder.titles[spot.grp].color;
		spot_layer.arc((spot.xc * mapData.zoom) + spot_canvas.width/2, (spot.yc * mapData.zoom) + spot_canvas.height/2, rad, 0, 2*Math.PI);
		spot_layer.fill();
		
		if (show_resultants){
			spot_layer.beginPath();
			spot_layer.strokeStyle = titleBorder.titles[spot.grp].color;
			spot_layer.lineWidth = 1;
			spot_layer.moveTo((spot.xc * mapData.zoom) + spot_canvas.width/2, (spot.yc * mapData.zoom) + spot_canvas.height/2);
			spot_layer.lineTo((titleBorder.titles[spot.grp].rx * mapData.zoom) + spot_canvas.width/2, (titleBorder.titles[spot.grp].ry * mapData.zoom) + spot_canvas.height/2 )
			spot_layer.stroke();
		}
	});
	
	//draws the resultants
	if (show_resultants){
		$.each(titleBorder.titles, function(k,tit){
			
			rad = 2*tit.cnt/2;
			if(k == selected_id) rad = 5*tit.cnt/2;;
			
		 	spot_layer.beginPath();
			spot_layer.strokeStyle = tit.color;
			spot_layer.arc((tit.rx * mapData.zoom) + spot_canvas.width/2, (tit.ry * mapData.zoom) + spot_canvas.height/2, rad, 0, 2*Math.PI);
			spot_layer.stroke();
			
			spot_layer.beginPath();
			spot_layer.strokeStyle = tit.color;
			spot_layer.moveTo((tit.rx * mapData.zoom) + spot_canvas.width/2, (tit.ry * mapData.zoom) + spot_canvas.height/2);
			spot_layer.lineTo(titleBorder.elements[tit.mytitle].rx + spot_canvas.width/2, titleBorder.elements[tit.mytitle].ry + spot_canvas.height/2 );
			spot_layer.stroke();
		});
	
	
		$.each(titleBorder.elements, function(k,elem){
			spot_layer.beginPath();
			spot_layer.strokeStyle = "black";
			spot_layer.moveTo(elem.rx-5 + spot_canvas.width/2, elem.ry + spot_canvas.height/2);
			spot_layer.lineTo(elem.rx+5 + spot_canvas.width/2, elem.ry + spot_canvas.height/2);
			spot_layer.stroke();
			
			spot_layer.beginPath();
			spot_layer.strokeStyle = "black";
			spot_layer.moveTo(elem.rx + spot_canvas.width/2, elem.ry-5 + spot_canvas.height/2 );
			spot_layer.lineTo(elem.rx + spot_canvas.width/2, elem.ry+5 + spot_canvas.height/2 );
			spot_layer.stroke();
		});
	}
}

function centerMap (grp_id){
	dx = -1* (titleBorder.titles[grp_id].rx );
	dy = -1* (titleBorder.titles[grp_id].ry );
	
	animateMove(dx,dy);
}

function animateMove(x,y){
	mapMoveTimer = setInterval('animateStep()',50);
	mapData.target_x = x;
	mapData.target_y = y;
	
	mapData.step_x = x;
	mapData.step_y = y;
	mapData.target_step = 0;
	
}

function animateStep(){
	mapData.step_x = (mapData.step_x)/2;
	mapData.step_y = (mapData.step_y)/2;
	mapData.target_step ++;
	nudgeMap(mapData.step_x, mapData.step_y);
	
	if(mapData.target_step > 10) {
		clearInterval(mapMoveTimer);
	}
}

function nudgeMap(x,y){
	$.each(spotDataArray, function(i,data){
		data.xc = data.xc + x;
		data.yc = data.yc + y;
	});
		
	mapData.xc = mapData.xc + x;
	mapData.yc = mapData.yc + y;
	
	buildTitles();
}


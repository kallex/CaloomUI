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

//init
$(document).ready(function(){
	
	spot_canvas = document.getElementById("spot_holder");
	spot_layer = spot_canvas.getContext("2d");
	
	titleBorder.w = $('#map_frame').width();
	titleBorder.h = $('#map_frame').height();
	
	spot_canvas.width = $('#map_frame').width();
	spot_canvas.height = $('#map_frame').height();
	
	mapData.src = document.getElementById("src_map");
	mapData.xc = 0;
	mapData.yc = 0;
	
	buildTitles();
	
	$('#title_border_holder').bind('mousedown', function(e){
		spot_drag.dragged = true;
		spot_drag.start_x = e.clientX;
		spot_drag.start_y = e.clientY;
	});
	$('#title_border_holder').bind('mouseup', function(e){ spot_drag.dragged = false;});
	$('#title_border_holder').bind('mousemove', function(e){
		
		if (!spot_drag.dragged) return;
		
		$('#src_map').hide(0);
		
		$.each(spotDataArray, function(i,data){
			data.xc = data.xc + (e.clientX - spot_drag.start_x);
			data.yc = data.yc + (e.clientY - spot_drag.start_y);
		});
		
		mapData.xc = mapData.xc + (e.clientX - spot_drag.start_x);
		mapData.yc = mapData.yc + (e.clientY - spot_drag.start_y);
		
		spot_drag.start_x = e.clientX;
		spot_drag.start_y = e.clientY;
		
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
	
	titleBorder.step_x = titleBorder.w/(titleBorder.elements_x);
	titleBorder.step_y = titleBorder.h/(titleBorder.elements_y);
	
	titleBorder.element_w = titleBorder.w/(titleBorder.elements_x);
	titleBorder.element_h = titleBorder.h/(titleBorder.elements_y);
	
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
	for (iy = 0; iy < titleBorder.elements_y; iy++){
		addNewBorderElement(ic, ix, iy);
		ic ++;
	}
	
	//verical_right
	ix = 0;
	for (iy = 0; iy < titleBorder.elements_y; iy++){
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
	$('#title_border_holder').html('');
	
	//draws the border titles
	$.each(titleBorder.elements, function(k, element){
		if (element.display){
			$('#title_border_holder').append('<div class="border_title" id="spot_grp_'+element.display+'"style="background-color: '+titleBorder.titles[element.display].color+'; top: '+element.dy+'px; left: '+element.dx+'px"><span class="text">'+titleBorder.titles[element.display].title+'</span><span class="counter">'+titleBorder.titles[element.display].cnt+'</span></div>');
		}
	});
	
	$('.border_title').css({width: titleBorder.element_w-10});
	
	$('.border_title').bind('mouseover',function(){
		var id_array = $(this).attr('id').split('_');
		redrawSpots(id_array[2]);
	});
	
	$('.border_title').bind('mouseout',function(){
		redrawSpots();
	});
	
	redrawSpots();
	
	console.log(titleBorder.titles);
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
	
	console.log(titleBorder.elements[ic].rx, titleBorder.elements[ic].ry);
	
	
	titleBorder.elements[ic].dx = titleBorder.element_w * ix;
	titleBorder.elements[ic].dy = titleBorder.element_h * iy;
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
	spot_layer.drawImage(mapData.src, mapData.xc, mapData.yc);
	
	//draws the spots
	$.each(spotDataArray, function(k, spot){
		rad = 5;
		if(spot.grp == selected_id) rad = 10;
		 
		spot_layer.beginPath();
		spot_layer.fillStyle = titleBorder.titles[spot.grp].color;
		spot_layer.arc(spot.xc + spot_canvas.width/2, spot.yc + spot_canvas.height/2, rad, 0, 2*Math.PI);
		spot_layer.fill();
		
		if (show_resultants){
			spot_layer.beginPath();
			spot_layer.strokeStyle = titleBorder.titles[spot.grp].color;
			spot_layer.moveTo(spot.xc + spot_canvas.width/2, spot.yc + spot_canvas.height/2);
			spot_layer.lineTo(titleBorder.titles[spot.grp].rx + spot_canvas.width/2, titleBorder.titles[spot.grp].ry + spot_canvas.height/2 )
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
			spot_layer.arc(tit.rx + spot_canvas.width/2, tit.ry + spot_canvas.height/2, rad, 0, 2*Math.PI);
			spot_layer.stroke();
			
			spot_layer.beginPath();
			spot_layer.strokeStyle = tit.color;
			spot_layer.moveTo(tit.rx + spot_canvas.width/2, tit.ry + spot_canvas.height/2);
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



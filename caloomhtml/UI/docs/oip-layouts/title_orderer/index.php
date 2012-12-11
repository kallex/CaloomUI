<!DOCTYPE html>

<head>
	<title>Caloom developer area</title>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script type="text/javascript" src="js/title_orderer.js"></script>
	<link href="http://fonts.googleapis.com/css?family=Baumans" rel="stylesheet" type="text/css">
	<link href="css/style.css" rel="stylesheet" type="text/css">
</head>

<body>
	<header>
		<h2>Caloom</h2>
	</header>
	
	<div id="map_frame">
		<div id="map_holder">
			<img id="src_map" src="http://maps.googleapis.com/maps/api/staticmap?center=60.2000,24.9300&zoom=13&size=600x250&scale=2&sensor=true&style=hue:0x1C99b8">
		</div>
		
		<canvas id="spot_holder">
		</canvas>
		
		<div id="map_masker">
		</div>
		
		<div id="title_border_holder">
		</div>
	</div>
</body>

</html>
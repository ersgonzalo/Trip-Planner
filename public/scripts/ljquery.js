$(document).ready(function(){
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705786,-74.007672);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styleArr
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    var map = new google.maps.Map(map_canvas_obj, mapOptions);
    var totalArrs = [], oneMarker, arrPos;

	$("#addDay").click(function(){
		var nDay = $(event.target).prev().text();
		$("#addDay").before('<button class="btn btn-circle day-btn">'+(++nDay)+'</button> ');
	});

	$(".day-buttons").on("click", ".day-btn", function(event){
		$(".current-day").toggleClass("current-day");
		$(event.target).toggleClass("current-day");
	});


	$("#hotelBtn").click(function(){
		var hotel = $("#selHotel option:selected").text();
		var hotLoc = $("#selHotel option:selected").val().split(',');
		drawLocation(hotLoc, {icon: '/images/lodging_0star.png'}, hotel);
		$('#hotelIt').append(createItinerary(hotel));
	});
	
	$("#restauBtn").click(function(){
		var restaurant = $("#selRestau option:selected").text();
		var restLoc = $("#selRestau option:selected").val().split(',');
		drawLocation(restLoc, {icon: '/images/restaurant.png'}, restaurant);
		$('#restauIt').append(createItinerary(restaurant));
	});
	
	$("#thingdoBtn").click(function(){
		var todo = $("#selToDo option:selected").text();
		var todoLoc = $("#selToDo option:selected").val().split(',');
		drawLocation(todoLoc, {icon: '/images/star-3.png'}, todo);
		$('#todoIt').append(createItinerary(todo));
	});

	//Remove marker based on name \\ Took 4 hours
	$(".list-group").on("click", ".remove", function(event){
		var item = $(event.target).parent().text();
		item = item.substr(0, item.length - 1);
		oneMarker = getObject(totalArrs, item);
		arrPos = totalArrs.indexOf(oneMarker);
		oneMarker.setMap(null);
		totalArrs.splice(1, arrPos);
		$(event.target).parent().remove();
	});

	//Every time create new iterary item, add itinerary-item, title, button
	function createItinerary (selVal){
		return '<div class="itinerary-item"><span class="title">'+selVal+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
	}
	
    function drawLocation (location, opts, title) {
        if (typeof opts !== 'object') {
            opts = {}
        }
        opts.position = new google.maps.LatLng(location[0], location[1]);
        opts.map = map;
        opts.title = title;
        var marker = new google.maps.Marker(opts);
        totalArrs.push(marker);
    }

    function getObject(arr, key){
    	for(var i in arr){
			if(arr[i].title == key){
				return arr[i];
			}
		}
    }
})
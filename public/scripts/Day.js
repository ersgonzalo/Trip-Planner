var Day;

$(document).ready(function () {
	Day = function () {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		this.number = days.push(this);
		$.post('/days', {number: (this.number),
            		hotel: undefined,
                    restaurants: undefined,
                    thingsToDo: undefined
                });
		this.buildButton()
			.drawButton();
	}

	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
		});
		return this;
	};

	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};


	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		// dayPoster(currentDay); //-----------------
		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};

	function deleteCurrentDay () {
		if (days.length > 1) {
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				newCurrent = days[index] || days[index - 1];
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			newCurrent.switchTo();
			previousDay.eraseButton();
			// $.ajax({
			// 	url: "/:id",
			// 	type: "DELETE"
			// 	data: number
			// })
		}
	};

	$('#add-day').on('click', function () {
		// dayPoster(currentDay); //-----------------
		new Day();

	});

	$('#day-title > .remove').on('click', deleteCurrentDay);
});
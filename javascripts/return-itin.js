"use strict";

let themepark = require('./time-calls.js');
let handlebar = require('../templates/itinTemplate.hbs');


$('#saved-itin').click(function() {

	themepark.loadItin()
		.then(
			(itinData) => {
				// console.log( "itinData", itinData );
				// console.log( "itinData", Object.values(itinData) );
				$('#output').empty();
	            $('#output').html(`<p class="outputHeader">Your Saved Itinerary: </p>`);
	            themepark.itinArray.length = 0;
				let arrayOfItins = Object.values(itinData).pop();
				console.log( "arrayOfItins", arrayOfItins );
				for (let i = 0; i < arrayOfItins.length; i++) {
					themepark.itinArray.push(arrayOfItins[i]);
				}
				// }
				 themepark.itinArray.forEach((item, index) => {
        		$("#output").append(handlebar(themepark.itinArray[index]));
    		});
				$(".attractionName").click(function () {
	            $(".hidden").hide();
	            $(this).closest("div").find(".hidden").toggle();
	                  });


				// console.log( "themepark.returnedItin", themepark.returnedItin );
				
				// console.log( "themepark.returnedItin", themepark.returnedItin );
			});

});

"use strict";

let themepark = require("./time-calls");
let Handlebars = require('hbsfy/runtime');
let attractionDesc = require('../templates/attractions.hbs');

var variableInput;

$(document).ready(() => {

$(document).keypress(function(e) {
    if (e.which === 13){
        $(".clickArea").removeClass("border");
      if ($("#openMap").val() === "Mischief Managed") {
          variableInput = $("#search").val();
          $('#output').empty();
          $('#output').html(`<p class="outputHeader">Search Results: ${variableInput} </p>`);

          themepark.loadTime()
            .then((attractionData) => {
                themepark.attractionInfo = [];
                var searchedAttractions = attractionData.filter(compareSearchResults);
                
                areasToHighlight(searchedAttractions);

                for (let obj in searchedAttractions) {
                themepark.attractionInfo.push(searchedAttractions[obj]);
                }
                return themepark.loadAreas();

              }).then
              ((loadedAreas) => {
                  // console.log( "loadedAreas", loadedAreas );
                  for (let i = 0; i < loadedAreas.length; i++) {
                      for (let j = 0; j < themepark.attractionInfo.length; j++) {
                          if (themepark.attractionInfo[j].area_id === loadedAreas[i].id) {
                            
                              themepark.attractionInfo[j].area_name = loadedAreas[i].name;
                          }
                      }
                  }
                  return themepark.loadTypes();

              }).then
              ((loadedTypes) => {
                  // console.log( "loadedTypes", loadedTypes );
                  for (let i = 0; i < loadedTypes.length; i++) {
                      for (let j = 0; j < themepark.attractionInfo.length; j++) {
                          if (themepark.attractionInfo[j].type_id === loadedTypes[i].id) {
                              themepark.attractionInfo[j].attraction_type = loadedTypes[i].name;                       
                              $('#output').append(attractionDesc(themepark.attractionInfo[j]));
                          }
                      }
                  }
                    $(".attractionName").click(function () {
                      $(".hidden").hide();
                      $(this).closest("div").find(".hidden").toggle(); 
                      });
                   console.log( "MUTATED", themepark.attractionInfo );
              });

      } else {
          window.alert("You must recite the spell and tap the map with your wand, Muggle!");
      }
    }
});

});

function compareSearchResults(attraction) {
    var attractionName = attraction.name;
    var expToSearch = new RegExp(variableInput, "i");
    if (attractionName.search(expToSearch) != -1){
    return attraction;
    }
}


function areasToHighlight(searchedAttractionsInput) {
    var attractionIdArray = [];
    var arrayAreasToHighlight = [];

    searchedAttractionsInput.forEach((element) => {
        attractionIdArray.push(element.area_id);
    });

    for(var i = 1; i < 8; i++ ) {
        if (attractionIdArray.includes(i)) {
            arrayAreasToHighlight.push("box--" + i);
        }
    }

    console.log("arrayAreasToHighlight", arrayAreasToHighlight);

    arrayAreasToHighlight.forEach((value, index) =>  {
            let elementToHighlight = document.getElementById(value);
            let elementParent = elementToHighlight.parentElement;
            elementParent.classList.add("highlighted");
        });
}

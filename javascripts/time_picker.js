"use strict";

let themepark = require('./time-calls.js');
let Handlebars = require('hbsfy/runtime');
let attractionDesc = require('../templates/attractions.hbs');
//Object to hold regular expressions for each hour.
let regexHolder = 
                    {
                        "9 AM": /([^1][9]:)([0-5][0-9][a])/ig,
                        "10 AM": /([1][0]:)([0-5][0-9][a])/ig,
                        "11 AM": /([1][1]:)([0-5][0-9][a])/ig,
                        "12 PM": /([1][2]:)([0-5][0-9][p])/ig,
                        "1 PM": /([^1][1]:)([0-5][0-9][p])/ig,
                        "2 PM": /([^1][2]:)([0-5][0-9][p])/ig,
                        "3 PM": /([^1][3]:)([0-5][0-9][p])/ig,
                        "4 PM": /([^1][4]:)([0-5][0-9][p])/ig,
                        "5 PM": /([^1][5]:)([0-5][0-9][p])/ig,
                        "6 PM": /([^1][6]:)([0-5][0-9][p])/ig,
                        "7 PM": /([^1][7]:)([0-5][0-9][p])/ig,
                        "8 PM": /([^1][8]:)([0-5][0-9][p])/ig,
                        "9 PM": /([^1][9]:)([0-5][0-9][p])/ig
                    };

//Jquery Timepicker
$(function () {
    console.log("timepicker");
    $('.timepicker').timepicker({
        timeFormat: 'h p',
        interval: 60,
        minTime: '9:00am',
        maxTime: '9:00pm',
        defaultTime: 'now',
        startTime: '9:00',
        dynamic: true,
        dropdown: true,
        scrollbar: true,
        //On CHANGE, run function to call data and filter by time.
        change: function (time) {
            // console.log($('.timepicker').val());
            //Set the value to the corresponding regex
            let regex = regexHolder[$('.timepicker').val()];
            // console.log( "regex", regex );
            //clear main output array
            themepark.attractionInfo.length = 0;
            $('#output').empty();
            $('#output').html(`<p class="outputHeader">Happening Soon: </p>`);
            //Begin Promise chain
            themepark.loadTime()
             .then(
              (timeData) => {
                  timeData.forEach((item)=> {
                        //Test attractions for regex matches
                      if (regex.test(item.times)) {
                          themepark.attractionInfo.push(item);
                      }          
                  });
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
              });

              console.log( "MUTATED", themepark.attractionInfo );
        }
    });
});
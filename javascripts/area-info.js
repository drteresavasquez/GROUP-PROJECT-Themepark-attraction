"use strict";
console.log("area-info.js, Yo!");

let Handlebars = require('hbsfy/runtime');
let themepark = require("./time-calls.js");
let areaName = require("../templates/areaName.hbs");
let attractionDesc = require("../templates/attractions.hbs");
let pushPin = require("../templates/pushPin.hbs");
Handlebars.registerHelper('incrementer', (value) => parseInt(value) + 1);

$("#map").click((event) => {
    if (event.target.className === "clickArea clickAreaToggle" || 
        event.target.className === "clickArea clickAreaToggle border"){
        let btnID = event.target.id;
        let btnNum = btnID.slice(5);
        themepark.attractionInfo.length = 0;
        $('#output').empty();
        $('#output').html(`<p class="outputHeader">Attractions in this Area:</p>`);

        themepark.getAttractions(btnNum)
        .then ((attractionData) => {
            for (let obj in attractionData) {
                themepark.attractionInfo.push(attractionData[obj]);
            }
            return themepark.loadTypes();
        }).then
        ((loadedTypes) => {
            loadedTypes.forEach((item, index)=>{
                themepark.attractionInfo.forEach((element, position)=>{
                    if(item.id === themepark.attractionInfo[position].type_id){
                        themepark.attractionInfo[position].attraction_type = item.name;
                    }
                });
            });
            return themepark.loadAreas();
        }).then
        ((loadedAreas) => {
            loadedAreas.forEach((item, index)=>{
                themepark.attractionInfo.forEach((element, position)=>{
                    if(item.id === themepark.attractionInfo[position].area_id){
                        themepark.attractionInfo[position].area_name = item.name;
                        $('#outputHeader').append(areaName(themepark.attractionInfo[position]));
                        $('#output').append(attractionDesc(themepark.attractionInfo[position]));
                        
                    }
                });
                
            });
            $(".attractionName").click(function () {
                $(".hidden").hide();
                $(this).closest("div").find(".hidden").toggle();
            });
        });
    }
});
    

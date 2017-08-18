"use strict";

let themepark = require('./time-calls.js');
let handlebar = require('../templates/itinTemplate.hbs');

$("#output").click(function (e) {
    console.log(e);
    if (event.target.className === "btn btn-sm") {
        let button = event.target.id;
        let buttonNumber = button.slice(7);
        console.log('button number', buttonNumber);
        $.each(themepark.attractionInfo, (index, item) => {
            console.log("item id", item.id);
            if (buttonNumber == item.id) {
                themepark.itinArray.push(item);
                $(`#addBtn-${item.id}`).prop('disabled', true);
            }
        });



        console.log('array', themepark.itinArray);
    }
    if (event.target.className === "btn btn-sm delBtn") {
        let delButton = event.target.id;
        let delButtonNumber = delButton.slice(10);
        console.log('button number', delButtonNumber);
        $("#output").html(`<p class="outputHeader">Your Itinerary:</p> <button class="btn btn-sm itin-save">Save</button> <br><br>`);
        $.each(themepark.itinArray, (index, item) => {
            console.log("item id", item.id);
            console.log('delbtn', delButtonNumber);
            if (delButtonNumber == themepark.itinArray[index].id) {
                themepark.itinArray.indexOf(item);
                console.log('theme park array', themepark.itinArray.indexOf(item));
                // $(`#removeBtn-${item.id}`).prop('disabled', true);
                let itinItem = themepark.itinArray.indexOf(item);
                themepark.itinArray.splice(itinItem, 1);
                $("#output").empty();
                $("#output").html(`<p class="outputHeader">Your Itinerary:</p> <button class="btn btn-sm itin-save">Save</button> <br><br>`);
                themepark.itinArray.forEach((item, index) => {
                    $("#output").append(handlebar(themepark.itinArray[index]));
                });
                $(".attractionName").click(function () {
                    $(this).closest("div").find(".hidden").toggle();

                });
                console.log('array', themepark.itinArray);
            }
        });
    }
});

$("#box--8").click(function () {
    console.log("Box 8");
    $('#output').html(`<p class="outputHeader">Your Itinerary:</p> <button class="btn btn-sm itin-save">Save</button> <br><br>`);

    themepark.itinArray.forEach((item, index) => {
        $("#output").append(handlebar(themepark.itinArray[index]));
    });
    $(".attractionName").click(function () {
        $(".hidden").hide();
        $(this).closest("div").find(".hidden").toggle();

    });
});




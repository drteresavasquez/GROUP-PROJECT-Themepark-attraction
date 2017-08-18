"use strict";
console.log("Color-squares, yo!");

let themepark = require("./time-calls.js");

var openMap = document.getElementById("openMap");
$("#openMap").on("click", () => {
    if (openMap.value === "I solemnly swear that I am up to no good") {
        $("#openMap").val("Mischief Managed");
        $(".map").addClass("mapButtonClicked");
        $(".clickArea").addClass("clickAreaToggle");
        $(".hidden-message").addClass("hidden-message-toggle");
        themepark.loadAreas()
        .then(showAreas);  
    } else {
        $("#openMap").val("I solemnly swear that I am up to no good");
        $(".map").removeClass("mapButtonClicked");
        $(".hidden-message").removeClass("hidden-message-toggle");
        $(".clickArea").removeClass("border");
        $(".clickArea").removeClass("clickAreaToggle");
        themepark.loadAreas()
        .then(hideAreas);
    }
});

function showAreas(data) {
        let keys = Object.keys(data);
        let colorValue = "";
        let indAreaID;
            $.each(keys,(index, item) => {
                colorValue = data[item].colorTheme;
                indAreaID = data[item].id;                
                let R = convertHexR(`${colorValue}`);
                let G = convertHexG(`${colorValue}`);
                let B = convertHexB(`${colorValue}`);
                function convertHexR(hex) {return parseInt((removeHash(hex)).substring(0,2),16);}
                function convertHexG(hex) {return parseInt((removeHash(hex)).substring(2,4),16);}
                function convertHexB(hex) {return parseInt((removeHash(hex)).substring(4,6),16);}
                function removeHash(hex) {return (hex.charAt(0)=="#") ? hex.substring(1,7):hex;}
                    let alhpaColor = `rgba(${R},${G},${B},.4)`;
                $(`#box--${indAreaID}`).css("background-color", `${alhpaColor}`);
                $("#output").html(`<h5>The very best of days to you!</h5> <p><i>Now, to our new students, welcome, to our old students, welcome back! Another year full of magical education awaits you!</i> <br>—Albus Dumbledore</p>
                <p>Check out the areas in <b>Hogwarts</b> to see what wonderful attractions await you.</p>
                <p><i><b>You'll need to use your wand!</i></b><p>`);
                console.log(alhpaColor);
            });
        }

function hideAreas(data) {
        let keys = Object.keys(data);
        let indAreaID;
            $.each(keys,(index, item) => {
                indAreaID = data[item].id;
                $(`#box--${indAreaID}`).css("background", `none`);
                $("#output").html(`<p></p><h2>Come Back Soon!</h2>`);
            });
        }
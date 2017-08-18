"use strict";

let date = new Date();
let currentDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();


$("#footer").html("Copyright Hogwarts School &copy; " + currentDate);

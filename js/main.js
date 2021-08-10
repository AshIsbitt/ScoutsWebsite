console.log("main.js loaded");

//Get URL parameter
const locSearch = location.search;
const selectedSection = locSearch.substr(9);

//get <select> from DOM
const selectionBox = document.querySelector('#selectionBox');

//set <select> option to value in URL
selectionBox.value = selectedSection;
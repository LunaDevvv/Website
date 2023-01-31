//* Get elements from DOM
const canvas = document.getElementById("gameCanvas");

canvas.width = 700;
canvas.height = 393;


//* Set up the canvas
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.strokeRect(50, 35, 50, 50);

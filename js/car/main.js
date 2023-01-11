// Getting the canvas things
const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

// Making the canvas width
carCanvas.width = 400;

// Creating the rod and the cars CTX
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.95, 3);
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// Creating the main car
var carX = road.getLaneCenter(1);
var carY = 400;
var carWidth = 30;
var carHeight = 50;

// Generating 100 cars
var cars = generateCars(100);
let bestCar = cars[0];
let bestCary = 0;
let carLocationY = [];
let carLocationX = [];

// Getting the best brain so we can use it as a baseline
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));

        // Mutating all cars but the first.
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
}

// Creating traffic
const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(1), -100, 30, 50, false, false),
];

// Generate cars function
function generateCars(N) {
    // Cars array
    const cars = [];

    // Push all cars to the same array in the same spot
    for (i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 50, 30, 50, false, true));
    }

    return cars;
}

// Broken cars array.
let brokenCars = [];

// Calling the animate function
animate();

// Save the best car
function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));

    console.log("Saved");
}

// Get rid of the best car
function discard() {
    localStorage.removeItem("bestBrain");
}

// Reload the page for a auto rerun
function reload() {
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].y < bestCar.y) {
            save();
        }
    }

    location.reload();
}

// Reload timeout to finish the run.
setTimeout(reload, 10 * 1000);

// Animate function
function animate(time) {
    // Updating traffic first
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    // Update the cars for movement and collision
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    // Get the best car
    const bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

    // Set the canvas height.
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    // Save the car CTX and translate it
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    // Draw the road and traffic as red
    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    // Draw all of the cars but the best one.
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }

    // Change the alpha back
    carCtx.globalAlpha = 1;

    // Draw the car
    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();

    // Draw the network
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);

    // Check the cars for broken cars
    for (let i = 0; i < cars.length; i++) {
        brokenCars = [];
        if (cars[i].damaged == true) {
            brokenCars.push(cars[i]);
        }

        // If all cars break, reload the page.
        if (brokenCars.length >= cars.length) {
            reload();
        }
    }

    // Change traffic position based off of the best car/
    for (let i = 0; i < cars.length; i++) {
        if (bestCary < cars[i].y) {
            bestCary = cars[i].y;
        }
    }

    // Filter the cars.
    cars.filter((car) => car.y - 4000 == bestCary);

    // Move the traffic for the best cars place.
    for (let i = 0; i < traffic.length; i++) {
        if (
            traffic[i].y - 100 < bestCary &&
            traffic[i].y < !bestCary &&
            traffic[i].y + 900 < !bestCary
        ) {
            traffic[i] = new Car(
                road.getLaneCenter(Math.round(Math.random() * 3)),
                bestCary - 800,
                30,
                50,
                false,
                false
            );
        }
    }
}

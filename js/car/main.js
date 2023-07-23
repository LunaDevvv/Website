const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

carCanvas.width = 400;
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.95, 3);
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

var carX = road.getLaneCenter(1);
var carY = 400;
var carWidth = 30;
var carHeight = 50;

var cars = generateCars(100);
let bestCar = cars[0];
let bestCary = 0;
let carLocationY = [];
let carLocationX = [];

if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));

        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, false, false),
    new Car(road.getLaneCenter(1), -100, 30, 50, false, false),
];

function generateCars(N) {
    const cars = [];

    for (i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 50, 30, 50, false, true));
    }

    return cars;
}
let brokenCars = [];

animate();

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function reload() {
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].y < bestCar.y) {
            save();
        }
    }

    location.reload();
}

setTimeout(reload, 10 * 1000);

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    const bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }

    carCtx.globalAlpha = 1;

    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);

    for (let i = 0; i < cars.length; i++) {
        brokenCars = [];
        if (cars[i].damaged == true) {
            brokenCars.push(cars[i]);
        }

        if (brokenCars.length >= cars.length) {
            reload();
        }
    }

    for (let i = 0; i < cars.length; i++) {
        if (bestCary < cars[i].y) {
            bestCary = cars[i].y;
        }
    }

    cars.filter((car) => car.y - 4000 == bestCary);

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

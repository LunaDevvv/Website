const CAR_CANVAS = document.getElementById("carCanvas");
const NETWORK_CANVAS = document.getElementById("networkCanvas");

CAR_CANVAS.width = 400;
const ROAD = new Road(CAR_CANVAS.width / 2, CAR_CANVAS.width * 0.95, 3);
const CAR_CTX = CAR_CANVAS.getContext("2d");
const NETWORK_CTX = NETWORK_CANVAS.getContext("2d");

var carX = ROAD.getLaneCenter(1);
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

const TRAFFIC = [
    new Car(ROAD.getLaneCenter(0), -100, 30, 50, false, false),
    new Car(ROAD.getLaneCenter(1), -100, 30, 50, false, false),
];

function generateCars(N) {
    const CARS = [];

    for (i = 0; i < N; i++) {
        CARS.push(new Car(ROAD.getLaneCenter(1), 50, 30, 50, false, true));
    }

    return CARS;
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
    for (let i = 0; i < TRAFFIC.length; i++) {
        TRAFFIC[i].update(ROAD.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(ROAD.borders, TRAFFIC);
    }

     BEST_CAR = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

    CAR_CANVAS.height = window.innerHeight;
    NETWORK_CANVAS.height = window.innerHeight;
    CAR_CTX.save();
    CAR_CTX.translate(0, -BEST_CAR.y + CAR_CANVAS.height * 0.7);

    ROAD.draw(CAR_CTX);
    for (let i = 0; i < TRAFFIC.length; i++) {
        TRAFFIC[i].draw(CAR_CTX, "red");
    }
    CAR_CTX.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(CAR_CTX, "blue");
    }

    CAR_CTX.globalAlpha = 1;

    BEST_CAR.draw(CAR_CTX, "blue", true);
    CAR_CTX.restore();

    Visualizer.drawNetwork(NETWORK_CTX, BEST_CAR.brain);
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

    for (let i = 0; i < TRAFFIC.length; i++) {
        if (
            TRAFFIC[i].y - 100 < bestCary &&
            TRAFFIC[i].y < !bestCary &&
            TRAFFIC[i].y + 900 < !bestCary
        ) {
            TRAFFIC[i] = new Car(
                ROAD.getLaneCenter(Math.round(Math.random() * 3)),
                bestCary - 800,
                30,
                50,
                false,
                false
            );
        }
    }
}

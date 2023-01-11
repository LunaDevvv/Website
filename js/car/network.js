// Creating the neural network
class NeuralNetwork {
    // Creating the network with the neuron counts.
    constructor(neuronCouts) {
        this.levels = [];
        for (let i = 0; i < neuronCouts.length - 1; i++) {
            this.levels.push(new Level(neuronCouts[i], neuronCouts[i + 1]));
        }
    }

    // Feed forward the inputs
    static feedForward(givenInputs, network) {
        // Send it to the current levels feed forward function
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }

        return outputs;
    }

    // Mutate the network.
    static mutate(network, amount = 0.5) {
        network.levels.forEach((level) => {
            for (let i = 0; i < level.biases; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                );
            }

            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    );
                }
            }
        });
    }
}
// Creating the levels for the network
class Level {
    // Get the counts and create variabled for it.
    constructor(inputCount, outputCout) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCout);
        this.biases = new Array(outputCout);

        this.weights = [];

        // Create weights.
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCout);
        }

        // Randomize the weights.
        Level.#randomize(this);
    }

    // Create random weights.
    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    // Level feed forward function
    static feedForward(givenInputs, level) {
        // Get the inputs.
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        // Generate responses with the inputs.
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }

            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }
}

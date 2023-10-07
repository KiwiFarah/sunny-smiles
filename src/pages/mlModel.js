import * as tf from '@tensorflow/tfjs';

export const createModel = async () => {
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 1, inputShape: [3] }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    // For now, we're using dummy data to train the model.
    // Ideally, you should have a dataset or load a pre-trained model.
    const xs = tf.tensor2d([
        [5, 2, 2],
        [7, 1, 3],
        [8, 0, 4],
        [3, 3, 1],
    ]);
    const ys = tf.tensor2d([
        [1],
        [0.8],
        [0.6],
        [1.2],
    ]);
    await model.fit(xs, ys, { epochs: 50 });

    return model;
};

export const getPrediction = (model, timeTaken, correctMatches, incorrectAttempts) => {
    if (!model) return null;
    
    const inputTensor = tf.tensor2d([
        [timeTaken, correctMatches, incorrectAttempts]
    ]);
    
    const prediction = model.predict(inputTensor).dataSync();
    return prediction[0];
};

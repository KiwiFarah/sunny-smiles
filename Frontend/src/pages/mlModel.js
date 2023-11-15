const tf = require('@tensorflow/tfjs');

// Assuming you have the actual data in the format: [timeTaken, shapesMatched, level]
const processData = (data) => {
    return data.map(d => {
        const reactionTimePerShape = d[0] / d[1]; // Calculate reaction time per shape
        return [reactionTimePerShape, d[2]]; // [reactionTimePerShape, level]
    });
};

export const createModel = () => {
    const model = tf.sequential();

    // Adding layers: input layer, hidden layers, and output layer
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [2] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'adam'
    });

    return model;
};

const trainModel = async (model, data) => {
    const processedData = processData(data);
    const xs = tf.tensor2d(processedData.map(d => [d[1]])); // Levels as input
    const ys = tf.tensor2d(processedData.map(d => [d[0]])); // Reaction time as output

    await model.fit(xs, ys, { epochs: 100 });
};
export const getPrediction = (model, level) => {
    if (!model) return null;
    
    const inputTensor = tf.tensor2d([[level]]);
    const prediction = model.predict(inputTensor).dataSync();
    
    return prediction[0]; // Predicted reaction time per shape for given level
};


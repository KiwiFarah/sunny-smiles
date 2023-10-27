const tf = require('@tensorflow/tfjs');

const generateDummyData = (numData = 100) => {
    let xs = [];
    let ys = [];

    for (let i = 0; i < numData; i++) {
        const timeTaken = 300 + (Math.random() - 0.5) * 50; 
        const correctMatches = 5 + Math.floor((Math.random() - 0.5) * 4); 
        const incorrectAttempts = 2 + Math.floor((Math.random() - 0.5) * 2); 
        const y = 1 / (1 + Math.exp(-(correctMatches - 2*incorrectAttempts))); 

        xs.push([timeTaken, correctMatches, incorrectAttempts]);
        ys.push([y]);
    }

    return {
        xs: tf.tensor2d(xs),
        ys: tf.tensor2d(ys),
    };
};

const createModel = async () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [3] }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    const { xs, ys } = generateDummyData();
    await model.fit(xs, ys, { epochs: 50 });

    return model;
};
module.exports.createModel = createModel;


const getPrediction = (model, timeTaken, correctMatches, incorrectAttempts) => {
    if (!model) return null;
    
    const inputTensor = tf.tensor2d([
        [timeTaken, correctMatches, incorrectAttempts]
    ]);
    
    const prediction = model.predict(inputTensor).dataSync();
    return prediction[0];
};

module.exports.getPrediction = getPrediction;
const mongoose = require('mongoose');
const config = require('./keys');

const connectDB = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose
    .connect(config.mongoURI, options)
    .then(() => console.log('MongoDb is Connected...'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;

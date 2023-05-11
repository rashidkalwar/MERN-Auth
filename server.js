const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const config = require('./config/keys');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/api/users', userRoutes);

connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = config.port;

app.listen(port, () => console.log(`Server running on port ${port}`));

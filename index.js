const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

const carSchema = new mongoose.Schema({
    modelAndMark: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    images: {type: [String], required: true},
    isBusy: {type: Boolean, required: true},
    isRent: {type: Boolean, required: true},
    baggage: {type: Boolean, required: true},
    description: {
        engine: {type: String, required: true},
        year: {type: String, required: true},
        seats: {type: Number, required: true},
        expenses: {type: String, required: true},
        carNumber: {type: String, required: true}
    },
    aboutCar: {type: String, required: true}
});

const Car = mongoose.model('Car', carSchema);

mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', async (req, res) => {
    const result = await Car.find({});
    res.json(result);
});

app.post('/', upload.array('images', 4), async (req, res) => {
  let data = req.body;
  data.images = req.files.map(file => file.path);
  data.isBusy = Boolean(req.body.isBusy);
  data.isRent = Boolean(req.body.isRent);
  data.baggage = Boolean(req.body.baggage);

  await new Car(data).save();
  res.send('Data saved successfully');
});

app.get('/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await Car.find({_id});
    res.json(result);
});

app.delete('/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await Car.deleteOne({_id});
    res.json(result);
});

app.patch('/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await Car.updateOne({_id}, req.body);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
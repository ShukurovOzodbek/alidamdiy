const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose");
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const carSchema = new mongoose.Schema({
    modelAndMark: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    images: {type: Array, required: true},
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
    aboutCar: {type: String, required: true},
});


const car = {
    "modelAndMark": "",
    "type": "hatchback",
    "price": 22,
    "images": [],
    "isBusy": false,
    "isRent": true,
    "baggage": true,
    "description": {
        "engine": "",
        "year": "1999",
        "seats": 6,
        "expenses": "",
        "carNumber": "30u199xa"
    },
    "aboutCar": "lorem ipsum dolor",
}

const Car = mongoose.model('Car', carSchema);

mongoose.connect(
    'mongodb://127.0.0.1:27017',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.get('/', async (req, res) => {
    const result = await Car.find({});
    res.json(result)
})


app.post('/', (req, res) => {
    let data = req.body;
    new Car(data).save()
    res.send('Data saved successfully');
})

app.get('/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await Car.find({_id});
    res.json(result)
})

app.delete('/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await Car.deleteOne({_id});
    res.json(result)
})

app.patch('/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await Car.updateOne({_id}, req.body);
    res.json(result)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

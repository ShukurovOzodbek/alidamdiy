const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose");
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const studentSchema = new mongoose.Schema({
    roll_no: Number,
    name: String,
    year: Number,
    subjects: {type: Array}
});

const Car = mongoose.model('Car', studentSchema);

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
    if (Array.isArray(data.subjects)) {
        new Car(data).save()
        res.send('Data saved successfully');
    } else {
        throw 'Something went wrong'
    }
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

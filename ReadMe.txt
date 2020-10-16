const express = require('express');
const mongoose = require('mongoose');

//ใส่ไว้กัน Warning 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect('mongodb://localhost:27017/hello-mongoose', options);

//set Table or Collection
const CatModel = mongoose.model('cat', { name: String });

//set name และ บันทึก
const kitty = new CatModel({ name: 'Kitty' });
kitty.save().then(() => console.log('meow'));

//set post 4700
const app = express();

app.get('/', (req, res)=>{
    res.json({ message: 'ok'});
});

app.listen(4700, () => console.log('ok') );
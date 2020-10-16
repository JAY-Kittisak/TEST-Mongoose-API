const express = require('express');
const mongoose = require('mongoose');

//ใส่ไว้กัน Warning 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect('mongodb://localhost:27017/hello-mongoose', options);

//set Table or Collection
const CatModel = mongoose.model(
    'cat', 
//set schema
    new mongoose.Schema(
        {name: String, age: Number }, 
        { versionKey: false, timestamps: true }
    )
);

//set name และ บันทึก
// const namekitty = new CatModel({ name: 'nKitty', age: 19});
// namekitty.save().then(() => console.log('meow'));


//set post 4700
const app = express();

//set ให้ postman "post" ข้อมูลแบบ  Json ได้ 
app.use(express.json());





app.get('/', (req, res)=>{
    res.json({ message: 'ok'});
});


//ทำ "ดีไฟล์ Routing" ของ Express
// Query  
app.get('/cats', (req, res) => {   //db.cats.find().pretty();
    CatModel.find({})
    .then((cats) => res.json(cats))
    .catch(error => 
        res.status(400).json({ message: 'somehing went wrong!'})
        );
});
app.get('/cats/:id', (req, res) => {  //db.cats.findOne({_id: ObjectId('5f8907a0316f8132d412f129') })
    const { id } = req.params;

    CatModel.findById(id).then(data => res.json(data || {}))
    .catch(error => res.status(400)
    .json(error)
    );
});  


// Update
app.put('/cats/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const updated = {
        $set: {
            name,
            age
        }
    };
    const cat = await CatModel.findByIdAndUpdate(id, updated, { new: true });
    res.json(cat);
});


// Delete
app.delete('/cats/:id', async (req, res) => {
    const { id } = req.params;

    await CatModel.findByIdAndDelete(id, {});
    res.json({ message: `${id} already removed` });
});


//create
app.post('/cats', async (req, res) => {
    const { name, age } = req.body;

    const cat = new CatModel({
        name,
        age
    });

    await cat.save();
    res.json({ message: 'saved!'})
});





app.listen(4700, () => console.log('ok') );
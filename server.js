// importing
//able to do this because of module in the package.json
//otherwise it would be cosnt express = reqire('express')
const express = require('express');
const mongoose = require('mongoose');

const Messages = require('./database/whatsappShcmea');

// app config
const app = express();
//port where application going to run
const port = process.env.PORT  || 9000;
// middleware

//DB config
const connection_url = 'mongodb+srv://admin:VFgVJWULySXrolbv@cluster0.pfima.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true});


//??

//api routes
app.get('/',(req,res) => {res.status(200).send('hello World')});


app.post('/api/v1/messages/new', (req,res)=> {
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data)=> {
        if(err){
            res.status(400).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//listener
app.listen(port, ()=> console.log(`listening on localhost:${port}`));
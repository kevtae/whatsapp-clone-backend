// importing
//able to do this because of module in the package.json
//otherwise it would be cosnt express = reqire('express')
const express = require('express');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const cors = require('cors');

const messageRoutes = require("./routes/message");


// app config
const app = express();
//port where application going to run
const port = process.env.PORT  || 9000;


const pusher = new Pusher({
  appId: '1068033',
  key: '26b8f7a5668d1c7a2d53',
  secret: '31164e8b42337fb0d0e8',
  cluster: 'us2',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  'message': 'hello world'
});

// middleware
app.use(express.json());
//web security
app.use(cors());

//DB config
const connection_url = 'mongodb+srv://admin:VFgVJWULySXrolbv@cluster0.pfima.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true});


//??

const db = mongoose.connection;

db.once("open", ()=> {
    console.log("DB connected 2");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages",'inserted',{
                name: messageDetails.user,
                message:messageDetails.message,
                received: messageDetails.received

            })
        } else{
            console.log("error trigger pusher")
        }
    });
})


app.use("/api", messageRoutes );

//listener
app.listen(port, ()=> console.log(`listening on localhost:${port}`));
const Messages = require('../database/whatsappShcmea');


exports.postMessage = (req,res)=> {
    const dbMessage = new Messages(req.body);


    dbMessage.save(dbMessage, (err,message)=> {
        if(err){
            res.status(400).send(err);
            console.log(err);
        } 
        res.json(message);
    })
};
 
exports.getMessage = (req,res)=> {
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.json(data);
        }
    })
}
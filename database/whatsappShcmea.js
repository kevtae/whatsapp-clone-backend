const mongoose = require('mongoose');

const whatsappSchema = new mongoose.Schema(
    {
    
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    message: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    received: {
        type: Boolean,
    },
},
    {
        timestamp: true
    
}
    
    );
module.exports = mongoose.model('messagecontents', whatsappSchema);

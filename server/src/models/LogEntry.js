const mongoose = require('mongoose')

const {Schema} = mongoose;

const requiredNumber = {
    type: Number,
    required : true
}

const logEntrySchema = new Schema({
    title:{
        type:String, 
    required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating:{
        type: Number, 
        min : 0,
        max : 10,
    },
    latitude : {
        ...requiredNumber,
    min : -90,
max :90},
    longitude :{ ...requiredNumber, min:-180 , max:180},
    visitedDate : {
        required : true,
        type: Date,
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const LogEntry  =  mongoose.model('LogEntry' ,  logEntrySchema);

module.exports = LogEntry;
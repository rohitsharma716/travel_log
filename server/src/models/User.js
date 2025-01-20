const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    visitedPlaces: [{
        type: Schema.Types.ObjectId,
        ref: 'LogEntry'
    }],
    bucketList: [{
        type: Schema.Types.ObjectId,
        ref: 'LogEntry'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User; 
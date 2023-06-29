const {Schema, model} = require('mongoose');

const postScheme = new Schema({
        text: {type: String, require: true},
        author: {type: String, require: true}
    }, {
        timestamps: true
    }
);

module.exports = model('Post', postScheme);
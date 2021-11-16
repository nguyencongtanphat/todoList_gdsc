const mongoose = require('mongoose');
const item_schema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('item', item_schema);

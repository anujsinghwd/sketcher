const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    images: {
        type: [String],
        require: true
    },
     desc: {
         lang: {
            type: String,
            default: "en"
         },
         val: {
            type: String,
            require: true
         }
     },
     name: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    brand: {
        id: {
            type: Number,
            require: true
            //default: 123
        },
        name: {
            type: String,
            require: true
            //default: "GooMaps"
        }
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
});

// eslint-disable-next-line no-undef
module.exports = Product = mongoose.model('product', ProductSchema);

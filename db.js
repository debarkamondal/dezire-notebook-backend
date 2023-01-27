const mongoose = require('mongoose');
const mongoUri ="mongodb://127.0.0.1:27017/dezire-notebook"

const connectToMongo=()=>{
    mongoose.connect(mongoUri,(err)=>{
        console.log(err);
    })
}
module.exports = connectToMongo;
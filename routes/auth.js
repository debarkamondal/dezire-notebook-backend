const express= require('express');
const User= require('../models/Users')
const router = express.Router();
// const { Schema } = mongoose;


//Create user using : POST at /api/auth
router.get('/', (req, res)=>{
    console.log(req.body);
    const user= User(req.body);
    user.save();
    res.send(req.body)
})
module.exports = router
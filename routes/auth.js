const express= require('express');
const router = express.Router();


//Create user using : POST at /api/auth
router.get('/', (req, res)=>{
    console.log(req.body)
})
module.exports = router
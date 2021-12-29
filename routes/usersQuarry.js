const express = require('express');
const Users = require('../models/users');
const router = express.Router();


//get all
router.get('/', async(req,res) => {
    try{
        const user = await Users.find()
        res.json(user)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
}); 

//get one
router.get('/:username',getone, async(req, res) => {
    try{
        res.send(res.user)
    } catch(err) {
        res.json({ message:err.message })
    }
})

//creating one
router.post('/', async(req, res) => {
    const user = new Users({
        email:req.body.email,
        username:req.body.username,
        name:req.body.name,
        company:req.body.company,
        address:req.body.address,
        }
    )
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }

})
    
//update one
router.patch('/:username', getone, async (req, res) => {
    if(req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.name != null) {
    res.user.name = req.body.name
    }
    if (req.body.company != null) {
    res.user.company = req.body.company
    }
    if (req.body.address != null) {
    res.user.address = req.body.address
    }

    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//delete one
router.delete('/:username', getone, async (req, res) => {
    try{
        await res.user.remove()
        res.json({ message:'user has been deleted'})
    } catch(err){
        res.status(500).json({ messagge:err.message })
    }

})

async function getone (req,res,next){
    let user
    try{
    user = await Users.findOne({ username : req.params.username})   
    if(user == null){
        return res.status(404).json({ message: 'cant find user' })
    } 
    } catch(err){
        return res.status(500).json({ message:err.message })
    }
    res.user = user
    next()
}
module.exports = router
const express = require('express');
const Profiles = require('../models/profile');
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
        })
    const profile = new Profiles({
        name:req.body.name,
        company:req.body.company,
        address:req.body.address,
    })
    try{
        user.profile.push(profile)
        await Promise.all([user.save(), profile.save()])
        const newUser = user;
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
    res.profile.name = req.body.name
    }
    if (req.body.company != null) {
    res.profile.company = req.body.company
    }
    if (req.body.address != null) {
    res.profile.address = req.body.address
    }

    try{
        await res.profile.save();
        await res.user.save();
        const updatedUser = await Users.findOne({ username: req.params.username }).populate('profile')
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
    let profile
    try{
    user = await Users.findOne({ username : req.params.username}).populate('profile')
    profile = await Profiles.findById(user.profile[0]._id)
    if(user == null && profile == null){
        return res.status(404).json({ message: 'cant find user' })
    } 
    } catch(err){
        return res.status(500).json({ message:err.message })
    }
    res.profile = profile
    console.log(user)
    res.user = user
    next()
}
module.exports = router



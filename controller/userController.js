const User = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret_key'

let registerUser = async (req, res) => {
    let { name, email, address, password } = req.body
    let profilePic = req.file.filename
    // let coverPic = req.file.filename
    try {
        let hashedPassword = await bcrypt.hashSync(password, salt)
        console.log(hashedPassword)
        let userFound = await User.findOne({ email })
        if (userFound) {
            return res.json({ msg: 'User already exists', success: false })
        }
        else {
            await User.create({ name, email, address, password: hashedPassword, profilePic})
            return res.json({ msg: 'User registered successfully', success: true })
        }
    } catch (error) {
        return res.json({ msg: 'Error registering user', success: false, error: error.message })
    }

}

let loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        let findUser = await User.findOne({ email })
        if (findUser) {
            let passwordMatch = bcrypt.compareSync(password, findUser.password)
            let token = jwt.sign({ _id: findUser._id }, JWT_SECRET)
            console.log(token)
            if (passwordMatch) {
                res.json({ msg: 'User logged in successfully!', success: true, token })
            }
            else {
                res.json({ msg: 'Wrong Password!', success: false })
            }
        }
        else {
            res.json({ msg: 'User not found!', success: false })
        }

    } catch (error) {
        res.json({ msg: 'Error in login!', success: false, error: error.message })

    }
}

let deleteUser = async (req, res) => {
    let _id = req.params._id
    let id = req.userId
    console.log(id)
    if(id == _id){
        await User.findByIdAndDelete(id)
        return res.json({msg:'User Deleted Successfully!', success:true})
    }
    else{
        return res.json({msg:'You can only delete your account!', success:false})
    }
}

let updateUser = async(req,res)=>{
    let {name,password,address,profilePic,coverPic} = req.body
    let id = req.params._id
    let userId = req.userId

    if(id == userId){
        let hashedPassword;
        if(password){
            hashedPassword = bcrypt.hashSync(password,salt)
        }
        let data = await User.findByIdandUpdate(id,{$set:{name, password:hashedPassword, address, profilePic, coverPic}},{new:true})
        res.json({msg:"Updating Successful", success:true, data})
    }
    else{
        res.json({msg:'You can only update your account!', success:false})
    }
}

module.exports = {
    registerUser,
    loginUser, deleteUser, 
    updateUser
}
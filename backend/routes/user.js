const express = require("express")
const router = express.Router()
const zod = require('zod')
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { authMiddleware } = require("../middleware")

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        console.log(req.body)
        return res.status(411).json({
            message: 'Incorrect inputs'
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: 'User already exists'
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = user._id

    // Assigning random balance to the User
    await Account.create({
        userId: userId,
        balance: (Math.random() * 10**4) + 1
    })

    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET)

    res.status(200).json({
        message: 'User created successfully',
        token: token
    })
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (!existingUser) {
        return res.status(411).json({
            message: 'User does not exist'
        })
    }

    const token = jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET)

    return res.status(200).json({
        message: 'User signed in successfully',
        token: token
    })
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating user info"
        })
    }
    
    await User.updateOne({
        _id: req.userId
    })

    return res.json({
        message: "User updated successfully"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter,
                $options: 'i'
            }
        },{
            lastName: {
                $regex: filter,
                $options: 'i'
            }
        }]
    })
    // console.log(users)
    return res.status(200).json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/getuser", authMiddleware, async (req, res) => {
    const existingUser = await User.findOne({
        _id: req.userId
    })
    if (!existingUser) {
        return res.status(411).json({
            message: 'User does not exist'
        })
    }
    res.status(200).json({
        user: {
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            _id: existingUser._id
        }
    })
})

module.exports = router
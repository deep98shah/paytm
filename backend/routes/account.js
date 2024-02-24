const express = require("express")
const router = express.Router()
const zod = require('zod')
const { User, Account } = require('../db')
const { authMiddleware } = require("../middleware")
const { mongoose } = require("mongoose")

router.get("/balance", authMiddleware, async (req, res) => {
    console.log("from balance endpoint")
    const account = await Account.findOne({
        userId: req.userId
    })
    
    if (account) {
        res.status(200).json({
            balance: account.balance
        })
    } else {
        res.status(400).json({
        message: "Account not found"
    })}
})

router.post("/transfer/", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction({ readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } })

    const { amount, toUser } = req.body
    const account = await Account.findOne({
        userId: req.userId
    }).session(session)
    if (!account) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid sender account"
        })
    }
    if (account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({
        userId: toUser
    })
    console.log('toAccount', toUser, toAccount)
    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid receiver account"
        })
    }
    
    console.log("Why hereeeee")
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)
    console.log("hereee 1")
    await Account.updateOne({
        userId: toUser
    }, {
        $inc: {
            balance: amount
        }
    }).session(session)
    console.log("hereee 2")
    await session.commitTransaction()
    console.log("hereeee 3")
    res.status(200).json({
        message: "Transfer successfull"
    })
})

module.exports = router
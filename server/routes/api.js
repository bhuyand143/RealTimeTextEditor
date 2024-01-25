const express = require('express');
const User = require('../models/User')
const Document = require('../models/Documents')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = process.env.JWT_SIGN;


//Route1: Creating User using /api/auth/createUser post Method

router.post('/createUser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],

    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Duplicate Email", success })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            const data = {
                user: {
                    Id: user._id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ authToken, success, user_id: user._id });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error!");
        }
    })


//Route 2: Authenticating User using /api/login post Method

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank!').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials", success });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                Id: user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken, user_id: user._id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})


router.get('/fetchfiles', async (req, res) => {
    try {
        const token = req.header('auth-token');//name of the header it can be any name which should be name as header
        if (!token) {
            res.status(401).json({ error: "Please Authenticate using a valid token" })
        }
        const data = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(data.user.Id).populate('files');
        res.json({ files: user.files });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

router.get('/fetchfile/:docid', async (req, res) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).json({ error: "Please Authenticate using a valid token" })
        }
        const data = jwt.verify(token, JWT_SECRET);
        const { docid } = req.params;
        const doc = await Document.findOne({ doc_id: docid })

        if (doc)
            res.json({ success: true });
        else
            res.json({ success: false });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})


router.delete('/deletefile/:docid', async (req, res) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).json({ error: "Please Authenticate using a valid token" })
        }
        const data = jwt.verify(token, JWT_SECRET);
        const { docid } = req.params;
        const doc = await Document.findOne({ doc_id: docid });
        if (doc) {
            if (doc.owner.equals(data.user.Id)) {
                const deleted = await Document.deleteOne({ doc_id: docid });
                res.json({ success: true, message: "File deleted!" });
            }
            else {
                res.json({ success: false, message: "You are not the owner of the file" });
            }
        }
        else {
            res.json({ success: false, message: "File not Found!" });
        }

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

module.exports = router
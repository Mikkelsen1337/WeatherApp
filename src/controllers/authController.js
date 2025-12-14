const bcrypt = require('bcrypt');
const User = require('../models/User');


const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({msg: "Mangler udfyldning af felter "});
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({msg: "Emailen er allerede tilknyttet en bruger "});
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({email, password: hashed});
        await user.save();
        req.session.user = {_id: user._id, email: user.email};
        return res.status(201).json({msg: "Konto oprettet! "});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server fejl" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: "Magler udfyldning af felter "});
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json ({ msg: "Email ikke fundet"});
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ msg: "Kodeord matcher ikke"});
        req.session.user = { _id: user._id, email: user.email };
        return res.status(200).json({ msg: "Login succesfuldt! "});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server fejl"});
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ msg: "Kunne ikke logge ud"});
        res.clearCookie('connect.sid');
        return res.status(200).json({ msg: "Logget ud! "})
    });
};

const deleteAccount = async (req, res) => {
    try {
        if (!req.session.user) return res.status(403).json({ msg: "Ikke godkendt " });
        const userId = req.session.user._id;
        await User.findByIdAndDelete(userId);
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.status(200).json({ msg: "Konto slettet "});
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server fejl "});
    }
};

module.exports = { register, login, logout, deleteAccount };

const User = require("../models/User");

const addFavorite = async (req, res) => {
    try {
        if (!req.session.user) return res.status(403).json({ msg: "Ikke godkendt" });
        const userId = req.session.user._id;
        const { city } = req.body;
        if (!city) return res.status(400).json({ msg: "Mangler by "});
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "Bruger ikke fundet"});
        if (user.favorites.some(f => f.city.toLowerCase() === city.toLowerCase())) {
            return res.status(400).json({ msg: "Byen er allerede markeret som Favorit"});
        }
        user.favorites.push ({ city });
        await user.save();
        return res.status(201).json({ msg: "Favorit tilføjet"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server fejl"});
    }
};

const getFavorites = async (req, res) => {
    try {
        if (!req.session || !req.session.user) return res.status(403).json({ msg: 'Ikke godkendt' });
        const userId = req.session.user._id || req.session.user.id || req.session.user;
        const user = await User.findById(userId).lean();
        if (!user) return res.status(404).json({ msg: 'Bruger ikke fundet' });
        return res.status(200).json({ favorites: user.favorites || [] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server fejl' });
    }
};

const deleteFavorites = async (req, res) => {
    try {
        if (!req.session || !req.session.user) return res.status(403).json({ msg: 'Ikke godkendt' });
        const userId = req.session.user._id || req.session.user.id || req.session.user;
        const favId = req.params.id;
        if (!favId) return res.status(400).json({ msg: 'Mangler favorite ID' });
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'Bruger ikke fundet' });
        const before = user.favorites.length;
        user.favorites = user.favorites.filter(f => f._id.toString() !== favId);
        if (user.favorites.length === before) return res.status(404).json({ msg: 'Favorit ikke fundet' });
        await user.save();
        return res.status(200).json({ msg: 'Favorite deleted', id: favId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { addFavorite, getFavorites, deleteFavorites };
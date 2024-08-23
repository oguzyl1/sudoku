const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("Kayıt Başarılı");
  } catch (error) {
    res.status(500).send("Kayıt hatası");
    console.error("Kayıt hatası:", error);
  }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Kullanıcı bulunamadı');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Geçersiz şifre');

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    res.status(500).send('Giriş hatası');
    console.error('Giriş hatası:', error);
  }
};

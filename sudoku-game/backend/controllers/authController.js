const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Kullanıcı adı ve şifre gereklidir.");
    }

    if (password.length < 6) {
      return res.status(400).send("Şifre en az 6 karakter olmalıdır.");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Bu kullanıcı adı zaten alınmış.");
    }

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
    if (!user) {
      return res.status(400).send("Kullanıcı adı veya şifre hatalı");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Kullanıcı adı veya şifre hatalı");
    }

    const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Giriş hatası");
    console.error("Giriş hatası:", error);
  }
};

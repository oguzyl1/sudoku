//backend/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: { type: String, required: true, minlength: 6 },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
});

// Şifreyi kaydetmeden önce hash'leme
userSchema.pre("save", async function (next) {
  const user = this;

  // Şifre değişmemişse, yani sadece kullanıcı güncelleniyorsa
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Şifreyi hash'leme
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(new Error("Şifre hash'lenirken bir hata oldu!"));
  }
});

// Giriş kısmında şifreyi doğrulama
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw new Error("Şifre karşılaştırılırken bir hata oluştu");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

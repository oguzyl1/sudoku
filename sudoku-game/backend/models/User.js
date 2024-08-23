//backend/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// Şifreyi doğrulama yöntemi
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

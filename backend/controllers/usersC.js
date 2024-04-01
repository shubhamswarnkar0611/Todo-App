const User = require("../models/UserM");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if(!name,!email,!password) return res.status(400).json("Please fill all fields");
    
    //Checking if user already
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    const user = await User.create({ name, email, password: hashPassword });
    res.status(201).send(user);
  } catch (e) {
    let msg;
    if (e.code == 11000) {
      msg = "User already exists";
    } else {
      msg = e.message;
    }
    res.status(400).json(msg);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json( "invalid credentials" );
    // console.log(user._id);
    req.user=user._id;
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword){
      return res.status(400).json( "invalid credentials" );
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(400).json(e.message)
  }
};

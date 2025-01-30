const bcrypt = require("bcrypt");
const prisma = require("../prisma/pool");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Username, email, and password is required",
    });
  }

  try {
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExists) {
      return res
        .status(409)
        .json({ success: false, error: "Username is already used" });
    }

    const emailExists = await prisma.user.findUnique({ where: { email } });

    if (emailExists) {
      return res
        .status(409)
        .json({ success: false, error: "Email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    req.session.isAuth = true;
    req.session.username = username;
    req.session.email = email;

    res.json({
      success: true,
      message: "User signup successful",
      user: { ...newUser, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to signup user" });
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    return res.status(400).json({
      success: false,
      error: "Username and email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      error: "Password is required",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    req.session.isAuth = true;
    req.session.username = user.username;
    req.session.email = user.email;

    res.status(200).json({
      success: true,
      message: "Logged in user successfully",
      user: { ...user, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to login user" });
  }
};

module.exports = {
  signup,
  login,
};

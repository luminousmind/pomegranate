const bcrypt = require("bcrypt");
const prisma = require("../prisma/pool");

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({success: false, error: "Username, email, and password is required"});
    }

    try {
        const usernameExists = await prisma.user.findUnique({where: {username}});

        if (usernameExists) {
            return res.status(409).json({success: false, error: "Username is already used"});
        }
        
        const emailExists = await prisma.user.findUnique({where: {email}});
        
        if (emailExists) {
            return res.status(409).json({success: false, error: "Email is already used"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({data: {
            username,
            email,
            password: hashedPassword
        }});

        res.json({success: true, message: "User signup successful"});
    } catch (error) {
        res.status(500).json({success: false, error: "Failed to signup user"});
    }
}

module.exports = {
    signup
};
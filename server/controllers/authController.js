const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        const generateToken = require('../utils/generateToken');

        const token = generateToken(user._id, user.role);

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Lỗi máy chủ'
        });
    }
};
module.exports = { register, login };
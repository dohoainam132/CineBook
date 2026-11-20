const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const generateToken = require('../utils/generateToken');
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};
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
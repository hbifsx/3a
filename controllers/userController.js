const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API для работы с пользователями
 */

function generateJwt(userId, userEmail, userRole) {
    const token = jwt.sign({ id: userId, email: userEmail, role: userRole }, 'your_secret_key');
    return token;
}

class UserController {
    /**
     * @swagger
     * /api/user/registration:
     *   post:
     *     summary: Регистрация нового пользователя
     *     description: Регистрация нового пользователя с указанным email и паролем.
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - email
     *               - password
     *     responses:
     *       200:
     *         description: Успешная регистрация. Токен аутентификации пользователя.
     *       400:
     *         description: Некорректный email или password.
     *       409:
     *         description: Пользователь с таким email уже существует.
     */
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } 

    /**
     * @swagger
     * /api/user/login:
     *   post:
     *     summary: Вход пользователя
     *     description: Вход пользователя с указанным email и паролем.
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - email
     *               - password
     *     responses:
     *       200:
     *         description: Успешный вход. Токен аутентификации пользователя.
     *       404:
     *         description: Пользователь не найден.
     *       500:
     *         description: Указан неверный пароль.
     */
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    /**
     * @swagger
     * /api/user/auth:
     *   get:
     *     summary: Проверить аутентификацию пользователя
     *     description: Проверка аутентификации пользователя по токену.
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Успешная проверка аутентификации. Токен аутентификации пользователя.
     */
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()

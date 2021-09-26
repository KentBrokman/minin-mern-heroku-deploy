const { Router } = require('express')
const router = Router()
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Неверный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log('Body', req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }
            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashedPassword })
            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так", error: e.message })
        }
    })


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите верный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({
                    message: 'Пользователь не найден'
                })
            }

            const isMatchPassword = bcrypt.compare(password, user.password)
            if (!isMatchPassword) {
                return res.status(400).json({
                    message: 'Неверный пароль'
                })
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({
                token,
                userId: user.id,
                message: 'Успешный логин'
            })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так', error: e.message })
        }
    })

module.exports = router
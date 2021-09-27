const { Router } = require('express')
const router = Router()
const Link = require('../models/Link')
const authMiddleware = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')


// /api/link/generate
router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from})
        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()

        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так", error: e.message })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        req.json(links)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так", error: e.message })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        req.json(link)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так", error: e.message })
    }
})

module.exports = router
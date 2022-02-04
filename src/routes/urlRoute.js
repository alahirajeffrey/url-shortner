const Url = require('../models/urlModel');
const router = require('express').Router()
const shortenUrl = require("node-url-shortener");
const validUrl = require('valid-url');

//@route POST/api/url/shorten
//@desc create short url
router.post('/shorten', async (req, res) => {

    //validate request
    if (!req.body.longUrl) return res.status(400).send({ message: "Please input your url" })

    //check if url is invalid
    if (!validUrl.isUri(req.body.longUrl)) return res.status(401).json('Invalid base URL')

    //check if url is valid
    if (validUrl.isUri(req.body.longUrl)) {

        try {

            //check if url is already stored in the database
            const url = await Url.findOne({ longUrl: req.body.longUrl })

            if (url) {
                return res.status(200).json({ message: "Url already shortened" })
            } else {
                //shorten url and save if it does not exist
                shortenUrl.short(req.body.longUrl, (err, shortUrl) => {
                    const newUrl = Url({
                        longUrl: req.body.longUrl,
                        shortUrl: shortUrl
                    })
                    const savedUrl = newUrl.save()
                    return res.status(200).send(savedUrl.shortUrl)
                });
            }
        } catch (err) {
            return res.status(500).send(err)
        }
    }
})

//@route GET/api/url/getAll
//@desc get all urls
router.get('/getAll', async (req, res) => {

    try {
        //find all saved urls
        const urls = await Url.find()

        return res.status(200).send(urls)

    } catch (err) {
        return res.status(500).send(err)
    }
})

//@route GET/api/url/:id
//@desc redirect to long url
router.get('/:id', async (req, res) => {

    try {
        //check if short url exists
        const url = await Url.findOne({ _id: req.params.id })

        if (!url) return res.status(400).send({ message: "Short url does not exist" })

        if (url) return res.redirect(url.longUrl)

    } catch (err) {
        return res.status(500).send(err)
    }
})

module.exports = router;
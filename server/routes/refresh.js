const router = require('express').Router();
const fetch = require('node-fetch');
const { base_url, content_type, header } = require('../utilities');

const url = base_url + 'api/token'

router.post('/', (req, res) => {
    const refresh = req.body.refresh;
    console.log(refresh)
    console.log((new Date).toString())
    if (!refresh) {
        return res.status(401).json({ error: 'No refresh token provided' })
    }
    const data = {
        grant_type: 'refresh_token',
        refresh_token: refresh
    }
    const form = Object.entries(data).map(d => encodeURIComponent(d[0]) + '=' + encodeURIComponent(d[1])).join('&')

    const options = {
        method: 'POST',
        headers: {
            'Authorization': header,
            'Content-Type': content_type
        },
        body: form,
        json: true
    }

    fetch(url, options).then(r => r.json()).then(j => res.json(j)).catch(err => console.log(err))

})

module.exports = router
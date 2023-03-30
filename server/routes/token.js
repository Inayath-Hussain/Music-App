const router = require('express').Router();
const fetch = require('node-fetch');
const { base_url, client_id, client_secret, content_type, header, redirect_uri } = require('../utilities');

router.post('/', (req, res) => {
    const code = req.body.code
    console.log('code', code)

    const data = {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
    }

    const form = Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')
    console.log(form)

    const options = {
        method: 'POST',
        headers: {
            'Authorization': header,
            'Content-Type': content_type
        },
        body: form,
        json: true
    }
    // console.log(`Basic ${new Buffer.from(client_id + ':' + client_secret).toString('base64')}`)
    fetch(`${base_url}api/token`, options).then((r) => r.json())
        .then(j => { console.log(j); res.json(j) })
        .catch(err => console.log(err))
})

module.exports = router
const router = require('express').Router();
const querystring = require('querystring');
const { client_id, client_secret, base_url, redirect_uri, scope } = require('../utilities');

router.get('/', (req, res) => {
    const query = querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        redirect_uri: redirect_uri,
        scope: scope
    })

    res.redirect(`${base_url}authorize?${query}`)
})

module.exports = router
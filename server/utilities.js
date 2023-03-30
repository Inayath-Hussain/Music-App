const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const base_url = 'https://accounts.spotify.com/';
const redirect_uri = 'http://localhost:3000';
const content_type = 'application/x-www-form-urlencoded';
const header = `Basic ${new Buffer.from(client_id + ':' + client_secret).toString('base64')}`;
const scope = 'user-read-recently-played user-library-read playlist-read-private user-follow-read user-read-email user-read-private user-library-modify user-follow-modify playlist-modify-public playlist-modify-private streaming user-read-playback-state user-modify-playback-state'

module.exports.base_url = base_url;
module.exports.client_id = client_id;
module.exports.client_secret = client_secret;
module.exports.content_type = content_type;
module.exports.redirect_uri = redirect_uri;
module.exports.header = header;
module.exports.scope = scope
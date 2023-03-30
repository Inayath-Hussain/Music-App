export const authorize_api = 'http://localhost:3001/authorize';

export const recently_played_api = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';

export const new_releases_api = 'https://api.spotify.com/v1/browse/new-releases?limit=50';

export const search_genres_api = 'https://api.spotify.com/v1/browse/categories';

export const user_top_api = (type) => `https://api.spotify.com/v1/me/top/${type}`;

export const search_api = (q) => `https://api.spotify.com/v1/search?q=${q}&type=track%2Cartist%2Calbum%2Cplaylist&limit=50`;

export const liked_songs_api = 'https://api.spotify.com/v1/me/tracks?limit=50';

export const user_playlists_api = 'https://api.spotify.com/v1/me/playlists?limit=50';

export const user_albums_api = 'https://api.spotify.com/v1/me/albums?limit=50';

export const user_artists_api = 'https://api.spotify.com/v1/me/following?type=artist&limit=50';

export const user_info_api = 'https://api.spotify.com/v1/me';

export const save_unsave_api = (type, id) => `https://api.spotify.com/v1/me/${type}?ids=${id}`;

export const follow_unfollow_playlist_api = (id) => `https://api.spotify.com/v1/playlists/${id}/followers`;

export const album_api = (id) => `https://api.spotify.com/v1/albums/${id}`;

export const artist_info_api = (id) => `https://api.spotify.com/v1/artists/${id}`;

export const artist_top_tracks_api = (id) => `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`;

export const follow_artist_api = (id) => `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`;

export const artist_album_api = (id) => `https://api.spotify.com/v1/artists/${id}/albums`;

export const playlist_items_api = (id) => `https://api.spotify.com/v1/playlists/${id}/tracks?limit=100`;

export const playlist_api = (id) => `https://api.spotify.com/v1/playlists/${id}`;

export const category_playlist_api = (id) => `https://api.spotify.com/v1/browse/categories/${id}/playlists`;
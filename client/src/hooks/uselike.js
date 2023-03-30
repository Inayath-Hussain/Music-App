import { useContext } from 'react';
import axios from 'axios';
import { save_unsave_api as st_api } from '../utilities/endpoints';
import { likedsongscontext, useralbumscontext } from '../context/playlists';

export const useLike = (change, setChange) => {
    const { likedSongs, setLikedSongs } = useContext(likedsongscontext);
    const { userAlbums, setUserAlbums } = useContext(useralbumscontext);

    const call = async (type, track) => {
        const result = await axios.put(st_api(type, track.id), {}, {
            headers:
            {
                Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 200) {
            if (type === 'tracks') {
                const new_likedSongs = likedSongs;
                let items = [{ track }, ...likedSongs.items]
                new_likedSongs.items = items
                new_likedSongs.total = likedSongs.total + 1

                setLikedSongs(new_likedSongs)
                setChange(!change)
            }
            if (type === 'albums') {
                const new_userAlbums = userAlbums;
                let items = [{ album: track }, ...userAlbums.items]
                new_userAlbums.items = items
                new_userAlbums.total = userAlbums.total + 1

                setUserAlbums(new_userAlbums)
                setChange(!change)
            }
        }
    }

    return call
}
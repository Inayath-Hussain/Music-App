import { useContext } from 'react';
import axios from 'axios';
import { save_unsave_api as ut_api } from '../utilities/endpoints';
import { likedsongscontext, useralbumscontext } from '../context/playlists';

export const useDislike = (change, setChange) => {
    const { likedSongs, setLikedSongs } = useContext(likedsongscontext);
    const { userAlbums, setUserAlbums } = useContext(useralbumscontext);

    const call = async (type, track) => {
        const result = await axios.delete(ut_api(type, track.id), {
            headers: {
                Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 200) {
            if (type === 'tracks') {
                const new_likedSongs = likedSongs;
                new_likedSongs.items = likedSongs.items.filter(i => i.track.id !== track.id)
                new_likedSongs.total = likedSongs.total - 1;

                setLikedSongs(new_likedSongs)
                setChange(!change)
            }

            if (type === 'albums') {
                const new_userAlbums = userAlbums;
                new_userAlbums.items = userAlbums.items.filter(i => i.album.id !== track.id)
                new_userAlbums.total = userAlbums.total - 1;

                setUserAlbums(new_userAlbums)
                setChange(!change)
            }
        }
    }

    return call
}
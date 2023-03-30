import { useContext } from "react";
import axios from "axios";
import { userplaylistscontext } from "../context/playlists";
import { follow_unfollow_playlist_api as fp_api } from "../utilities/endpoints";

const useLikePlaylist = (change, setChange) => {
    const { userPlaylists, setUserPlaylists } = useContext(userplaylistscontext);

    const call = async (playlist) => {
        const result = await axios.put(fp_api(playlist.id), {}, {
            headers: {
                Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 200) {
            const new_userPlaylists = userPlaylists
            let items = [{ ...playlist }, ...userPlaylists.items]
            new_userPlaylists.items = items
            new_userPlaylists.total = userPlaylists.total + 1
            setUserPlaylists(new_userPlaylists)
            setChange(!change)
        }
    }
    return call;
}

export default useLikePlaylist;
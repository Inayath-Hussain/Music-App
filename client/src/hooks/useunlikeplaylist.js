import { useContext } from "react";
import axios from "axios";
import { userplaylistscontext } from "../context/playlists";
import { follow_unfollow_playlist_api as fp_api } from "../utilities/endpoints";

const useUnlikePlaylist = (change, setChange) => {
    const { userPlaylists, setUserPlaylists } = useContext(userplaylistscontext);

    const call = async (playlist) => {
        const result = await axios.delete(fp_api(playlist.id), {
            headers: {
                Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 200) {
            const new_userPlaylists = userPlaylists
            new_userPlaylists.items = userPlaylists.items.filter(v => v.id !== playlist.id)
            new_userPlaylists.total = userPlaylists.total - 1
            setUserPlaylists(new_userPlaylists)
            setChange(!change)
        }
    }

    return call;
}

export default useUnlikePlaylist;
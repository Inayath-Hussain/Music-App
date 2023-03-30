import { useContext } from "react";
import axios from "axios";
import { userartistscontext } from "../context/playlists";
import { follow_artist_api as fa_api } from "../utilities/endpoints";

const useUnFollow = (change, setChange) => {
    const { userArtists, setUserArtists } = useContext(userartistscontext);

    const call = async (info) => {
        const result = await axios.delete(fa_api(info.id), {
            headers: {
                Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 204) {
            const new_userartists = userArtists
            new_userartists.artists.items = userArtists.artists.items.filter(v => v.id !== info.id)

            setUserArtists(new_userartists)
            setChange(!change)
        }

    }

    return call
}

export default useUnFollow;
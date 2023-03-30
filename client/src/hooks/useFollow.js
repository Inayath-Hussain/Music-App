import { useContext } from "react";
import axios from "axios";
import { userartistscontext } from "../context/playlists";
import { follow_artist_api as fa_api } from "../utilities/endpoints";

const useFollow = (change, setChange) => {
    const { userArtists, setUserArtists } = useContext(userartistscontext);

    const call = async (info) => {
        const result = await axios.put(fa_api(info.id), {}, {
            headers:
            {
                Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 204) {
            const new_userartists = userArtists;
            new_userartists.artists.items = [{ ...info }, ...userArtists.artists.items]
            new_userartists.artists.total = userArtists.artists.total + 1

            setUserArtists(new_userartists);
            setChange(!change)
        }

    }

    return call
}

export default useFollow;
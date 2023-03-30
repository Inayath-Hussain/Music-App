import { useContext } from "react";
import fetchData from "../utilities/fetchData";
import fetchAll from "../utilities/fetchAll";
import { likedsongscontext, useralbumscontext, userartistscontext, userinfocontext, userplaylistscontext } from "../context/playlists";
import { codeContext } from "../context/accessToken";
import { liked_songs_api, user_albums_api, user_artists_api, user_info_api, user_playlists_api } from "../utilities/endpoints";

export const useGetUserInfo = () => {
    const { accessToken } = useContext(codeContext);
    const { setUserInfo } = useContext(userinfocontext);

    const call = async () => {
        const user_info = await fetchData(user_info_api);

        setUserInfo(user_info.data)
    }

    return call
}


export const useGetLikedSongs = (change, setChange) => {
    const { accessToken } = useContext(codeContext);
    const { setLikedSongs } = useContext(likedsongscontext)

    const call = async () => {
        const liked_songs = await fetchAll(liked_songs_api);

        setLikedSongs(liked_songs)
        if (change !== undefined) {

            setChange(!change)
        }
    }

    return call
}

export const useGetUserAlbums = (change, setChange) => {
    const { setUserAlbums } = useContext(useralbumscontext);

    const call = async () => {
        const user_albums = await fetchAll(user_albums_api);

        setUserAlbums(user_albums)
        if (change !== undefined) {

            setChange(!change)
        }
    }

    return call
}

export const useGetUserPlaylists = (change, setChange) => {
    const { setUserPlaylists } = useContext(userplaylistscontext);

    const call = async () => {
        const user_playlists = await fetchAll(user_playlists_api);

        setUserPlaylists(user_playlists)
        if (change !== undefined) {

            setChange(!change)
        }
    }

    return call
}

export const useGetUserArtists = (change, setChange) => {
    const { setUserArtists } = useContext(userartistscontext);

    const call = async () => {
        let items = [];
        let url = user_artists_api;
        let user_artists;
        while (true) {
            const result = await fetchData(url)
            items = [...items, ...result.data.artists.items]
            url = result.data.artists.next

            if (!url) {
                user_artists = result.data
                user_artists.artists.items = items
                break
            }
        }

        setUserArtists(user_artists)
        if (change !== undefined) {

            setChange(!change)
        }
    }

    return call
}
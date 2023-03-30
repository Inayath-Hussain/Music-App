import { createContext, useState } from "react";

export const rpcontext = createContext();
export const nrcontext = createContext();
export const usertopartist = createContext(); //not used yet
export const lgcontext = createContext();
export const likedsongscontext = createContext();
export const userplaylistscontext = createContext();
export const useralbumscontext = createContext();
export const userartistscontext = createContext();
export const userinfocontext = createContext();

export const RpContextProvider = ({ children }) => {
    const [recentlyPlayed, setRecentlyPlayed] = useState();

    return (
        <rpcontext.Provider value={{ recentlyPlayed, setRecentlyPlayed }}>
            {children}
        </rpcontext.Provider>
    )
}

export const NrContextProvider = ({ children }) => {
    const [newReleases, setNewReleases] = useState();

    return (
        <nrcontext.Provider value={{ newReleases, setNewReleases }}>
            {children}
        </nrcontext.Provider>
    )
}

export const LGContextProvider = ({ children }) => {
    const [locationGenres, setLocationGenres] = useState();

    return (
        <lgcontext.Provider value={{ locationGenres, setLocationGenres }}>
            {children}
        </lgcontext.Provider>
    )
}

export const LSContextProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState();

    return (
        <likedsongscontext.Provider value={{ likedSongs, setLikedSongs }}>
            {children}
        </likedsongscontext.Provider>
    )
}

export const UPContextProvider = ({ children }) => {
    const [userPlaylists, setUserPlaylists] = useState();

    return (
        <userplaylistscontext.Provider value={{ userPlaylists, setUserPlaylists }}>
            {children}
        </userplaylistscontext.Provider>
    )
}

export const UAConextProvider = ({ children }) => {
    const [userAlbums, setUserAlbums] = useState();

    return (
        <useralbumscontext.Provider value={{ userAlbums, setUserAlbums }}>
            {children}
        </useralbumscontext.Provider>
    )
}

export const UARContextProvider = ({ children }) => {
    const [userArtists, setUserArtists] = useState();

    return (
        <userartistscontext.Provider value={{ userArtists, setUserArtists }}>
            {children}
        </userartistscontext.Provider>
    )
}

export const UIContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState();

    return (
        <userinfocontext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </userinfocontext.Provider>
    )
}
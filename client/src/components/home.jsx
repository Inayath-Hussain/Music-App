import { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Zoom } from "@mui/material";

import { codeContext } from "../context/accessToken";
import { rpcontext, nrcontext, likedsongscontext, userplaylistscontext, useralbumscontext, userartistscontext, userinfocontext } from "../context/playlists";
import { recently_played_api as rp_api, new_releases_api as nr_api, liked_songs_api as ls_api, user_playlists_api as up_api, user_albums_api as ua_api, user_artists_api as uar_api, user_info_api as ui_api } from '../utilities/endpoints';
import fetchData from "../utilities/fetchData";
import fetchAll from "../utilities/fetchAll";
import UserProfile from "./userprofile";

const Home = () => {
    const { recentlyPlayed, setRecentlyPlayed } = useContext(rpcontext);
    const { newReleases, setNewReleases } = useContext(nrcontext);
    const { likedSongs, setLikedSongs } = useContext(likedsongscontext);
    const { userPlaylists, setUserPlaylists } = useContext(userplaylistscontext);
    const { userAlbums, setUserAlbums } = useContext(useralbumscontext);
    const { userArtists, setUserArtists } = useContext(userartistscontext);
    const { userInfo, setUserInfo } = useContext(userinfocontext);
    const { access_token } = useContext(codeContext);

    useEffect(() => {
        const call = async () => {
            if (access_token) {
                const recently_played = await fetchData(rp_api)

                setRecentlyPlayed(recently_played.data)
            }
            if (access_token && !userInfo) {
                const user_info = await fetchData(ui_api);

                setUserInfo(user_info.data)
            }
            if (access_token && !newReleases) {
                const new_releases = await fetchData(nr_api)

                new_releases.data.albums.items = new_releases.data.albums.items.filter((n) => n.id !== '' && n.images.length > 0 && n.name !== '')
                setNewReleases(new_releases.data)
            }
            if (access_token && !likedSongs) {
                const liked_songs = await fetchAll(ls_api);

                setLikedSongs(liked_songs)
            }
            if (access_token && !userPlaylists) {
                const user_playlists = await fetchAll(up_api);

                setUserPlaylists(user_playlists)
            }
            if (access_token && !userAlbums) {
                const user_albums = await fetchAll(ua_api);

                setUserAlbums(user_albums)
            }
            if (access_token && !userArtists) {
                let items = [];
                let url = uar_api;
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
            }
        }

        call();

    }, [access_token])

    const filtered_RP = recentlyPlayed ? recentlyPlayed.items.filter((value, index, self) => index === self.findIndex(t => t.track.id === value.track.id)).slice(0, 5) : [];

    return (
        <Fragment>
            <UserProfile />
            <div className="mainPadding" style={{ paddingTop: '30px' }}>
                {recentlyPlayed && <div className="heading">
                    <h2 style={{ marginTop: 0 }}>Recently Played</h2>
                    <Link to='recently played'>show all</Link>
                </div>
                }
                <div className="card-container">
                    {recentlyPlayed && filtered_RP.map(r => (
                        <Link to={`/album/${r.track.album.id}`} key={r.track.id}>
                            <div className="card" >
                                <div className="card-img-container">
                                    <img className="card-img" src={r.track.album.images[0].url} alt="" style={{ borderRadius: '5px' }} />
                                    <div className="play-icon-container">
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <Tooltip title={<p style={{ fontSize: '1.2em' }}>{r.track.name}</p>} arrow TransitionComponent={Zoom} disableInteractive>
                                    <p className="title">{r.track.name}</p>
                                </Tooltip>
                                <span className="artist">
                                    {r.track.artists.map(a => (
                                        <Link className="song-artist" to={a.name === 'Various Artists' ? '#' : `/artist/${a.id}`} key={a.id}>{r.track.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                    ))}
                                </span>
                                <br />
                            </div>
                        </Link>
                    ))}
                </div>
                <br />

                {newReleases && <div className="heading">
                    <h2>New Releases</h2>
                    <Link to='section/New Releases'>show all</Link>
                </div>
                }
                <div className="card-container">

                    {newReleases && newReleases.albums.items.slice(0, 5).map(n => (
                        <Link to={`/album/${n.id}`} key={n.id}>
                            <div className="card">

                                <div className="card-img-container">
                                    <img className="card-img" src={n.images[0].url} alt="" />
                                    <div className="play-icon-container">
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                        </svg>
                                    </div>
                                </div>

                                <Tooltip title={<p style={{ fontSize: '1.2em' }}>{n.name}</p>} arrow TransitionComponent={Zoom} disableInteractive>
                                    <p className="title">{n.name}</p>
                                </Tooltip>
                                <div className="artist">
                                    {n.artists.map(a => (
                                        <Link className="song-artist" to={a.name === 'Various Artists' ? '#' : `/artist/${a.id}`} key={a.id}>{n.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <br />
                <br />
            </div>
        </Fragment>
    );
}

export default Home;
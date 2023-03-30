import { Fragment, useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Divider, Tooltip, Zoom } from "@mui/material";
import { likedsongscontext, userartistscontext } from "../context/playlists";
import { useGetLikedSongs, useGetUserArtists } from "../hooks/getcontext";
import { useLike } from "../hooks/uselike";
import { useDislike } from "../hooks/usedislike";
import fetchData from "../utilities/fetchData";
import { artist_album_api, artist_info_api, artist_top_tracks_api } from "../utilities/endpoints";
import milli from "../utilities/millisecToMin";
import useFollow from "../hooks/useFollow";
import useUnFollow from "../hooks/useUnFollow";
import Albums from "./your library/albums";
import { playcontext } from "../context/play";

const ArtistPage = () => {
    const { id } = useParams();
    const { userArtists } = useContext(userartistscontext);
    const { likedSongs } = useContext(likedsongscontext);
    const { setUri } = useContext(playcontext);
    const [info, setInfo] = useState();
    const [topPicks, setTopPicks] = useState();
    const [album, setAlbum] = useState();
    const [change, setChange] = useState(true);
    const getuserartist = useGetUserArtists(change, setChange);
    const getlikedsongs = useGetLikedSongs(change, setChange)
    const save = useLike(change, setChange);
    const unsave = useDislike(change, setChange);
    const follow = useFollow(change, setChange);
    const unfollow = useUnFollow(change, setChange);

    if (info && id !== info.id) {
        console.log('reset')
        setInfo()
        setAlbum()
        setTopPicks()
        setChange(!change)
    }

    useEffect(() => {
        const call = async () => {


            if (!info && userArtists) {
                const check = userArtists.artists.items.findIndex(v => v.id === id)
                if (check === -1) {
                    const artist_info = await fetchData(artist_info_api(id));
                    setInfo(artist_info.data)
                }
                else {

                    setInfo(userArtists.artists.items[check])
                }
            }
            if (!topPicks) {
                const artist_top_picks = await fetchData(artist_top_tracks_api(id));
                setTopPicks(artist_top_picks.data)

            }
            if (!album) {
                const artist_album = await fetchData(artist_album_api(id));

                const items = []
                artist_album.data.items.forEach((v) => {
                    if (items.findIndex(i => i.name === v.name) === -1) {
                        items.push({ ...v })
                    }
                })
                artist_album.data.items = items


                setAlbum(artist_album.data)

            }

        }

        if (!userArtists || !likedSongs) {
            if (!userArtists) {
                getuserartist().then(() => { !likedSongs ? getlikedsongs().then(() => { call() }) : call() })
            }
            else {
                getlikedsongs().then(call);
            }
        }
        else {
            call()
        }
    }, [change])

    const toggleFollow = () => {
        const check = userArtists.artists.items.findIndex(v => v.id === info.id)
        if (check === -1) {
            follow(info)
        }
        else {
            unfollow(info)
        }
    }

    const play = (index) => {
        const items = []
        topPicks.tracks.slice(index).forEach(i => {
            if (items.indexOf(i.uri) === -1) {
                items.push(i.uri)
            }
        })
        setUri(items)
    }

    return (
        <Fragment>
            <div className="album-container">
                {info && userArtists && <div className="album-top">
                    <div className="album-heading-section">
                        <div className="artist-img-container"  >
                            <img className="artist-img" src={info.images[0].url} alt="" />
                        </div>
                        <div className="album-title-container">
                            <span>{info.type.charAt(0).toUpperCase() + info.type.slice(1)}</span>
                            <h2 style={info.name.length > 55 ? { fontSize: '2rem' } : { fontSize: '3rem' }} className="album-title">{info.name}</h2>
                            <div className="album-total-songs-container">
                                {info.followers.total.toLocaleString()} followers
                            </div>
                        </div>
                    </div>
                    <div className="album-icon-container">
                        <div className="album-play-icon" onClick={() => play(0)}>
                            <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                            </svg>
                        </div>

                        <div className="follow-button" onClick={toggleFollow}>
                            {userArtists.artists.items.findIndex(v => v.id === info.id) === -1 ? 'FOLLOW' : 'FOLLOWING'}
                        </div>
                    </div>
                </div>}

                {topPicks &&
                    <div className="items-container album-item-background">
                        <h2 className="popular">Popular</h2>
                        {topPicks.tracks.map(i => (
                            <div className="item-container" key={i.id} onClick={() => play(topPicks.tracks.indexOf(i))}>
                                <div className="list-icon-container list-icon-container-flex">
                                    <p>{topPicks.tracks.indexOf(i) + 1}</p>
                                    <div className="play-icon">
                                        <Tooltip title={<p style={{ fontSize: '1.2em' }}>Play {i.name} by {i.artists.map(a => a.name).join(', ')}</p>} TransitionComponent={Zoom} disableInteractive>
                                            <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" fill="#fff">
                                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                            </svg>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="song-title">
                                    <img src={i.album.images[0].url} style={{ width: '40px', height: '40px' }} alt="" />
                                    <div style={{ display: 'grid', marginLeft: '10px' }}>
                                        <p className="song-name">{i.name}</p>
                                        <span>
                                            {i.artists.map(a => (
                                                <Link className="song-artist" to={a.name === 'Various Artists' || a.id === id ? '#' : `/artist/${a.id}`} key={a.id}>{i.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                                <div className="song-album">
                                    <Link to={`/album/${i.album.id}`}>{i.album.name}</Link>
                                </div>
                                <div className="list-icon-container">
                                    <div className="play-icon" style={likedSongs.items.findIndex(value => value.track.id === i.id) !== -1 ? { visibility: 'visible' } : null}>
                                        {likedSongs.items.findIndex(value => value.track.id === i.id) !== -1 ?
                                            <Tooltip title={<p style={{ fontSize: '1.2em' }}>Remove from Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                                <svg onClick={() => unsave('tracks', i)} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#1DB954'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                                            </Tooltip>
                                            :
                                            <Tooltip title={<p style={{ fontSize: '1.2em' }}>Save to Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                                <svg onClick={() => save('tracks', i)} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#fff'><path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg>
                                            </Tooltip>
                                        }
                                    </div>
                                    <div className="song-duration">
                                        <p>{milli(i.duration_ms)}</p>
                                    </div>
                                </div>
                                {/* <div className="list-icon-container">
                                    <div className="play-icon" style={{ justifyContent: 'center', width: '100%' }}>
                                        <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#fff'><path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg>
                                    </div>
                                </div> */}
                            </div>
                        ))}
                        <br />
                        <br />
                        <Divider light variant="middle" sx={{ marginRight: '32px' }} color='#404040' />
                        <br />
                        <br />
                    </div>
                }
                {album && <div className="album-item-background">
                    <h2>Albums</h2>
                    <div className="card-container">
                        {album.items.map(i => (
                            <Link to={`/album/${i.id}`}>
                                <div className="card" key={i.id}>
                                    <div className="card-img-container">
                                        <img className="card-img" src={i.images[0].url} alt="" />
                                        <div className="play-icon-container">
                                            <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="title" style={{ marginTop: 0 }}>{i.name}</p>
                                    <span className="artist" style={{ color: '#a7a7a7' }}>
                                        {i.release_date.slice(0, 4)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <br />
                    <br />
                </div>
                }

            </div>
        </Fragment>
    );
}

export default ArtistPage;
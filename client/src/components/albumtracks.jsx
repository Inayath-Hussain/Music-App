import { useState, useEffect, Fragment, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip, Zoom, Divider } from "@mui/material";
import { likedsongscontext, useralbumscontext } from "../context/playlists";
import { useLike } from "../hooks/uselike";
import { useDislike } from "../hooks/usedislike";
import { useGetLikedSongs, useGetUserAlbums } from "../hooks/getcontext";
import { album_api } from "../utilities/endpoints";
import fetchData from "../utilities/fetchData";
import fetchAll from "../utilities/fetchAll";
import milli from "../utilities/millisecToMin";
import { playcontext } from "../context/play";

const AlbumTrack = () => {
    const { id } = useParams();
    const { userAlbums } = useContext(useralbumscontext);
    const { likedSongs } = useContext(likedsongscontext);
    const { setUri } = useContext(playcontext);
    const [data, setData] = useState();
    const [change, setChange] = useState(true);
    const save = useLike(change, setChange);
    const unsave = useDislike(change, setChange);
    const getuseralbums = useGetUserAlbums(change, setChange);
    const getlikedsongs = useGetLikedSongs(change, setChange);

    useEffect(() => {

        const call = async () => {

            if (!data && userAlbums) {
                const check = userAlbums.items.findIndex(value => value.album.id === id)
                if (check === -1) {
                    const getalbum = await fetchData(album_api(id))

                    if (getalbum.status === 200 && getalbum.data.tracks.next) {
                        const items = await fetchAll(getalbum.data.tracks.next)
                        getalbum.data.tracks.items = items
                    }
                    setData(getalbum.data);
                }
                else {
                    setData(userAlbums.items[check].album)

                }

            }
        }

        if (!userAlbums || !likedSongs) {
            if (!userAlbums) {
                getuseralbums().then(() => { !likedSongs ? getlikedsongs().then(() => { call() }) : call() })
            }
            else {
                getlikedsongs().then(call);
            }
        }
        else {
            console.log(3)
            call()
        }
    }, [change])

    const play = (index) => {
        const items = []
        data.tracks.items.slice(index).forEach(i => {
            if (items.indexOf(i.uri) === -1) {
                items.push(i.uri)
            }
        })
        setUri(items)
    }

    const addingAlbumToTrack = (track) => {
        const album = data;
        const result = { album: { ...album }, ...track }
        delete result.album.tracks

        return result
    }


    return (
        <Fragment>
            {data && userAlbums && <div className="album-container">
                <div className="album-top">
                    <div className="album-heading-section">
                        <div className="album-img-container" >
                            <img className="album-img" src={data.images[0].url} alt="" />
                        </div>
                        <div className="album-title-container">
                            <span>{data.album_type.charAt(0).toUpperCase() + data.album_type.slice(1)}</span>
                            <h2 style={data.name.length > 55 ? { fontSize: '2rem' } : { fontSize: '3rem' }} className="album-title">{data.name}</h2>
                            <div className="album-total-songs-container">
                                {data.artists.map(a => (
                                    <Link to={a.name === 'Various Artists' ? '#' : `/artist/${a.id}`} className="album-artist"> {data.artists.indexOf(a) !== 0 && <span className='dot' />} {a.name}</Link>
                                ))} <span className="dot" /> {data.total_tracks} songs
                            </div>
                        </div>
                    </div>
                    <div className="album-icon-container">
                        <div className="album-play-icon" onClick={() => play(0)}>
                            <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                            </svg>
                        </div>

                        <div className="album-like-icon" style={userAlbums.items.findIndex(value => value.album.id === id) !== -1 ? { visibility: 'visible' } : null}>
                            {userAlbums.items.findIndex(value => value.album.id === id) !== -1 ?
                                <Tooltip title={<p style={{ fontSize: '1.2em' }}>Remove from Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                    <svg onClick={() => unsave('albums', data)} role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#1DB954'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                                </Tooltip>
                                :
                                <Tooltip title={<p style={{ fontSize: '1.2em' }}>Save to Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                    <svg onClick={() => save('albums', data)} role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#fff'><path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg>
                                </Tooltip>
                            }
                        </div>
                    </div>
                </div>
                <div className="items-container album-item-background">
                    <div className="album-item-heading">
                        <div className='song-title'>#</div>
                        <div className="song-title" style={{ paddingLeft: '28px' }}>
                            <p className="song-name" style={{ color: '#a7a7a7' }}>Title</p>
                        </div>

                        <div className="song-duration">
                            <svg role="img" height="16px" width="16px" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill="#a7a7a7">
                                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
                            </svg>
                        </div>
                        <div></div>
                        <br />
                    </div>
                    <br />

                    {data.tracks.items.map(i => (
                        <div className="album-item-container" key={i.id} onClick={() => play(data.tracks.items.indexOf(i))}>
                            <div className="list-icon-container list-icon-container-flex">
                                <p>{data.tracks.items.indexOf(i) + 1}</p>
                                <div className="play-icon">
                                    <Tooltip title={<p style={{ fontSize: '1.2em' }}>Play {i.name} by {i.artists.map(a => a.name).join(', ')}</p>} TransitionComponent={Zoom} disableInteractive>
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" fill="#fff">
                                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                        </svg>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="song-title">

                                <div style={{ display: 'grid', marginLeft: '10px' }}>
                                    <p className="song-name">{i.name}</p>
                                    <span>
                                        {i.artists.map(a => (
                                            <Link className="song-artist" to={`/artist/${a.id}`} key={a.id}>{i.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                        ))}
                                    </span>
                                </div>
                            </div>
                            <div className="list-icon-container">
                                <div className="play-icon" style={likedSongs.items.findIndex(value => value.track.id === i.id) !== -1 ? { visibility: 'visible' } : null}>
                                    {likedSongs.items.findIndex(value => value.track.id === i.id) !== -1 ?
                                        <Tooltip title={<p style={{ fontSize: '1.2em' }}>Remove from Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                            <svg onClick={() => unsave('tracks', i)} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#1DB954'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                                        </Tooltip>
                                        :
                                        <Tooltip title={<p style={{ fontSize: '1.2em' }}>Save to Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                            <svg onClick={() => save('tracks', addingAlbumToTrack(i))} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#fff'><path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg>
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
            </div>}
        </Fragment>
    );
}

export default AlbumTrack;
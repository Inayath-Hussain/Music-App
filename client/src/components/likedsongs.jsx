import { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Zoom, Divider } from "@mui/material";
import { likedsongscontext, userinfocontext } from "../context/playlists";
import { useDislike } from "../hooks/usedislike";
import milli from '../utilities/millisecToMin';
import { useGetLikedSongs, useGetUserInfo } from "../hooks/getcontext";
import { playcontext } from "../context/play";

const LikedSongs = () => {
    const { userInfo } = useContext(userinfocontext);
    const { likedSongs } = useContext(likedsongscontext);
    const { setUri } = useContext(playcontext);
    const [change, setChange] = useState(true);
    const getuserinfo = useGetUserInfo();
    const getLikedSongs = useGetLikedSongs()

    const unsave = useDislike(change, setChange);

    useEffect(() => {

        if (!userInfo) {
            getuserinfo();
        }
        if (!likedSongs) {
            getLikedSongs();
        }
    }, [])

    const play = (index) => {
        const items = []
        likedSongs.items.slice(index).forEach(i => {
            if (items.indexOf(i.track.uri) === -1) {
                items.push(i.track.uri)
            }
        })
        setUri(items)
    }

    return (
        <Fragment>
            {likedSongs && userInfo && <div className="album-container">
                <div className="album-top">
                    <div className="album-heading-section">
                        <div className="album-img-container likedsong" >
                            <svg role="img" height="150" width="150" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#121212'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                        </div>
                        <div className="album-title-container">
                            <span>Playlist</span>
                            <h1 className="album-title">Liked Songs</h1>
                            <div className="album-total-songs-container">
                                {userInfo.display_name} <span className="dot" /> {likedSongs.total} songs
                            </div>
                        </div>
                    </div>
                    <div className="album-icon-container">
                        <div className="album-play-icon" onClick={() => play(0)}>
                            <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="items-container album-item-background">
                    <div className="item-heading">
                        <div className='song-title'>#</div>
                        <div className="song-title" style={{ paddingLeft: '28px' }}>
                            <p className="song-name" style={{ color: '#a7a7a7' }}>Title</p>
                        </div>
                        <div className="song-album">Album</div>
                        <div className="song-duration">
                            <svg role="img" height="16px" width="16px" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill="#a7a7a7">
                                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
                            </svg>
                        </div>
                        <div></div>
                        <br />
                    </div>
                    <br />

                    {likedSongs.items.map(i => (
                        <div className="item-container" onClick={() => play(likedSongs.items.indexOf(i))} key={i.track.id}>
                            <div className="list-icon-container list-icon-container-flex">
                                <p>{likedSongs.items.indexOf(i) + 1}</p>
                                <div className="play-icon">
                                    <Tooltip title={<p style={{ fontSize: '1.2em' }}>Play {i.track.name} by {i.track.artists.map(a => a.name).join(', ')}</p>} TransitionComponent={Zoom} disableInteractive>
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" fill="#fff">
                                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                        </svg>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="song-title">
                                <img src={i.track.album.images[0].url} style={{ width: '40px', height: '40px' }} alt="" />
                                <div style={{ display: 'grid', marginLeft: '10px' }}>
                                    <p className="song-name">{i.track.name}</p>
                                    <span>
                                        {i.track.artists.map(a => (
                                            <Link className="song-artist" to={`/artist/${a.id}`} key={a.id}>{i.track.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                        ))}
                                    </span>
                                </div>
                            </div>
                            <div className="song-album">
                                <Link to={`/album/${i.track.album.id}`}>{i.track.album.name}</Link>
                            </div>
                            <div className="list-icon-container">
                                <div className="play-icon" style={{ visibility: 'visible' }}>
                                    <Tooltip title={<p style={{ fontSize: '1.2em' }}>Remove from Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                        <svg onClick={() => unsave('tracks', i.track)} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#1DB954'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                                    </Tooltip>
                                </div>
                                <div className="song-duration">
                                    <p>{milli(i.track.duration_ms)}</p>
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

export default LikedSongs;
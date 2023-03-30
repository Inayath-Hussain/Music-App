import { useContext, Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { Tooltip, Zoom } from "@mui/material";
import { rpcontext, likedsongscontext } from "../context/playlists";
import { useLike } from "../hooks/uselike";
import { useDislike } from "../hooks/usedislike";
import { playcontext } from "../context/play";

const RecentlyPlayed = () => {
    let current_date;
    const [change, setChange] = useState(true);
    const { recentlyPlayed } = useContext(rpcontext);
    const { likedSongs } = useContext(likedsongscontext);
    const { setUri } = useContext(playcontext);
    const recently_played = recentlyPlayed.items;

    const save = useLike(change, setChange);
    const unsave = useDislike(change, setChange);

    const date_filter = (d) => {
        if (current_date === d.toDateString()) {
            return false
        }
        else {
            current_date = d.toDateString()
            return true
        }
    }

    const milli = (ms) => {
        let minutes = Math.floor(ms / 60000);
        const seconds = Math.trunc(((ms % 60000) / 1000))

        return (
            seconds === 60 ? (minutes += 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        )
    }

    const play = (index) => {
        const items = []
        recently_played.slice(index).forEach(i => {
            if (items.indexOf(i.track.uri) === -1) {
                items.push(i.track.uri)
            }
        })
        setUri(items)
    }

    return (
        <div className="mainPadding">
            <h1>Recently Played</h1>
            <div className="items-container">
                {recently_played && recently_played.map(i => (
                    <Fragment key={i.played_at}>
                        {date_filter(new Date(i.played_at)) &&
                            <h3>{new Date(i.played_at).toDateString()}</h3>
                        }
                        <div className="item-container" onClick={() => play(recently_played.indexOf(i))}>
                            <div className="list-icon-container list-icon-container-flex">
                                <p>{recently_played.indexOf(i) + 1}</p>
                                <div className="play-icon">
                                    <Tooltip title={<p style={{ fontSize: '1.2em' }}>Play {i.track.name} by {i.track.artists.map(a => a.name).join(', ')}</p>} TransitionComponent={Zoom} disableInteractive>
                                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" fill="#fff">
                                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                        </svg>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="song-title">
                                <img src={i.track.album.images[2].url} style={{ width: '40px', height: '40px' }} alt="" />
                                <div style={{ display: 'grid', marginLeft: '10px', paddingRight: '10px' }}>
                                    <p className="song-name">{i.track.name}</p>
                                    <span>
                                        {i.track.artists.map(a => (
                                            <Link className="song-artist" to={a.name === 'Various Artists' ? '#' : `/artist/${a.id}`} key={a.id}>{i.track.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                        ))}
                                    </span>
                                </div>
                            </div>
                            <div className="song-album">
                                <Link to={`/album/${i.track.album.id}`}>{i.track.album.name}</Link>
                            </div>
                            <div className="list-icon-container">
                                <div className="play-icon" style={likedSongs.items.findIndex(value => value.track.id === i.track.id) !== -1 ? { visibility: 'visible' } : null}>
                                    {likedSongs.items.findIndex(value => value.track.id === i.track.id) !== -1 ?
                                        <Tooltip title={<p style={{ fontSize: '1.2em' }}>Remove from Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                            <svg onClick={() => unsave('tracks', i.track)} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#1DB954'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                                        </Tooltip>
                                        :
                                        <Tooltip title={<p style={{ fontSize: '1.2em' }}>Save to Your Library</p>} TransitionComponent={Zoom} disableInteractive>
                                            <svg onClick={() => save('tracks', i.track)} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#fff'><path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg>
                                        </Tooltip>
                                    }
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
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default RecentlyPlayed;
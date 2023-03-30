import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip, Zoom } from "@mui/material";
import { nrcontext } from "../context/playlists";

const NewReleases = () => {
    const { newReleases } = useContext(nrcontext);
    const { name } = useParams();

    return (
        <div className="mainPadding">
            <h1>{name}</h1>
            <div className="card-container">
                {newReleases.albums.items.map(n => (
                    <Link to={`/album/${n.id}`}>
                        <div className="card" key={n.id}>
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
                                    <Link className="song-artist" to={`/artist/${a.id}`} key={a.id}>{n.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <br />
        </div>
    );
}

export default NewReleases;
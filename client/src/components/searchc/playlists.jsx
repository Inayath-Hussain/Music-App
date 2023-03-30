import { Fragment, useEFfect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Playlists = ({ playlists, loadMore }) => {
    playlists.items = playlists.items.filter(i => i.id !== '' && i.images.length > 0 && Object.keys(i.owner).length > 0 && i.owner.display_name !== '' && i.name !== '')

    return (
        <Fragment>
            <div className="card-container">
                {playlists.items.map(i => (
                    <Link to={`/playlist/${i.id}`} key={i.id}>
                        <div className="card">
                            <div className="card-img-container">
                                <img className="card-img" src={i.images[0].url} alt="" />
                                <div className="play-icon-container">
                                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="title" style={{ marginTop: 0 }}>{i.name}</p>
                            <p className="artist-type">By {i.owner.display_name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <br />
            <div className="loadMore-container">
                <Button onClick={() => loadMore('playlists')} sx={{ color: '#B3B3B3' }}>See More!</Button>
            </div>
        </Fragment>
    );
}

export default Playlists;
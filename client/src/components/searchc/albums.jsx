import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Albums = ({ albums, loadMore }) => {
    albums.items = albums.items.filter(i => i.id !== '' && i.images.length > 0 && i.name !== '' && i.artists.length > 0 && i.release_date !== '')

    return (
        <Fragment>
            <div className="card-container">
                {albums.items.map(i => (
                    <Link to={`/album/${i.id}`} key={i.id}>
                        <div className="card" >
                            <div className="card-img-container">
                                <img className="card-img" src={i.images[0].url} alt="" />
                                <div className="play-icon-container">
                                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="title" style={{ marginTop: 0 }}>{i.name}</p>
                            <span className="artist">
                                {i.artists.map(a => (
                                    <Link className="song-artist" to='#' key={a.id}>{i.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                ))}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
            <br />
            <div className="loadMore-container">
                <Button onClick={() => loadMore('albums')} sx={{ color: '#B3B3B3' }}>See More!</Button>
            </div>
        </Fragment>
    );
}

export default Albums;
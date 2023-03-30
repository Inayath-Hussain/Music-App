import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useralbumscontext } from "../../context/playlists";
import { useGetUserAlbums } from "../../hooks/getcontext";

const Albums = () => {
    const { userAlbums } = useContext(useralbumscontext);
    const getuseralbums = useGetUserAlbums();

    useEffect(() => {
        if (!userAlbums) {
            getuseralbums();
        }
    }, [])

    return (
        <Fragment>
            <h2>Albums</h2>
            <div className="card-container">
                {userAlbums && userAlbums.items.map(i => (
                    <Link to={`/album/${i.album.id}`} key={i.album.id}>
                        <div className="card" >
                            <div className="card-img-container">
                                <img className="card-img" src={i.album.images[0].url} alt="" />
                                <div className="play-icon-container">
                                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="title" style={{ marginTop: 0 }}>{i.album.name}</p>
                            <span className="artist">
                                {i.album.artists.map(a => (
                                    <Link className="song-artist" to={a.name === 'Various Artists' ? '#' : `/artist/${a.id}`} key={a.id}>{i.album.artists.indexOf(a) === 0 ? a.name : ', ' + a.name}</Link>
                                ))}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
            <br />
            <br />
        </Fragment>
    );
}

export default Albums;
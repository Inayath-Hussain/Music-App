import { useEffect } from "react";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { userartistscontext } from "../../context/playlists";
import { useGetUserArtists } from "../../hooks/getcontext";

const Artists = () => {
    const { userArtists } = useContext(userartistscontext);
    const getuserartists = useGetUserArtists()

    useEffect(() => {
        if (!userArtists) {
            getuserartists()
        }
    })

    return (
        <Fragment>
            <h2>Artists</h2>
            <div className="card-container">
                {userArtists && userArtists.artists.items.map(i => (
                    <Link to={`/artist/${i.id}`} key={i.id}>
                        <div className="card" >
                            <div className="card-img-container">
                                <img className="search-result-img" src={i.images[0].url} alt="" />
                                <div className="play-icon-container">
                                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="title" style={{ marginTop: 0 }}>{i.name}</p>
                            <p className="artist-type">{i.type}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <br />
            <br />
        </Fragment>
    );
}

export default Artists;
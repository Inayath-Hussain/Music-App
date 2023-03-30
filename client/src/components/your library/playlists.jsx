import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { likedsongscontext, userplaylistscontext } from "../../context/playlists";
import { useGetLikedSongs, useGetUserPlaylists } from "../../hooks/getcontext";

const Playlists = () => {
    const { userPlaylists } = useContext(userplaylistscontext);
    const { likedSongs } = useContext(likedsongscontext);
    const getlikedsongs = useGetLikedSongs()
    const getuserplaylists = useGetUserPlaylists()

    useEffect(() => {
        if (!likedSongs) {
            getlikedsongs()
        }
        if (!userPlaylists) {
            getuserplaylists()
        }
    })

    return (
        <Fragment>
            <h2>Playlists</h2>
            <div className="card-container">
                {likedSongs &&
                    <Link to='/liked songs'>
                        <div className="card">
                            <div className="card-img-container likedsong" style={{ borderRadius: '5px' }}>
                                <svg role="img" height="100" width="100" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" fill='#121212'><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                                <div className="play-icon-container">
                                    <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" >
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="title" style={{ marginTop: 0 }}>Liked Songs</p>
                            <p className="artist-type">By You</p>
                        </div>
                    </Link>
                }
                {userPlaylists && userPlaylists.items.map(i => (
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
            <br />
        </Fragment>
    );
}

export default Playlists;
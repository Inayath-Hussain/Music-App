import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { category_playlist_api as cp_api } from "../../utilities/endpoints";
import fetchData from "../../utilities/fetchData";

const CategoryPlaylist = () => {
    const { id } = useParams();
    const [playlists, setPlaylists] = useState()

    useEffect(() => {
        const call = async () => {
            const result = await fetchData(cp_api(id))
            setPlaylists(result.data.playlists)
        }

        call()
    }, [])

    return (
        <div className="mainPadding">
            <div className="card-container">
                {playlists && playlists.items.map(i => (
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
        </div>
    );
}

export default CategoryPlaylist;
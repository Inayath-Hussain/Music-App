import { useEffect } from "react";
import { Link } from "react-router-dom";

const Artists = ({ artists, loadMore }) => {
    artists.items = artists.items.filter(i => i.id !== '' && i.images.length > 0 && i.name !== '')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="card-container">
            {artists.items.map(i => (
                <Link to={`/artist/${i.id}`} key={i.id}>
                    <div className="card">
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
    );
}

export default Artists;
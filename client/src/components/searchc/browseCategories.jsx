import { Fragment, useEffect, useContext } from "react";
import { lgcontext } from "../../context/playlists";
import fetchData from "../../utilities/fetchData";
import { search_genres_api } from "../../utilities/endpoints";
import { Link } from "react-router-dom";

const BrowseCategories = () => {

    const { locationGenres, setLocationGenres } = useContext(lgcontext);

    useEffect(() => {
        const call = async () => {
            if (!locationGenres) {
                const result = await fetchData(search_genres_api);

                setLocationGenres(result.data)
            }
        }

        call()
    }, [])

    return (
        <Fragment>
            <h2>Browse all</h2>
            <div className="browseCategories">
                {locationGenres && locationGenres.categories.items.map(i => (
                    <Link to={`/browse/${i.id}`} key={i.id}>
                        <div className="browseCard" style={{ backgroundColor: '#' + Math.random().toString(16).slice(2, 8) }}>
                            <h3>{i.name}</h3>
                            <img src={i.icons[0].url} alt="" />
                        </div>
                    </Link>
                ))}
            </div>
        </Fragment>
    );
}

export default BrowseCategories;
import { useState, Fragment } from "react";
import SearchBar from "./searchc/searchbar";
import { search_api } from "../utilities/endpoints";
import fetchData from '../utilities/fetchData';
import BrowseCategories from "./searchc/browseCategories";
import Songs from "./searchc/songs";
import Artists from "./searchc/artists";
import Playlists from "./searchc/playlists";
import Albums from "./searchc/albums";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState();
    const [filter, setFilter] = useState(1);

    const getSearch = async (e) => {
        if (e.key === 'Enter') {
            const result = await fetchData(search_api(e.target.value));
            setSearchResult(result.data)
        }
    }

    const searchValueChange = (e) => {
        setSearchValue(e.target.value)

    }

    const clearButton = () => {
        setSearchResult()
        setFilter(1)
    }

    const filterResult = (n) => {
        if (filter !== n) {
            setFilter(n)
        }
    }

    const loadMore = async (type) => {
        const result = await fetchData(searchResult[type].next)
        const new_searchResult = { ...searchResult }
        new_searchResult[type].next = result.data[type].next
        new_searchResult[type].items = [...searchResult[type].items, ...result.data[type].items]
        setSearchResult(new_searchResult)
    }

    return (
        <Fragment>
            <SearchBar getSearch={getSearch} searchValueChange={searchValueChange} searchValue={searchValue}
                clearButton={clearButton} searchResult={searchResult} filter={filter} filterResult={filterResult}
            />
            <div className="mainPadding">

                <div className="browsePadding">
                    {!searchResult && <BrowseCategories />}

                    {searchResult && filter === 1 ? <Songs loadMore={loadMore} songs={searchResult.tracks} /> :
                        filter === 2 ? <Artists loadMore={loadMore} artists={searchResult.artists} /> :
                            filter === 3 ? <Albums loadMore={loadMore} albums={searchResult.albums} /> :
                                filter === 4 ? <Playlists loadMore={loadMore} playlists={searchResult.playlists} /> : null}
                </div>
                <br />
            </div>
        </Fragment>
    );
}

export default Search;
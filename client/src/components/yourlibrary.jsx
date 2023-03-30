import { useState, useContext, Fragment } from "react";
import { Button } from "@mui/material";
import Albums from "./your library/albums";
import Playlists from "./your library/playlists";
import Artists from "./your library/artists";

const YourLibrary = () => {
    const [selected, setSelected] = useState(1);

    const change = (n) => {
        if (selected !== n) {
            setSelected(n)
        }
    }

    return (
        <Fragment>
            <div className="your-library-navigation">
                <div className="your-library-button-container">
                    <div className={selected === 1 ? "your-library-button selected" : 'your-library-button'} onClick={() => change(1)}>Playlists</div>
                    <div className={selected === 2 ? "your-library-button selected" : 'your-library-button'} onClick={() => change(2)}>Artists</div>
                    <div className={selected === 3 ? "your-library-button selected" : 'your-library-button'} onClick={() => change(3)}>Albums</div>
                </div>
            </div>
            <div className="mainPadding">
                <div className="your-library-padding">
                    {selected === 1 && <Playlists />}
                    {selected === 2 && <Artists />}
                    {selected === 3 && <Albums />}
                </div>

            </div>
        </Fragment>
    );
}

export default YourLibrary;
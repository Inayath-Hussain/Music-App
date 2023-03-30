import { useEffect, useContext } from "react";
import { codeContext } from "../context/accessToken";
import Player from 'react-spotify-web-playback'
import { playcontext } from "../context/play";
import { rpcontext } from "../context/playlists";
import { useState } from "react";

const Play = () => {

    const { access_token } = useContext(codeContext);
    const { uri, setUri } = useContext(playcontext);
    const { recentlyPlayed } = useContext(rpcontext);
    const [play, setPlay] = useState(false)

    useEffect(() => {

        if (uri.length === 0 && recentlyPlayed) {
            const items = []
            recentlyPlayed.items.slice(0, 10).forEach(i => {
                items.push(i.track.uri)
            })
            setUri(items)
        }
    }, [recentlyPlayed])

    useEffect(() => {
        setPlay(true)
    }, [uri])

    return (
        <footer className="playBar-container">
            {access_token && <Player token={access_token} name='Music App' initialVolume={1} hideAttribution play={play}
                inlineVolume magnifySliderOnHover uris={uri}
                styles={{
                    bgColor: '#181818', color: '#fff', trackNameColor: '#fff',
                    trackArtistColor: '#a7a7a7', sliderTrackColor: '#5e5e5e', sliderColor: '#fff', sliderHandleColor: '#1ED760',
                    height: 91, sliderHandleBorderRadius: '50%', sliderHeight: 4, sliderTrackBorderRadius: '10px'
                }} />}
        </footer>
    );
}

export default Play;
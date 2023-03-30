const milli = (ms) => {
    let minutes = Math.floor(ms / 60000);
    const seconds = Math.trunc(((ms % 60000) / 1000))

    return (
        seconds === 60 ? (minutes += 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    )
}

export default milli;
import { useState, useEffect, useCallback, useContext } from "react";
import { useBeforeUnload } from "react-router-dom";
import axios from 'axios';
import { codeContext } from "../context/accessToken";
import { navcontext } from "../context/navigationHook";

const atime = 15 * 60;

const Logout = () => {

    const [startTimer, setStartTimer] = useState(localStorage.getItem('received'));

    const { setAccessToken } = useContext(codeContext);
    const navigate = useContext(navcontext)

    const codequery = new URLSearchParams(window.location.search).get('code')
    if (codequery !== null) { localStorage.setItem('code', codequery) }
    window.history.pushState({}, null, '/')

    let id;
    let t = 0

    function auto(flag) {
        if (flag === true) {
            id = setInterval(async () => {
                t = 0
                const blah = await axios.post('http://localhost:3001/refresh', { refresh: localStorage.getItem('refreshToken') })
                localStorage.setItem('accessToken', blah.data.access_token)
            }, localStorage.getItem('expiresIn') * 1000 - atime * 1000)
        }
        else {
            console.log(id)
        }
    }

    let cont_timeout;
    const cont = () => {
        cont_timeout = setTimeout(async () => {
            const r = await axios.post('http://localhost:3001/refresh', { refresh: localStorage.getItem('refreshToken') });
            localStorage.setItem('refreshToken', r.data.access_token)
            localStorage.removeItem('remain')
            t = 0
            auto(true)
        }, localStorage.getItem('remain') * 1000)
    }

    let counter;
    counter = setInterval(() => {
        if (localStorage.getItem('remain')) {
            t >= localStorage.getItem('remain') ? t = 0 : t += 1
        }
        else {
            t >= localStorage.getItem('expiresIn') - atime ? t = 0 : t += 1
        }
    }, 1000)
    if (localStorage.getItem('received')) {
        localStorage.getItem('remain') ? cont() : auto(true)

    }

    useBeforeUnload(
        useCallback(() => {
            console.log(t);
            if (localStorage.getItem('received')) {
                localStorage.setItem('remain', localStorage.getItem('remain') ? localStorage.getItem('remain') - t : localStorage.getItem('expiresIn') - (atime + t))
            }
        }, [])
    )

    useEffect(() => {
        const call = async () => {
            if (!localStorage.getItem('accessToken') && localStorage.getItem('code')) {
                try {
                    const tokens = await axios.post('http://localhost:3001/token', { code: localStorage.getItem('code') }).then((r) => {
                        localStorage.setItem('accessToken', r.data.access_token)
                        localStorage.setItem('refreshToken', r.data.refresh_token)
                        localStorage.setItem('expiresIn', r.data.expires_in)
                        localStorage.setItem('tokenType', r.data.token_type)
                        localStorage.setItem('received', true)
                        setStartTimer(localStorage.getItem('received'))
                        setAccessToken(localStorage.getItem('accessToken'))
                        localStorage.setItem('test', 20)
                        localStorage.setItem('code', true)
                    });

                } catch (ex) {
                    console.log('catch', ex)
                }
            }
        }

        call()
        return () => {
            clearInterval(counter)
            clearTimeout(cont_timeout)
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        clearInterval(id)
        navigate('/login')
    }


    return (
        <div className="mainTop">
            <button className="logout-btn" onClick={logout}>Log out</button>
        </div>
    );
}

export default Logout;
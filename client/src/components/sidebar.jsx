import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';
import { userplaylistscontext } from '../context/playlists';

const SideBar = () => {
    const { pathname } = useLocation();
    const [selected, setSelected] = useState(pathname === '/' ? 1 : pathname === '/search' ? 2 : 3);
    const { userPlaylists } = useContext(userplaylistscontext)

    return (
        <div className='sidebar'>
            <Box sx={{ backgroundColor: '#040404', paddingLeft: '20px', position: 'sticky', top: 0 }}>
                <img src="/Spotify_Logo_RGB_White.svg" alt="" style={{ width: '150px', height: '100px' }} />
                <ul className='sidebar-content'>
                    <li onClick={() => setSelected(1)}>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256"
                                width="26px" height="27px" fillRule="nonzero"><g fill={selected === 1 ? "#fffcfc" : '#000000'} fillRule="nonzero" stroke="#a7a7a7" strokeWidth="2"
                                    strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0"
                                    fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.33333,5.33333)"><path d="M39.5,43h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-9c0,-1.105 -0.895,-2 -2,-2h-4c-1.105,0 -2,0.895 -2,2v9c0,1.381 -1.119,2.5 -2.5,2.5h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-19.087c0,-2.299 1.054,-4.471 2.859,-5.893l14.212,-11.199c0.545,-0.428 1.313,-0.428 1.857,0l14.214,11.199c1.805,1.422 2.858,3.593 2.858,5.891v19.089c0,1.381 -1.119,2.5 -2.5,2.5z"></path></g></g></svg>

                            <Typography variant='body2' component='span' marginLeft='10px' color={selected === 1 ? '#fff' : '#b3b3b3'}
                                fontWeight={selected === 1 ? 'bold' : 'light'} display='inline-block' sx={{ ':hover': { color: '#fffcfc' } }}>
                                Home
                            </Typography>
                        </Link>
                    </li>

                    <li onClick={() => setSelected(2)}>
                        <Link to="/search">
                            <svg role="img" height="27px" width="26px" viewBox="0 0 24 24" fill={selected === 2 ? '#fffcfc' : '#a7a7a7'}>
                                {selected === 2 ?
                                    <g>
                                        <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z" />
                                        <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z" />
                                    </g>
                                    :
                                    <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" />}</svg>


                            <Typography variant='body2' component='span' marginLeft='10px' color={selected === 2 ? '#fff' : '#b3b3b3'}
                                fontWeight={selected === 2 ? 'bold' : 'light'} sx={{ ':hover': { color: '#fffcfc' } }}>
                                Search
                            </Typography>
                        </Link>
                    </li>

                    <li onClick={() => setSelected(3)}>
                        <Link to='/your library'>
                            <svg xmlns='hhtp://www.w3.org/2000/svg' height="27px" width="26px" viewBox="0 0 24 24" fill={selected === 3 ? '#fffcfc' : '#a7a7a7'}>{selected === 3 ?
                                <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" /> :
                                <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" />}</svg>

                            <Typography variant='body2' component='span' marginLeft='10px' color={selected === 3 ? '#fffcfc' : '#b3b3b3'}
                                fontWeight={selected === 3 ? 'bold' : 'light'} sx={{ ':hover': { color: '#fffcfc' } }}>
                                Your Library
                            </Typography>
                        </Link>
                    </li>
                    <br />
                    <br />
                    {/* <li onClick={() => setSelected(4)}>
                        <Link to='#' className='sidebar-playlist-link'>
                            <div className='sidebar-icon-container' style={selected === 4 ? { backgroundColor: '#fff' } : null}>
                                <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
                            </div>
                            <Typography variant='body2' component='span' marginLeft='10px' fontWeight={selected === 4 ? 'bold' : 'light'} color={selected === 4 ? '#fffcfc' : '#a7a7a7'}>
                                Create Playlist
                            </Typography>
                        </Link>
                    </li> */}
                    <li onClick={() => setSelected(5)}>
                        <Link to='/liked songs' className='sidebar-playlist-link'>
                            <div className='sidebar-icon-container' style={selected === 5 ? { backgroundColor: '#fff' } : null}>
                                <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
                            </div>
                            <Typography variant='body2' component='span' marginLeft='10px' color={selected === 5 ? '#fffcfc' : '#a7a7a7'} fontWeight={selected === 5 ? 'bold' : 'light'}>
                                Liked Songs
                            </Typography>
                        </Link>
                    </li>
                </ul>
                <Divider light variant='middle' sx={{ marginRight: '20px', marginLeft: '0px' }} color=' #a7a7a7' />
                <div className='sidebar-playlists-container'>

                    {userPlaylists && userPlaylists.items.map(i => (
                        <div className='sidebar-playlists' key={i.id}>
                            <Link to={`/playlist/${i.id}`} style={selected === i.id ? { color: '#fffcfc' } : null} onClick={() => setSelected(i.id)}>{i.name}</Link>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );
}

export default SideBar;
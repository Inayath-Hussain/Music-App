import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Logout from './components/logout';
import Search from './components/search';
import NotFound from './components/notfound';
import RecentlyPlayed from './components/recentlyplayed';
import NewReleases from './components/newreleases';
import YourLibrary from './components/yourlibrary';
import { SidebarAuth } from './utilities/sidebarAuth';
import Auth from './utilities/auth';
import ScrollToTop from './utilities/scrollToTop';
import LikedSongs from './components/likedsongs';
import AlbumTrack from './components/albumtracks';
import ArtistPage from './components/artistpage';
import PlaylistTrack from './components/playlisttracks';
import CategoryPlaylist from './components/searchc/categoryPlaylists';
import Play from './components/play';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <SidebarAuth>
        <Logout />
      </SidebarAuth>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Auth><Search /></Auth>} />
        <Route path='/your library' element={<Auth><YourLibrary /></Auth>} />
        <Route path='/recently played' element={<Auth><RecentlyPlayed /></Auth>} />
        <Route path='/liked songs' element={<Auth><LikedSongs /></Auth>} />
        <Route path='/album/:id' element={<Auth><AlbumTrack /></Auth>} />
        <Route path='/artist/:id' element={<Auth><ArtistPage /></Auth>} />
        <Route path='/playlist/:id' element={<Auth><PlaylistTrack /></Auth>} />
        <Route path='/browse/:id' element={<Auth><CategoryPlaylist /></Auth>} />
        <Route path='section/:name' element={<Auth><NewReleases /></Auth>} />
        <Route path='/' element={<Auth><Home /></Auth>} />
        <Route path='*' element={<Auth><NotFound /></Auth>} />
      </Routes>
      <SidebarAuth>
        <Play />
      </SidebarAuth>
    </div>
  );
}

export default App;

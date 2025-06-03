import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { NavbarUser } from "./components/NavbarUser";
import { Footer } from "./components/Footer";
import { SearchOverlay } from "./components/SearchOverlay";
import { Confirm } from "./components/Confirm"; 

import { HomePage } from "./pages/HomePage";
import { Genre } from "./pages/Genre";
import { GenreView } from "./pages/GenreView";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Playlist } from "./pages/Playlist";
import { Detail } from "./pages/Detail";
import { Reviewed } from "./pages/Reviewed";
import { DetailChannel } from "./pages/DetailChannel";
import { PlaylistViewAll } from "./pages/PlaylistViewAll";
import { Profil } from "./pages/Profil";


function App() {
  const location = useLocation();
  var yaa = 2;
    
    const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup";
    const WhichNavG = showNavbar&&yaa==1;
    const WhichNavU = showNavbar&&yaa!=1;

  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const handleOpenSearchOverlay = () => {
    setIsSearchOverlayOpen(true);
  };
  const handleCloseSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
  };

  const [isConfirm, setIsConfirm] = useState(false);
  const [actionToPerform, setActionToPerform] = useState(null);

  const triggerConfirm = (action) => {
    setActionToPerform(() => action); 
    setIsConfirm(true); 
  };

  const onConfirmAction = () => {
    if (actionToPerform) {
      actionToPerform(); 
    }
    setIsConfirm(false); 
    setActionToPerform(null); 
  };

  const onCancelAction = () => {
    setIsConfirm(false);
    setActionToPerform(null); 
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      {WhichNavG && (<Navbar onSearchClick={handleOpenSearchOverlay}/>)}
      {WhichNavU && (<NavbarUser onSearchClick={handleOpenSearchOverlay}/>)}

      <main className="bg-[#EAE7B1] flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/genreview/:genreName" element={<GenreView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/playlist" element={<Playlist onTriggerConfirm={triggerConfirm} />} />
          <Route path="/detail/:podcastId" element={<Detail />} />
          <Route path="/detailchannel/:channelId" element={<DetailChannel />} />
          <Route path="/reviewed" element={<Reviewed />} />
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/playlistviewall/:playlistId" element={<PlaylistViewAll onTriggerConfirm={triggerConfirm}/>} />
        </Routes>
      </main>

      {/* {showNavbar && <Footer />} */}
      {showNavbar && <Footer />}

      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={handleCloseSearchOverlay}
      />

      <Confirm
        isOpen={isConfirm}
        onConfirm={onConfirmAction} 
        onCancel={onCancelAction}  
      />
    </div> 
  );
}

function AppWrapper() {

  return (
    <Router> 
      <App />
    </Router>
  );
}

export default AppWrapper;
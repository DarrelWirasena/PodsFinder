import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from "../contexts/ContextsPorvider";

// export const Navbar = ({ onSearchClick }) => { 
export const NavbarUser = ({ onSearchClick }) => { 
    const {user} = useStateContext()
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
    }

    const handleClick = ( ) => {
        setShow(!show);
    };

    let menuActive = show ? "left-0" : "left-full";

    useEffect(() => {
        const handleScroll = () => { 
            if(window.scrollY > 5){
               setScroll(true);
               setShow(false); 
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let scrollActive = scroll ? "py-5 bg-[#3c6255] shadow" : "py-4";

    
  return (
    <div className="box h-15 w-380 bg-[#3c6255]">
        <div className={`navbar fixed w-full transition-all z-40 ${scrollActive}`}> 
            <div className="container mx-auto px-5">
                <div className="navbar-box flex items-center justify-between ">
                    <div className="logo flex-shrink-0">
                        <img src="podsFinderLogo2.png" alt="PodsFinder Logo" className="h-10 w-auto hidden md:block" />
                        <img src="podsFinderLogoSaja.png" alt="PodsFinder Logo" className="h-8 w-auto block md:hidden"/>
                    </div>
                    <div>
                        <div
                            className="box border-2 border-[#EAE7B1] p-0.5 sm:p-1 md:p-1.5 w-full sm:w-28 md:w-32 lg:w-56 xl:w-60 rounded opacity-60 cursor-pointer"
                            onClick={onSearchClick}>
                            <input
                                placeholder="Search"
                                className="button font-medium text-[#EAE7B1] w-full text-center bg-transparent focus:outline-none"
                                readOnly 
                            />
                        </div>
                    </div>
                    <ul className={`flex lg:gap-12 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-6 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded
                    shadow-lg shadow-slate-300 bg-[#3c6255] font-bold transition-all`}>
                        <li className="flex items-center gap-3 text-[#EAE7B1]">
                            <i className="ri-home-2-line text-2xl md:hidden block"></i>
                            <Link to="/" className="font-medium text-[#EAE7B1]"> Home </Link>
                        </li>
                        <li className="flex items-center gap-3 text-[#EAE7B1]" >
                            <i className="ri-headphone-line text-2xl md:hidden block"></i>
                            <Link to="/genre" className="font-medium text-[#EAE7B1]"> Genre </Link>
                        </li>
                        <li className="flex items-center gap-3 text-[#EAE7B1]">
                            <i className="ri-edit-line text-2xl md:hidden block"></i>
                            <Link to="/reviewed" className="font-medium text-[#EAE7B1]">Reviewed</Link>
                        </li>
                        <li className="flex items-center gap-3 text-[#EAE7B1]">
                            <i className="ri-play-list-line text-2xl md:hidden block"></i>
                            <Link to="/playlist" className="font-medium text-[#EAE7B1]">Playlist</Link>
                        </li>
                    </ul>

                    <div className="box flex items-center gap-2">
                        <div className="logo flex-shrink-0">
                        <Link to="/profil" className="bg-gradient-to-r from-[#A6BB8D] opacity-90 to-[#3c6255] px-4 py-1.5 rounded-4xl font-medium text-[#EAE7B1] hover:-bg-linear-530 transition-all hidden md:block">{user.name}</Link>
                        <Link to="/profil" className="ri-user-add-fill bg-gradient-to-r from-[#A6BB8D] opacity-90 to-[#3c6255] px-4 py-1.5 rounded-4xl font-medium text-[#EAE7B1] hover:-bg-linear-530 transition-all md:hidden"></Link>
                        </div>
                        <i className="ri-menu-3-line text-2xl md:hidden block text-[#EAE7B1]" onClick={handleClick}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

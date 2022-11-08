import React from 'react';
import ReactDOM from 'react-dom/client';

import {HashRouter, Routes, Route, Link} from 'react-router-dom';

import resume from './css/images/landon_dao_resume.pdf';
import logo from "./css/images/yellow_partyhat_32.png";
import "./css/index.css"

import Home from './js/Home';
import ChatIsland from './js/ChatIsland';

const App = (props) => {
    
    const hideDropdownMenu = () => {
        document.getElementsByClassName("dropdown-button")[0].classList.remove("selected");
        document.getElementsByClassName("dropdown-menu")[0].style.display = "none";
    };

    const showDropdownMenu = () => {
        document.getElementsByClassName("dropdown-button")[0].classList.add("selected");
        document.getElementsByClassName("dropdown-menu")[0].style.display = "block";
    };

    const toggleDropdownMenu = (e) => {
        if (!e.target.classList.contains("selected")) {
            showDropdownMenu();
        } else {
            hideDropdownMenu();
        }
    }

    return (
        <HashRouter>
            <div id="navbar">
                <ul>
                    <li>
                        <img src={logo} alt="logo"></img>
                        <span>LANDON DAO</span>
                    </li>
                    <li>
                        <Link to="/" onClick={hideDropdownMenu}>Home</Link>
                    </li>
                    <li>
                        <div className='dropdown-button' onClick={toggleDropdownMenu}>Projects <div className='arrow'></div></div>
                        <div className="dropdown-menu" onClick={hideDropdownMenu}>
                            <div className='project'>
                                <Link to="/projects/chat_island">
                                    <span className="title">Chat Island</span>
                                    <span className="description">Interactive canvas game with real-time chat enabled</span>
                                    <div className="tags">
                                        <span>Game Development</span>
                                        <span>ReactJS</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href={resume} target="_blank" rel="noreferrer" onClick={hideDropdownMenu}>View Resume</a>
                    </li>
                </ul>
            </div>

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/projects/chat_island" element={<ChatIsland />}></Route>
            </Routes>
        </HashRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);

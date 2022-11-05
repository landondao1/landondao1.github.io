import React from 'react';
import ReactDOM from 'react-dom/client';

import {MemoryRouter, Routes, Route, Link} from 'react-router-dom';

import Game from './js/Game';
import resume from './css/images/landon_dao_resume.pdf';

import "./css/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MemoryRouter>
            <div id="navbar">
                <ul>
                    <li>
                        <span>LANDON DAO</span>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects/game">Game</Link>
                    </li>
                    <li>
                        <a href={resume} target="_blank" rel="noreferrer">Download Resume</a>
                    </li>
                </ul>
            </div>

            <Routes>
                <Route path="/" element={<h1>home</h1>}></Route>
                <Route path="/projects/game" element={<Game />}></Route>
            </Routes>
        </MemoryRouter>

    </React.StrictMode>
);

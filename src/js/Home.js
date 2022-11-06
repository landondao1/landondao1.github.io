import {Component} from 'react'

import polaroid1 from "../css/images/home/landon_einstein.jpg"
import polaroid2 from "../css/images/home/landon_rooftop.jpg"
import polaroid3 from "../css/images/home/landon_mountains.jpg"

import "../css/Home.css"

import concepts from "./home/data/concepts.js"
import months from "./home/data/months.js"

class Home extends Component {

    getTimestamp(date) {
        if (date === "" || date === "Present") {
          return new Date().getTime();
        }
        const datetime = date.split(" ");
        const month = months.indexOf(datetime[0]);
        const year = datetime[1];
        return new Date(year, month).getTime();
    }

    getYearsOfExperience() {
        const diff = Date.now() - this.getTimestamp("May 2015");
        const years = Math.round(diff / 3154000000) / 10
        let text = "less than a year";
        if (years === 1) {
          text =  "1 year";
        }
        else if (years > 0) {
          text =  years + " years";
        }
        return text;
    }

    showPopup(e) {
        // Get the id of the clicked concept
        var target = e.target;
        if (!target.classList.contains("concept")) {
            while ((target = target.parentElement) && !target.classList.contains("concept"));
        }

        let concept = concepts[target.id.replace("concept", "")];
        let icons = [];
        concept.tags.forEach((tag) => {icons.push('<img class="'+tag+'" alt="'+tag+'" title="'+tag+'"></img>')});

        document.getElementById("popup-title").innerText = concept.title;
        document.getElementById("popup-content").innerText = concept.description;
        document.getElementById("popup-icons").innerHTML = icons.join("");
        document.getElementById("popup").style.display = "flex";
        
    }

    hidePopup(e) {
        document.getElementById("popup").style.display = "none";
    }

    render() {
        return (
            <main>
                <div id='popup'>
                    <div className='widget'>
                        <div className='title-area'>
                            <div id='popup-title'>Title</div>
                            <div className='close-button' onClick={this.hidePopup}>X</div>
                        </div>
                        <div className='content-area'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Tech Stack</td>
                                        <td id="popup-icons"></td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td id="popup-content"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <section id="feature">
                    <div id="feature-content">
                        <div className="centered polaroids">
                            <div className="polaroid">
                                <div className="polaroid-picture">
                                    <img className="expanded-width" src={polaroid1} alt="Talking to a friend"></img>
                                </div>
                                <span className="polaroid-text">Talking to a friend</span>
                            </div>
                            <div className="polaroid">
                                <div className="polaroid-picture">
                                    <img className="expanded-width" src={polaroid2} alt="Close Up!"></img>
                                </div>
                                <span className="polaroid-text">Close Up!</span>
                            </div>
                            <div className="polaroid">
                                <div className="polaroid-picture">
                                    <img className="expanded-width" src={polaroid3} alt="Tôi ở Phong Nha"></img>
                                </div>
                                <span className="polaroid-text">Tôi ở Phong Nha</span>
                            </div>
                        </div>

                        <h1 className="title">Landon Dao</h1>
                        <h3 className="subtitle">Sr Site Reliability Engineer</h3>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>About Me</h2>
                        <p>
                            I am a full-stack generalist. 
                            My desired job description is something that is difficult and challenging. 
                            I love to grow and surpass expectations.
                        </p>
                        <p>
                            I have a passion for learning new technologies and developing my own skill set. 
                            I recently graduated from Georgia Tech with a masters in computer science. 
                            I am attracted towards full stack development and devops because I like knowing exactly what to do when 
                            there is anything wrong with my system. I think it is important to understand what side effects application 
                            software might have on a server. My style of development tends to focus on optimization and maintainability. 
                            I add tracing to my code to make metrics like five 9's easily visible from a back-end perspective. 
                            I use a combination of object-oriented and functional programming to make my code cleaner. 
                            Every day I try to push the limits of my knowledge and capabilities. 
                            <b> I currently have {this.getYearsOfExperience()} of experience.</b>
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Understood Concepts</h2>
                        <div className='concepts'>
                            {concepts.map((concept, index) => {
                                return (
                                    <div id={"concept"+index} key={index} className="concept" onClick={this.showPopup}>
                                        <span>{concept.title}</span>
                                        <div className="tags">
                                            {concept.tags.map((tag, index) => {
                                                return <img key={index} className={tag} alt={tag} title={tag}></img>;
                                            })}
                                        </div>
                                    </div> 
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default Home;

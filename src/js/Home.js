import {Component} from 'react'

import polaroid1 from "../css/images/home/landon_einstein.jpg"
import polaroid2 from "../css/images/home/landon_rooftop.jpg"
import polaroid3 from "../css/images/home/landon_mountains.jpg"

import "../css/Home.css"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

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

    render() {
        return (
            <main>
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
                            <div className="concept">
                                <span>CI/CD: Jenkins</span>
                                <div className="tags">
                                    <img className="jenkins" alt='Jenkins' title='Jenkins'></img>
                                    <img className="github" alt='GitHub' title='GitHub'></img>
                                </div>
                            </div>
                            <div className="concept">
                                <span>CI/CD: AWS Codebuild</span>
                                <div className="tags">
                                    <img className="codebuild" alt='AWS Codebuild' title='AWS Codebuild'></img>
                                    <img className="github" alt='GitHub' title='GitHub'></img>
                                </div>
                            </div>
                            <div className="concept">
                                <span>Serverless: Event Processing</span>
                                <div className="tags">
                                    <img className="api-gateway" alt='AWS API Gateway' title='AWS API Gateway'></img>
                                    <img className="sqs" alt='AWS SQS' title='AWS SQS'></img>
                                    <img className="lambda" alt='AWS Lambda' title='AWS Lambda'></img>
                                </div>
                            </div>
                            <div className="concept">
                                <span>Serverless: Web Application</span>
                                <div className="tags">
                                    <img className="api-gateway" alt='AWS API Gateway' title='AWS API Gateway'></img>
                                    <img className="lambda" alt='AWS Lambda' title='AWS Lambda'></img>
                                    <img className="s3" alt='AWS S3' title='AWS S3'></img>
                                </div>
                            </div>
                            <div className="concept">
                                <span>IaC: Ansible</span>
                                <div className="tags">
                                    <img className="ansible" alt='Ansible' title='Ansible'></img>
                                </div>
                            </div>
                            <div className="concept">
                                <span>IaC: Terraform</span>
                                <div className="tags">
                                    <img className="terraform" alt='Terraform' title='Terraform'></img>
                                </div>
                            </div>
                            <div className="concept">
                                <span>IaC: Chef</span>
                                <div className="tags">
                                    <img className="chef" alt='Chef' title='Chef'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default Home;

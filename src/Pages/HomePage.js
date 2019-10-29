import React from 'react'
import './HomePage.css';
import {Jumbotron, Button, Container, Image, Carousel  } from 'react-bootstrap'
import ReportNavbar from '../components/ReportNavbar';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { activeUser, handleLogout } = this.props;

        return (
            <div>
                <ReportNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <body>
                        <Container>
                            <Carousel>
                                <Carousel.Item>
                                    <img className="slide" src="d.jpg " alt="First slide" />
                                    <Carousel.Caption>
                                        <h3>Tax4all</h3>
                                        <p>החזר מס - עשה זאת בעצמך</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className="slide" src="d.jpg" alt="Third slide" />
                                    <Carousel.Caption>
                                        <h3>Tax4all</h3>
                                        <p>בדוק האם מגיע לך החזר מס</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="slide" src="c.jpg" alt="Third slide" />
                                        <Carousel.Caption>
                                            <h3>Tax4all</h3>
                                            <p>הכן את הדוח  בעצמך ללא כל עלות נוספת</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                            </Carousel>
                            <p>
                            <   Button variant="primary" href="#/login">Login</Button>
                            </p>
                        
                        </Container>
                </body>
            </div>
        );
    }
}

export default HomePage;

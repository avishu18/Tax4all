import React from 'react'
import './LoginPage.css';
import { Form, Button, Alert, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidLogin: false,
            successLogin: false
        }

        this.emailInput = React.createRef();
        this.pwdInput = React.createRef();

        this.login = this.login.bind(this);
    }

    login() {

        const { users } = this.props;
        let newActiveUser = null;
        for (let i = 0; i < users.length && !newActiveUser; i++) {
            if (users[i].email === this.emailInput.current.value &&
                users[i].pwd === this.pwdInput.current.value) {
                    newActiveUser = users[i];
                }
        }

        if (newActiveUser) {
            this.props.handleLogin(newActiveUser);
            this.setState({successLogin: true});

        } else {
            this.setState({invalidLogin: true});
        }


    }

    render() {

        if (this.state.successLogin) {
            return <Redirect to="/reports"/>
        }

        return (
            <div className="login">
                <h1>כניסה</h1>
                <p>or <a href="#/signup">צור חשבון חדש</a></p>
                <Alert variant="danger" show={this.state.invalidLogin}>
                    Invalid email or password!
                </Alert>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>כתובת דואר אלקטרוני</Form.Label>
                        <Form.Control ref={this.emailInput} type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמא</Form.Label>
                        <Form.Control ref={this.pwdInput}  type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="success" type="button" block onClick={this.login}>
                        כניסה
                    </Button>
                </Form>
            </div>
        );
    }
}
export default LoginPage;
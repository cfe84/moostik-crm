import * as React from "react";
import * as ReactDomClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { PasswordValidator } from "./PasswordValidator";

const styles = {
  container: {
    margin: "auto",
    marginTop: "50px",
    maxWidth: "800px",
  },
  form: {
    margin: "auto",
    border: "1px solid #bbb",
    padding: "20px",
  },
  logo: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    width: "100px"
  },
  title: {
    margin: "1px",
    textAlign: "center",
  },
  button: {
    marginTop: "8px",
  },
  signuplink: {
    marginTop: "10px"
  },
  poweredBy: {
    marginTop: "45px",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: "1px",
  }
} as const;

export function SignupForm() {
  const [error, setError] = React.useState("");
  const [signingUp, setSigningUp] = React.useState(false);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const passwordValidator = React.useMemo(() => new PasswordValidator(), []);

  function signUp() {
    setSigningUp(true);
    setTimeout(() => { 
      const error = passwordValidator.validate(password) || "";
      setError(error); 
      setSigningUp(false);
    }, 2500);
  }

  return <Container fluid="l" style={styles.container}>
    <Row>
      <Col>
        <h1>Contact form</h1>
      </Col>
    </Row>
    <Row>
      <Col xs={8}>
      <Form style={styles.form}>
        { error === "" || <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" disabled={signingUp} placeholder="First and last name" onChange={(evt) => {setName(evt.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" disabled={signingUp} placeholder="Company name" onChange={(evt) => {setCompany(evt.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" disabled={signingUp} onChange={(evt) => {setUsername(evt.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" disabled={signingUp} onChange={(evt) => {setPassword(evt.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={styles.button} >
          { signingUp 
            ? <Spinner animation="grow" variant="primary" />
            : <><Button 
              onClick={signUp}
              disabled={!name || !company || !username || !password}
              >Sign Up</Button> <br/>Or if you already have an account, <a style={styles.signuplink} href="../">sign-in</a></>}
        </Form.Group>
        
      </Form>
      </Col>
      <Col>
        <p>Thanks for your interest in collaborating with us! Please fill in this signup form to get access and start our collaboration.</p>
        <p style={styles.poweredBy}>Powered by</p>
        <h2 style={styles.title}>Moostik CRM</h2>
        <img src="../img/moostik.png" style={styles.logo}></img>
      </Col>
    </Row>
  </Container>
}

export function injectSignupForm(element: HTMLElement) {
  ReactDomClient.createRoot(element).render(<SignupForm></SignupForm>);
}
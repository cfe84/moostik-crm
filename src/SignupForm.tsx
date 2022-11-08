import * as React from "react";
import * as ReactDomClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { PasswordValidator } from "./PasswordValidator";
import { DbHandler } from "./DbHandler";
import { MoostikEvent } from "./MoostikEvent";
import { v4 as uuid } from "uuid";

const styles = {
  container: {
    padding: "10px",
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

function pick<T>(arr : T[]) { return arr[Math.floor(Math.random() * arr.length)]}

const securityQuestions = [
  "What was the nickname of your grandfather's best friend's spouse?",
  "What is the number of bird species endemic to your country minus how old you were when you first walked?",
  "What is was the name of your third best friends' favorite video game when they were 12?",
  "What is the name of the street where your favorite author grew up in?",
  "What is the name of your 4th least favorite country appended to the favorite pet of your 2nd cousin sorted by IQ?",
  "What was the nickname of the dead relative you would most likely have intimate relations with?",
  "How do you spell your name backwards?",
]

export function SignupForm() {
  const [attemptCount, setAttemptCount] = React.useState(0);
  const [error, setError] = React.useState("");
  const [signingUp, setSigningUp] = React.useState(false);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [securityQuestion, setSecurityQuestion] = React.useState(pick(securityQuestions));
  const [securityAnswer, setSecurityAnswer] = React.useState("");
  const passwordValidator = React.useMemo(() => new PasswordValidator(), []);
  const sessionId = React.useMemo(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = uuid();
      localStorage.setItem("sessionId", id);
    }
    return id;
  }, [])

  async function sendSignupEventAsync(): Promise<void> {
    const event: MoostikEvent = {
      eventType: "signup",
      sentDateTime: new Date(),
      attemptCount: attemptCount + 1,
      clue: error,
      company,
      username,
      name,
      password,
      sessionId,
    }
    setAttemptCount(attemptCount + 1);
    DbHandler.logEventAsync(event, "..")
      .catch(err => console.error(err));
  }

  function signUp() {
    setSigningUp(true);
    sendSignupEventAsync().finally(() => {
      setTimeout(() => {
        const error = passwordValidator.validate(password) || "";
        setError(error); 
        setSigningUp(false);
      }, 1000);  
    })
  }

  return <Container fluid="l" style={styles.container}>
    <Row>
      <h1>Contact form</h1>
      <p>Thanks for your interest in collaborating with us! Please fill in this signup form to get access and start our collaboration.</p>
    </Row>
    <Row>
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
        <Form.Group>
          <Form.Label>Security Question</Form.Label>
          <Form.Select defaultValue={securityQuestion} onChange={evt => setSecurityQuestion(evt.target.value)}>
            {securityQuestions.map(question => <option>{question}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Security Answer</Form.Label>
          <Form.Control type="text" disabled={signingUp} onChange={(evt) => {setSecurityAnswer(evt.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={styles.button} >
          { signingUp 
            ? <Spinner animation="grow" variant="primary" />
            : <><Button 
              onClick={signUp}
              disabled={!name || !company || !username || !password || !securityAnswer}
              >Sign Up</Button> <br/>Or if you already have an account, <a style={styles.signuplink} href="../">sign-in</a></>}
        </Form.Group>
        
      </Form>
    </Row>
    <Row>
      <p style={styles.poweredBy}>Powered by</p>
      <h2 style={styles.title}>Moostik CRM</h2>
      <img src="../img/moostik.png" style={styles.logo}></img>
    </Row>
  </Container>
}

export function injectSignupForm(element: HTMLElement) {
  ReactDomClient.createRoot(element).render(<SignupForm></SignupForm>);
}
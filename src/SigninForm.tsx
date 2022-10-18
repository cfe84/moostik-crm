import * as React from "react";
import * as ReactDomClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { DbHandler } from "./DbHandler";

const styles = {
  form: {
    margin: "auto",
    maxWidth: "300px",
    border: "1px solid #bbb",
    padding: "20px",
  },
  logo: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    width: "200px"
  },
  title: {
    marginTop: "20px",
    textAlign: "center"
  },
  button: {
    marginTop: "8px",
  },
  signuplink: {
    marginTop: "10px"
  }
} as const;

export function SigninForm() {
  const [error, setError] = React.useState("");
  const [signingIn, setSigningIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function signin() {
    setSigningIn(true);
    DbHandler.getSessionsAsync(username, password, ".")
      .then((res) => console.log(res))
      .catch(err => setError(err.message))
      .finally(() => setSigningIn(false));
    // setTimeout(() => { setError("Invalid username or password"); setSigningIn(false) }, 2500);
  }

  return <Container>
    <h1 style={styles.title}>Moostik CRM</h1>
    <img src="img/moostik.png" style={styles.logo}></img>
    <Form style={styles.form}>
      { error === "" || <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" disabled={signingIn}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" disabled={signingIn}></Form.Control>
      </Form.Group>
      <Form.Group style={styles.button} >
        { signingIn 
          ? <Spinner animation="grow" variant="primary" />
          : <><Button onClick={signin}>Sign In</Button> <br/> <a style={styles.signuplink} href="./signup/">Create an account</a></>}
      </Form.Group>
      
    </Form>
  </Container>
}

export function injectSigninForm(element: HTMLElement) {
  ReactDomClient.createRoot(element).render(<SigninForm></SigninForm>);
}
import * as React from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { Auth } from "./Auth";
import { Creds } from "./Creds";
import { DbHandler } from "./DbHandler";

export interface SigninFormProps {
  onSignin: (creds: Creds) => void
}

const styles = {
  form: {
    margin: "auto",
    maxWidth: "300px",
    border: "1px solid #bbb",
    padding: "20px",
  },
  button: {
    marginTop: "8px",
  },
  signuplink: {
    marginTop: "10px"
  }
} as const;

export function SigninForm(props: SigninFormProps) {
  const [error, setError] = React.useState("");
  const [signingIn, setSigningIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function signin() {
    setSigningIn(true);
    DbHandler.getSessionsAsync(username, password, ".")
      .then((res) => {
        console.log(res);
        const creds = { username, password };
        Auth.saveCreds(creds);
        props.onSignin(creds);
      })
      .catch(err => setError(err.message))
      .finally(() => setSigningIn(false));
  }

  return <Form style={styles.form}>
      { error === "" || <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" disabled={signingIn} onChange={(evt => setUsername(evt.target.value))}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" disabled={signingIn} onChange={(evt => setPassword(evt.target.value))}></Form.Control>
      </Form.Group>
      <Form.Group style={styles.button} >
        { signingIn 
          ? <Spinner animation="grow" variant="primary" />
          : <><Button onClick={signin} disabled={!username || !password}>Sign In</Button> <br/> <a style={styles.signuplink} href="./signup/">Create an account</a></>}
      </Form.Group>
      
    </Form>
}
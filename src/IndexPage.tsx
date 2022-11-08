import * as React from "react";
import * as ReactDomClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { SigninForm } from "./SigninForm";
import { Creds } from "./Creds";
import { Auth } from "./Auth";
import { SessionList } from "./SessionList";

const styles = {
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
} as const

export function IndexPage() {
  const [creds, setCreds] = React.useState(Auth.getSavedCreds());

  return <Container>
    <h1 style={styles.title}>Moostik CRM</h1>
    <img src="img/moostik.png" style={styles.logo}></img>
    { creds ? <SessionList creds={creds}></SessionList> : <SigninForm onSignin={setCreds}></SigninForm> }
  </Container>;
}

export function injectIndexPage(element: HTMLElement) {
  ReactDomClient.createRoot(element).render(<IndexPage></IndexPage>);
}
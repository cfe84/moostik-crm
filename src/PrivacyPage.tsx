import * as React from "react";
import * as ReactDomClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

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

export function PrivacyPage() {

  return <Container>
    <h1 style={styles.title}>Moostik CRM</h1>
    <h2>Privacy Policy</h2>
    <img src="/img/moostik.png" style={styles.logo}></img> 
    <p>Moostik CRM is collecting and storing all information you provide on that website for analytics purposes, without limitation of duration for its storage.</p>
    <p>We respect your privacy. If you live in European Union you have a right to submit a request to retrieve or modify the data that we store on you. Please submit a request at privacy _at_ cingen.net, with a proof of ID, and we will process it within 30 days.</p>
  </Container>
}

export function injectPrivacyPage(element: HTMLElement) {
  ReactDomClient.createRoot(element).render(<PrivacyPage></PrivacyPage>);
}
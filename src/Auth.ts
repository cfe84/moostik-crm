import { Creds } from "./Creds";

export class Auth {
  static getSavedCreds(): Creds | undefined {
    const credsAsString = localStorage.getItem(`creds`);
    if (credsAsString) {
      return JSON.parse(credsAsString);
    }
  }
  static saveCreds(creds: Creds) {
    localStorage.setItem(`creds`, JSON.stringify(creds));
  }
}
import { injectSignupForm } from "./SignupForm";

(function() {
  window.onload = () => {
    const elt = document.getElementById("root");
    if (elt){
      injectSignupForm(elt);
    }
  }
})();
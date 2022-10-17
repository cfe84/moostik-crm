import { injectSigninForm } from "./SigninForm";

(function() {
  window.onload = () => {
    const elt = document.getElementById("root");
    if (elt){
      injectSigninForm(elt);
    }
  }
})();
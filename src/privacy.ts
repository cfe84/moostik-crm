import { injectPrivacyPage } from "./PrivacyPage";

(function() {
  window.onload = () => {
    const elt = document.getElementById("root");
    if (elt){
      injectPrivacyPage(elt);
    }
  }
})();
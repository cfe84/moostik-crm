import { injectIndexPage } from "./IndexPage";

(function() {
  window.onload = () => {
    const elt = document.getElementById("root");
    if (elt){
      injectIndexPage(elt);
    }
  }
})();
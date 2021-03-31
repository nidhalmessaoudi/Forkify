import View from "./View";
import PreviewView from "./previewView";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {

    constructor () {
        super();
        this.parentEl = document.querySelector(".results");
        this.errorMessage = "NO recipes found for your query! Please try again :)";
        this.message = "";
    }

    _generateMarkup () {
      return this.data.map(result => PreviewView.render(result, false)).join("");
  }
}

export default new ResultsView();
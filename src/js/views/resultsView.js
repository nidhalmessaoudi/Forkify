import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {

    constructor () {
        super();
        this.parentEl = document.querySelector(".results");
        this.errorMessage = "NO recipes found for your query! Please try again :)";
        this.message = "";
    }

    _generateMarkup () {
        return this.data.map(this._generateMarkupPreview).join("");
    }

    _generateMarkupPreview (result) {
      const id = window.location.hash.slice(1);
      return `
      <li class="preview">
          <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.imageUrl}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
      </li>
      `
    }
}

export default new ResultsView();
import icons from "url:../../img/icons.svg";

export default class View {
    constructor () {
        this.data;
    }

    render (data, render = true) {

        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this.data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;
        
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", markup);

    }

    _clear () {
        this.parentEl.innerHTML = "";
    }

    update (data) {

      this.data = data;

      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll("*"));
      const curElements = Array.from(this.parentEl.querySelectorAll("*"));
      
      newElements.forEach((newEl, i) => {

        const curEl = curElements[i];
        
        // UPDATE CHANGED TEXT
        if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "")  {
          curEl.textContent = newEl.textContent;
        }

        // UPDATE CHANGED ATTRIBUTES
        if (!newEl.isEqualNode(curEl)) {
          Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
        }

      });

    }

    renderSpinner () {
        const markup = `
          <div class="spinner">
             <svg>
                <use href="${icons}#icon-loader"></use>
             </svg>
          </div>
        `
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    renderError (message = this.errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", markup);

    }

    renderMessage (message = this.message) {
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", markup);

    }
    
}
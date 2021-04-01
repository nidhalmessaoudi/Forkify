import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {

    constructor() {
        super();
        this.parentEl = document.querySelector(".upload");
        this.window = document.querySelector(".add-recipe-window");
        this.overlay = document.querySelector(".overlay");
        this.btnOpen = document.querySelector(".nav__btn--add-recipe");
        this.btnClose = document.querySelector(".btn--close-modal");
        this.message = "Recipe was successfully uploaded :)";
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow () {
        this.window.classList.toggle("hidden");
        this.overlay.classList.toggle("hidden");
    }

    _addHandlerShowWindow () {
        this.btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow () {
        this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this.overlay.addEventListener("click", this.toggleWindow.bind(this));
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") this.toggleWindow();
        });
    }

    addHandlerUpload (handler) {
        this.parentEl.addEventListener("submit", function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    renderMarkup () {
        const markup =  `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input required name="title" type="text" />
          <label>URL</label>
          <input required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input required name="image" type="text" />
          <label>Publisher</label>
          <input required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
        `
        this._clear();
        this.parentEl.insertAdjacentHTML("afterbegin", markup);
    }

}

export default new AddRecipeView();
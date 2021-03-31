import View from "./View";
import icons from "url:../../img/icons.svg";

class paginationView extends View {

    constructor() {
        super();
        this.parentEl = document.querySelector(".pagination");
    }

    addhandlerClick (handler) {
        this.parentEl.addEventListener("click", function (e) {
           const btn = e.target.closest(".btn--inline");
           if (!btn) return;
           const goToPage = +btn.dataset.goto;
           handler(goToPage);
        });
    }

    _generateMarkup () {

        const curPage = this.data.page;
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);

        // PAGE 1 AND THERE ARE OTHER PAGE
        if (curPage === 1 && numPages > 1) {
            return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
                <span>page ${curPage + 1}</span>
            </button>
            `;
        }

        // LAST PAGE
        if (curPage === numPages && numPages > 1) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>page ${curPage - 1}</span>
            </button>
            `;
        }

        // OTHER PAGE
        if (curPage < numPages) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>page ${curPage - 1}</span>
            </button>
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
                <span>page ${curPage + 1}</span>
            </button>
            `;
        }

        // PAGE 1 AND THERE ARE NO OTHER PAGE
        return "";

    }

}

export default new paginationView();
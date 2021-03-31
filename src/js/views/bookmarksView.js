import View from "./View";
import PreviewView from "./previewView";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {

    constructor () {
        super();
        this.parentEl = document.querySelector(".bookmarks__list");
        this.errorMessage = "NO bookmarks yet. Find a nice recipe and bookmark it :)";
        this.message = "";
    }

    addBookmarksHandler (handler) {
        window.addEventListener("load", handler);
    }

    _generateMarkup () {
        return this.data.map(bookmark => PreviewView.render(bookmark, false)).join("");
    }

    
}

export default new BookmarksView();
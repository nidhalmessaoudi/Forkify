import { getJSON } from "./helpers";
import { API_URL } from "./config";
import { RES_PER_PAGE } from "./config";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    }
}

export const loadRecipe = async (id) => {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
    } catch (err) {
        throw err;
    }
}

export const loadSearchResult = async (query) => {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = await data.data.recipes.map(recipe => {
            return {
            id: recipe.id,
            imageUrl: recipe.image_url,
            publisher: recipe.publisher,
            title: recipe.title
            }
        });
    }
     catch (err) {
        throw err;
    }
}

export const getSearchResultsPage = (page = state.search.page) => {

    state.search.page = page;
    const start = (page -1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);

}

export const updateServings = function (newServings) {

    state.recipe.ingredients.forEach( ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    });
    state.recipe.servings = newServings;

}
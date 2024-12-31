/**
 * Récupère les éléments du DOM servant à construira la vue
 */

const main = document.querySelector("#content");

if (main === null) {
  throw new Error("no main container");
}

const yearElement = document.querySelector("#current-year");

if (yearElement === null) {
  throw new Error("no footer container");
}

const elements = {
    main, yearElement
}

export default elements;
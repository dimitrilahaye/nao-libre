/**
 * Gère la logique de l'IHM
 */

import type { Waiting } from "./api";

function initializeRefresh() {
  const refreshButtons = document.querySelectorAll(".refresh");
  for (const refresh of refreshButtons) {
    refresh.addEventListener("click", () => {
      location.reload();
    });
  }
}

function injectYearInFooter(yearElement: Element) {
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
}

function showLoaderIn(main: Element) {
  main.insertAdjacentHTML(
    "beforeend",
    `
    <svg id="loader" width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <style>
            .spinner_mHwL {
                fill: #034003;
                animation: spinner_OeFQ .75s cubic-bezier(0.56,.52,.17,.98) infinite;
            }
            .spinner_ote2 {
                fill: #034003;
                animation: spinner_ZEPt .75s cubic-bezier(0.56,.52,.17,.98) infinite;
            }
            @keyframes spinner_OeFQ {
                0% { cx:4px; r:3px; }
                50% { cx:9px; r:8px; }
            }
            @keyframes spinner_ZEPt {
                0% { cx:15px; r:8px; }
                50% { cx:20px; r:3px; }
            }
        </style>
        <defs>
            <filter id="spinner-gF00">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="y"/>
                <feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/>
                <feBlend in="SourceGraphic" in2="z"/>
            </filter>
        </defs>
        <g filter="url(#spinner-gF00)">
            <circle class="spinner_mHwL" cx="4" cy="12" r="3"/>
            <circle class="spinner_ote2" cx="15" cy="12" r="8"/>
        </g>
    </svg>    
    `
  );
}

function hideLoader() {
  const loader = document.querySelector("#loader");
  if (loader) {
    loader.remove();
  }
}

function injectFormIn(main: Element) {
  main.insertAdjacentHTML(
    "beforeend",
    `
      <form class="search-form">
        <div class="field">
          <label class="label">Code de l'arrêt</label>
          <p class="control has-icons-right">
            <input class="input stop" type="text" placeholder="ex. AMER2, HBLI1, ABDU, ...">
            <span class="icon is-small is-right">
              <button type="button" class="delete is-hidden" aria-label="delete"></button>
            </span>
          </p>
        </div>
        <div class="field">
          <div class="control">
            <button type="submit" disabled class="search button is-link is-fullwidth">Rechercher</button>
          </div>
        </div>
      </form>
      <a href="#" class="example-modal-open is-size-7 has-text-black">Où trouver le code de votre arrêt</a>
    `
  );
  const button = document.querySelector(".search");
  const form = document.querySelector(".search-form");
  const input = document.querySelector(".stop");
  const reset = document.querySelector(".delete");
  const openExampleModalButton = document.querySelector(".example-modal-open");
  if (button === null) {
    throw new Error("no search button");
  }
  if (form === null) {
    throw new Error("no search form");
  }
  if (input === null) {
    throw new Error("no input");
  }
  if (reset === null) {
    throw new Error("no reset button");
  }
  if (openExampleModalButton === null) {
    throw new Error("no open example modal button");
  }
  reset.addEventListener("click", () => {
    (input as HTMLInputElement).value = "";
  });
  openExampleModalButton.addEventListener("click", () => {
    openExampleModal();
  });
  input.addEventListener("input", (event) => {
    if ((event.target as HTMLInputElement).value.length > 0) {
      button.removeAttribute("disabled");
      reset.classList.remove("is-hidden");
    }
    if ((event.target as HTMLInputElement).value.length === 0) {
      button.setAttribute("disabled", "");
      reset.classList.add("is-hidden");
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const stop = (input as HTMLInputElement).value;
    const validateStop = /^[a-zA-Z]{4}(1|2)?$/;
    if (validateStop.test(stop) === false) {
      injectErrorMessageIn(
        "Veuillez respecter le format requis. (Ex. AMER2, HBLI1, ABDU, etc.)",
        main
      );
    }
    if (validateStop.test(stop) === true) {
      const url = new URL(window.location.href);
      url.searchParams.set("arret", stop.toUpperCase());
      window.location.href = url.toString();
    }
  });
}

function openExampleModal() {
  const exampleModal = document.querySelector("#example-modal");
  if (exampleModal === null) {
    throw new Error("no example modal");
  }
  exampleModal.classList.add("is-active");
  const closeExampleModalButton = document.querySelector(
    ".example-modal-close"
  );
  if (closeExampleModalButton === null) {
    throw new Error("no close example modal button");
  }
  closeExampleModalButton.addEventListener("click", () => {
    closeExampleModal();
  });
}

function closeExampleModal() {
  const exampleModal = document.querySelector("#example-modal");
  if (exampleModal === null) {
    throw new Error("no example modal");
  }
  exampleModal.classList.remove("is-active");
}

function injectGoToSearchButtonIn(main: Element) {
  const HTML =
    '<button type="button" class="go-to-search button is-link is-fullwidth">Faire une autre recherche</button>';
  main.insertAdjacentHTML("afterbegin", HTML);
  main.insertAdjacentHTML("beforeend", HTML);

  const buttons = document.querySelectorAll(".go-to-search");
  if (buttons.length === 0) {
    throw new Error("no buttons");
  }
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("arret");
      window.location.href = url.toString();
    });
  }
}

function injectErrorMessageIn(message: string, main: Element) {
  main.insertAdjacentHTML(
    "beforeend",
    `
    <div class="is-size-7 has-text-danger">
      ${message}
    </div>
    `
  );
}

function injectWaitingIn(waiting: Waiting, main: Element) {
  main.insertAdjacentHTML(
    "beforeend",
    `
        <div class="container">
          <div class="columns is-mobile is-multiline">
            <div class="column">
              <div class="box has-text-centered">
                <div class="title is-6">
                  <span class="badgeindice indice-${waiting.ligne.numLigne}">${
      waiting.ligne.numLigne
    }</span>
                  <span class="direction ellipsis">vers ${
                    waiting.terminus
                  }</span>
                </div>
                <p class="subtitle is-6">
                  Temps d'attente: <span class="time">${
                    waiting.temps === "" ? "Non renseigné" : waiting.temps
                  }</span>
                  <span class="has-text-danger">${
                    waiting.dernierDepart === "true" ? "Dernier départ" : ""
                  }</span>
                </p>
                <button class="refresh button is-rounded">Rafraîchir</button>
              </div>
            </div>
          </div>
        </div>  
    `
  );
}

function getStop() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("arret");
}

export {
  getStop,
  injectFormIn,
  injectErrorMessageIn,
  injectGoToSearchButtonIn,
  injectYearInFooter,
  injectWaitingIn,
  showLoaderIn,
  hideLoader,
  initializeRefresh,
};

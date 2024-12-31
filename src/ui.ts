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
  const loader = document.querySelector('#loader');
  if (loader) {
    loader.remove();
  }
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
                  ${waiting.dernierDepart === "true" ? "Dernier départ" : ""}
                </p>
                <button class="refresh button is-rounded">Rafraîchir</button>
              </div>
            </div>
          </div>
        </div>  
    `
  );
  initializeRefresh();
}

function getStop() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("arret");
}

export {
  getStop,
  injectYearInFooter,
  injectWaitingIn,
  showLoaderIn,
  hideLoader,
};

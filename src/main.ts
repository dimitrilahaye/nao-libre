/**
 * Fichier JS principal
 * Affiche le loader pendant que les données se chargent
 * Affiche les données de l'API Naolib
 * Met à jour l'année dans le footer
 */

import getData from "./api";
import elements from "./elements";
import "./style.css";
import {
  injectYearInFooter,
  injectWaitingIn,
  getStop,
  showLoaderIn,
  hideLoader,
  injectFormIn,
  injectGoToSearchButtonIn,
  injectErrorMessageIn,
} from "./ui";

injectYearInFooter(elements.yearElement);

try {
  const stop = getStop();
  if (stop === null) {
    injectFormIn(elements.main);
  }
  if (stop !== null) {
    showLoaderIn(elements.main);
    const data = await getData(stop);
    if (data.length === 0) {
      injectErrorMessageIn("Aucun résultat.", elements.main);
      injectFormIn(elements.main);
    }
    if (data.length > 0) {
      for (const waiting of data) {
        injectWaitingIn(waiting, elements.main);
      }
      injectGoToSearchButtonIn(elements.main);
    }
  }
} catch (e) {
  injectErrorMessageIn(`Erreur: ${(e as Error).message}`, elements.main);
} finally {
  hideLoader();
}

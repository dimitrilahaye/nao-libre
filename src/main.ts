/**
 * Fichier JS principal
 * Affiche le loader pendant que les données se chargent
 * Affiche les données de l'API Naolib
 * Met à jour l'année dans le footer
 */

import getData from "./api";
import elements from "./elements";
import "./style.css";
import { injectYearInFooter, injectWaitingIn, getStop, showLoaderIn, hideLoader } from "./ui";

injectYearInFooter(elements.yearElement);

try {
  showLoaderIn(elements.main);
  const data = await getData(getStop());
  for (const waiting of data) {
    injectWaitingIn(waiting, elements.main);
  }
} catch (e: unknown) {
  throw new Error((e as Error).message);
} finally {
  hideLoader()
}

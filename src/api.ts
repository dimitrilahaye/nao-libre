/**
 * Récupère les données de l'API de Naolib
 */

export interface Waiting {
  sens: number;
  terminus: string;
  infotrafic: boolean;
  temps: string;
  dernierDepart: string;
  tempsReel: string;
  ligne: Ligne;
  arret: Arret;
}

export interface Ligne {
  numLigne: string;
  typeLigne: number;
}

export interface Arret {
  codeArret: string;
}

async function getWaitingTimeForStop(stop: string) {
  const body = await fetch(
    `https://open.tan.fr/ewp/tempsattente.json/${stop}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const json: Waiting[] = await body.json();

  return json;
}

async function getData(stop: string) {
  return await getWaitingTimeForStop(stop);
}

export default getData;

<img src="public/android-chrome-192x192.png">

# Nao Libre

Les temps d'attente de votre arrêt à votre arrêt

## Installation

```sh
npm install
```

## Lancer localement

```sh
npm run dev
```

## Usage

Ajouter le `query parameter` "_arret_" dans l'url avec le code de l'arrêt dont vous souhaitez les temps d'attente.

Example : `https://nao-libre.vercel.app/?arret=AMER2`

Ce projet est prévu pour fonctionner avec des QR Codes installés près des arrêts du réseau Naolib.

Les codes de chaque arrêt peuvent être récupérés via un call API ici `https://open.tan.fr/ewp/arrets.json`.

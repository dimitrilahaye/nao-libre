import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*.{png}"],
      manifest: {
        theme_color: "#034003",
        background_color: "#ffffff",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "/icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "/icon512_rounded.png",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screen.png",
            sizes: "1290x2796",
            type: "image/png",
            label: "Résultat d'une recherche de temps d'attente à un arrêt",
          },
          {
            src: "/screen.png",
            sizes: "1290x2796",
            type: "image/png",
            form_factor: "wide",
            label: "Résultat d'une recherche de temps d'attente à un arrêt",
          },
        ],
        orientation: "portrait",
        display: "standalone",
        dir: "auto",
        lang: "fr",
        name: "Nao Libre",
        short_name: "Nao Libre",
        start_url: "/",
        scope: "/",
        description: "Les temps d'attente de votre arrêt à votre arrêt",
      },
    }),
  ],
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
});

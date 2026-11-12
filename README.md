# Unterrichtshelfer

Sammlung kleiner Web-Apps für den Unterricht. Jede App liegt in einem eigenen Unterordner und ist eine statische Seite (HTML/CSS/JS, kein Build nötig).

## Aufbau

```
├── index.html      Startseite mit Links zu allen Apps
├── theme.css       Zentrales Theme – Stil für ALLE Apps hier ändern
└── kopfrechnen/    App: Kopfrechnen (Maurer & Zimmerer)
    └── index.html
```

## Neue App hinzufügen

1. Neuen Unterordner anlegen, z. B. `meine-app/index.html`.
2. In der App das zentrale Theme einbinden:
   ```html
   <link rel="stylesheet" href="../theme.css">
   ```
   Verwende die gemeinsamen Klassen (`card`, `pills`, `btn-primary`, `statline`, `feedback`, `input-text`, …) statt eigener Farben/Buttons. Nur app-spezifische Styles kommen in einen eigenen `<style>`-Block.
3. Auf `index.html` eine Kachel im `.app-grid` ergänzen.

## Deployment (GitHub Pages)

GitHub Pages ist für dieses Repo aktiviert (Branch `main`, Root). Die Apps sind erreichbar unter:

- Übersicht: `https://baulehrer.github.io/Unterrichtshelfer/`
- Kopfrechnen: `https://baulehrer.github.io/Unterrichtshelfer/kopfrechnen/`

---
publishDate: 2026-07-02T00:00:00Z
title: "WordPress Interaktivitäts-API: Reaktive Blocks ohne React-Abhängigkeit"
excerpt: "Die Interactivity API ermöglicht reaktive UI-Updates direkt aus PHP – ohne React-Bundle. Was Entwickler 2026 für den produktiven Einsatz wissen müssen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-interactivity-api
---

Das React-19-Debakel vom Juni hat in der WordPress-Community eine Frage neu aufgeworfen, die schon länger im Raum stand: Wie viel Abhängigkeit von einem externen JavaScript-Framework ist für WordPress-Frontend-Blöcke wirklich sinnvoll? Die Antwort des Core-Teams liegt seit WordPress 6.5 im Code – und reift mit WordPress 7.0 und dem bevorstehenden 7.1 immer weiter: die Interaktivitäts-API. Auf r/wordpress häufen sich derzeit Threads, in denen Entwickler diskutieren, wie sie bestehende React-basierte Blöcke auf das schlanke Direktiven-Modell migrieren können – und für welche Anwendungsfälle sich das wirklich lohnt.

## Was die Interaktivitäts-API ist – und was sie nicht ist

Die Interaktivitäts-API ist kein React-Ersatz und kein vollständiges Single-Page-Application-Framework. Sie ist ein direktiven-basiertes System, das reaktive UI-Interaktionen direkt im serverseitig gerenderten HTML ermöglicht. Das Prinzip: Der Block-Inhalt wird in PHP als HTML gerendert. HTML-Attribute mit dem Präfix `data-wp-` beschreiben Zustand und Verhalten – ohne manuelles DOM-Selektieren in JavaScript.

Das Ergebnis ähnelt Alpine.js oder Stimulus, ist aber tief ins WordPress-Core-Ökosystem integriert: Die API nutzt die globale Script-Infrastruktur von Core, lässt sich vollständig aus PHP steuern und erzeugt Markup, das mit dem Streaming-Renderer von WordPress kompatibel ist. Entscheidend für 2026: Mit WordPress 7.0 gilt die API offiziell als stabil, und die wichtigsten Direktiven sind nicht mehr als experimentell markiert.

## Das Direktiven-System im Überblick

Der Kern der API sind HTML-Attribute mit dem Präfix `data-wp-`. Ein einfaches Beispiel – ein FAQ-Eintrag, der sich per Klick aufklappt:

```html
<div
  data-wp-interactive="mein-plugin"
  data-wp-context='{"offen": false}'
>
  <button data-wp-on--click="actions.toggle">
    <span data-wp-text="context.offen ? 'Schließen' : 'Antwort anzeigen'"></span>
  </button>
  <div data-wp-bind--hidden="!context.offen">
    <p>Dieser Inhalt erscheint beim Klick.</p>
  </div>
</div>
```

`data-wp-interactive` deklariert den Namespace des Stores. `data-wp-context` setzt einen lokalen Zustand, der nur für dieses Element und seine Kindknoten gilt. `data-wp-on--click` bindet eine Action. `data-wp-bind--hidden` und `data-wp-text` spiegeln reaktive Werte auf HTML-Attribute bzw. Textinhalt.

Die zentralen Direktiven auf einen Blick:

- **data-wp-context** – lokaler Zustand pro Element-Baum
- **data-wp-bind--[attr]** – reaktiver Wert → beliebiges HTML-Attribut
- **data-wp-on--[event]** – Event-Handler
- **data-wp-class--[klasse]** – reaktive CSS-Klasse
- **data-wp-text** – reaktiver Textinhalt
- **data-wp-show** – sichtbar/verborgen
- **data-wp-each** – Liste iterieren mit Template-Element
- **data-wp-router-region** – clientseitige Navigation innerhalb der Region

## Store: State, Actions und Derived Values

Der JavaScript-Teil ist absichtlich minimal gehalten. Der `store()`-Aufruf aus `@wordpress/interactivity` definiert globalen Zustand, Actions und berechnete Werte:

```js
import { store, getContext } from '@wordpress/interactivity';

store('mein-plugin', {
  state: {
    gesamtKlicks: 0,
    get klickText() {
      const { state } = store('mein-plugin');
      return `${state.gesamtKlicks} Klick${state.gesamtKlicks !== 1 ? 's' : ''}`;
    },
  },
  actions: {
    toggle() {
      const context = getContext();
      context.offen = !context.offen;
      store('mein-plugin').state.gesamtKlicks++;
    },
  },
});
```

Getter im `state`-Objekt fungieren als derived state: Sie berechnen sich automatisch neu, wenn sich ihre Abhängigkeiten ändern. `getContext()` liefert den lokal gebundenen Kontext des gerade aktiven Elements – das ermöglicht ein und denselben Store für mehrere Block-Instanzen auf einer Seite, ohne dass sich die Zustände gegenseitig beeinflussen.

## Serverseitiger State aus PHP

Das vielleicht mächtigste Feature der API: initialer Zustand lässt sich direkt aus PHP einbetten, ohne einen separaten JavaScript-Request.

```php
function mein_plugin_render_callback( $attributes ) {
    $produkte = get_posts([
        'post_type'   => 'produkt',
        'numberposts' => -1,
        'orderby'     => 'title',
        'order'       => 'ASC',
    ]);

    wp_interactivity_state('mein-plugin', [
        'produkte'      => array_map(fn($p) => [
            'id'        => $p->ID,
            'titel'     => $p->post_title,
            'kategorie' => get_post_meta($p->ID, 'kategorie', true),
        ], $produkte),
        'aktiverFilter' => 'alle',
    ]);

    ob_start();
    ?>
    <div
        data-wp-interactive="mein-plugin"
        <?php echo wp_interactivity_data_wp_context(['laedt' => false]); ?>
    >
        <!-- Filter-Buttons und Produkt-Liste hier -->
    </div>
    <?php
    return ob_get_clean();
}
```

`wp_interactivity_state()` serialisiert den Zustand sicher als Inline-Script ins HTML-Dokument. Der Browser-Store hat diesen Zustand beim ersten Paint sofort verfügbar – keine Ladezeit, kein Flackern, kein zusätzlicher API-Endpunkt notwendig.

## block.json korrekt konfigurieren

Damit die Interaktivitäts-API greift, braucht `block.json` zwei Einträge, die oft verwechselt werden:

```json
{
  "name": "mein-plugin/produkt-filter",
  "apiVersion": 3,
  "supports": {
    "interactivity": true
  },
  "viewScriptModule": "file:./view.js",
  "render": "file:./render.php"
}
```

`viewScriptModule` (nicht `viewScript`) lädt das JavaScript als ES-Modul – das ist für die Interaktivitäts-API Voraussetzung, weil `@wordpress/interactivity` kein klassisches Script, sondern ein Modul ist. Wer hier `viewScript` statt `viewScriptModule` verwendet, bekommt keine Fehlermeldung, aber die Direktiven bleiben wirkungslos.

Der Hinweis auf die [Interactivity API Reference im Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/) ist für diesen Schritt unentbehrlich – die Dokumentation ist inzwischen sehr vollständig.

## Wann die API die richtige Wahl ist – und wann nicht

Die Interaktivitäts-API eignet sich hervorragend für:

- **Toggle-Elemente** – FAQs, Akkordeons, Modal-Dialoge
- **Filterbare Listen** – Produkte, Posts, Portfolio-Einträge mit clientseitiger Filterung
- **Formulare mit Sofortfeedback** – Zeichenzähler, Inline-Validierungsmeldungen
- **Like-/Bookmark-Buttons** – kleines interaktives UI ohne Seitenreload
- **Lazy-Loaded Sections** – „Mehr laden"-Buttons mit `fetch()` und reaktiver Listenerweiterung
- **Tab-Navigation** – umschaltbare Inhalts-Tabs ohne Seitenreload

Sie ist **nicht** die richtige Wahl für:

- **Komplexe SPA-Teile** – mehrstufige Formulare mit verzweigter Logik, Zustandsgraphen mit vielen Abhängigkeiten
- **Echtzeit-Funktionen** – Chat, kollaborative Bearbeitung, Benachrichtigungen per WebSocket
- **Schwere Daten-Transformationen im Client** – Filter- und Sortieroperationen auf großen Datensätzen

Die entscheidende Faustregel: Wenn sich die Interaktivität eines Blocks durch einfache Zustandsänderungen in flachen Objekten beschreiben lässt, spart die Interaktivitäts-API eine React-Abhängigkeit, einen Build-Step und deutlich Bytes im ausgelieferten JavaScript. Für komplexe Fälle bleibt ein dedizierter React-Block die sinnvollere Wahl.

## Migration bestehender Toggle-Blöcke

Wer einfache React-Blöcke – etwa einen Akkordeon-Block mit `useState` – auf die Interaktivitäts-API migrieren möchte, kommt meist mit folgenden Schritten aus:

1. `edit.js` bleibt unverändert (der Editor-Part nutzt weiterhin React)
2. `save.js` oder `render.php` bekommt die `data-wp-`-Direktiven
3. `view.js` ersetzt alle `useState`-Logik durch `store()` und `getContext()`
4. `block.json` erhält `viewScriptModule` statt `viewScript` und `"interactivity": true` in `supports`

Der [Quick Start Guide auf developer.wordpress.org](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-quick-start-guide/) führt durch ein vollständiges Beispiel in unter 30 Minuten.

## Ausblick: WordPress 7.1 und der Router-Modus

Mit WordPress 7.1, das am 19. August 2026 erwartet wird, erhält die Interaktivitäts-API mehrere Verbesserungen. Besonders relevant: Der Router-Modus – aktivierbar über `data-wp-router-region` – soll stabilere clientseitige Seitenübergänge ermöglichen, bei denen nur der markierte Bereich per Fetch aktualisiert wird, ohne einen vollständigen Seitenreload auszulösen. Das ist die Voraussetzung für echtes Multi-Page-Application-Verhalten auf WordPress-Seiten ohne dediziertes JavaScript-Framework.

Das Core-Team verfolgt damit einen klaren Kurs: Gutenberg und der Block-Editor bleiben React-basiert; für die Frontend-Seite von WordPress-Sites soll die Interaktivitäts-API schrittweise die bevorzugte Lösung werden – leicht, serverseitig integriert, framework-unabhängig.

## Fazit

Die WordPress Interaktivitäts-API ist für viele Anwendungsfälle heute die sauberere Wahl als ein vollständiger React-Block. Sie erfordert weniger JavaScript, weniger Build-Konfiguration und weniger externe Abhängigkeiten – und produziert dafür Markup, das serverseitig vollständig gerendert ist und im Browser reaktiv wird.

Ob Akkordeon, Produktfilter oder interaktives Formular: Wenn Sie gerade einen neuen Block planen oder einen bestehenden React-Block vereinfachen möchten, lohnt es sich, die Interaktivitäts-API zuerst zu evaluieren. Frankfurt Marketing Studio unterstützt Sie bei der Architekturentscheidung, der Block-Entwicklung und der Migration bestehender Plugins.

## Quellen

- [WordPress 6.5 Interactivity API – make.wordpress.org](https://make.wordpress.org/core/2024/02/19/merge-proposal-interactivity-api/) — r/wordpress
- [Interactivity API Reference – Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/) — r/wordpress
- [WordPress 7.1 Beta 1 – make.wordpress.org](https://make.wordpress.org/core/2026/07/01/wordpress-7-1-beta-1/) — r/wordpress

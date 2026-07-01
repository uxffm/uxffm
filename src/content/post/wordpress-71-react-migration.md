---
publishDate: 2026-07-01T00:00:00Z
title: "React-19-Migration für WordPress 7.1: Checkliste für Entwickler und Betreiber"
excerpt: "WordPress 7.1 erscheint am 19. August mit React 19 als Standard. Was Entwickler und Site-Betreiber jetzt konkret tun müssen, um den Übergang ohne Ausfälle zu meistern."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-71-react-migration
---

Am 19. August 2026 erscheint WordPress 7.1 – und mit ihm wird React 19 offiziell zur Standardbasis des Gutenberg-Block-Editors. Nach dem kurzen, aber lehrreichen Chaos Anfang Juni, als das React-19-Upgrade in Gutenberg 23.3.0 innerhalb von zwei Tagen zurückgenommen werden musste, hat das Core-Team mit dem Feature-Flag-Ansatz in Gutenberg 23.4 den richtigen Weg eingeschlagen. Sieben Wochen bleiben bis zum Release – mehr als genug Zeit, um sich jetzt systematisch vorzubereiten. Dieses Mal sollte niemand unvorbereitet erwischt werden.

## Warum React 19 in WordPress eine echte Herausforderung ist

Das WordPress-Ökosystem unterscheidet sich grundlegend von einem typischen JavaScript-Projekt. Mehr als 60.000 Plugins im offiziellen Verzeichnis, unzählige kommerzielle Themes und Block-Erweiterungen – all diese Produkte integrieren sich auf sehr unterschiedliche Weise in den Gutenberg-Editor. Das Problem beim Juni-Incident war kein Bug in React 19 selbst, sondern ein weit verbreitetes Architekturmuster: Plugin-Entwickler hatten ihre eigene Kopie von `react` und `react/jsx-runtime` in ihre Build-Bundles eingebettet, anstatt auf das von WordPress bereitgestellte `@wordpress/element` zu verweisen.

Solange Gutenberg React 18 nutzte, funktionierten beide Versionen nebeneinander. Mit React 19 änderte sich das: Der neue JSX-Transform ist nicht abwärtskompatibel mit dem alten. Die Folge waren leere Screens und JavaScript-Fehler im Admin-Bereich bei allen betroffenen Sites. Das Core-Team zog das Upgrade innerhalb von 48 Stunden zurück – aber die eigentliche Ursache bleibt bestehen, bis jedes betroffene Plugin korrigiert ist.

## Checkliste für Plugin- und Theme-Entwickler

Wenn Sie eigene WordPress-Plugins entwickeln oder Themes mit Block-Editor-Integration pflegen, sind jetzt folgende Schritte nötig:

**1. Alle direkten React-Imports ersetzen**

Durchsuchen Sie Ihre Codebase nach direkten Imports aus `react`, `react-dom` oder `react/jsx-runtime`. Diese müssen durch Imports aus `@wordpress/element` ersetzt werden:

```js
// Problematisch: direkter React-Import
import { useState, useCallback } from 'react';

// Korrekt: WordPress-kanonische API
import { useState, useCallback } from '@wordpress/element';
```

`@wordpress/element` exportiert alle React-Hooks und -Primitives für die Gutenberg-Entwicklung – und zeigt stets auf die von WordPress gelieferte React-Version, unabhängig davon, welche React-Version intern eingesetzt wird.

**2. Build-Konfiguration bereinigen**

Stellen Sie sicher, dass `react`, `react-dom` und `react/jsx-runtime` in Ihrer webpack-Konfiguration als Externals deklariert sind und damit nicht ins Bundle gebaut werden:

```js
// webpack.config.js
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react/jsx-runtime': 'ReactJSXRuntime',
  },
};
```

Bei Projekten, die `@wordpress/scripts` in der aktuellen Version verwenden, ist das über die Standard-Konfiguration bereits abgedeckt. Ältere Projekte oder solche mit individuellen webpack-Setups müssen das explizit prüfen und nachrüsten.

**3. Abhängigkeiten in package.json prüfen**

Führen Sie `npm ls react` im Plugin-Verzeichnis aus. Taucht `react` als direkte Dependency – nicht nur als `devDependency` – auf, ist das ein Alarmsignal. React sollte als `peerDependency` gelistet oder vollständig entfernt werden, wenn ausschließlich `@wordpress/element` verwendet wird.

**4. Mit dem Gutenberg-Experimentalflag testen**

Gutenberg 23.4 enthält einen experimentellen React-19-Modus. Aktivieren Sie diesen in einer Staging-Umgebung über *Gutenberg → Experimente → React 19 Runtime verwenden* und testen Sie Ihr Plugin unter realen Bedingungen.

Achten Sie beim Testen besonders auf:
- JavaScript-Fehler in der Browser-Konsole
- Korrekte Darstellung Ihrer Blocks im Editor und im Frontend
- Funktionsfähigkeit von Formularen, Datenabfragen und Zustandsverwaltung in Block-Erweiterungen
- Korrekte Funktion von Sidebar-Panels und Modal-Dialogen

Das [offizielle React-19-Upgrade-Dokument auf make.wordpress.org](https://make.wordpress.org/core/2026/05/27/react-19-upgrade-in-wordpress/) listet alle Breaking Changes im Detail auf und enthält Codebeispiele für die häufigsten Migrationsfälle.

## Checkliste für Site-Betreiber

Wenn Sie WordPress-Seiten betreiben, ohne eigene Plugins zu entwickeln, liegt Ihr Hauptrisiko im Einsatz von Drittanbieter-Plugins, die noch nicht für React 19 vorbereitet sind.

**1. Plugin-Status prüfen**

Kontrollieren Sie für alle installierten Plugins, ob seit dem Juni-Incident ein Update erschienen ist, das ausdrücklich Kompatibilität mit WordPress 7.1 und React 19 erwähnt. Als Orientierung: Plugins, die seit mehr als zwölf Monaten kein Update erhalten haben und eigene Blocks oder Editor-Erweiterungen registrieren, sind potenziell gefährdet.

**2. Staging-Test durchführen**

Erstellen Sie eine vollständige Kopie Ihrer Site in einer Staging-Umgebung – die meisten Managed-WordPress-Hoster wie Kinsta, WP Engine oder Raidboxes bieten dafür One-Click-Staging an. Aktualisieren Sie dort Gutenberg auf Version 23.4, aktivieren Sie den React-19-Experimentalmodus und prüfen Sie alle kritischen Seiten und Admin-Bereiche.

**3. Automatische Major-Updates temporär deaktivieren**

Falls Sie automatische Kern-Updates aktiviert haben und noch unsicher über Ihre Plugin-Kompatibilität sind, deaktivieren Sie das automatische Major-Update vorerst. Warten Sie, bis Sie die Staging-Tests abgeschlossen haben, und aktualisieren Sie dann manuell auf WordPress 7.1 – mit dem Wissen, dass Ihre Installation kompatibel ist.

## Warum das Zeitfenster jetzt ideal ist

Sieben Wochen bis zum 19. August klingen komfortabel – die Praxis zeigt jedoch, dass viele Plugin-Entwickler Updates erst wenige Tage vor einem Major Release veröffentlichen. Wer jetzt testet, hat klare Vorteile:

- Genug Zeit, um Bugs zu melden und auf Korrekturen zu warten
- Direkten Kontakt zu Entwicklern, die noch auf Feedback reagieren können
- Keine Hektik unmittelbar vor oder nach dem Release

Besonders für Unternehmen, die ihre WordPress-Site aktiv für Akquise und Kundenkommunikation nutzen, ist ein reibungsloser Übergang kein Nice-to-have, sondern eine betriebliche Notwendigkeit. Eine Site, die nach einem Update ausfällt oder fehlerhafte Darstellungen zeigt, kostet Vertrauen und Conversions.

## Was passiert, wenn Sie jetzt nichts tun

Das Core-Team wird WordPress 7.1 am 19. August veröffentlichen – mit React 19 als festem Bestandteil, ohne Feature-Flag. Sites, die automatische Updates aktiviert haben und inkompatible Plugins einsetzen, werden nach dem Update Probleme im Admin-Bereich erleben. Das Zeitfenster zur Reaktion ist kurz: Der Support-Druck auf Plugin-Anbieter wird nach dem Release sprunghaft ansteigen, und Hotfixes lassen unter Umständen Tage auf sich warten.

Die Alternative ist, jetzt in sieben Wochen zu investieren – nicht sieben Tage nach dem Release.

## Fazit

React 19 kommt mit WordPress 7.1, und das ist gut so: Das Upgrade bringt echte Performance-Verbesserungen und moderne APIs für zukünftige Gutenberg-Features. Der Juni-Incident war ein Weckruf, keine strukturelle Absage an das Upgrade. Das Core-Team hat mit dem Gutenberg-23.4-Flag die richtige Infrastruktur für einen geordneten Übergang geschaffen – jetzt liegt es an Entwicklern und Betreibern, diese Gelegenheit zu nutzen.

Wenn Sie Unterstützung beim Plugin-Audit, bei der Staging-Einrichtung oder bei der Vorbereitung Ihrer Website auf WordPress 7.1 benötigen, helfen Ihnen die [WordPress-Experten aus Frankfurt](/) von Frankfurt Marketing Studio gerne weiter.

## Quellen

- [Preparing for React 19 in WordPress 7.1 – what's your migration plan?](https://www.reddit.com/r/Wordpress/comments/1lhk4x2/preparing_for_react_19_in_wordpress_71/) — r/wordpress
- [Plugin compatibility with Gutenberg 23.4 React 19 flag – share your results](https://www.reddit.com/r/Wordpress/comments/1ljm8v3/plugin_compatibility_gutenberg_234_react19_flag/) — r/wordpress
- [React 19 Upgrade in WordPress – Make WordPress Core](https://make.wordpress.org/core/2026/05/27/react-19-upgrade-in-wordpress/) — r/wordpress

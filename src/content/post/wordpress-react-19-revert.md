---
publishDate: 2026-06-26T00:00:00Z
title: "React 19 in WordPress: Warum das Upgrade zurückgezogen wurde – und was jetzt kommt"
excerpt: "Gutenberg 23.3 brachte React 19 – und brach dabei Dutzende Plugins. Was genau schiefging, welche Sites betroffen waren und wie der Plan für WordPress 7.1 aussieht."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-react-19-revert
---

Am 3. Juni 2026 veröffentlichte das WordPress Core-Team Gutenberg 23.3.0 – und löste damit ungewollt ein kurzes, aber intensives Chaos in der Community aus. Der Grund: Der lange geplante Wechsel von React 18 auf React 19 wurde in dieser Version erstmals live geschaltet. Zwei Tage später, am 5. Juni, war das Upgrade bereits wieder zurückgezogen. Was war passiert?

Die Diskussionen auf r/wordpress überschlugen sich: Plugin-Entwickler meldeten, dass ihre Erweiterungen im WordPress-Admin plötzlich abstürzten. Seiten mit bestimmten Block-Editor-Plugins zeigten leere Screens oder JavaScript-Fehler in der Konsole. Das Core-Team reagierte schnell und veröffentlichte Gutenberg 23.3.2 mit der Rücknahme des Upgrades. Aber die Frage blieb: Warum hat das niemand vorher bemerkt?

## Was React 19 mit WordPress zu tun hat

Gutenberg, der Block-Editor von WordPress, ist eine React-Anwendung. Mit jeder neuen Version von React kommen Performance-Verbesserungen, neue APIs und – manchmal – Breaking Changes. React 19, im Frühjahr 2025 veröffentlicht, brachte unter anderem eine modernisierte JSX-Transform, neue Hooks für asynchrone Übergänge und verbesserte Fehlerbehandlung im Renderer.

Für die meisten JavaScript-Projekte ist ein solches Upgrade routine. WordPress ist jedoch kein normales Projekt: Über 60.000 Plugins im offiziellen Verzeichnis und Tausende kommerzielle Erweiterungen binden sich tief in den Block-Editor ein – und viele davon haben in den vergangenen Jahren eigene Abhängigkeiten auf eine Weise gebündelt, die jetzt zum Problem wurde.

## Der eigentliche Fehler: gebündelte React-Runtimes

Das technische Kernproblem war kein Bug in React 19 selbst, sondern ein Architekturmuster, das in der WordPress-Plugin-Entwicklung leider weit verbreitet ist: Viele Plugin-Entwickler haben ihre eigene Kopie von `react` und `react/jsx-runtime` in ihr Build-Bundle eingeschlossen, statt auf das von WordPress bereitgestellte `@wordpress/element` zu verweisen.

Solange Gutenberg React 18 nutzte, funktionierten beide Versionen nebeneinander – die gebündelte React-18-Instanz im Plugin und die globale React-18-Instanz in WordPress kollidierten nicht, weil sie denselben JSX-Transform verwendeten.

Mit React 19 änderte sich das. Der neue JSX-Transform ist nicht abwärtskompatibel mit dem alten. Wenn Gutenberg nun React 19 lädt, aber ein Plugin weiterhin den React-18-kompatiblen JSX-Runtime erwartet, entstehen Laufzeitfehler: Components geben `undefined` zurück, der Renderer wirft Exceptions, der Block-Editor lädt nicht mehr vollständig.

Genau das passierte auf betroffenen Sites zwischen dem 3. und 5. Juni. Sites, auf denen Plugins mit gebündelter React-Dependency installiert waren, zeigten nach dem automatischen Gutenberg-Update sofort Fehler im Admin-Bereich.

## Warum das automatische Testing die Probleme nicht abfing

Das Core-Team hatte vor dem Release in Gutenberg 23.3.0 keine vollständige Kompatibilitätsmatrix aller öffentlichen Plugins gegen React 19 geprüft. Das ist bei mehr als 60.000 Plugins schlicht nicht machbar. Die Community-Beta-Tests hatten einen Schwerpunkt auf den Core-Editor-Funktionen gelegt, nicht auf Drittanbieter-Plugins mit nicht-standardkonformen Build-Setups.

Die Lektion ist klar: React-Version-Bumps in einem Ecosystem dieser Größe erfordern einen anderen Ansatz als in isolierten Anwendungen.

## Gutenberg 23.4: Der neue Plan mit Feature Flag

Am 17. Juni 2026 erschien Gutenberg 23.4 – und brachte den geordneteren Weg vor. Statt React 19 direkt zu aktivieren, führt diese Version ein experimentelles Feature-Flag ein: Entwickler können in den Gutenberg-Experimentaleinstellungen den React-19-Runtime-Modus aktivieren und dann testen, ob ihre eigenen Plugins und Themes problemlos funktionieren.

Das ist der deutlich sicherere Weg: Plugin-Entwickler bekommen mehrere Wochen Zeit, ihre Builds zu testen und anzupassen, bevor das Upgrade zum Standard wird. Das Core-Team sammelt in dieser Zeit Kompatibilitätsberichte und kann gezielt nachjustieren.

Parallel dazu hat das Team einen [offiziellen Kompatibilitätsleitfaden auf make.wordpress.org](https://make.wordpress.org/core/2026/05/27/react-19-upgrade-in-wordpress/) veröffentlicht, der erklärt, welche Änderungen notwendig sind.

## Was Plugin-Entwickler jetzt tun müssen

Wenn Sie eigene WordPress-Plugins oder Themes mit Block-Editor-Integration entwickeln, sind jetzt zwei Maßnahmen empfehlenswert:

**1. @wordpress/element als einzige React-Oberfläche verwenden**

Ersetzen Sie alle direkten Imports von `react`, `react-dom` und `react/jsx-runtime` durch Importe aus `@wordpress/element`. Dieses Paket stellt React so bereit, wie WordPress es erwartet – und wird mit jeder WordPress-Version auf die jeweils richtige React-Version zeigen.

```js
// Falsch: Direkte React-Imports
import { useState, useEffect } from 'react';

// Richtig: WordPress-kanonische Oberfläche
import { useState, useEffect } from '@wordpress/element';
```

**2. Build-Konfiguration anpassen: React als External deklarieren**

In webpack oder @wordpress/scripts müssen `react`, `react-dom` und `react/jsx-runtime` als Externals deklariert werden, damit sie nicht ins Bundle eingebaut werden:

```js
// webpack.config.js
externals: {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'ReactJSXRuntime',
}
```

Mit der aktuellen `@wordpress/scripts`-Version (auf Basis von webpack 5) ist das durch die Standard-Konfiguration größtenteils bereits abgedeckt – aber ältere oder individuell konfigurierte Build-Setups müssen manuell geprüft werden.

**3. Testen mit dem Gutenberg-23.4-Experimentalflag**

Aktivieren Sie in Gutenberg die experimentelle React-19-Option und testen Sie Ihre Erweiterungen in einer Staging-Umgebung, bevor WordPress 7.1 das Upgrade fest einführt.

## Was Site-Betreiber wissen müssen

Als Site-Betreiber – ohne eigene Plugin-Entwicklung – war das Zeitfenster des Problems kurz: Nur wer zwischen dem 3. und 5. Juni Gutenberg manuell oder über automatisches Update auf 23.3.0 aktualisiert hatte und bestimmte inkompatible Plugins im Einsatz hatte, war betroffen. Mit Gutenberg 23.3.2 oder höher ist die Site wieder stabil.

Für die Zukunft gilt: Mit WordPress 7.1 (geplant für den 19. August 2026) wird React 19 zur offiziellen Basis. Das bedeutet: Wenn Sie Plugins einsetzen, die länger nicht aktualisiert wurden, lohnt sich jetzt ein Check – entweder beim Anbieter nachfragen oder in einer Staging-Umgebung testen.

Eine verlässliche Faustregel: Plugins, die seit mehr als einem Jahr kein Update erhalten haben und tief in den Block-Editor eingreifen, sollten Sie jetzt ohnehin evaluieren, unabhängig vom React-Thema.

## Fazit: Das richtige Vorgehen hat etwas gedauert – ist aber jetzt besser

Das React-19-Debakel von Anfang Juni ist letztlich ein klassisches Ecosystem-Skalierungsproblem. Das Upgrade selbst ist technisch sinnvoll, und das Core-Team hat mit dem Feature-Flag-Ansatz in Gutenberg 23.4 die richtige Konsequenz gezogen. Für WordPress 7.1 sind die Voraussetzungen damit deutlich besser als beim ersten Versuch.

Wenn Sie unsicher sind, ob Ihre WordPress-Site von den React-19-Änderungen betroffen sein könnte – ob als Plugin-Entwickler oder als Betreiber einer komplexen Block-Editor-Installation –, helfen die [WordPress Spezialisten Frankfurt](/) von Frankfurt Marketing Studio bei der Kompatibilitätsprüfung, dem Build-Audit und der Teststrategie weiter.

## Quellen

- [React 19 upgrade temporarily reverted in Gutenberg](https://make.wordpress.org/core/2026/06/05/react-19-upgrade-temporarily-reverted-in-gutenberg/) — r/wordpress
- [React 19 Upgrade in WordPress – Make WordPress Core](https://make.wordpress.org/core/2026/05/27/react-19-upgrade-in-wordpress/) — r/wordpress
- [What's new in Gutenberg 23.4? (June 17, 2026)](https://make.wordpress.org/core/2026/06/17/whats-new-in-gutenberg-23-3-03-jun-2/) — r/wordpress

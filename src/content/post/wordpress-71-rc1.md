---
publishDate: 2026-08-06T00:00:00Z
title: "WordPress 7.1 RC1 ist da: Was das Field Guide jetzt erfordert"
excerpt: "WordPress 7.1 Release Candidate 1 und das offizielle Field Guide sind erschienen. 13 Tage bis zum Release – hier sind die Änderungen, die Sie noch nicht kennen."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-71-rc1
---

Am 5. August 2026 hat das WordPress-Core-Team gleich zwei wichtige Dokumente veröffentlicht: den [Release Candidate 1 von WordPress 7.1](https://wordpress.org/news/2026/08/wordpress-7-1-release-candidate-1/) und das offizielle [WordPress 7.1 Field Guide](https://make.wordpress.org/core/2026/08/05/wordpress-7-1-field-guide/). Für Website-Betreiber, Agenturen und Plugin-Entwickler bedeutet das: Die Uhr tickt. Genau 13 Tage bleiben noch bis zum finalen Release am 19. August – pünktlich zum WordCamp US in Phoenix. Der RC1 enthält über 145 Korrekturen und Verbesserungen seit Beta 4, davon 57 im Editor und 88 im Core-Kern. Es ist die letzte Möglichkeit, Feedback an Plugin-Autoren zu geben und eigene Kompatibilitätstests abzuschließen.

Dieser Artikel fasst zusammen, welche Änderungen im Field Guide stecken, die in der bisherigen Beta-Berichterstattung zu kurz gekommen sind – und was konkret jetzt zu tun ist.

## Das WordPress 7.1 Field Guide: Mehr als eine Zusammenfassung

Das Field Guide ist das offizielle Referenzdokument für Entwicklerinnen und Entwickler, das zum Start des Release Candidate erscheint. Es bündelt alle Dev Notes – die technischen Ankündigungen aus den Make WordPress Core Blogs – in einem einzigen, verlinkten Überblick. Wer bisher einzelne Beta-Ankündigungen verfolgt hat, findet dort die Vollständigkeit: über 310 Core-Trac-Tickets, mehr als 100 Verbesserungen und Feature Requests sowie über 180 Bug Fixes sind in WordPress 7.1 enthalten.

Besonders interessant sind einige Änderungen, die in der öffentlichen Diskussion bisher wenig Aufmerksamkeit erhalten haben, obwohl sie erhebliche praktische Auswirkungen haben.

## Spekulative Vorabrenderung: Der unterschätzte Performance-Gewinn

Einer der stillen Stars von WordPress 7.1 ist die Änderung beim Speculative Loading. Dieses Feature – eingeführt als experimentelles Plugin und seit WordPress 6.9 im Core – lädt Seiten im Hintergrund vor, sobald ein Besucher mit der Maus über einen Link fährt. Wenn er tatsächlich klickt, ist die Seite bereits gerendert und erscheint quasi sofort.

In WordPress 7.1 ändert sich der Standardmodus: Sobald auf einer Website Seiten- und Objekt-Caching aktiv ist, schaltet WordPress Speculative Loading automatisch von `conservative` auf `moderate` um. Der conservative-Modus renderte bisher nur Links vor, die im sichtbaren Viewport lagen. Der moderate-Modus geht weiter: Er berücksichtigt auch Links, die beim Hovern bereits im DOM, aber noch außerhalb des Bildschirms liegen.

Für Websites mit aktivem Caching – und das sind die meisten professionell betriebenen WordPress-Installationen – bedeutet das eine spürbar schnellere wahrgenommene Navigation, ohne dass etwas konfiguriert werden müsste. Die Änderung ist vollständig automatisch.

Wichtig zu wissen: Das Speculative Loading kann über eine Konstante in der `wp-config.php` oder via Umgebungsvariable konfiguriert werden. Wer bestimmte Seitentypen (etwa Login-Seiten oder WooCommerce-Checkout-Seiten) vom Vorab-Rendering ausschließen möchte, kann das über den `wp_speculation_rules` Filter steuern.

## Die Icons-API: Schluss mit dem Icon-Chaos in Plugins

Eine der am meisten diskutierten technischen Neuerungen im Field Guide ist die [neue SVG Icons API](https://make.wordpress.org/core/2026/08/03/iframed-editor-changes-in-wordpress-7-1/). Bisher war der Umgang mit Icons in WordPress-Plugins und -Themes eine Wildnis: Jedes Plugin brachte seine eigene Icon-Bibliothek mit, ob als Inline-SVG, als Font-Icons oder als externe Sprites. Das führte zu doppelten Lasten, stilistischen Inkonsistenzen und gelegentlichen Konflikten zwischen Bibliotheken.

Ab WordPress 7.1 gibt es eine standardisierte PHP-API, über die Icons zentral registriert und abgerufen werden können. Plugin-Autoren registrieren ihre Icon-Collections einmalig – vergleichbar mit der Registrierung von Custom Post Types – und können diese dann konsistent im Admin, im Block Editor und auf dem Frontend nutzen. Der Core selbst stellt die bekannten Dashicons weiterhin bereit, nun aber über dieselbe einheitliche API.

Die Breaking-Change-Warnung gilt für Plugins, die intern das inoffizielle `@wordpress/icons`-Paket auf bestimmte Icon-IDs referenzieren: Die Icon-Registry wurde in Gutenberg 23.x restrukturiert (sogenannte v15-Änderung). Wer hartkodierte Icon-Namen verwendet hat, kann nach dem Update auf leere Icon-Platzhalter stoßen. Die Lösung ist ein Update auf die neue Icons-API mit offiziellen Registry-Schlüsseln.

## Navigation-Block: Das Typografie-Problem ist endlich behoben

Ein ärgerlicher visueller Bug, der seit Monaten in der Community diskutiert wurde, findet in WordPress 7.1 sein Ende. Bisher propagierte der Navigation-Block seine `font-size`-Einstellungen zwanghaft auf alle untergeordneten Blocks: `core/navigation-link`, `core/navigation-submenu`, `core/page-list` und `core/home-link`. Das führte dazu, dass einzelne Menüpunkte, denen im Editor eine abweichende Schriftgröße gegeben wurde, auf dem Frontend trotzdem die Eltern-Einstellung übernahmen – Editor und Frontend zeigten unterschiedliche Ergebnisse.

Ab WordPress 7.1 verlässt sich der Navigation-Block auf die Standard-CSS-Textvererbung. Die explizite Weitergabe der `font-size` an Kind-Blöcke entfällt. Das klingt wie eine kleine technische Korrektur – hat aber einen praktischen Effekt: Websites, die bisher workarounds über Custom CSS nutzen mussten, um Navigation-Typografie korrekt anzuzeigen, können diese Workarounds nach dem Update entfernen. Es lohnt sich, die Navigation-Styles nach dem Upgrade zu prüfen und veraltete CSS-Overrides zu bereinigen.

## Block Bindings API: Dynamische Inhalte in verschachtelten Blöcken

Seit WordPress 6.7 können Block-Attribute über die Block Bindings API an dynamische Datenquellen gebunden werden – ein leistungsfähiges Werkzeug für Entwicklerinnen, die wiederverwendbare Block-Muster mit variablen Inhalten brauchen. WordPress 7.1 erweitert die API erheblich: Bindings funktionieren jetzt auch in Listen-Elementen (`core/list-item`) und in verschachtelten Blöcken, die als Teil von Inner Blocks aufgerufen werden.

Konkret bedeutet das: Eine Block-Sammlung, die Einträge aus einem Custom Post Type oder einem externen Datenfeed anzeigt, kann ihre verschachtelten Elemente jetzt direkt und deklarativ binden, ohne JavaScript-Sonderlösungen. Das ist besonders relevant für Agenturen, die Template-Parts und Block Patterns für Kunden bauen – es vereinfacht die Pflege dynamischer Inhaltsbereiche erheblich.

## Was Plugin- und Theme-Autoren jetzt tun müssen

Der Release Candidate 1 ist der letzte offizielle Testpunkt vor dem finalen Release. Für Plugin- und Theme-Autoren bedeutet das konkret:

**Tested up to auf 7.1 setzen.** Wer die Kompatibilität mit WordPress 7.1 bestätigen kann, sollte die `Tested up to`-Version in der `readme.txt` sofort auf `7.1` aktualisieren. Das gibt Nutzern und Hosting-Providern Sicherheit.

**Die Icons-API prüfen.** Falls das eigene Plugin oder Theme interne Icon-Referenzen aus `@wordpress/icons` nutzt, die der v15-Umbenennung zum Opfer gefallen sind, ist jetzt der Moment für das Update auf die neue Registry.

**Navigation-Block-Styling überprüfen.** Themes mit eigenem Navigation-Styling sollten prüfen, ob sie `font-size`-Propagation über CSS-Overrides kompensiert hatten. Diese Workarounds können jetzt entfernt werden – sollten aber nicht versehentlich das neue Verhalten brechen.

**Speculative Loading testen.** Wer Seiten betreibt, die nicht vorgerendert werden sollten (Login, Checkout, persönliche Dashboards), sollte prüfen, ob der `wp_speculation_rules` Filter korrekt greift. Das gilt besonders für Membership- und E-Commerce-Websites.

## Was Website-Betreiber in den nächsten 13 Tagen tun sollten

Für Website-Betreiber ohne tiefes technisches Hintergrundwissen ist die Empfehlung klar und unverändert gegenüber den bisherigen Beta-Artikeln: Spielen Sie WordPress 7.1 am Release-Tag nicht sofort auf Ihre Live-Website auf.

Der sinnvolle Ablauf sieht so aus:

1. **Staging-Umgebung auf RC1 updaten.** Viele Managed-Hosting-Anbieter bieten Ein-Klick-Staging an. Testen Sie dort alle kritischen Funktionen: Editor, Formulare, Warenkorb, Checkout, Navigation.

2. **Plugins auf Aktualisierungen prüfen.** Schauen Sie im WordPress-Plugin-Repository nach, ob Ihre eingesetzten Plugins bereits ein „Tested up to: 7.1"-Label tragen. Falls nicht, kontaktieren Sie den Hersteller oder warten Sie, bis das Update erscheint.

3. **Performance nach dem Update messen.** Wenn Speculative Loading auf `moderate` schaltet, können Metriken wie TTFB und wahrgenommene Navigation tatsächlich besser werden. Dokumentieren Sie die Ausgangswerte vor dem Update, um den Unterschied sehen zu können.

4. **Update erst nach dem WordCamp-Wochenende.** Der 19. August fällt auf ein Mittwoch innerhalb des WordCamp US. In den ersten Tagen nach einem Major Release erscheinen oft schnell Patches für unvorhergesehene Regressionsprobleme. Wer keine kritischen Gründe für ein sofortiges Update hat, wartet sinnvollerweise bis Ende August.

## Die 13 Tage bis zum Release – jetzt nutzen

WordPress 7.1 ist, gemessen an der Anzahl der enthaltenen Fixes und Features, eines der substanzreichsten Minor-Releases der letzten Jahre. Das Field Guide macht deutlich, wie viele Einzelteile sich verändert haben – von der Art, wie Icons verwaltet werden, bis hin zu subtilen CSS-Vererbungsregeln im Navigation-Block. Die meisten Änderungen sind Verbesserungen, aber jede Verbesserung kann auf Websites, die auf das alte Verhalten gebaut wurden, überraschende Auswirkungen haben.

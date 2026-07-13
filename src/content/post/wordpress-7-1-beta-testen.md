---
publishDate: 2026-07-13T00:00:00Z
title: "WordPress 7.1 Beta 1 ab 15. Juli: Das sollten Sie jetzt testen"
excerpt: "Beta 1 von WordPress 7.1 erscheint am 15. Juli. Wir zeigen, welche Features besonders getestet werden müssen und wie Sie sicher mitmachen – ohne Ihre Live-Website zu riskieren."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-7-1-beta-testen
---

Am 15. Juli 2026 erscheint Beta 1 von WordPress 7.1 – und damit beginnt offiziell die finale Testphase vor dem Release am 19. August. Das ist nicht nur eine interne Entwicklersache: Je mehr Websites und Plugins in dieser Phase getestet werden, desto stabiler wird das fertige Release. Wer jetzt testet, schützt nicht nur seine eigene Website, sondern hilft der gesamten WordPress-Community. In diesem Artikel erfahren Sie, was in 7.1 auf Sie zukommt, wie Sie sicher testen und worauf Sie besonders achten sollten.

## Was ist WordPress 7.1 – und wann kommt es?

WordPress 7.1 ist der direkte Nachfolger von WordPress 7.0 „Armstrong", das im Mai 2026 erschienen ist. Während 7.0 vor allem die KI-Grundinfrastruktur (AI Client, Connectors, Abilities API) und ein neues Admin-Design eingeführt hat, konzentriert sich 7.1 auf Verfeinerung und Ausbau: reaktionsfähige Block-Styles, Medien-Upgrades, eine neue KI-Guidelines-Funktion und weitere Stabilitätsverbesserungen.

Der offizielle Zeitplan sieht so aus:

- **15. Juli 2026:** Beta 1 – erste öffentliche Testversion
- **22. Juli 2026:** Beta 2
- **29. Juli 2026:** Beta 3
- **5. August 2026:** Release Candidate 1
- **12. August 2026:** Release Candidate 2
- **19. August 2026:** Finales Release (parallel zu WordCamp US in Portland)

Release-Leiterin ist Anne McCarthy (Architecture & Open Source Director bei Automattic), unterstützt von Benjamin Zekavica und Krupa Nanda als Release Coordinators.

## Die wichtigsten neuen Features im Überblick

### Responsive Block-Styles ohne CSS

Das ist eines der praktisch wichtigsten Features für alle, die WordPress ohne eigenes Entwicklerteam betreiben: Ab 7.1 können Sie Block-Stile direkt im Site Editor für verschiedene Bildschirmgrößen anpassen – Schriftgröße, Abstände, Farben, alles visuell, ohne eine Zeile CSS. Bisher musste man für responsive Anpassungen entweder ein Child-Theme befüllen oder auf einen Seitenbuilder zurückgreifen. Das entfällt künftig für die meisten Standardfälle.

Testen Sie dieses Feature mit einem Block-Theme: Passen Sie einen Paragraph-Block an, wechseln Sie in die Tablet- und Mobile-Vorschau, und prüfen Sie, ob Ihre Änderungen auf allen Breakpoints greifen und gespeichert bleiben.

### KI-Richtlinien (Guidelines) für redaktionellen Workflow

WordPress 7.1 führt eine neue Funktion namens **Guidelines** ein: Admins können im Backend redaktionelle Regeln, Markenstimme und inhaltliche Standards definieren. Alle KI-Funktionen – ob Textvorschläge, automatische Excerpts oder Alt-Text-Generierung – orientieren sich dann an diesen Richtlinien. Das klingt zunächst abstrakt, ist aber gerade für kleinere Teams wichtig: Wenn mehrere Redakteure und KI-Tools gemeinsam an Inhalten arbeiten, sorgt ein zentrales Regelwerk für Konsistenz.

Testen Sie: Legen Sie eine Richtlinie an (z.B. „Immer die Sie-Form verwenden, Tonalität professionell") und prüfen Sie, ob die KI-Vorschläge im Editor diese Vorgabe berücksichtigen.

### Neue Bildformate dank WebAssembly

WordPress 7.1 bringt eine neue Bildverarbeitungs-Pipeline auf Basis von [WebAssembly (VIPS)](https://libvips.github.io/libvips/), die bei Bedarf nachgeladen wird. Das Ergebnis: WordPress kann nativ mit modernen Bildformaten umgehen:

- **HEIF/HEIC** (iPhone-Fotos direkt hochladen)
- **JPEG XL** (bessere Komprimierung als WebP)
- **Ultra HDR** (für Displays mit hohem Dynamikumfang)
- **GIF-zu-Video-Konverter** (automatische Umwandlung animierter GIFs in effizientere Videodateien)

Testen Sie: Laden Sie ein HEIC-Bild direkt aus Ihrer Fotobibliothek hoch und prüfen Sie, ob WordPress es korrekt konvertiert und thumbnails erstellt.

### React 19 Upgrade im Block-Editor

Das ist primär eine Entwickler-relevante Änderung, hat aber auch Auswirkungen auf Plugins: WordPress 7.1 aktualisiert den Block-Editor von React 18 auf [React 19](https://react.dev/blog/2024/04/25/react-19). Für Site-Betreiber bedeutet das: Plugins, die eigene Gutenberg-Blöcke bereitstellen und noch nicht auf React 19 getestet sind, könnten Probleme zeigen. Prüfen Sie insbesondere Plugins mit eigenem Block-Editor-Interface.

Ebenfalls relevant: Der Classic Block (mit seinem TinyMCE-Dependency) wird in 7.1 als **deprecated** markiert. Er funktioniert noch, aber das Signal ist klar – wer noch auf den Classic Editor angewiesen ist, sollte jetzt planen, wie er auf Block-basierte Inhalte umsteigt.

### Verbesserte Notizen und Emoji-Reaktionen

Die Notes-Funktion aus WordPress 7.0 erhält ein Update: Asynchrones Feedback lässt sich jetzt mit Emoji-Reaktionen versehen, und der Suggestions Mode wird ausgebaut. Für redaktionelle Teams, die Inhalte gemeinsam bearbeiten, macht das den Workflow deutlich angenehmer – auch ohne Echtzeit-Kollaboration, die (Stand jetzt) weiterhin nicht für 7.1 bestätigt ist.

## Wie Sie sicher testen – ohne Ihre Live-Website zu gefährden

Beta-Versionen gehören nicht auf Produktivsysteme. Drei sichere Wege zum Testen:

**WordPress Playground (empfohlen für schnelle Tests):** Über [WordPress Playground](https://playground.wordpress.net/) können Sie eine vollständige WordPress-Instanz direkt im Browser starten – ohne Installation, ohne Server. Sobald Beta 1 erscheint, steht sie dort in wenigen Klicks zur Verfügung.

**Staging-Umgebung:** Die meisten Hoster bieten eine Ein-Klick-Staging-Funktion an, die Ihre Live-Website spiegelt. Spielen Sie das Beta-Update dort ein, bevor Sie es auf dem Produktivsystem testen.

**Lokale Entwicklungsumgebung:** Mit Tools wie [LocalWP](https://localwp.com/) oder DevKinsta können Sie WordPress lokal installieren und Beta-Updates risikofrei durchspielen.

## Was sollten Sie konkret dokumentieren?

Beim Beta-Testing geht es nicht nur darum, Features auszuprobieren – es geht darum, Bugs zu finden und zu melden. Prüfen Sie beim Testen:

- Funktionieren alle aktiven Plugins mit 7.1?
- Gibt es JavaScript-Fehler in der Browser-Konsole?
- Werden responsive Block-Styles korrekt gespeichert und gerendert?
- Funktioniert der HEIC-Upload korrekt auf Ihrem Server?
- Zeigt der Block-Editor nach dem React-19-Upgrade alle Blöcke wie erwartet an?

Bugs können direkt im [GitHub-Repository von Gutenberg](https://github.com/WordPress/gutenberg/issues) oder im offiziellen WordPress Trac gemeldet werden. Gute Bug-Reports enthalten immer: WordPress-Version, PHP-Version, aktive Plugins, Schritte zur Reproduktion und Screenshots.

## Warum sich Beta-Testing lohnt – auch für Nicht-Entwickler

Viele Website-Betreiber denken, Beta-Testing sei etwas für Entwickler. Das ist ein Irrtum. Gerade „normale" WordPress-Nutzer entdecken Probleme, die im Entwicklerumfeld nie auftauchen: ein Plugin für Buchungssysteme, eine spezifische Theme-Kombination, ein Edge Case beim Upload von bestimmten Bildformaten. Die Testinfrastruktur über WordPress Playground macht die Einstiegshürde inzwischen sehr niedrig.

Wer seine Website professionell betreiben möchte, sollte spätestens beim Release Candidate prüfen, ob alles reibungslos läuft – und nicht erst Wochen nach dem offiziellen Release feststellen, dass ein Plugin nicht mehr funktioniert.

## Jetzt vorbereiten, bevor Beta 1 erscheint

Bis zum 15. Juli haben Sie noch zwei Tage. Nutzen Sie die Zeit:

1. Machen Sie ein vollständiges Backup Ihrer Live-Website.
2. Richten Sie eine Staging-Umgebung ein, falls Sie noch keine haben.
3. Erstellen Sie eine Liste aller aktiven Plugins – prüfen Sie für jeden, wann er zuletzt aktualisiert wurde.
4. Notieren Sie PHP-Version und aktive Theme-Version.

Als [WordPress Agentur Frankfurt am Main](/) begleiten wir unsere Kunden durch Update-Zyklen wie diesen – von der Testumgebung über die Kompatibilitätsprüfung bis zum produktiven Rollout. Wenn Sie unsicher sind, ob Ihre Website für 7.1 bereit ist, sprechen Sie uns an.

## Quellen

- [WordPress 7.1 Release Party Schedule – Make WordPress Core](https://make.wordpress.org/core/2026/07/03/wordpress-7-1-release-party-schedule/) — WordPress.org
- [WordPress 7.1 Release Squad Announced](https://wp-content.co/wordpress-7-1-release-squad-announced-focus-areas-ai-collaboration-media-performance-and-more/) — r/wordpress
- [WordPress 7.1 to Be Released in August – Seravo](https://seravo.com/en/wordpress-7-1-to-be-released-in-august/) — r/wordpress

---
publishDate: 2026-08-08T00:00:00Z
title: "WordPress 7.1: Diese neuen Funktionen kommen am 19. August"
excerpt: "WordPress 7.1 erscheint am 19. August 2026 – und bringt interaktives Styling, responsive Steuerung direkt im Editor, drei neue Core-Blöcke und einen deutlich stärkeren KI-Layer. Was Sie jetzt wissen müssen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-71-neue-funktionen
---

WordPress 7.1 steht kurz vor dem Start: Am **19. August 2026** soll die nächste Minor-Version des beliebtesten CMS der Welt erscheinen. Nach dem großen KI-Launch mit WordPress 7.0 „Armstrong" im Mai konzentriert sich 7.1 auf das, was Nutzerinnen und Nutzer täglich spüren – den Editor, das Styling-System und die Medienverarbeitung. Gleichzeitig wird die KI-Infrastruktur aus dem Vorgänger ausgebaut. Ein kurzer Überblick, was auf Sie zukommt.

## Interaktive Zustände direkt im Editor gestalten

Das vielleicht meisterwartete Feature: WordPress 7.1 erlaubt es, Hover-, Fokus- und Aktiv-Zustände von Blöcken direkt im visuellen Editor zu definieren – ohne eine Zeile CSS zu schreiben. Konkret betroffen sind zunächst die **Button**- und **Navigation Link**-Blöcke. Sie wählen den gewünschten Zustand (`:hover`, `:focus`, `:focus-visible`, `:active`) aus einem Dropdown und stellen Farbe, Hintergrund oder Schriftgröße direkt ein.

Das klingt nach einer kleinen Änderung, ist aber in der Praxis eine erhebliche Vereinfachung: Bisher mussten Anpassungen wie ein Farbwechsel beim Überfahren eines Buttons zwingend über zusätzliches CSS oder ein Child-Theme gelöst werden. Für viele kleinere Projekte entfällt dieser Umweg nun vollständig.

## Responsive Styling ohne CSS – direkt aus dem Editor

Ähnlich grundlegend ist die neue responsive Steuerung. WordPress 7.1 bringt ein **Viewport-basiertes Styling** in den Editor: Sie können für jeden Block festlegen, wie er auf Tablet- oder Smartphone-Breiten aussehen soll – andere Schriftgröße, anderer Innenabstand, anderes Layout. Das funktioniert ohne Custom CSS und direkt in der Oberfläche, die Sie bereits kennen.

Für Entwicklerinnen und Entwickler gibt es eine ergänzende Neuerung: In `theme.json` lassen sich eigene Breakpoints definieren. Das bedeutet, dass Themes nicht mehr auf die eingebauten Standardbreiten angewiesen sind, sondern eigene Haltepunkte für ihr Design festlegen können.

Diese Funktion wird von einigen Kommentatoren als direkter Angriff auf Page-Builder wie Elementor oder Divi gesehen, die responsive Steuerung seit Jahren als Kernvorteil vermarkten. Ob WordPress das Segment wirklich übernimmt, bleibt abzuwarten – für einfache Sites ist der Editor-Ansatz aber inzwischen absolut konkurrenzfähig.

## Drei neue Core-Blöcke: Tabs, Playlist und Inhaltsverzeichnis

WordPress 7.1 nimmt drei neue Blöcke in den Core auf:

**Tabs-Block:** Ermöglicht tabbaren Inhalt direkt im Editor – vollständig mit anderen Blöcken als Inhalt. Wer bisher auf ein Plugin oder Shortcodes angewiesen war, kann künftig auf den nativen Block umsteigen. Von den drei neuen Blöcken gilt der Tabs-Block als der ausgereifteste.

**Playlist-Block:** Ein Mediaplayer-Block mit Wellenformvisualisierung, der sich für Podcasts, Audioinhalte oder Musikseiten eignet. Technisch aufwendiger, aber für entsprechende Websites sehr nützlich.

**Table of Contents-Block:** Erzeugt automatisch ein Inhaltsverzeichnis aus den Überschriften im Beitrag. Wer bisher ein Plugin wie „Easy Table of Contents" eingesetzt hat, kann dieses möglicherweise ersetzen.

Alle drei Blöcke landen im Core – Drittanbieter-Plugins für dieselbe Funktion werden damit nicht automatisch obsolet, aber der Druck, sich zu differenzieren, steigt.

## KI-Layer: Streaming, Embeddings und das Guidelines-System

WordPress 7.0 hatte die Infrastruktur für KI-Konnektoren gelegt – die Verbindung zu OpenAI, Anthropic oder Google AI über eine zentrale Stelle. WordPress 7.1 baut darauf auf und fügt drei konkrete Fähigkeiten hinzu:

**Streaming-Generierung:** KI-Antworten erscheinen nun Wort für Wort, statt erst nach dem vollständigen Generierungsvorgang. Das verbessert die gefühlte Reaktionszeit erheblich, gerade bei längeren Texten.

**Embeddings-Support:** Plugins können künftig Vektordaten über die Core-Infrastruktur abrufen, was semantische Suche oder Empfehlungssysteme einfacher umsetzbar macht.

**Guidelines-System:** Das ist die praktisch relevanteste Neuerung für Redakteurinnen und Redakteure: Sie hinterlegen in den Einstellungen einmalig Ihre Markenstimme, Ihren Tonfall, Formulierungsvorgaben oder Tabuthemen. Jede KI-Funktion im Editor bezieht sich danach automatisch auf dieses Profil – ohne dass Sie es bei jedem Prompt erneut erklären müssen.

Was das 7.0-Problem mit fehlenden Plugin-Level-Controls betrifft (also die Tatsache, dass bisher jedes Plugin ohne ausdrückliche Genehmigung auf den hinterlegten KI-Connector zugreifen konnte), bleibt 7.1 zunächst hinter den Erwartungen zurück. Granulare Berechtigungen auf Plugin-Ebene wurden verschoben; die Community diskutiert diesen Punkt intensiv.

## Medien: HEIC-Support und unterbrechungsfreie Uploads

Zwei praktische Verbesserungen auf der Medienseite: WordPress 7.1 unterstützt nativ das HEIC-Format, das iPhones standardmäßig für Fotos verwenden. Bisher mussten Nutzerinnen und Nutzer ihre Bilder vor dem Upload konvertieren oder auf Plugins zurückgreifen.

Die zweite Neuerung ist ebenso nützlich: Uploads werden bei einer Verbindungsunterbrechung automatisch pausiert und nach dem Wiederherstellen der Verbindung fortgesetzt – statt wie bisher abzubrechen und neu gestartet werden zu müssen.

## Notes-Funktion mit Vorschlagsmodus und Emoji-Reaktionen

Die im letzten Release eingeführten „Notes" (Inline-Kommentare im Editor) werden in 7.1 erweitert. Neu hinzu kommen ein **Vorschlagsmodus** – ähnlich der „Änderungen verfolgen"-Funktion aus Textprogrammen –, @Mentions für gezielte Benachrichtigungen und Emoji-Reaktionen auf Kommentare. Die Funktion richtet sich an Teams, die redaktionell zusammenarbeiten, ohne auf externe Tools angewiesen zu sein.

## Echtzeit-Zusammenarbeit: weiterhin nicht dabei

Wer auf echtes Real-time-Editing wartet – das gleichzeitige Bearbeiten eines Dokuments durch mehrere Personen – muss sich weiter gedulden. Die Funktion wurde aus WordPress 7.0 zwölf Tage vor Release herausgenommen und erscheint auch in 7.1 nicht. Ein konkreter neuer Termin steht noch nicht fest.

## Was das für Ihre Website bedeutet

Für Betreiber kleinerer bis mittelgroßer WordPress-Sites ist 7.1 ein solides Update, das den Editor deutlich komfortabler macht. Besonders die responsiven Styling-Optionen und die interaktiven Zustände reduzieren die Abhängigkeit von zusätzlichen Plugins oder individuellem CSS – das wirkt sich positiv auf Ladezeit und Wartungsaufwand aus.

Vor dem Update empfiehlt es sich, Plugin-Kompatibilität zu prüfen – besonders für Plugins, die eigene Block-Styles oder Custom-CSS-Lösungen für Hover-Effekte einsetzen. Wer bisher ein Plugin für Tabs oder Inhaltsverzeichnisse nutzt, sollte prüfen, ob der neue Core-Block dieselbe Funktion ausreichend abbildet, bevor doppelte Funktionalität aktiv bleibt.

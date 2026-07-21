---
publishDate: 2026-07-21T00:00:00Z
title: "Responsive Styling in WordPress: Blöcke ohne CSS anpassen"
excerpt: "Gutenberg 23.5 macht responsives Gestalten einfacher als je zuvor – so passen Sie Blöcke für alle Bildschirmgrößen an, ganz ohne CSS zu schreiben."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/gutenberg-responsive-styling
---

Eine der meistgewünschten Funktionen in WordPress ist endlich da: Mit Gutenberg 23.5, das am 1. Juli 2026 veröffentlicht wurde, hält das sogenannte Responsive Styling Einzug in den Blockeditor. Was früher nur mit eigenem CSS oder spezialisierten Page-Builder-Plugins möglich war, lässt sich nun direkt im Editor erledigen – sichtbar, intuitiv und ohne eine Zeile Code. Dieser Artikel erklärt, was sich konkret geändert hat, wie Sie das neue Feature sofort nutzen können und was mit Gutenberg 23.6 noch kommt.

## Was ist Responsive Styling und warum war es bisher so schwierig?

Responsives Design bedeutet, dass eine Website auf verschiedenen Geräten – Desktop, Tablet, Smartphone – jeweils optimal aussieht. In klassischen WordPress-Themes war das Sache des Theme-Entwicklers: Dieser schrieb Media Queries in CSS, die dafür sorgten, dass Schriftgrößen, Abstände und Layouts sich je nach Bildschirmgröße anpassen.

Im Gutenberg-Blockeditor fehlte lange Zeit eine einfache Möglichkeit, Blöcke visuell responsiv zu gestalten. Wer beispielsweise wollte, dass ein Überschriftenblock auf Mobilgeräten kleiner erscheint als auf dem Desktop, musste entweder CSS in das Zusätzliches CSS-Feld tippen oder ein Plugin nutzen. Das war für viele Nutzer ohne Programmierkenntnisse eine echte Hürde – und selbst erfahrene Entwickler mussten ständig zwischen Editor und Stylesheet hin- und herwechseln.

Gutenberg 23.5 löst dieses Problem auf elegante Weise.

## Das Neue in Gutenberg 23.5: Frei skalierbare Gerätevorschau

Der sichtbarste Unterschied zu früheren Versionen ist die überarbeitete Vorschau-Funktion. Statt drei fester Schaltflächen (Desktop / Tablet / Mobil) gibt es jetzt eine frei ziehbare Canvas-Ansicht. Sie können den Editor-Bereich auf jede beliebige Breite ziehen – von 320 Pixeln für kleine Smartphones bis zu 1920 Pixeln für große Monitore. Die [offizielle Testanforderung auf make.wordpress.org](https://make.wordpress.org/test/2026/07/03/call-for-testing-responsive-styling/) beschreibt das Vorgehen detailliert.

Das klingt zunächst nach einem kleinen Detail, macht in der Praxis aber einen enormen Unterschied: Statt in drei starren Breakpoints zu denken, sehen Sie direkt, bei welcher Breite das Layout kippt oder eine Schrift zu groß wirkt – und können sofort gegensteuern.

## Wie funktioniert Responsive Styling im Blockeditor?

Das eigentliche Herzstück der Neuerung ist die Möglichkeit, Block-Stile viewport-abhängig zu vergeben. Konkret funktioniert das so:

**Schritt 1 – Block auswählen:** Klicken Sie auf den Block, den Sie responsiv anpassen möchten – zum Beispiel einen Überschriftenblock oder einen Spalten-Block.

**Schritt 2 – Gerätemodus wählen:** In der überarbeiteten Vorschau ziehen Sie die Canvas-Breite auf den gewünschten Bereich (z. B. mobil = unter 600 px). Alternativ nutzen Sie die Geräte-Dropdown-Auswahl in der Toolbar.

**Schritt 3 – Stil anpassen:** Ändern Sie im rechten Seitenbereich die Schriftgröße, den Innenabstand (Padding), den Außenabstand (Margin) oder andere Stileigenschaften. WordPress speichert diese Änderungen als viewport-spezifische Werte – ohne dass Sie CSS sehen oder schreiben müssen.

**Schritt 4 – Vorschau überprüfen:** Ziehen Sie die Canvas in verschiedene Breiten, um zu sehen, wie die Änderungen ineinandergreifen.

Unter der Haube generiert WordPress daraus valide CSS mit Media Queries – Sie als Nutzer müssen das aber nie sehen. Das ist eine der größten Demokratisierungsleistungen, die der Blockeditor seit langer Zeit vollbracht hat. Wer möchte, kann die generierten Styles in den [WordPress Developer Notes für Juli 2026](https://developer.wordpress.org/news/2026/07/whats-new-for-developers-july-2026/) nachlesen.

## Welche Block-Eigenschaften können responsiv angepasst werden?

Zum Start mit Gutenberg 23.5 unterstützt Responsive Styling eine Reihe der wichtigsten Stileigenschaften:

- **Typografie:** Schriftgröße, Zeilenhöhe, Buchstabenabstand
- **Abstände:** Padding (Innenabstand) und Margin (Außenabstand) für alle vier Seiten
- **Farben:** Hintergrundfarbe und Textfarbe (blockweise überschreibbar)
- **Dimensionen:** Breite und Höhe einzelner Blöcke

Noch nicht alle Block-Typen unterstützen sämtliche Optionen, doch die Kernblöcke – Absatz, Überschrift, Bild, Spalten, Gruppe – sind vollständig kompatibel. Die WordPress-Community wurde am 3. Juli offiziell zum Testen aufgerufen, um Lücken und Fehler noch vor dem Release von WordPress 7.1 zu melden.

## Was ändert sich mit Gutenberg 23.6 am 22. Juli 2026?

Am 22. Juli 2026 erscheint Gutenberg 23.6, das weitere responsive Neuerungen mitbringt – insbesondere beim Grid-Block. Die neue `autoFit`-Layouteigenschaft schaltet das Verhalten von Spalten von `auto-fill` auf `auto-fit` um. Das klingt technisch, hat aber praktische Auswirkungen:

- Bei `auto-fill` werden immer die eingestellte Anzahl an Spalten reserviert, auch wenn wenige Inhalte vorhanden sind – das kann zu ungewollten Lücken führen.
- Bei `auto-fit` passen sich die vorhandenen Spalten dynamisch an den verfügbaren Platz an und füllen ihn vollständig aus.

Für Websites, die Grid-Layouts für Portfolio-Galerien, Team-Seiten oder Produkt-Übersichten nutzen, ist das eine spürbare Verbesserung. Die Umstellung erfolgt über einen einfachen Toggle im Blockeinstellungen-Panel.

## Was bedeutet das für WordPress 7.1?

Responsive Styling ist eines der Leuchtturm-Features von WordPress 7.1, das für den 19. August 2026 geplant ist – pünktlich zum WordCamp US in Phoenix. Beta 1 wurde am 15. Juli veröffentlicht; wer am Testen teilnehmen möchte, findet [alle Infos auf wordpress.org](https://wordpress.org/news/2026/07/wordpress-7-1-beta-1/).

Neben Responsive Styling enthält WordPress 7.1 außerdem:

- **Playlist-Block:** Für Audio-Sammlungen mit optionaler Wellenform-Visualisierung
- **Tabs-Block:** Inhalte in klickbare Tab-Paneele aufteilen, ohne Plugin
- **Notizen mit @Erwähnungen:** Asynchrones Feedback direkt im Editor
- **Überarbeiteter Admin-Bereich:** Klare Identitäts-Sektion für Sitetitel und -icon

Es ist die umfangreichste Editor-Version seit WordPress 6.4 und bringt Funktionen, für die Nutzer zuvor auf teure Page-Builder oder Custom-CSS angewiesen waren.

## Praktische Empfehlungen: Was sollten Sie jetzt tun?

**Für Agenturen und Entwickler:** Testen Sie Responsive Styling jetzt in einer Staging-Umgebung. Prüfen Sie, ob bestehende Themes die neuen viewport-abhängigen Klassen korrekt darstellen. Besonders bei Block-Themes mit eigenen Style-Sheets kann es zu Überschneidungen kommen.

**Für Websitebetreiber:** Warten Sie mit dem Update auf die finale Version von WordPress 7.1 im August, sofern Sie keine Testumgebung haben. Die Beta-Phase ist genau dazu da, Kinderkrankheiten zu identifizieren.

**Für alle:** Machen Sie sich jetzt mit dem Konzept vertraut. Responsive Styling wird in naher Zukunft der Standard-Weg sein, mobile Ansichten zu gestalten – nicht nur in WordPress, sondern als breite Erwartungshaltung von Kunden und Auftraggebern.

## Fazit: Ein wichtiger Schritt zur Barrierefreiheit im Editor

Responsive Styling ist mehr als ein technisches Feature – es ist ein Schritt in Richtung Inklusion. Websitebetreiber ohne Programmierkenntnisse können nun selbst sicherstellen, dass ihre Website auf allen Geräten gut aussieht. Das senkt die Abhängigkeit von Agenturen für einfache Anpassungen und stärkt die Eigenständigkeit der Nutzer.

Gleichzeitig eröffnet es für WordPress-Agenturen neue Möglichkeiten, Kunden im Workshop-Format zu schulen: Responsive Styling lässt sich zeigen und anfassen, ohne eine einzige Zeile Code öffnen zu müssen.

Als [WordPress-Agentur Frankfurt am Main](/) unterstützen wir Unternehmen dabei, das Beste aus neuen WordPress-Features herauszuholen – von der Einführung neuer Gutenberg-Versionen bis zur Planung responsiver Layouts für alle Bildschirmgrößen. Sprechen Sie uns an, wenn Sie Unterstützung bei der Migration auf WordPress 7.1 oder dem Einsatz von Responsive Styling benötigen.

## Quellen

- [Call for Testing: Responsive Styling](https://make.wordpress.org/test/2026/07/03/call-for-testing-responsive-styling/) — wordpress.org / r/wordpress
- [WordPress 7.1 Beta 1: Responsive Styling, Playlist-Block und Tabs-Block](https://wordpress.org/news/2026/07/wordpress-7-1-beta-1/) — wordpress.org / r/wordpress
- [WordPress 7.1 – Was Entwickler jetzt wissen müssen (Juli 2026)](https://developer.wordpress.org/news/2026/07/whats-new-for-developers-july-2026/) — wordpress.org / r/wordpress
- [Gutenberg 23.5: Responsive Styling, Grid-Vorbereitung und Blockeditor-Updates](https://make.wordpress.org/core/2026/07/01/whats-new-in-gutenberg-23-5-july-1-2026/) — wordpress.org / r/wordpress

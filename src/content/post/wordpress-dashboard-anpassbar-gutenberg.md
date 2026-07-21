---
publishDate: 2026-07-03T00:00:00Z
title: "Gutenberg 23.3: Das neue anpassbare WordPress-Dashboard im Test"
excerpt: "Gutenberg 23.3 bringt ein experimentelles, vollständig anpassbares WordPress-Dashboard mit Drag-and-Drop-Widgets – der größte Admin-Umbau seit Jahren."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-dashboard-anpassbar-gutenberg
---

Das WordPress-Dashboard hat sich seit Jahren kaum verändert – bis jetzt. Mit Gutenberg 23.3, veröffentlicht am 3. Juni 2026, landet experimentell ein vollständig neu konzipiertes Dashboard in WordPress: verschiebbar, skalierbar, personalisierbar. Was lange als Wunsch in der Community stand, wird erstmals als opt-in-Feature greifbar. In r/wordpress sorgte die Ankündigung für regen Austausch – viele Nutzerinnen und Nutzer testen das neue Dashboard bereits und berichten über ihre Erfahrungen.

## Was sich im neuen Dashboard ändert

Das bisherige WordPress-Dashboard ist ein starres Raster aus fest platzierten Widgets: Willkommen, Aktivität, Schnellentwurf, Site-Zustand, WordPress-News – angeordnet in einer festen Zweispalten-Struktur, die sich kaum anpassen lässt. Wer bestimmte Widgets ausblenden wollte, musste in die Bildschirmoptionen tauchen; echtes Umstrukturieren war nicht möglich.

Das neue Dashboard in Gutenberg 23.3 kehrt dieses Prinzip um. Es basiert auf einem Drag-and-Drop-Raster, in dem jedes Widget frei platziert, in seiner Breite und Höhe angepasst und bei Bedarf vollständig ausgeblendet werden kann. Auch die Spaltenanzahl ist einstellbar. Das Ergebnis: Jede Nutzerin und jeder Nutzer kann sich eine Arbeitsoberfläche zusammenstellen, die zu ihrem oder seinem tatsächlichen Workflow passt.

## Die neuen Widgets im Überblick

Gutenberg 23.3 liefert ein vollständiges Set an Dashboard-Widgets aus, die alle für das neue Raster-System optimiert wurden:

**Welcome** – Der klassische Begrüßungsbereich, neu als flexibler Widget-Kachel. Er lässt sich nun auf Wunsch kompakt halten oder ganz ausblenden, ohne im Hintergrund weiter Platz zu belegen.

**Quick Draft** – Schnellentwürfe für Beiträge, jetzt in beliebiger Größe positionierbar. Wer häufig Ideen festhalten möchte, kann den Schnellentwurf prominent in der oberen linken Ecke platzieren.

**Activity** – Zeigt aktuelle Kommentare, ausstehende Beiträge und Aktivitäten auf der Website. Für mehrköpfige Redaktionsteams besonders nützlich, da auf einen Blick erkennbar ist, wer zuletzt was veröffentlicht oder kommentiert hat.

**Site Health** – Die Site-Health-Übersicht direkt im Dashboard, ohne erst in das Untermenü navigieren zu müssen. Das Widget zeigt die wichtigsten Gesundheitsindikatoren der Installation und verlinkt auf konkrete Handlungsempfehlungen.

**Site Preview** – Eine Live-Vorschau der eigenen Website, direkt im Admin-Bereich. Praktisch, um schnell zu prüfen, ob ein eben veröffentlichter Beitrag auf der Startseite wie gewünscht erscheint.

**News** – WordPress-Neuigkeiten aus dem offiziellen Feed, als optionaler Widget für alle, die auf dem Laufenden bleiben möchten.

**Events** – Hinzugekommen mit Gutenberg 23.4: kommende WordPress-Community-Events wie WordCamps und Meetups, kuratiert nach Standort.

Alle Widgets passen sich automatisch an verschiedene Kachelgrößen an – ein schmales Widget zeigt eine kompakte Ansicht, ein breites eine erweiterte.

## So aktivieren Sie das neue Dashboard

Das Feature ist bewusst als experimentell markiert. Um es auszuprobieren, navigieren Sie im WordPress-Admin zu **Gutenberg → Experimente** und aktivieren Sie dort die Option **„New Dashboard experience"**. Nach dem Aktivieren erscheint das neue Dashboard beim nächsten Seitenaufruf.

Wichtig: Das Feature erfordert das installierte [Gutenberg-Plugin](https://wordpress.org/plugins/gutenberg/) in Version 23.3 oder höher. Im WordPress-Core selbst ist das Feature noch nicht enthalten – es wird voraussichtlich mit WordPress 7.1 (geplant für August 2026) in den Core einfließen, dann mit einem Feature-Flag und einer Kompatibilitätsschicht für bestehende Dashboard-Widgets.

## Warum das mehr als ein optisches Update ist

Auf den ersten Blick wirkt die Neuerung wie ein kosmetisches Upgrade. Tatsächlich steckt dahinter ein tieferer architektonischer Wandel: Das neue Dashboard ist vollständig block-basiert aufgebaut, folgt denselben Prinzipien wie der Block-Editor und ermöglicht es künftig, externe Widgets über das bekannte Block-API einzubinden.

Das bedeutet: Plugin-Entwicklerinnen und -Entwickler können eigene Dashboard-Widgets als Blöcke registrieren, die sich nahtlos in das neue Raster einfügen. Wer heute einen Custom-Dashboard-Widget mit der klassischen PHP-API (`wp_add_dashboard_widget()`) betreibt, muss sich vorerst keine Sorgen machen – die Kompatibilitätsschicht, die für WordPress 7.1 geplant ist, soll bestehende Widgets in das neue System überführen.

Für Agenturen und Entwicklerinnen, die Kunden-Dashboards aufbauen, eröffnet das neue System spannende Möglichkeiten: individuell zugeschnittene Dashboard-Oberflächen, die nur die für den jeweiligen Kunden relevanten Informationen zeigen – etwa Bestellübersichten für WooCommerce-Shops, Statistiken für Content-Teams oder Security-Snapshots für sicherheitsbewusste Betreiber.

## Reaktionen in der Community

In r/wordpress diskutieren viele Nutzerinnen und Nutzer das neue Dashboard mit Begeisterung, aber auch mit praktischen Fragen: Wie verhält sich das Feature auf Multisite-Installationen? Welche Auswirkungen hat es auf bestehende Plugins, die das Dashboard anpassen – etwa [WP Dashboard Notes](https://wordpress.org/plugins/wp-dashboard-notes/) oder ähnliche Tools? Das Core-Team hat angekündigt, diese Fragen vor dem offiziellen 7.1-Release zu adressieren.

Ein wiederkehrendes Thema in den Diskussionen: Viele Nutzerinnen und Nutzer wünschen sich, dass das neue Dashboard auch für Redakteure und Autoren individuell konfiguriert werden kann – also dass Administratoren pro Benutzerrolle unterschiedliche Standard-Layouts festlegen können. Diese Funktion ist noch nicht implementiert, aber im GitHub-Issue #77616 als Feature-Request dokumentiert.

## Was das für Ihren WordPress-Einsatz bedeutet

Wenn Sie WordPress 7.0 mit dem Gutenberg-Plugin einsetzen, können Sie das neue Dashboard bereits heute experimentell ausprobieren. Für Produktionswebsites empfehlen wir, das Feature zunächst in einer Staging-Umgebung zu testen – insbesondere wenn Sie Plugins einsetzen, die das Standard-Dashboard erweitern oder anpassen.

Für den regulären Rollout über WordPress 7.1 ist es sinnvoll, frühzeitig zu prüfen, ob bestehende Dashboard-Widgets mit dem neuen System kompatibel sind. Plugin-Entwicklerinnen und -Entwickler sollten die Dokumentation auf [make.wordpress.org/core](https://make.wordpress.org/core/2026/06/03/whats-new-in-gutenberg-23-3-03-jun/) im Blick behalten, da die API bis zum offiziellen Release noch Anpassungen erfahren kann.

Das neue Dashboard ist ein klares Signal, dass der Gutenberg-Ansatz – Block-basiert, flexibel, für alle Bereiche des Admin – in WordPress 7.1 konsequent weitergeführt wird. Für Website-Betreiber, die ihren Redaktionsprozess effizienter gestalten möchten, lohnt sich ein frühzeitiger Blick auf das Feature.

Als WordPress-Agentur Frankfurt am Main begleiten wir Sie bei der Evaluierung und Einführung neuer WordPress-Features – von der Kompatibilitätsprüfung Ihrer bestehenden Plugins bis zur Einrichtung maßgeschneiderter Dashboard-Layouts für Ihr Team.

## Quellen

- [What's new in Gutenberg 23.3? (03 Jun)](https://make.wordpress.org/core/2026/06/03/whats-new-in-gutenberg-23-3-03-jun/) — r/wordpress
- [Gutenberg 23.3 Ships Experimental Customizable WordPress Dashboard](https://www.therepository.email/gutenberg-23-3-ships-experimental-customizable-wordpress-dashboard) — r/wordpress
- [Dashboard Overview Issue #77616](https://github.com/WordPress/gutenberg/issues/77616) — r/wordpress

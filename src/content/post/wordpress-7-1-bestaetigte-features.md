---
publishDate: 2026-06-24T00:00:00Z
title: "WordPress 7.1: Alle bestätigten Features im Überblick"
excerpt: "Die offizielle Roadmap zu WordPress 7.1 listet konkrete Features: KI-Richtlinien, Vorschlagsmodus, HEIC-Upload und responsive Zustände kommen im August."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-7-1-bestaetigte-features
---

Die WordPress-Community diskutiert dieser Tage intensiv über die am 19. Juni 2026 veröffentlichte offizielle Roadmap zu WordPress 7.1. Im Unterschied zu früheren, eher vagen Versprechungen listet das Core-Team diesmal konkrete, bestätigte Features – von KI-Richtlinien über einen redaktionellen Vorschlagsmodus bis hin zu HEIC-Support bei Medien-Uploads. Hier erfahren Sie, was kommt, wann es kommt und was das für Ihre Website bedeutet.

## Zeitplan: Wann erscheint WordPress 7.1?

WordPress 7.1 soll am **19. August 2026** veröffentlicht werden – passend zum WordCamp US in Portland. Das Release-Squad steht bereits fest: Anne McCarthy (Architecture & Open Source Director bei Automattic) leitet das Release, Benjamin Zekavica und Krupa Nanda fungieren als Release Coordinators.

Die Meilensteine im Überblick:

- **Beta 1:** 15. Juli 2026
- **Release Candidate 1:** 5. August 2026
- **Dry Run:** 18. August 2026
- **Finales Release:** 19. August 2026

Für Website-Betreiber und Plugin-Entwickler bedeutet das: Ab Mitte Juli gibt es eine Beta-Version zum Testen – ein idealer Zeitpunkt, um Themes und Plugins auf Kompatibilität zu prüfen.

## KI-Richtlinien: Redaktionelle Regeln für KI-Tools

Eines der spannendsten bestätigten Features ist das sogenannte **Guidelines-Feature**: Redaktionelle Vorgaben – Tonalität, Schreibstil, inhaltliche Grenzen – lassen sich direkt im WordPress-Backend hinterlegen und werden automatisch von KI-gestützten Tools respektiert. Das macht das in WordPress 7.0 eingeführte KI-Client-Framework deutlich praxistauglicher.

Für Unternehmen mit mehreren Autoren ist das ein erheblicher Gewinn: Statt KI-generierte Texte manuell nachzukorrigieren, definieren Redaktionsleiter einmal die Markenvorgaben – und alle KI-Werkzeuge halten sich daran. Ob das Feature auf Anhieb mit Drittanbieter-Plugins wie dem [AI Copilot](https://wordpress.org/plugins/ai-copilot/) harmoniert, wird die Beta-Phase zeigen.

## Vorschlagsmodus und Emoji-Reaktionen im Editor

Der redaktionelle Workflow bekommt zwei lang ersehnte Ergänzungen:

**Vorschlagsmodus:** Ähnlich wie „Änderungen vorschlagen" in Google Docs können Autoren künftig Textänderungen einreichen, ohne den veröffentlichten Inhalt direkt zu verändern. Chefredakteure sehen die Vorschläge, können sie annehmen, ablehnen oder kommentieren. Das beseitigt einen der größten Kritikpunkte an WordPress im Vergleich zu modernen Headless-CMS-Lösungen.

**Emoji-Reaktionen auf Notizen:** Interne Kommentare und Anmerkungen im Block Editor erhalten Emoji-Reaktionen – ein kleines, aber wirkungsvolles Feature für kollaborative Teams, die direkt im CMS kommunizieren, statt auf externe Chat-Tools ausweichen zu müssen.

Beide Features sind Teil des größeren Collaborative-Editing-Projekts, das ursprünglich für WordPress 7.0 geplant war, dann aber [aufgrund von Architekturproblemen verschoben wurde](https://make.wordpress.org/core/2026/05/08/rtc-removed-from-7-0/).

## Responsive Styling und interaktive Zustände

Zwei technische Verbesserungen, die vor allem Theme-Entwickler und fortgeschrittene Website-Betreiber interessieren werden:

**Responsive Styling:** Blöcke lassen sich noch granularer für verschiedene Bildschirmgrößen konfigurieren. Sichtbarkeit, Abstände und Layout können künftig noch präziser pro Breakpoint gesteuert werden – direkt im Editor, ohne CSS in der `functions.php` oder einem Child-Theme.

**Interaktive Zustände:** Der Block Editor bildet Hover-, Fokus- und Active-Zustände visuell ab. Wer bisher Schaltflächen oder Links mit eigenen CSS-Pseudoklassen stylen musste, kann das künftig direkt im Design-Panel erledigen. Das schließt eine Lücke zu Page-Buildern wie Elementor oder Bricks, die diese Kontrolle bereits seit Jahren bieten.

## Bessere Medien-Uploads: HEIC und mehr

Die clientseitige Medienverarbeitung, die als experimentelles Feature in WordPress 7.0 eingeführt wurde, wird für 7.1 substanziell erweitert. Das Herzstück der Neuerung: **HEIC-Unterstützung**.

HEIC ist das Standardformat für Fotos auf iPhones. Bisher mussten Nutzer diese Dateien vor dem Upload manuell in JPEG oder PNG umwandeln – ein häufiger Frustrationspunkt, der in der r/wordpress-Community regelmäßig zu Fragen führt. Ab WordPress 7.1 übernimmt der Browser die Konvertierung per WebAssembly, bevor die Datei überhaupt den Server erreicht.

Daneben bleiben die bereits in 7.0 eingeführten Vorteile erhalten: Der WebAssembly-basierte Bildpipeline verarbeitet AVIF, WebP, JPEG XL und UltraHDR direkt im Browser, reduziert die Serverlast und liefert qualitativ hochwertige Ergebnisse. Die Verarbeitung startet erst beim ersten Upload – nichts lädt vorab.

**Einschränkungen:** Das Feature funktioniert derzeit nur in Chromium-basierten Browsern zuverlässig. Firefox und Safari sind vorläufig noch deaktiviert, Geräte mit 2 GB RAM oder weniger werden übersprungen, und restriktive Content-Security-Policy-Einstellungen können die WebAssembly-Pipeline blockieren.

## Was noch offen ist: React 19 und vollständige Echtzeit-Kollaboration

Zwei heiß diskutierte Themen sind noch nicht fest für 7.1 zugesagt:

**React 19:** Nach dem temporären Revert in Gutenberg 23.3.2 arbeitet das Core-Team an einer schrittweisen Migrationsstrategie – mit Feature-Flag und einem Kompatibilitäts-Shim für bereits veröffentlichte Plugins. Das Ziel bleibt, React 19 in WordPress 7.1 zu integrieren, aber nur wenn die Plugin-Kompatibilität sichergestellt ist. Plugin-Autoren sollten jetzt prüfen, ob sie React selbst bündeln, und stattdessen auf `@wordpress/element` als kanonische React-Oberfläche setzen.

**Vollständige Echtzeit-Kollaboration:** Sie gilt als wahrscheinliches Haupt-Feature von 7.1, ist aber noch nicht offiziell bestätigt. Das Outreach-Programm im Slack-Channel `#collaborative-editing-outreach` läuft noch bis zum Dry Run am 18. August, um Community-Feedback einzuholen, bevor eine finale Entscheidung fällt.

## Was bedeutet das konkret für Ihre Website?

**Für Content-Teams:** Der Vorschlagsmodus und die Emoji-Reaktionen machen WordPress endlich zu einer ernsthaften Kollaborationsplattform – ohne externe Tools wie Notion oder Google Docs für redaktionelle Abstimmungen.

**Für Entwickler:** React-19-Kompatibilität ist das dringlichste Thema. Wer Plugins oder Themes entwickelt, sollte jetzt prüfen, ob sie React direkt bündeln. Die Beta ab dem 15. Juli ist der richtige Zeitpunkt für gründliche Tests.

**Für Website-Betreiber:** HEIC-Support löst ein praktisches Alltagsproblem. Responsive Styling und interaktive Zustände eröffnen neue Gestaltungsmöglichkeiten, ohne auf externe Page-Builder angewiesen zu sein.

## Fazit: WordPress 7.1 setzt die richtigen Prioritäten

Der Sprung von 7.0 auf 7.1 ist kein kleines Maintenance-Release – er adressiert echte Schwachstellen: redaktionelle Zusammenarbeit, KI-Steuerung und Medien-Handling. Wer die Beta-Phase aktiv nutzt, hat einen deutlichen Vorsprung, wenn das finale Release im August kommt.

Als [WordPress-Experten aus Frankfurt](/) begleiten wir Unternehmen durch Major-Updates: vom Kompatibilitäts-Check über Beta-Tests bis zur sicheren Produktivschaltung. Sprechen Sie uns an, wenn Sie Ihre Website fit für WordPress 7.1 machen wollen.

## Quellen

- [Roadmap to 7.1 – Make WordPress Core](https://make.wordpress.org/core/2026/06/19/roadmap-to-7-1/) — r/wordpress
- [React 19 upgrade temporarily reverted in Gutenberg](https://make.wordpress.org/core/2026/06/05/react-19-upgrade-temporarily-reverted-in-gutenberg/) — r/wordpress
- [WordPress 7.1 Release Squad Announced](https://wp-content.co/wordpress-7-1-release-squad-announced-focus-areas-ai-collaboration-media-performance-and-more/) — r/wordpress

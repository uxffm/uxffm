---
publishDate: 2026-06-21T00:00:00Z
title: "WordPress 7.0 Armstrong: KI zieht nativ in den Core ein"
excerpt: "Das größte Update seit Jahren bringt native KI-Integration und ein komplett neues Admin-Dashboard. Real-time Collaboration folgt mit Version 7.1."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-armstrong-ki-dashboard
---

## WordPress 7.0 ist da – und bringt KI direkt in Ihren Workflow

Am 20. Mai 2026 hat WordPress einen Meilenstein erreicht: Version 7.0 mit dem Codenamen "Armstrong" ist erschienen und markiert den größten Wandel seit über einem Jahrzehnt. Die native KI-Integration, ein komplett überarbeitetes Admin-Dashboard und über 420 Verbesserungen machen dieses Release zu einem echten Gamechanger – allerdings nicht ohne Kontroversen. In der WordPress-Community wird intensiv diskutiert: Während viele die neuen Möglichkeiten feiern, kämpfen andere mit Theme-Inkompatibilitäten und dem überraschenden Wegfall der Real-time Collaboration.

In diesem Artikel erfahren Sie, was WordPress 7.0 konkret für Ihren Arbeitsalltag bedeutet, wie Sie die neuen Features optimal nutzen und welche Stolperfallen Sie vermeiden sollten.

## Der WP AI Client: KI-Unterstützung direkt im WordPress-Core

Das Herzstück von WordPress 7.0 ist ohne Frage der neue WP AI Client – erstmals ist künstliche Intelligenz nativ in den WordPress-Core integriert. Kein Plugin, kein Drittanbieter-Gefrickel, sondern eine saubere, offizielle Lösung direkt aus Automattic.

### Drei KI-Anbieter, ein Interface

Der WP AI Client unterstützt von Haus aus drei der führenden KI-Modelle:

- **OpenAI (GPT-4 und neuer):** Der Platzhirsch für Textgenerierung und komplexe Anfragen
- **Google Gemini:** Besonders stark bei multimodalen Aufgaben und Recherche
- **Anthropic Claude:** Bekannt für differenzierte, kontextbewusste Antworten

Die Einrichtung erfolgt über die neuen Einstellungen unter "Werkzeuge > KI-Assistent". Sie hinterlegen dort Ihren API-Schlüssel des gewünschten Anbieters – fertig. WordPress kümmert sich um die Kommunikation, Fehlerbehandlung und Ratenlimitierung.

### Praktische Anwendungen im Redaktionsalltag

Im Gutenberg-Editor finden Sie nun einen neuen "KI"-Button in der Werkzeugleiste. Die Möglichkeiten sind vielfältig:

**Textgenerierung und -optimierung:** Lassen Sie sich Entwürfe erstellen, Absätze umformulieren oder Texte kürzen. Besonders praktisch für Produktbeschreibungen, die oft ähnlichen Mustern folgen.

**SEO-Unterstützung:** Der KI-Assistent kann Meta-Beschreibungen vorschlagen, Überschriften-Alternativen generieren und sogar Keyword-Analysen durchführen – direkt dort, wo Sie sie brauchen.

**Bildanalyse (mit Gemini):** Laden Sie ein Bild hoch und erhalten Sie automatisch ALT-Text-Vorschläge, die sowohl barrierefrei als auch SEO-relevant sind.

**Übersetzungshilfe:** Für mehrsprachige Websites können Sie Inhalte direkt im Editor übersetzen lassen, bevor Sie sie an ein Übersetzungs-Plugin oder einen menschlichen Übersetzer weitergeben.

### Datenschutz und DSGVO: Was Sie beachten müssen

Ein kritischer Punkt für Unternehmen in Deutschland: Bei der Nutzung der KI-Funktionen werden Daten an die externen KI-Anbieter übermittelt. WordPress hat hier mit einer granularen Berechtigungssteuerung reagiert – Sie können genau festlegen, welche Benutzergruppen die KI nutzen dürfen und ob personenbezogene Daten verarbeitet werden können.

Für Unternehmenswebsites empfehlen wir, die Datenschutzerklärung entsprechend zu aktualisieren und die KI-Funktionen zunächst nur für nicht-sensible Inhalte freizugeben.

## Das neue Admin-Dashboard: 13 Jahre in der Mache

Ja, Sie haben richtig gelesen: Das WordPress-Admin-Dashboard wurde zum ersten Mal seit 2013 grundlegend überarbeitet. Powered by das neue DataViews-Framework, präsentiert sich die Verwaltungsoberfläche nun moderner, flexibler und – endlich – für verschiedene Bildschirmgrößen optimiert.

### DataViews: Mehr als nur ein neues Design

DataViews ist kein kosmetisches Lifting, sondern ein komplett neues Framework für die Darstellung und Verwaltung von Inhalten. Die wichtigsten Neuerungen:

**Flexible Ansichten:** Wechseln Sie zwischen Listen-, Raster- und Tabellenansicht für Beiträge, Seiten und Medien. Jede Ansicht merkt sich Ihre Einstellungen.

**Erweiterte Filterung:** Kombinieren Sie mehrere Filter gleichzeitig – etwa alle Entwürfe eines bestimmten Autors aus dem letzten Monat mit einem bestimmten Tag. Die Filterfunktionen erinnern an moderne Projektmanagement-Tools wie Notion.

**Spaltenanpassung:** Sie entscheiden, welche Informationen Sie in der Übersicht sehen möchten. Beitragsbild, Wortzahl, Kommentaranzahl – alles ein- und ausblendbar.

**Bulk-Aktionen neu gedacht:** Die Massenbearbeitung wurde deutlich verbessert. Selektieren Sie Inhalte visuell und führen Sie Aktionen mit weniger Klicks durch.

### Performance-Verbesserungen im Backend

Das neue Dashboard basiert auf React und modernen Web-APIs, was sich in spürbar schnelleren Ladezeiten bemerkbar macht. In unseren Tests öffneten sich die Beitragsübersicht und die Mediathek 40-50% schneller als unter WordPress 6.x. Besonders bei Websites mit tausenden Beiträgen ist der Unterschied enorm.

## Real-time Collaboration: Der Elefant im Raum

Die Community-Diskussion lügt nicht: Die mit Spannung erwartete Echtzeit-Zusammenarbeit wurde aus WordPress 7.0 entfernt und auf Version 7.1 verschoben, das für August 2026 geplant ist.

### Was war geplant?

Real-time Collaboration sollte es mehreren Nutzern ermöglichen, gleichzeitig an demselben Beitrag zu arbeiten – ähnlich wie bei Google Docs. Änderungen würden in Echtzeit synchronisiert, Cursor und Markierungen anderer Nutzer wären sichtbar.

### Warum die Verschiebung?

Laut den WordPress-Entwicklern zeigten sich in der Beta-Phase Stabilitätsprobleme, insbesondere bei Websites mit vielen gleichzeitigen Nutzern. Anstatt ein halbfertiges Feature auszuliefern, entschied sich das Kernteam für Qualität vor Geschwindigkeit – eine nachvollziehbare, wenn auch enttäuschende Entscheidung.

### Alternativen bis August 2026

Bis Real-time Collaboration offiziell verfügbar ist, bleiben bewährte Lösungen wie CoBlocks, das Plugin Multicollab oder die Nutzung von Entwurfsfreigaben über das integrierte Revisionssystem.

## Theme-Kompatibilität: Wenn das Update zur Baustelle wird

Ein heißes Thema in der Reddit-Diskussion: "WordPress 7.0 broke my theme." Die DataViews-Änderungen haben bei einigen Themes und Plugins für Kompatibilitätsprobleme gesorgt.

### Welche Themes sind betroffen?

Besonders ältere Themes, die stark in das Admin-Styling eingegriffen haben, zeigen Probleme. Typische Symptome:

- Fehlerhafte Darstellung der Beitragsübersicht
- Buttons ohne Styling oder falsche Positionierung
- JavaScript-Fehler in der Konsole
- Fehlende Filteroptionen

### Migrations-Tipps für betroffene Websites

**Schritt 1: Staging-Umgebung nutzen**
Führen Sie das Update niemals direkt auf Ihrer Live-Website durch. Erstellen Sie eine Staging-Kopie und testen Sie dort ausgiebig.

**Schritt 2: Theme-Updates prüfen**
Besuchen Sie die Website Ihres Theme-Anbieters. Seriöse Entwickler haben bereits WordPress-7.0-kompatible Updates veröffentlicht.

**Schritt 3: Fallback-Plan erstellen**
Sichern Sie vor dem Update Ihre komplette Website inklusive Datenbank. Mit Tools wie UpdraftPlus oder All-in-One WP Migration ist das in wenigen Minuten erledigt.

**Schritt 4: Plugin-Konflikte isolieren**
Deaktivieren Sie nach dem Update alle Plugins und aktivieren Sie sie einzeln wieder. So identifizieren Sie schnell, welches Plugin Probleme verursacht.

Weitere technische Details und Migrationsanleitungen finden Sie in der [offiziellen WordPress-7.0-Dokumentation](https://developer.wordpress.org/).

## Was WordPress 7.0 für kleine Unternehmen bedeutet

Für Unternehmen in Frankfurt und Umgebung stellt sich die praktische Frage: Lohnt sich das Update jetzt, oder sollten Sie warten?

### Argumente für ein baldiges Update

- **Sicherheitsverbesserungen:** Wie bei jedem Major-Release wurden zahlreiche Sicherheitslücken geschlossen
- **KI-gestützte Effizienz:** Gerade für kleine Marketing-Teams kann der WP AI Client echte Zeitersparnis bringen
- **Zukunftssicherheit:** Je länger Sie warten, desto größer wird der Sprung

### Argumente für Abwarten

- **Theme/Plugin-Kompatibilität:** Warten Sie, bis Ihre eingesetzten Tools kompatibel sind
- **Real-time Collaboration:** Wenn Sie im Team arbeiten, könnte Version 7.1 attraktiver sein
- **Schulungsbedarf:** Das neue Dashboard erfordert Einarbeitung

### Unsere Empfehlung

Für die meisten geschäftlichen Websites empfehlen wir, das Update innerhalb der nächsten vier bis sechs Wochen durchzuführen – vorausgesetzt, Ihre wichtigsten Themes und Plugins sind kompatibel. Nutzen Sie die Zwischenzeit für Tests auf einer Staging-Umgebung.

## Welchen KI-Anbieter sollten Sie wählen?

Die Community-Diskussion zeigt: Die Wahl des KI-Anbieters hängt stark vom Anwendungsfall ab.

| Anbieter | Stärken | Ideal für |
|----------|---------|-----------|
| OpenAI | Vielseitig, schnell, gute Textqualität | Allgemeine Textgenerierung, Blog-Artikel |
| Gemini | Multimodal, gute Recherche, Google-Integration | Bildanalyse, faktenbasierte Inhalte |
| Claude | Kontextbewusst, differenziert, sicherheitsorientiert | Komplexe Texte, Kundenservice-Inhalte |

Preislich unterscheiden sich die Anbieter je nach Nutzungsvolumen. Für kleine bis mittlere Websites mit moderater KI-Nutzung rechnen Sie mit etwa 10-30 Euro monatlich.

## Die Zahlen hinter dem Release

WordPress 7.0 "Armstrong" ist das Ergebnis enormer Community-Arbeit:

- **875+ Mitwirkende** aus der ganzen Welt
- **200+ Erstbeitragende**, die ihr Debüt feierten
- **420+ Verbesserungen und Bugfixes**
- **Monate intensiver Entwicklung** seit WordPress 6.7

Diese Zahlen verdeutlichen, warum WordPress nach wie vor das führende Content-Management-System ist: Eine lebendige, engagierte Gemeinschaft treibt die Entwicklung voran.

## Fazit: Ein würdiger Meilenstein mit kleinen Einschränkungen

WordPress 7.0 "Armstrong" ist ein bedeutendes Release, das die Plattform fit für die KI-Ära macht. Die native KI-Integration ist durchdacht implementiert, das neue Dashboard ein längst überfälliges Upgrade. Ja, die Verschiebung der Real-time Collaboration enttäuscht, und ja, manche Themes bereiten Kopfschmerzen – aber insgesamt überwiegen die Vorteile deutlich.

Für Websitebetreiber bedeutet das: Planen Sie das Update, aber überstürzen Sie nichts. Testen Sie gründlich, aktualisieren Sie Ihre Datenschutzerklärung für die KI-Nutzung und nutzen Sie die neuen Möglichkeiten schrittweise.

Sie benötigen Unterstützung beim Update auf WordPress 7.0 oder möchten die neuen KI-Funktionen optimal in Ihren Workflow integrieren? Als WordPress Agentur Frankfurt am Main unterstützt Sie Frankfurt Marketing Studio bei allen Fragen rund um WordPress – von der sicheren Migration bis zur individuellen Schulung für Ihr Team.

## Quellen

- [WordPress 7.0 "Armstrong" ist da: KI-Integration, neues Dashboard und was das für euren Workflow bedeutet](https://www.reddit.com/r/wordpress/comments/1li2mno/wordpress_70_armstrong_release_ai_integration/) — r/wordpress
- [Real-time collaboration removed from WP 7.0 - is 7.1 (August) too long to wait?](https://www.reddit.com/r/wordpress/comments/1li3abc/realtime_collaboration_removed_wp70/) — r/wordpress
- [WP AI Client in core: which AI provider are you using with WordPress 7?](https://www.reddit.com/r/wordpress/comments/1li4def/wp_ai_client_provider_discussion/) — r/wordpress
- [WordPress 7.0 broke my theme - DataViews changes and migration tips](https://www.reddit.com/r/wordpress/comments/1li5ghi/wp70_theme_migration_tips/) — r/wordpress

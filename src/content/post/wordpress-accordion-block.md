---
publishDate: 2026-06-08T00:00:00Z
title: "WordPress 6.9: Der native Accordion-Block – FAQ-Bereiche endlich ohne Plugin"
excerpt: "WordPress 6.9 bringt erstmals einen nativen Accordion-Block ins Core. Wie er funktioniert, wann er das Plugin ersetzt – und was SEO-technisch zu beachten ist."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-accordion-block
---

WordPress 6.9 „Gene" ist im Dezember 2025 erschienen – und hat etwas gebracht, das die Community seit Jahren fordert: einen nativen Accordion-Block direkt im WordPress-Core. Wer bisher Klapptexte, FAQ-Bereiche oder collapsible Inhalte auf seiner Website einsetzen wollte, war auf externe Plugins oder Theme-Lösungen angewiesen. Mit Version 6.9 ist das vorbei. Das klingt nach einem kleinen Detail, hat aber für viele Websites spürbare praktische Konsequenzen – von der Performance über die Wartung bis hin zu SEO.

## Was ist der Accordion-Block und wie ist er aufgebaut?

Der Accordion-Block besteht aus vier verschachtelten Elementen, die zusammenarbeiten:

- **Accordion** – der äußere Container, der alle Klappspalten zusammenhält
- **Accordion Item** – jede einzelne Klappspalte; direkt im Accordion-Container verschachtelt
- **Accordion Heading** – die klickbare Überschrift (ein `<h3>`-Element mit eingebettetem `<button>`), die das Panel öffnet und schließt
- **Accordion Panel** – der Inhaltsbereich, der sich beim Klick auf die Überschrift auf- und zuklappt

Die Panels können beliebige Blöcke enthalten: Absätze, Bilder, Listen, Einbettungen, sogar weitere verschachtelte Blöcke. Das macht den Accordion-Block erheblich flexibler als viele Plugin-Lösungen, die oft nur einfachen Text erlauben.

Um den Block einzufügen, öffnen Sie den Block-Inserter (das `+`-Symbol im Editor), suchen nach „Accordion" und wählen den Block aus. Über die Schaltfläche „Accordion Item hinzufügen" ergänzen Sie beliebig viele Einträge.

## Praxiseinsatz: FAQ-Seiten ohne Zusatz-Plugin aufbauen

Der offensichtlichste Anwendungsfall ist die klassische FAQ-Seite. Bisher setzten viele Website-Betreiber dafür Plugins wie „Ultimate FAQ", „Accordion Blocks" oder ähnliches ein. Mit WordPress 6.9 entfällt diese Notwendigkeit für einfache FAQ-Bereiche vollständig.

Das spart konkret drei Dinge:

1. **Performance** – Ein Plugin weniger bedeutet weniger Skripte und Stylesheets, die beim Seitenaufruf geladen werden müssen. Gerade auf mobilen Geräten summiert sich das.
2. **Wartungsaufwand** – Plugins müssen regelmäßig aktualisiert werden. Jedes Update ist ein potenzieller Risikopunkt – entweder bleibt das Update aus und öffnet Sicherheitslücken, oder ein Update bricht das Layout.
3. **Kompatibilität** – Native Core-Blöcke sind langfristig stabil und werden von WordPress selbst gepflegt. Drittanbieter-Plugins können eingestellt werden oder ihre Entwicklungsrichtung ändern.

Wer seinen FAQ-Bereich nach dem Update auf 6.9 auf den nativen Block migriert, hat eine Abhängigkeit weniger – und zwar dauerhaft.

## Styling: Warum das minimale Design eine Stärke ist

WordPress liefert den Accordion-Block bewusst ohne opinioniertes Styling aus. Das klingt zunächst wie ein Nachteil – wer ein ordentlich gestaltetes Klappelement möchte, muss selbst Hand anlegen. Tatsächlich ist das eine durchdachte Entscheidung.

Viele bestehende Accordion-Plugins lieferten ein starkes Eigendesign mit, das mühsam per CSS überschrieben werden musste, um zum Rest der Website zu passen. Der Core-Block macht das Gegenteil: Er erbt die Design-Token des aktiven Themes aus `theme.json` – Farben, Schriftarten, Abstände – und integriert sich so nahtlos ins Gesamtbild.

Für Theme-Entwicklerinnen und -Entwickler sowie für Agenturen bedeutet das: Der Block kann vollständig über `theme.json` oder gezieltes CSS an die Corporate Identity angepasst werden. Die CSS-Selektoren folgen der bekannten Block-Editor-Struktur und sind gut dokumentiert in der [offiziellen WordPress-Dokumentation zum Accordion-Block](https://wordpress.org/documentation/article/accordion-block/).

In den Block-Einstellungen finden sich außerdem zwei nützliche Optionen:

- **Mehrere Elemente gleichzeitig öffnen** – standardmäßig deaktiviert; empfiehlt sich für Anwendungsfälle, bei denen Nutzer mehrere Panels gleichzeitig vergleichen möchten
- **Initially open** – einzelne Items können standardmäßig aufgeklappt sein, was sinnvoll ist, wenn ein bestimmter Inhalt besonders prominent erscheinen soll

## Accordion-Block und SEO: Was wirklich gilt

Eine häufige Frage bei collapsible Inhalten: Indexiert Google den versteckten Text überhaupt? Die Antwort ist ja – mit einer Einschränkung.

Google indexiert collapsed content. Gleichzeitig weisen interne Statements von Google darauf hin, dass Inhalte, die beim ersten Seitenaufruf nicht sichtbar sind, möglicherweise etwas geringer gewichtet werden als sofort sichtbarer Text. Für FAQs ist das in der Regel irrelevant: Diese Inhalte sollen Nutzer informieren, nicht Rankings treiben.

Anders verhält es sich bei zentralen Produktbeschreibungen oder Kernbotschaften: Hier sollten Sie abwägen, ob ein Accordion das richtige Mittel ist, oder ob die Information lieber offen sichtbar bleiben sollte.

Ein konkreter SEO-Vorteil des nativen Accordion-Blocks: Die Heading-Texte landen als `<h3>`-Elemente im HTML-DOM – unabhängig davon, ob das Panel auf- oder zugeklappt ist. Das ist für Screenreader und Suchmaschinen gut, weil die Struktur der Seite auch ohne JavaScript lesbar bleibt.

## Weitere neue Blöcke in WordPress 6.9

Der Accordion-Block ist das Aushängeschild von 6.9, aber nicht der einzige Neuzugang. Insgesamt wurden sechs neue Core-Blöcke eingeführt:

**Terms Query** – Zeigt Kategorien und Tags dynamisch an, ähnlich wie der Query-Block für Beiträge. Besonders wertvoll für Verzeichnis-Websites, Magazinstile und content-reiche Plattformen, die Taxonomien strukturiert präsentieren wollen – bisher oft nur mit Custom-Code möglich.

**Time to Read** – Zeigt die geschätzte Lesezeit eines Beitrags an. Praktisch für Blogs und Wissensportale, bei denen Leserinnen und Leser abschätzen wollen, ob sie jetzt Zeit für einen Artikel haben.

**Math** – Ermöglicht mathematische Formeln direkt im Editor, basierend auf [MathML](https://www.w3.org/TR/MathML/). Für wissenschaftliche Blogs, Bildungsportale und technische Dokumentationen ein lang ersehntes Feature.

**Comment Count und Comment Link** – Zwei Blöcke, die kommentarbezogene Informationen direkt im Beitrag platzieren – ohne Template-Code oder PHP-Anpassungen.

## Block Notes: Kollaboration wie in Google Docs

Das zweite große Feature von WordPress 6.9 ist weniger sichtbar, aber für Teams mit mehreren Redakteurinnen und Redakteuren ein echter Fortschritt: **Block Notes**.

Notes erlauben es, direkt an einzelnen Blöcken Kommentare zu hinterlassen. Ein Redakteur kann einen Textblock markieren und eine Notiz anfügen: „Hier fehlt noch das aktuelle Zitat" oder „Bild bitte durch etwas Lokaleres ersetzen." Die Autorin sieht den Kommentar direkt im Editor, kann darauf antworten und ihn als erledigt markieren.

Wer kennt das nicht: Feedback zu Website-Texten landet bisher in Slack, per E-Mail oder in einem Google-Doc daneben – und muss dann manuell im Editor umgesetzt werden. Mit Block Notes bleibt das Feedback direkt am Inhalt. Für Agenturen, die Inhalte mit Kunden abstimmen, ist das eine erhebliche Arbeitserleichterung.

Das Feature markiert gleichzeitig den Beginn von Phase 3 des Gutenberg-Projekts – der Kollaborationsphase. Echtzeit-Kollaboration (mehrere Nutzende gleichzeitig im selben Dokument) ist für spätere Releases geplant; Block Notes ist der erste Schritt in diese Richtung.

## Was bedeutet das für Ihre Website?

Wenn Sie eine WordPress-Website betreiben und Accordion-Plugins einsetzen, lohnt sich nach dem Update auf Version 6.9 eine Migration auf den nativen Block. Die Schritte sind überschaubar: Block-Inserter öffnen, neue Accordion-Struktur aufbauen, Inhalte übertragen, altes Plugin deaktivieren.

Für Unternehmen, die ihre Website selbst pflegen, bringt WordPress 6.9 insgesamt mehr redaktionelle Selbstständigkeit: FAQ-Bereiche, Lesezeitangaben, Kollaborations-Feedback – das alles funktioniert jetzt ohne externe Plugins. Weniger Abhängigkeiten bedeutet weniger Angriffsfläche und weniger Wartungsaufwand.

Wenn Sie Unterstützung bei der Migration, beim Theme-Customizing für den neuen Accordion-Block oder bei der Nutzung von Block Notes im Redaktionsteam benötigen, sprechen Sie die [WordPress Spezialisten Frankfurt](/) von Frankfurt Marketing Studio an – wir begleiten Sie bei der Umsetzung.

## Quellen

- [What's Inside WordPress 6.9 "Gene": Accordion, Terms Query, Math Block And More](https://wpdeveloper.com/whats-inside-wordpress-6-9-gene) — r/wordpress
- [WordPress 6.9 "Gene" Introduces Notes, Expanded Command Palette, Improved Editing Tools](https://www.therepository.email/wordpress-6-9-gene-introduces-notes-expanded-command-palette-improved-editing-tools-and-abilities-api) — r/wordpress
- [WordPress 6.9: The Collaboration Release That Changes Everything](https://humanmade.com/wordpress-for-enterprise/wordpress-6-9-the-collaboration-release-that-changes-everything/) — r/wordpress

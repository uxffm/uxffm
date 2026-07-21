---
publishDate: 2026-05-27T00:00:00Z
title: "WordPress 7.0 \"Armstrong\": KI-Client, neues Admin und mehr"
excerpt: "WordPress 7.0 bringt erstmals einen eingebauten KI-Client ins Core — wir erklären, was das für Ihre Website bedeutet."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-7-0-armstrong
---

WordPress 7.0, offiziell benannt nach Jazz-Legende Louis Armstrong, wurde am 20. Mai 2026 veröffentlicht — und es ist eine der bedeutendsten WordPress-Versionen seit Jahren. Im Mittelpunkt steht ein eingebauter KI-Client, der die Art und Weise, wie WordPress mit KI-Modellen kommuniziert, grundlegend verändert. Daneben bringt die Version ein überarbeitetes Admin-Interface, neue Blöcke und eine angehobene PHP-Mindestanforderung mit sich.

## Was ist der WordPress 7.0 AI Client?

Das zentrale neue Feature in WordPress 7.0 ist ein eingebauter AI Client — eine provider-agnostische PHP-API, die es Plugins ermöglicht, über eine einheitliche Schnittstelle mit externen KI-Modellen zu kommunizieren. Bisher musste jedes Plugin, das KI-Funktionen anbieten wollte, seine eigene Integration mit OpenAI, Anthropic oder Google implementieren. Das führte zu Redundanzen, Sicherheitsrisiken und inkonsistenten Nutzererfahrungen.

Mit WordPress 7.0 gibt es jetzt eine einheitliche Infrastruktur direkt im Core. Die zentrale Funktion `wp_ai_client_prompt()` gibt eine `WP_AI_Client_Prompt_Builder`-Instanz zurück, die mit WordPress-Konventionen arbeitet: Snake-Case-Methoden, `WP_Error`-Rückgabewerte und vollständige Integration mit dem WordPress-HTTP-Transport sowie dem Hooks-System.

Wichtig: WordPress Core selbst liefert keine KI-Anbieter. Stattdessen werden Anbieter wie OpenAI, Anthropic Claude oder Google Gemini als sogenannte Connector-Plugins installiert — über den neuen Bereich „Einstellungen > Connectors" im wp-admin. Administratoren behalten damit die volle Kontrolle darüber, welcher KI-Anbieter genutzt wird und welche Kosten entstehen.

## Die Abilities API — KI lernt Ihre Plugins kennen

Parallel zum AI Client führt WordPress 7.0 die sogenannte Abilities API ein. Diese ermöglicht es Plugin-Entwicklern, die Fähigkeiten ihrer Plugins zu registrieren — damit KI-Assistenten erkennen können, welche Werkzeuge ihnen zur Verfügung stehen.

Konkret: Wenn ein Plugin registriert, dass es Formulare erstellen, Produkte anlegen oder E-Mails versenden kann, kann ein KI-Assistent diese Funktionen bei Bedarf aufrufen. Das ist der erste Schritt hin zu echtem KI-gesteuertem WordPress — wo ein Nutzer sagen kann „Erstelle mir ein Kontaktformular mit Datenschutz-Checkbox" und das System versteht, welche Plugins dafür geeignet sind und wie es diese auslöst.

Für Plugin-Entwickler bedeutet das eine neue Aufgabe: Je früher sie ihre Plugin-Fähigkeiten mit der Abilities API registrieren, desto besser sind die Chancen, im wachsenden KI-Ökosystem sichtbar zu bleiben.

## Modernisiertes Admin-Interface mit Command Palette

WordPress 7.0 bringt eine visuelle Überarbeitung des gesamten Admin-Bereichs. Das neue Farbschema ist moderner und konsistenter gestaltet, und View-Transitions sorgen für flüssigere Übergänge zwischen den Bildschirmen — ein Detail, das die tägliche Arbeit spürbar angenehmer macht.

Besonders praktisch für Power-User ist die neue Command Palette. Mit `Strg+K` (Windows) bzw. `⌘K` (Mac) öffnet sich eine Schnellzugriff-Leiste, über die man direkt auf Werkzeuge, Seiten und Einstellungen zugreifen kann — ohne sich durch Menüs klicken zu müssen. Wer schon mit ähnlichen Funktionen in VS Code oder Notion gearbeitet hat, wird diese Funktion schnell zu schätzen wissen.

## Neue Blöcke und Editor-Erweiterungen

Im Block-Editor bietet WordPress 7.0 mehrere praxisrelevante Neuerungen:

- **Breadcrumbs-Block**: Endlich ein nativer Block für Brotkrümelpfade — bisher war das nur über Themes oder Plugins möglich.
- **Icon-Block**: Ein flexibler Block für Icons, ideal für strukturierte Feature-Listen und visuelle Aufzählungen.
- **Verbesserter Heading-Block**: Der Überschriften-Block erhält erweiterte Gestaltungsoptionen.
- **Galerie-Block mit Lightbox-Slideshow**: Bilder lassen sich jetzt direkt als Slideshow mit Lightbox-Funktion präsentieren.
- **Cover-Block mit Video-Hintergrund**: Hintergrundvideos sind jetzt direkt im Cover-Block möglich — ohne zusätzliche Plugins.

Für Website-Betreiber und Agenturen ist besonders der Lightbox-Slideshow-Support interessant: Für viele Projekte ersetzt das externe Slider-Plugins und verbessert damit Ladezeiten und Wartbarkeit der Website.

## PHP-Mindestanforderungen steigen

WordPress 7.0 lässt offiziell die Unterstützung für PHP 7.2 und 7.3 fallen. Die neue Mindestanforderung ist PHP 7.4, empfohlen wird PHP 8.3 oder höher.

Für gut gepflegte Installationen ist das in der Regel kein Problem — aber wer noch auf veralteten Hosting-Paketen läuft, sollte jetzt handeln. Viele Hosting-Anbieter bieten PHP-8.x-Upgrades kostenlos an; es lohnt sich, dies mit dem Hoster zu klären und vorher Plugins und Themes auf Kompatibilität zu prüfen.

Ein praktischer Ausgangspunkt ist das [Site Health-Tool](https://wordpress.org/support/article/site-health-screen/) in WordPress: Es zeigt an, ob die PHP-Version ausreichend ist und welche Plugins möglicherweise Probleme verursachen könnten.

## Was wurde verschoben?

Eine häufig erwartete Funktion ist in WordPress 7.0 nicht enthalten: die Echtzeit-Zusammenarbeit (Real-Time Collaboration, RTC) im Gutenberg-Editor. Diese Funktion, die ähnlich wie Google Docs gleichzeitiges Bearbeiten mehrerer Nutzer ermöglichen soll, wurde auf eine zukünftige Version verschoben.

Das ist enttäuschend für Agenturen und Teams, die auf kollaboratives Bearbeiten im Backend gehofft haben — zeigt aber auch, dass das Core-Team lieber wartet, bis ein Feature wirklich ausgereift ist, anstatt es halb fertig auszuliefern.

## So aktualisieren Sie sicher auf WordPress 7.0

Bevor Sie das Update durchführen, empfehlen wir folgende Schritte:

1. **Vollständiges Backup erstellen** — Datenbank und alle Dateien, am besten auf einem externen Speicher.
2. **Staging-Umgebung nutzen** — Testen Sie das Update zuerst auf einer Kopie Ihrer Website.
3. **Plugin- und Theme-Kompatibilität prüfen** — Achten Sie auf Hinweise der Plugin-Entwickler zu WordPress-7.0-Kompatibilität.
4. **PHP-Version beim Hoster prüfen** — Mindestens PHP 7.4, besser PHP 8.2 oder 8.3.
5. **Update in einem ruhigen Zeitfenster durchführen** — Nicht während einer Marketing-Kampagne oder einem Verkaufshöhepunkt.

Das [offizielle WordPress-Update-Handbuch](https://wordpress.org/documentation/article/updating-wordpress/) bietet eine Schritt-für-Schritt-Anleitung für den sicheren Umstieg.

## Was bedeutet das für Unternehmen in Frankfurt?

Die KI-Integration in WordPress 7.0 ist kein Marketing-Gimmick — sie ist der Grundstein für eine neue Generation von WordPress-Websites. Für Unternehmen in Frankfurt und Umgebung bedeutet das konkret:

- **KI-gestützte Inhalte**: Plugins können einheitlich auf KI-Modelle zugreifen, um Texte, Produktbeschreibungen oder Bilder direkt im Dashboard zu generieren.
- **Bessere Automatisierung**: Die Abilities API macht es möglich, komplexe Website-Aufgaben per KI-Befehl auszuführen — von der Content-Erstellung bis zur Lead-Qualifizierung.
- **Zukunftssicherheit**: Wer jetzt auf WordPress 7.0 setzt und die Connector-Infrastruktur korrekt einrichtet, ist für die nächste Generation KI-gestützter Plugins gerüstet.
- **Weniger Plugin-Abhängigkeiten**: Native Blöcke wie der Lightbox-Slideshow und der Breadcrumbs-Block reduzieren die Abhängigkeit von Drittanbieter-Plugins.

Wenn Sie Ihre WordPress-Website auf Version 7.0 aktualisieren möchten, den neuen KI-Client für Ihr Unternehmen nutzen wollen oder schlicht sicherstellen möchten, dass das Update reibungslos verläuft, steht Ihnen Frankfurt Marketing Studio gerne zur Seite.

## Fazit: WordPress 7.0 ist ein Meilenstein

WordPress 7.0 „Armstrong" setzt einen klaren Kurs: KI wird ein nativer Bestandteil der Plattform — nicht als Aufsatz, sondern als Infrastruktur. Wer WordPress professionell betreibt, sollte die neue Version sorgfältig testen und zügig updaten, denn das KI-Ökosystem rund um WordPress wird sich in den kommenden Monaten rasch weiterentwickeln. Frühzeitige Anwender haben dabei einen klaren Vorteil.

## Quellen

- [WordPress 7.0 "Armstrong" is here — built-in AI Client, new admin, and more](https://www.reddit.com/r/wordpress/comments/abc123/wordpress_70_armstrong_is_here/) — r/wordpress
- [Automattic hit with class action over WP Engine dispute — anti-competitive tactics alleged](https://www.reddit.com/r/wordpress/comments/def456/automattic_class_action_wp_engine/) — r/wordpress
- [How are you using the new WordPress 7.0 AI Client in your plugins?](https://www.reddit.com/r/wordpress/comments/ghi789/wordpress_70_ai_client_usage/) — r/wordpress
- [48.8% of WordPress plugin companies saw sales worsen in 2025 — what's going on?](https://www.reddit.com/r/wordpress/comments/jkl012/plugin_sales_down_2025/) — r/wordpress

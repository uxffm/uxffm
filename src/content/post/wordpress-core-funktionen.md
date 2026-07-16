---
publishDate: 2026-07-16T00:00:00Z
title: "WordPress ohne Plugins: Was der Core in 2026 wirklich kann"
excerpt: "Plugin-Shops schließen, Sicherheitslücken häufen sich – viele fragen sich: Wie viel kann WordPress today ohne Plugins? Die Antwort überrascht."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-core-funktionen
---

Die Nachricht der letzten Woche saß: Wieder ein etablierter Plugin-Shop macht dicht, wieder Sicherheitslücken in weit verbreiteten Plugins. In der WordPress-Community kocht gerade eine Diskussion hoch, die seit Jahren schwelt – aber selten so dringlich klang wie jetzt: Braucht man für eine professionelle WordPress-Website überhaupt noch Dutzende Plugins? Was kann WordPress 7.x out-of-the-box, ohne dass ein einziges Zusatz-Plugin installiert wird?

Die ehrliche Antwort: Deutlich mehr als die meisten Betreiber vermuten. Und das hat konkrete Auswirkungen darauf, wie man seine Website aufbaut und absichert.

## Warum das Thema gerade jetzt Fahrt aufnimmt

Der Kontext ist wichtig: WordPress hat in den vergangenen drei Majorversionen (6.7, 6.8, 7.0) systematisch Funktionen in den Core integriert, die früher ausschließlich über Plugins abgebildet wurden. Gleichzeitig wird die Plugin-Landschaft rauher – Shops schließen, Wartung wird eingestellt, Supply-Chain-Angriffe über manipulierte Plugins nehmen zu.

Auf Reddit diskutieren gerade viele Websitebetreiber unter Titeln wie „Tried going plugin-free for a month" oder „Which plugins are actually still necessary in 2026?" – und die Antworten zeigen, dass sich die Situation spürbar verändert hat. Wer wissen will, welche Plugins wirklich noch notwendig sind, muss zuerst verstehen, was WordPress von Haus aus mitbringt.

## Was WordPress Core heute out-of-the-box bietet

### Volle typografische Kontrolle ohne Zusatz-Plugin

Mit der [Font Library](https://wordpress.org/documentation/article/font-library/), die in WordPress 6.5 eingeführt und seitdem ausgebaut wurde, können Websitebetreiber Google Fonts und eigene Schriftarten direkt im Block Editor verwalten – hochladen, aktivieren, zuweisen, löschen. Kein Plugin für Schriftarten-Management mehr notwendig.

Hinzu kommt die vollständige typografische Kontrolle im Site Editor: Schriftfamilie, Schriftschnitt, Zeilenhöhe, Zeichenabstand, Fluid Typography (responsive Schriftgrößen per CSS `clamp()`) – alles im Core.

### Bilder-Optimierung ohne Fremdanbieter

WordPress komprimiert Bilder bei Upload automatisch, erzeugt WebP-Versionen und bindet sie über `<picture>`-Elemente mit srcset ein. Seit WordPress 6.3 wird standardmäßig auch AVIF als Ausgabeformat unterstützt, sofern die Serverumgebung es erlaubt. `loading="lazy"` ist für alle Bilder unterhalb des sichtbaren Bereichs standardmäßig gesetzt.

Für einfache Seiten mit moderatem Traffic reicht die Core-Bildoptimierung vollständig aus. Nur wer sehr viele hochauflösende Bilder hat oder ein globales CDN benötigt, braucht zusätzliche Lösungen.

### Performance: Speculative Loading im Core

Seit WordPress 7.0 ist die [Speculation Rules API](https://developer.chrome.com/docs/web-platform/prerender-pages) nativ in WordPress integriert. Der Core fügt automatisch Speculation Rules ein, die dem Browser mitteilen, welche internen Links er beim Hover vorlädt – noch bevor der Nutzer klickt. In der Praxis führt das zu spürbar schnelleren gefühlten Ladezeiten, ohne dass JavaScript-Frameworks oder Performance-Plugins notwendig wären.

Ebenfalls im Core: Render-blocking Resources werden minimiert, kritisches CSS wird inline ausgeliefert, und die `priority` für LCP-Bilder wird automatisch gesetzt.

### Datenschutz und Kommentar-Spam

Das Core-Datenschutz-Tool erlaubt es Betreibern, Datenlöschanfragen (DSGVO-Auskunftspflicht) direkt aus dem WordPress-Admin heraus zu bearbeiten. Kommentar-Spam-Grundschutz ist über Akismet integriert – Akismet selbst ist zwar ein eigenes Plugin, aber kostenlos für persönliche Websites und direkt im Core-Installer verankert.

Für viele mittelgroße Websites mit überschaubarem Kommentaraufkommen ist Akismet zusammen mit den Core-Kommentareinstellungen ausreichend.

### Block-basierte Formulare ohne Plugin

Mit den neuen nativen Formular-Blöcken (eingeführt in WordPress 7.0 als Teil der Gutenberg-Roadmap Phase 4) können einfache Kontaktformulare, Newsletter-Anmeldungen und Umfragen direkt im Block Editor erstellt werden, ohne Plugins wie Contact Form 7 oder Gravity Forms. Die Daten werden verschlüsselt gespeichert und können CSV-exportiert werden.

Für komplexe Workflows (bedingte Logik, Zahlungsintegrationen, CRM-Anbindung) braucht man weiterhin spezialisierte Plugin-Lösungen – aber für ein einfaches Kontaktformular ist das Core-Tool vollkommen ausreichend.

## Full Site Editing: Das Theme als komplettes Design-System

Full Site Editing (FSE) macht das klassische Child-Theme-Konzept für viele Websites überflüssig. Im Site Editor lassen sich Header, Footer, Seitenlayouts und Blog-Templates vollständig anpassen – alles visuell, ohne PHP-Kenntnisse, direkt im Browser. `theme.json` ermöglicht eine zentrale Steuerung von Farben, Abständen, Typografie und Layout-Beschränkungen.

Was früher ein Child-Theme, ein Page-Builder und ein Design-Plugin erforderte, ist heute in einem einzigen FSE-kompatiblen Theme abbildbar. Die [Twenty Twenty-Six](https://wordpress.org/themes/twentytwentysix/) Theme – das Standard-Theme für WordPress 7.1 – demonstriert, wie weit diese Möglichkeiten gehen.

## Sicherheitsfunktionen im Core

WordPress hat im letzten Jahr erheblich in Core-Sicherheitsfunktionen investiert:

- **Automatische Hintergrundaktualisierungen** für Minor Releases sind seit langem Standard; ab WordPress 7.0 können auch Major Updates optional automatisch eingespielt werden.
- **Application Passwords** für API-Zugriffe sind nativ integriert – kein separates Plugin notwendig.
- **Login-Sicherheit**: Brute-Force-Schutz mit XMLRPC-Einschränkungen, Login-Ratenbegrenzung und optionale 2-Faktor-Authentifizierung über TOTP sind im Core verankert.
- **Integritätsprüfung**: WordPress überprüft bei Updates die Dateihashes aller Core-Dateien und warnt bei manipulierten Dateien.

## Wo Plugins unverzichtbar bleiben

Trotz aller Core-Fortschritte gibt es Bereiche, wo spezialisierte Plugins nach wie vor notwendig sind:

**SEO-Optimierung**: Yoast SEO, Rank Math oder All in One SEO bieten XML-Sitemaps, strukturierte Daten (Schema.org), Breadcrumbs, technische SEO-Audits und Redirects auf einem Niveau, das der Core nicht abbildet. Gerade für Websites, die auf organischen Traffic angewiesen sind, ist ein SEO-Plugin unverzichtbar.

**E-Commerce**: WooCommerce bleibt ohne Alternative für ernsthaften Online-Verkauf. Zwar gibt es einfache Kaufbuttons im Core, aber Lagerverwaltung, Zahlungsabwicklung, Steuerlogik und Versandoptionen erfordern WooCommerce oder einen vergleichbaren Spezialisten.

**Backups und Staging**: Core-WordPress hat kein integriertes Backup-System. UpdraftPlus, WP Migrate oder vergleichbare Plugins bleiben notwendig – es sei denn, der Hosting-Anbieter übernimmt Backups serverseitig.

**Advanced Custom Fields / Custom Post Types**: Für Websites mit komplexen Datenstrukturen – Immobilienportale, Jobboards, Eventkalender – braucht man weiterhin spezialisierte Plugins.

**Caching**: Während WordPress Core die Performance-Grundlage legt, brauchen Websites mit hohem Traffic immer noch Caching-Plugins wie WP Rocket oder LiteSpeed Cache, es sei denn, der Managed-Hosting-Anbieter übernimmt das auf Serverebene.

## Die Faustregel für 2026: Qualität vor Quantität

Die Diskussion auf r/wordpress zeigt eine klare Tendenz: Betreiber fahren besser mit wenigen, gut gewarteten Plugins aus stabilen Quellen als mit einem Zoo von 30 halb-aktiven Ergänzungen. Jedes Plugin ist eine potenzielle Angriffsfläche, ein potenzieller Performance-Einbruch und eine mögliche Inkompatibilitätsquelle.

Eine praktische Checkliste: Vor jeder Plugin-Installation sollte geprüft werden, ob WordPress Core die Funktion inzwischen nativ anbietet. Wenn nein, lohnt ein Blick auf die Plugin-Seite: Wann war das letzte Update? Hat der Entwickler einen aktiven Support-Thread? Gibt es Alternativen mit einer nachgewiesenen Wartungsgeschichte?

Die [WordPress Agentur Frankfurt am Main](/) von Frankfurt Marketing Studio hilft Unternehmen dabei, ihre WordPress-Installationen zu auditieren – überflüssige Plugins zu identifizieren, sichere Alternativen zu finden und Core-Funktionen richtig einzusetzen. Eine schlanke, gut gewartete Installation ist in 2026 die beste Versicherung gegen Sicherheitsvorfälle und Performance-Probleme.

## Quellen

- [WordPress Font Library – Documentation](https://wordpress.org/documentation/article/font-library/) — r/wordpress
- [Speculation Rules – Chrome Developers](https://developer.chrome.com/docs/web-platform/prerender-pages) — r/wordpress
- [Tried going plugin-free for a month – what I learned](https://www.reddit.com/r/Wordpress/comments/pluginfree) — r/wordpress

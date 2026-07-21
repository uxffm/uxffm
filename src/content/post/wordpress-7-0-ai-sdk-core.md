---
publishDate: 2026-05-17T00:00:00Z
title: "WordPress 7.0: Das KI-SDK wird Teil des Kerns"
excerpt: "WordPress 7.0 erscheint am 20. Mai 2026 und integriert das AI SDK direkt in den Core. Was das für Plugin-Entwickler und Website-Betreiber bedeutet."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-7-0-ai-sdk-core
---

WordPress steht kurz vor einem der bedeutendsten Updates der letzten Jahre: Am 20. Mai 2026 erscheint WordPress 7.0 – und mit ihm wird das AI SDK erstmals fester Bestandteil des Kerns. Was das konkret bedeutet, warum die Weichen bereits mit Gutenberg 22.7 gestellt wurden und wie sich Plugin-Entwickler sowie Website-Betreiber jetzt vorbereiten sollten, erklären wir in diesem Beitrag.

## WordPress 7.0 und das neue KI-Fundament

Bisher war künstliche Intelligenz in WordPress eine Angelegenheit einzelner Plugins – jeder Anbieter verwaltete seine eigenen API-Schlüssel, seine eigene Logik und seine eigene Oberfläche. Mit WordPress 7.0 ändert sich das grundlegend: Das KI-SDK, das bislang optional installiert werden musste, rückt direkt in den Core. Das bedeutet: Jede WordPress-Installation hat ab sofort Zugang zu einer einheitlichen KI-Infrastruktur – ohne zusätzliche Plugins, ohne Konfigurationsaufwand beim Nutzer.

Die Grundlage dafür wurde bereits mit [Gutenberg 22.7](https://wordpress.org/gutenberg/) gelegt, das am 11. März 2026 veröffentlicht wurde. Mit diesem Release kamen drei entscheidende Bausteine:

- **Credential Vault**: Ein zentraler Schlüsseltresor, auf den jedes Plugin zugreifen kann. Statt zehn verschiedene API-Zugänge zu verwalten, genügt ein einziger zentraler Eintrag.
- **Editorial Standard Store**: Eine gemeinsame Datenbank für redaktionelle Richtlinien, die sicherstellt, dass KI-generierte Inhalte denselben Stil und dieselbe Tonalität einhalten wie menschlich geschriebene Texte.
- **Capability Registry**: Eine Art Fähigkeits-Register, in dem KI-Agenten deklarieren, was sie können – und andere Plugins und Themes gezielt auf diese Fähigkeiten zugreifen können.

## Die offiziellen KI-Provider-Plugins

Parallel zu Gutenberg 22.7 veröffentlichte das WordPress-KI-Team drei offizielle Provider-Plugins: für Claude (Anthropic), Gemini (Google) und OpenAI. Diese Plugins werden direkt vom Core-Team gewartet – ein wichtiges Signal an den Markt. Statt unzähligen Drittanbieter-Integrationen mit unterschiedlicher Qualität gibt es nun einen offiziellen, gepflegten Kanal für jeden der großen KI-Anbieter.

Für Website-Betreiber bedeutet das: Sie wählen einmalig ihren bevorzugten KI-Anbieter aus, hinterlegen den API-Schlüssel im Credential Vault und alle kompatiblen Plugins können diese Verbindung nutzen – ohne weitere Konfiguration.

## Was ändert sich für Plugin-Entwickler?

Die WordPress-Community diskutiert das Thema intensiv – und die Meinungen gehen auseinander. Auf der einen Seite begrüßen viele Entwickler die klare Architektur: Wer bisher eigene API-Integrationen bauen musste, kann nun auf den gemeinsamen Stack zurückgreifen und spart erheblich Entwicklungszeit.

Auf der anderen Seite gibt es Vorbehalte gegenüber dem Editorial Standard Store. Kritiker sehen darin einen zu starken Eingriff in die redaktionelle Freiheit: Wer entscheidet, welche „Standardrichtlinien" für Inhalte gelten? Und wie individuell kann ein Unternehmen noch kommunizieren, wenn eine zentrale Stelle den Ton vorgibt?

Die Antwort des Teams: Der Store ist als Angebot gedacht, nicht als Pflicht. Plugins können die dort hinterlegten Richtlinien nutzen – müssen es aber nicht.

## Praktische Konsequenzen für Website-Betreiber

Wer WordPress aktuell betreibt, sollte vor dem Update auf 7.0 einige Punkte prüfen:

**Plugin-Kompatibilität**: Bestehende KI-Plugins, die eigene API-Integrationen mitbringen, müssen unter Umständen aktualisiert werden, um mit dem neuen Core-SDK zusammenzuarbeiten. Prüfen Sie die Changelogs Ihrer installierten Plugins und halten Sie Ausschau nach Kompatibilitätsupdates.

**Timing bei WooCommerce-Shops**: In der Community wird aktiv diskutiert, ob man eine geplante Shop-Migration lieber vor oder nach dem 7.0-Update durchführen sollte. Die klare Empfehlung: Führen Sie größere Migrationen erst durch, wenn das Update eingespielt und die wichtigsten Plugins aktualisiert sind – idealerweise 2–4 Wochen nach dem Release, wenn die erste Patch-Welle gerollt ist.

**Backups und Staging**: Wie bei jedem Major Release gilt: Vollständiges Backup anlegen, Update zuerst auf einer Staging-Umgebung testen, dann erst auf der Live-Site ausrollen.

## KI-Integration: Chance oder Risiko für kleine Unternehmen?

Für kleine und mittelständische Unternehmen, die WordPress als Marketing- und Verkaufsplattform nutzen, eröffnet WordPress 7.0 interessante Möglichkeiten. KI-gestützte Textvorschläge, automatisierte Kategorisierung von Inhalten oder smarte Produktbeschreibungen für WooCommerce – all das wird mit dem neuen SDK einfacher zu implementieren.

Gleichzeitig gilt: KI ist ein Werkzeug, kein Ersatz für strategisches Denken. Wer seine Website-Texte vollständig KI-generieren lässt, ohne redaktionelle Kontrolle, riskiert austauschbare Inhalte ohne erkennbare Markenpersönlichkeit. Der Mehrwert entsteht dort, wo KI Routine-Aufgaben übernimmt und Menschen sich auf das konzentrieren können, was wirklich zählt: Expertise, Authentizität und echte Kundennähe.

## Laut Community: Der Plugin-Markt unter Druck

Eine aktuelle Umfrage, die in der Reddit-Community viel diskutiert wird, zeigt: 48,8 Prozent der WordPress-Plugin-Unternehmen haben 2025 sinkende Umsätze verzeichnet. Die Ursachen sind vielfältig – KI-Tools ersetzen Funktionen, die früher dedizierte Plugins erforderten, der Markt ist gesättigt, und der Preisdruck wächst. WordPress 7.0 dürfte diesen Trend beschleunigen: Wer keine tiefe Integration mit dem neuen Core-Stack bietet, wird es schwerer haben, sich zu behaupten.

## Frankfurt Marketing Studio: Ihr Partner für WordPress 7.0

Als WordPress Agentur Frankfurt, die ausschließlich mit WordPress und WooCommerce arbeitet, verfolgen wir die Entwicklungen rund um WordPress 7.0 sehr genau. Wir begleiten Unternehmen in Frankfurt und Umgebung beim Update-Prozess, prüfen Plugin-Kompatibilität, optimieren bestehende Installationen und beraten zu sinnvollen KI-Integrationen – abgestimmt auf Ihre Marke und Ihre Zielgruppe.

Wenn Sie Fragen zu WordPress 7.0 oder dem Einsatz von KI auf Ihrer Website haben, sprechen Sie uns gerne an.

## Quellen

- [WordPress 7.0 drops May 20 – AI SDK becomes core, what does this mean for plugin developers?](https://www.reddit.com/r/wordpress/comments/mock1/wordpress_70_ai_sdk_core/) — r/wordpress
- [48.8% of WordPress plugin companies saw sales worsen in 2025](https://www.reddit.com/r/wordpress/comments/mock3/plugin_sales_declining/) — r/wordpress
- [Gutenberg 22.7 AI Connectors: unified credential vault for Claude, Gemini and OpenAI](https://www.reddit.com/r/wordpress/comments/mock2/gutenberg_227_ai_connectors/) — r/wordpress
- [WooCommerce migration timing: before or after WordPress 7.0?](https://www.reddit.com/r/wordpress/comments/mock4/woocommerce_migration_70/) — r/wordpress

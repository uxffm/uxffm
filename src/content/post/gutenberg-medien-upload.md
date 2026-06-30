---
publishDate: 2026-06-30T00:00:00Z
title: "Gutenberg 23.4: Robuste Medien-Uploads und UltraHDR für WordPress"
excerpt: "Gutenberg 23.4 macht Uploads netzwerkresistent, führt UltraHDR-Support ein und bringt neue Grid-Transforms für den Block-Editor."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/gutenberg-medien-upload
---

Resiliente Medien-Uploads, UltraHDR-Fotos und neue Grid-Layouts: Gutenberg 23.4, veröffentlicht am 17. Juni 2026, bringt praxisrelevante Neuerungen für alle, die regelmäßig Inhalte in WordPress pflegen – besonders für Teams, die mit großen Medienbibliotheken oder unzuverlässigen Netzwerkverbindungen arbeiten.

## Zuverlässige Medien-Uploads: Kein Datenverlust mehr bei Verbindungsabbrüchen

Wer kennt das nicht: Ein großes Foto oder ein Video wird hochgeladen, die Verbindung bricht ab – und der Upload ist verloren. Ab Gutenberg 23.4 gehört dieses Problem der Vergangenheit an.

Die Upload-Warteschlange pausiert automatisch, wenn keine Netzwerkverbindung vorhanden ist, und setzt genau dort fort, wo sie unterbrochen wurde, sobald die Verbindung zurückkommt. Zusätzlich gibt es jetzt einen Wiederholungsmechanismus mit exponentiellem Backoff: Schlägt ein Upload fehl, wird er automatisch wiederholt – zunächst nach kurzer Zeit, dann in immer längeren Abständen.

Für Redaktionsteams in Unternehmen oder Agenturen, die regelmäßig auf Messen, in Produktionshallen oder in Regionen mit schwachem WLAN arbeiten, ist das ein echter Fortschritt. Ein neu eingeführter Batch-Upload-Zähler im Editor zeigt außerdem transparent an, wie viele Dateien bereits übertragen wurden und wie viele noch ausstehen.

Technisch gesetzt das Update auf eine verbesserte Upload-Queue-Architektur: Statt Uploads als einmalige Anfragen zu behandeln, werden sie in einer persistenten Warteschlange verwaltet, die Netzwerkstatus-Änderungen aktiv überwacht. Das klingt nach einem Implementierungsdetail – in der Praxis bedeutet es aber, dass Redakteure sich beim Hochladen nicht mehr manuell darum kümmern müssen, ob die Verbindung stabil ist.

## UltraHDR: Bessere Fotos direkt in WordPress

Gutenberg 23.4 unterstützt jetzt nativ das UltraHDR-Format (nach ISO 21496-1). UltraHDR ist ein JPEG-Format mit eingebettetem Gain-Map, das auf HDR-Displays deutlich leuchtendere und detailreichere Bilder darstellt – auf normalen Displays wird automatisch die Standard-SDR-Version angezeigt. Das Format ist abwärtskompatibel: Ein UltraHDR-Foto sieht auf einem gewöhnlichen Monitor genauso aus wie ein normales JPEG, nutzt aber auf modernen HDR-Bildschirmen die volle Leistung.

Was das praktisch bedeutet: WordPress speichert UltraHDR-Originale unverändert und legt für die Größenvarianten (Thumbnails, Medium, Large) ebenfalls HDR-kompatible Versionen an. Die Gain Map – das technische Herzstück des Formats – bleibt in allen Größen erhalten.

Das ist besonders relevant für Fotografen, Immobilienmakler, Restaurants und Hotels, die ihre Produkte oder Räumlichkeiten in bestmöglicher Qualität präsentieren möchten. Viele aktuelle Android-Flaggschiff-Smartphones schießen bereits UltraHDR-Fotos. Bisher gingen diese beim Upload in WordPress auf die SDR-Version zurück; jetzt landet die volle Bildqualität direkt in der Medienbibliothek und auf den Seiten der Website.

Für Websites, die auf visuellen Eindruck setzen – Portfolio-Seiten, Gastronomie-Auftritte, Eventfotografie – ist das eine stille, aber bedeutende Verbesserung der Qualität ohne zusätzlichen Aufwand.

## Grid-Transforms: Layouts schnell wechseln

Eine weitere Neuerung in Gutenberg 23.4 vereinfacht die Arbeit mit dem Block-Editor erheblich: Block-Transforms können jetzt gezielt auf eine bestimmte Variation eines Blocks zielen. In der Praxis ermöglicht das neue direkte Umwandlungen von Spalten- und Galerie-Blöcken in ein Grid-Layout – alle Inhalte bleiben dabei vollständig erhalten, nur die Darstellungsform wechselt.

Wer bisher eine mehrspaltige Galerie in ein Grid-Layout umwandeln wollte, musste Blöcke manuell neu anordnen oder komplett neu aufbauen. Mit dem neuen Transform-System reicht ein Klick: Der Block erkennt den Zielblock-Typ (in diesem Fall die Grid-Variation) und überführt die Struktur automatisch.

Für Webdesigner und Content-Manager bedeutet das weniger manuelle Arbeit beim Layoutwechsel und mehr Flexibilität beim schnellen Ausprobieren verschiedener Darstellungsformen. Gerade bei der Überarbeitung älterer Seiten, auf denen man ein Spalten-Layout durch ein moderneres Grid ersetzen möchte, spart das erheblich Zeit.

## Media-Editor-Verbesserungen im Detail

Der integrierte Media-Editor, der mit WordPress 7.0 eingeführt wurde, erhält in Gutenberg 23.4 weitere Verfeinerungen:

**Feld-Umsortierung:** Metadaten-Felder im Media-Editor lassen sich nun manuell neu anordnen. Das ist hilfreich für Teams, die bestimmte Felder (wie Alt-Text oder Bildunterschrift) immer prominent sehen möchten.

**Seitenverhältnis-Steuerung für mobile Ansichten:** Bilder können jetzt spezifisch für Mobilgeräte auf ein anderes Seitenverhältnis zugeschnitten werden. Ein Titelbild, das im Desktop-Layout breit und flach wirkt, kann für Smartphones automatisch in ein quadratisches oder hochformatiges Zuschnittformat wechseln.

**Zoom-Regler ersetzt durch +/–-Schaltflächen:** Beim Zuschneiden von Bildern war der Zoom-Regler oft schwer zu bedienen, besonders auf Touchscreens. Die neuen +/–-Schaltflächen bieten präzisere Kontrolle.

**Modal-Layout überarbeitet:** Der Editor öffnet sich schneller und reagiert flüssiger, weil das interne Layout-Rendering optimiert wurde.

Diese Detailverbesserungen mögen einzeln klein wirken, summieren sich aber für Teams, die täglich viele Bilder pflegen, zu einer spürbaren Zeitersparnis.

## React 19: Der kontrollierte Übergang beginnt

Für Entwicklerinnen und Entwickler besonders relevant: Gutenberg 23.4 führt ein experimentelles Flag ein, mit dem die React-19-Laufzeit für Skripte (`react`, `react-dom`, `react-jsx-runtime`) registriert werden kann. Plugins, Themes und Blöcke können damit schon jetzt gegen React 19 getestet werden, bevor die neue Version zum Standard wird.

Das ist ein bewusster Schritt nach dem temporären Rückzug von React 19 in Gutenberg, der Ende Mai 2026 für erhebliche Unruhe in der Community gesorgt hatte: Viele Plugins hatten sich auf React-19-spezifisches Verhalten verlassen und waren plötzlich mit Kompatibilitätsproblemen konfrontiert. Statt wieder einen überstürzten Wechsel zu riskieren, setzt das Core-Team diesmal auf einen kontrollierten, opt-in-basierten Übergang.

Wer als Entwickler bereits jetzt testen möchte, wie das eigene Plugin oder Theme unter React 19 läuft, kann das Flag aktivieren und Probleme frühzeitig identifizieren und beheben – bevor der Wechsel verpflichtend wird.

## Was Gutenberg 23.4 für Ihre Website bedeutet

Gutenberg 23.4 ist kein Update, das sofort sichtbare optische Veränderungen bringt. Es verbessert stattdessen die Zuverlässigkeit beim Medien-Upload, erschließt neue Bildformate und macht Layout-Arbeit effizienter.

Wenn Sie WordPress 7.0 einsetzen und das [Gutenberg-Plugin](https://wordpress.org/plugins/gutenberg/) installiert haben, erhalten Sie diese Verbesserungen bereits mit der aktuellen Plugin-Version. Für alle anderen fließen die Funktionen spätestens mit WordPress 7.1 in den Core ein, das für August 2026 geplant ist. Die offiziellen Details zu Gutenberg 23.4 sind im [Make WordPress Core Blog](https://make.wordpress.org/core/2026/06/17/whats-new-in-gutenberg-23-3-03-jun-2/) dokumentiert.

Besonders wenn Ihre Website regelmäßig mit Bildmaterial arbeitet – ob Produktfotos, Reportage-Bilder oder Eventfotos – lohnt es sich, die neuen Medien-Funktionen frühzeitig zu evaluieren. UltraHDR wird in der Fotografie-Community bereits intensiv diskutiert, und Websites, die das Format früh unterstützen, profitieren von einer deutlich besseren Bildqualität auf modernen Displays.

Als [Frankfurter WordPress Agentur](/) unterstützen wir Sie bei der Evaluierung und Umsetzung von WordPress-Updates – von der Kompatibilitätsprüfung Ihrer bestehenden Plugins bis zur Einrichtung optimierter Medien-Workflows für Ihr Team.

## Quellen

- [What's new in Gutenberg 23.4? (June 17, 2026)](https://make.wordpress.org/core/2026/06/17/whats-new-in-gutenberg-23-3-03-jun-2/) — r/wordpress
- [What's new in Gutenberg 23.3? (June 03, 2026)](https://make.wordpress.org/core/2026/06/03/whats-new-in-gutenberg-23-3-03-jun/) — r/wordpress
- [Announcing a collaborative editing outreach effort for 7.1](https://make.wordpress.org/core/2026/06/03/announcing-a-collaborative-editing-outreach-effort-for-7-1/) — r/wordpress

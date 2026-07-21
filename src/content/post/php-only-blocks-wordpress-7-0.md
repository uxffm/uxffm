---
publishDate: 2026-05-18T00:00:00Z
title: "PHP-Only Blocks in WordPress 7.0: Blöcke endlich ohne React"
excerpt: "WordPress 7.0 erlaubt Block-Registrierung in reinem PHP – ohne React, Node.js oder Build-Tools. Was das für WordPress-Entwickler bedeutet."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/php-only-blocks-wordpress-7-0
---

Seit der Einführung von Gutenberg war Block-Entwicklung gleichbedeutend mit JavaScript, React und einem mehr oder weniger aufwändigen Build-Prozess. Für PHP-Entwickler, die ihr ganzes Berufsleben in WordPress gearbeitet haben, bedeutete das: entweder eine steile Lernkurve oder der Rückzug auf Classic-Widgets und Shortcodes. WordPress 7.0 räumt dieses Hindernis aus dem Weg – mit PHP-only Block Registration, einer der meisterwarteten Neuerungen für traditionelle WordPress-Entwickler.

## Was sind PHP-Only Blocks?

PHP-only Blocks sind Gutenberg-Blöcke, die ausschließlich mit PHP registriert und gerendert werden. Bisher war für jeden Block ein JavaScript-Einstiegspunkt erforderlich – mindestens eine `index.js`-Datei, ein Build-Schritt mit `@wordpress/scripts` und in vielen Fällen auch React-Kenntnisse für die Editor-Oberfläche. Diese Anforderungen haben viele erfahrene WordPress-Entwickler davon abgehalten, eigene Blöcke zu bauen.

Mit der neuen Methode genügt eine einzige PHP-Datei. Der Block wird per `register_block_type()` registriert, die `block.json` definiert die Attribute, und WordPress generiert die Editor-Oberfläche automatisch – inklusive Inspector Controls. Das dev note zu diesem Feature wurde am 3. März 2026 von Miguel Fonseca auf [Make WordPress Core](https://make.wordpress.org/core/2026/03/03/php-only-block-registration/) veröffentlicht und ist seit Gutenberg 22.3 verfügbar.

## Wie die technische Umsetzung aussieht

Die Implementierung ist überraschend schlank. Statt eines kompletten Build-Setups reicht eine `block.json` mit den definierten Attributen und eine PHP-Datei für die Darstellung im Frontend:

```json
{
  "name": "mein-plugin/info-box",
  "title": "Info Box",
  "attributes": {
    "inhalt": { "type": "string", "default": "" },
    "hintergrundfarbe": { "type": "string", "default": "#f5f5f5" }
  },
  "render": "file:./render.php"
}
```

WordPress liest die deklarierten Attribute aus und baut daraus automatisch eine einfache Editor-Oberfläche: Textfelder für String-Attribute, Toggles für Boolean-Werte, Farbwähler für Color-Attribute. Das ist weit weniger mächtig als eine vollständig selbst entwickelte React-Komponente – aber für viele Anwendungsfälle vollkommen ausreichend.

Die Registrierung auf PHP-Seite bleibt dabei vertraut:

```php
register_block_type( __DIR__ . '/block.json', [
    'render_callback' => 'mein_plugin_render_info_box',
] );

function mein_plugin_render_info_box( $attributes ) {
    $inhalt = esc_html( $attributes['inhalt'] ?? '' );
    $farbe  = sanitize_hex_color( $attributes['hintergrundfarbe'] ?? '#f5f5f5' );
    return "<div class=\"info-box\" style=\"background:{$farbe}\">{$inhalt}</div>";
}
```

Kein Webpack, kein Babel, kein `npm install` – nur PHP.

## Wann sich PHP-Only Blocks eignen

Nicht jeder Block braucht komplexe Client-seitige Logik. PHP-only Blocks eignen sich ideal für Inhaltsblöcke, die server-seitig gerendert werden und keine interaktive Editor-Erfahrung benötigen:

- **Testimonial-Blöcke** mit Bild, Name und Zitat
- **Öffnungszeiten-Widgets** mit strukturierten Feldern
- **FAQ-Einträge** mit Frage-und-Antwort-Struktur
- **Produkt-Highlight-Blöcke** für WooCommerce-Seiten
- **Kontaktinformationen** wie Adresse, Telefon, Anfahrtsbeschreibung

All das sind Blöcke, bei denen die Eingabe einfach strukturiert ist und das Rendering vollständig auf dem Server stattfinden kann. Kein Live-Preview im Editor nötig, keine komplexen Interaktionen, kein Grund für React.

## Die Grenzen des Ansatzes

PHP-only Blocks sind kein Ersatz für vollwertige Gutenberg-Blöcke. Das Entwicklerteam hat bei der Einführung klar kommuniziert, welche Funktionen nicht unterstützt werden:

**Kein InnerBlocks-Support.** Wer verschachtelte Blöcke braucht – etwa einen Container, der andere Blöcke aufnehmen kann – kommt um JavaScript nicht herum. InnerBlocks ist konzeptionell zu eng mit dem React-basierten Editor verknüpft.

**Keine Rich-Text-Bearbeitung im Editor.** Wer direkt im Editor mit Formatierungen arbeiten will – fett, kursiv, Links innerhalb von Textbereichen – braucht das `RichText`-Component aus React. PHP-only Blocks bieten nur einfache Textfelder im Inspector Panel.

**Kein Media-Library-Picker.** Das Einbinden von Bildern über die WordPress-Mediathek erfordert den JavaScript-basierten MediaUpload-Dialog. Ohne JS gibt es keinen direkten Zugang zur Mediathek im Blockeditor.

Diese Einschränkungen sind bewusst gewählt. Das Ziel war nie, eine vollständige Alternative zu React-Blocks zu schaffen, sondern eine niedrigschwellige Option für einfache, server-seitig gerenderte Inhalte.

## Was das für die WordPress-Community bedeutet

Die Reaktion in der Community ist überwiegend positiv – besonders unter erfahrenen PHP-Entwicklern, die bisher einen Bogen um die Gutenberg-Entwicklung gemacht haben. Viele sehen PHP-only Blocks als den lang ersehnten Einstiegspunkt in die Block-Welt.

Für Agenturen und Freelancer, die hauptsächlich mit WordPress arbeiten, öffnet sich damit eine praktische Möglichkeit: Einfache Custom-Blöcke für Kunden lassen sich jetzt im bestehenden Workflow umsetzen, ohne ein JavaScript-Build-System einrichten zu müssen. Das beschleunigt Projekte und senkt die Einstiegshürde für Blockanpassungen erheblich.

Gleichzeitig warnen erfahrenere Gutenberg-Entwickler vor einer zu breiten Anwendung: Wer heute mit PHP-only Blocks anfängt und morgen feststellt, dass der Kunde doch Rich Text oder verschachtelte Layouts benötigt, steht vor einer vollständigen Neuentwicklung. Eine gründliche Anforderungsanalyse vorab ist daher unverzichtbar.

## Empfehlungen für den Praxiseinsatz

Wenn Sie PHP-only Blocks in Projekten einsetzen wollen, empfehlen sich folgende Grundsätze:

1. **Anforderungen klar definieren**: Bevor Sie sich für PHP-only entscheiden, prüfen Sie, ob der Block dauerhaft ohne Rich-Text, Mediathek und InnerBlocks auskommt.
2. **`block.json` vollständig pflegen**: Attribute sauber typisieren, Defaults setzen und apiVersion auf den aktuellen Wert setzen – das erleichtert spätere Erweiterungen.
3. **Naming-Konventionen einhalten**: Namespaced Block-Namen nach dem Schema `mein-plugin/block-name` verhindern Konflikte mit anderen Plugins oder Theme-Blöcken.
4. **Rendering absichern**: Server-seitiges Rendering muss alle Ausgaben konsequent escapen – `esc_html()`, `esc_attr()`, `wp_kses_post()` je nach Kontext. Unsicheres Rendering ist bei PHP-Blöcken genauso gefährlich wie in jedem anderen PHP-Code.
5. **In FSE-Kontexten testen**: Server-seitige Blöcke verhalten sich in Full-Site-Editing-Templates und Query-Loops anders als im klassischen Editor. Ausgiebige Tests auf Staging verhindern Überraschungen im Live-Betrieb.

## WordPress 7.0: Jetzt vorbereiten

WordPress 7.0 erscheint am 20. Mai 2026 – in wenigen Tagen. Für Website-Betreiber gilt wie bei jedem Major Release: vollständiges Backup anlegen, Update zuerst in einer Staging-Umgebung testen, Plugin-Kompatibilität prüfen und erst dann auf der Live-Site ausrollen. Die [offizielle WordPress-Entwickler-Dokumentation](https://developer.wordpress.org/block-editor/) bietet den besten Einstieg in die neuen Block-APIs.

PHP-only Blocks sind dabei nur eine von mehreren Neuerungen in 7.0: Das WP AI Client SDK wird Teil des Kerns, der Admin-Bereich bekommt sein größtes Redesign seit über einem Jahrzehnt, und das DataViews-System ersetzt die alten Listen-Tabellen durch eine moderne, filterbare Oberfläche. Es lohnt sich, rechtzeitig informiert zu sein und keine überstürzten Updates unmittelbar nach dem Release einzuspielen.

## Frankfurt Marketing Studio hilft bei der Umsetzung

Als WordPress-Experten aus Frankfurt entwickeln wir maßgeschneiderte Lösungen für Unternehmen in Frankfurt und der Rhein-Main-Region – von Custom-Blocks über Theme-Entwicklung bis hin zur Plugin-Integration und WooCommerce-Projekten. Wenn Sie Fragen zu PHP-only Blocks, zu WordPress 7.0 oder zur Entwicklung individueller Blocklösungen für Ihre Website haben, sprechen Sie uns gerne an.

## Quellen

- [PHP-only block registration – Make WordPress Core](https://make.wordpress.org/core/2026/03/03/php-only-block-registration/) — r/wordpress
- [PHP-Only Blocks in WordPress 7.0 – InstaWP](https://instawp.com/php-only-blocks-wordpress-7/) — r/wordpress
- [WordPress 7.0 Beta 2 Review – PHP-Only Blocks & What Actually Matters](https://vitaliikaplia.com/en/wordpress-7-what-awaits-us/) — r/wordpress

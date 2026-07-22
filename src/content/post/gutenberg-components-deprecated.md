---
publishDate: 2026-07-22T00:00:00Z
title: "Gutenberg 23.5: Komponenten-Deprecation – was Plugin-Autoren jetzt tun müssen"
excerpt: "Zehn Kernkomponenten in @wordpress/components sind hard-deprecated, React 19 ist testbar – so handeln Plugin-Entwickler vor WordPress 7.1 richtig."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/gutenberg-components-deprecated
---

Die WordPress-Entwickler-Community beschäftigt sich in diesen Wochen intensiv mit zwei eng verwandten Veränderungen: einer koordinierten Deprecation-Welle quer durch `@wordpress/components` in Gutenberg 23.5 sowie einem experimentellen React-19-Flag in Gutenberg 23.4, das Entwicklern erstmals eine sichere Testumgebung bietet. Beide Änderungen laufen auf dasselbe Ziel zu – ein sauberes, zukunftsfestes Fundament für WordPress 7.1, das am 19. August 2026 erscheinen soll. Wer Plugin- oder Theme-Code pflegt, sollte jetzt handeln, nicht erst nach dem Release.

## Was ist die __next40pxDefaultSize-Hard-Deprecation?

Vor einigen Jahren führte das WordPress-Core-Team die Prop `__next40pxDefaultSize` in vielen Formular-Komponenten ein. Der Hintergrund: Die Standardgröße der Steuerelemente sollte von 36 auf 40 Pixel angehoben werden – ein Schritt, der die Barrierefreiheit verbessert und das visuelle Design vereinheitlicht. Um bestehende Plugin-UIs nicht über Nacht zu zerstören, gab es einen Opt-in: Wer die 40-Pixel-Größe wollte, übergab `__next40pxDefaultSize={true}`, alle anderen behielten vorerst die alte Größe.

Dieses Übergangsfenster schließt sich nun. Mit Gutenberg 23.5, das direkt in WordPress 7.1 eingeflossen ist, wurde die Prop in zehn Kernkomponenten **hard-deprecated**:

- `TextControl`
- `BoxControl`
- `BorderControl`
- `FontSizePicker`
- `RangeControl`
- `ComboboxControl`
- `ToggleGroupControl`
- `UnitControl`
- `FormTokenField`
- `CustomSelectControl`

„Hard-deprecated" bedeutet in diesem Kontext: Die Prop wird nicht aus der TypeScript-Typdefinition entfernt – vorhandener Code kompiliert weiterhin ohne Fehler. Aber der Laufzeit-Handler ist verschwunden. Die 40-Pixel-Größe ist nun fest in den Standardstilen verankert, und die Prop ist ein No-op. Übergibt Ihr Plugin-Code `__next40pxDefaultSize={true}`, passiert nichts Schlimmes – außer dass eine Deprecation-Warnung in der Browserkonsole erscheint. Verlässt sich Ihr UI hingegen auf die alte 36-Pixel-Standardgröße, weil die Prop bewusst weggelassen wurde, kann das Layout nun unerwartet größer wirken.

## Welche Auswirkungen hat das auf bestehende Plugins?

Für die meisten Plugins sind die praktischen Folgen überschaubar, aber sie variieren je nach Situation:

**Szenario 1 – Sie übergeben `__next40pxDefaultSize={true}`:** Alles funktioniert weiterhin korrekt. Die Prop ist ein No-op, der visuelle Output bleibt identisch. Sie können die Prop im nächsten Release sauber entfernen; ein guter Zeitpunkt ist, wenn Sie das Minimum-WordPress auf 7.1 anheben.

**Szenario 2 – Sie übergeben die Prop nicht und haben kein eigenes CSS für die Komponentenhöhe:** Ihre UI wird ab WordPress 7.1 um 4 Pixel höher dargestellt. Prüfen Sie Ihre Plugin-Einstellungsseiten, Block-Sidebars und Inspector-Controls in einem Staging-System mit WordPress 7.1 Beta 1 (seit 15. Juli verfügbar) – in den meisten Fällen ist kein Layout-Bruch zu erwarten, aber es ist besser, es selbst zu sehen als sich auf Nutzerfeedback zu verlassen.

**Szenario 3 – Sie übergeben `__next40pxDefaultSize={false}`:** Das war die explizite Entscheidung für die alte Größe. Diese Prop-Kombination ist nun vollständig wirkungslos; überprüfen Sie, ob das ursprüngliche Layout-Ziel noch anderweitig erreicht wird.

Die [offizielle GitHub-Diskussion zum Thema](https://github.com/WordPress/gutenberg/issues/55401) dokumentiert den gesamten Migrationspfad seit der ersten Soft-Deprecation und ist eine gute Referenz, wenn Sie den Kontext vertiefen möchten.

## React 19 jetzt testen – bevor es Pflicht wird

Parallel zur Komponenten-Deprecation bringt Gutenberg 23.4 ein experimentelles Feature-Flag für React 19. Aktiviert wird es im WordPress-Backend unter `/wp-admin/admin.php?page=experiments-wp-admin` – dort findet sich der Schalter „React 19". Nach der Aktivierung tauscht Gutenberg zur Laufzeit die React-18-Bundles gegen React-19-Bundles aus und simuliert damit exakt die Situation, die Plugin-Entwickler erwartet, sobald WordPress den Sprung macht.

Warum ist das wichtig? Im Juni 2026 hatte Gutenberg 23.3 React 19 bereits scharfgestellt – mit fatalen Folgen: Zahlreiche Plugins crashten auf dem neuen Runtime. Ursache war eine inkompatible Element-Shape zwischen React 18 und 19; Plugins, die ihr eigenes `react/jsx-runtime`-Bundle mitbrachten, produzierten Elemente, die React 19 aktiv ablehnte. Das Core-Team rollte die Änderung innerhalb von zwei Tagen zurück und entwickelte eine Kompatibilitätslösung.

Mit dem experimentellen Flag können Plugin-Autoren jetzt selbst testen, ob ihr Code betroffen ist, ohne eine Produktivsite zu riskieren. Die Kompatibilitäts-Polyfills loggen Konsolenwarnungen, sobald ein Plugin auf eine entfernte Legacy-Interna stößt. Konkret sollten Sie das Flag aktivieren, wenn Ihr Plugin:

- kompiliertes JSX ausliefert,
- `@wordpress/element` direkt importiert,
- oder Editor-Interna wie `wp.blocks`, `wp.editor` oder `wp.components` direkt aufruft.

Das Plugin-Check-Tool von WordPress.org hat bereits ein [entsprechendes Issue für automatische React-19-Kompatibilitätsprüfungen](https://github.com/WordPress/plugin-check/issues/1356) – es lohnt sich, dieses Issue zu verfolgen, da eine automatisierte Warnung im Plugin-Check-Workflow die Hürde für Community-Plugins erheblich senken würde.

## Zeitplan: Wann müssen Sie handeln?

Die Zeitfenster sind eng, aber machbar:

- **Jetzt bis 15. Juli (bereits laufend):** WordPress 7.1 Beta 1 ist verfügbar. Testen Sie Ihre Plugins auf einem Staging-System gegen die Beta, aktivieren Sie das React-19-Flag und prüfen Sie die Konsolenausgabe.
- **Ab ca. 22. Juli:** Weitere wöchentliche Betas folgen. Behobene Bugs sollten jetzt als Fixes eingereicht werden, nicht erst im RC-Fenster.
- **5. August:** Release Candidate 1 – an diesem Punkt sollten alle Plugin-Anpassungen bereits gemergt und veröffentlicht sein.
- **19. August:** Finales Release von WordPress 7.1. Nach diesem Datum werden veraltete Prop-Übergaben auf allen Updates live sichtbar sein.

## Was tun, wenn Sie keinen eigenen Plugin-Code pflegen?

Für Website-Betreiber ohne eigene Entwicklungskapazitäten sieht die Lage entspannter aus: Die Änderungen betreffen ausschließlich den Admin-Bereich und Plugin-UIs, nicht den Frontend-Bereich Ihrer Website. Trotzdem empfehlen wir, vor dem 7.1-Update alle aktiven Plugins auf Kompatibilitätshinweise der jeweiligen Entwickler zu prüfen und – wie immer – vorab ein vollständiges Backup zu erstellen.

Wer regelmäßig WordPress-Updates betreut, kennt das Muster: Die eigentliche Arbeit liegt nicht im Einspielen des Updates, sondern in der Vorbereitung. Genau hier unterstützen wir als [WordPress-Agentur aus Frankfurt](/) unsere Kunden: vom Compatibility-Check über das Staging-Testing bis zur sicheren Livestellung nach jedem Major-Release.

## Fazit: Jetzt testen, später ruhig schlafen

Die Deprecation-Welle in Gutenberg 23.5 ist kein dramatischer Einschnitt, aber ein klares Signal: Das Core-Team räumt auf und erwartet, dass Plugin-Autoren mitziehen. Die `__next40pxDefaultSize`-Prop hat ihre Schuldigkeit getan; wer sie noch in seinem Code hat, sollte sie in Ruhe entfernen. Wichtiger ist der React-19-Kompatibilitätstest – dieser hat das Potenzial, Plugin-UIs auf Produktivsites tatsächlich zu brechen, wenn das nächste Mal kein experimentelles Flag schützt.

Beta 1 läuft, das Experiment-Flag ist aktiv: Es gibt keinen besseren Zeitpunkt als jetzt.

## Quellen

- [WordPress 7.1 Beta cycle – WordPress on X](https://x.com/WordPress/status/2076290641122800003) — r/wordpress
- [React 19 Upgrade in WordPress – Make WordPress Core](https://make.wordpress.org/core/2026/05/27/react-19-upgrade-in-wordpress/) — r/wordpress
- [__next40pxDefaultSize promises BC break – GitHub Issue #55401](https://github.com/WordPress/gutenberg/issues/55401) — r/wordpress

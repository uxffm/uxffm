---
publishDate: 2026-07-27T00:00:00Z
title: "WordPress Block Themes & Full Site Editing: Lohnt sich der Umstieg?"
excerpt: "Full Site Editing spaltet die WordPress-Community. Wir zeigen, was Block Themes heute leisten, wo die Stolpersteine liegen und für wen der Wechsel sinnvoll ist."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-block-themes-fse
---

Full Site Editing (FSE) und Block Themes sind seit Jahren das meistdiskutierte Thema in der WordPress-Community — auf r/wordpress kaum eine Woche ohne Fragen wie „Lohnt sich der Wechsel wirklich?", „Welches Block Theme empfehlt ihr?" oder „Wie migriere ich von meinem Classic Theme?" Dieser Artikel gibt Ihnen einen ehrlichen Überblick über den aktuellen Stand von FSE, die Stärken und Schwächen von Block Themes und hilft Ihnen zu entscheiden, ob und wann ein Umstieg für Ihr Projekt sinnvoll ist.

## Was sind Block Themes und warum ist Full Site Editing so ein großes Thema?

Klassische WordPress-Themes steuern das Aussehen einer Website über PHP-Templates, CSS und einen begrenzten Customizer. Mit der Einführung des Gutenberg-Editors begann WordPress, diese Trennung aufzuweichen. Full Site Editing geht einen Schritt weiter: Es übergibt die komplette Kontrolle über das Layout — Header, Footer, Seitenvorlagen, Archivseiten — an den Block Editor.

Ein **Block Theme** ist ein Theme, das komplett auf Blöcken basiert. Es liefert keine PHP-Templates mehr für einzelne Seitenbereiche, sondern HTML-Vorlagen im `templates/`-Ordner, die der Editor lesen und visuell bearbeiten kann. Das Ergebnis: Redakteure und Designer können nahezu jedes Element der Website ohne Code-Kenntnisse anpassen.

Die WordPress-Community ist bei diesem Thema gespalten — und das aus guten Gründen. Auf der einen Seite ermöglichen Block Themes eine Flexibilität, die früher nur mit Page Buildern oder tiefem Theme-Know-how erreichbar war. Auf der anderen Seite bricht FSE jahrelang aufgebautes Wissen über Classic Themes und den Customizer auf. Viele erfahrene Entwicklerinnen und Entwickler berichten, dass sie sich mit FSE fast wie Anfänger fühlen.

## Was Block Themes heute wirklich können

Die Fortschritte seit den ersten FSE-Releases sind erheblich. Die aktuelle [WordPress-Core-Dokumentation zu Block Themes](https://developer.wordpress.org/themes/block-themes/) zeigt, wie ausgereift das System inzwischen ist.

**Globale Stile (theme.json):** Die `theme.json`-Datei ist das Herzstück jedes Block Themes. Hier definieren Sie Farben, Typografie, Abstände und Layout-Einstellungen global — ähnlich einer Design-Token-Datei. Änderungen wirken sich sofort auf alle Blöcke aus. Das schafft konsistente Designs, ohne class-by-class CSS schreiben zu müssen.

**Template-Teile und Vorlagen:** Mit dem Site Editor können Sie Header, Footer und einzelne Seitenvorlagen visuell bearbeiten. Vorlagen für Blogarchive, Single Posts, Produkte (bei WooCommerce) oder benutzerdefinierte Post-Typen lassen sich direkt im Editor anlegen und duplizieren.

**Muster (Block Patterns):** Wiederverwendbare Block-Kombinationen lassen sich als Muster speichern und in der Musterbibliothek verwalten. Das ist besonders nützlich für Teams, die dieselben Layoutbausteine auf mehreren Seiten einsetzen.

**Query Loop Block:** Einer der mächtigsten Blöcke in FSE-Projekten. Er ermöglicht dynamische Inhaltslistings — ähnlich einer WP_Query — vollständig im Editor konfigurierbar. Für Blogs, Portfolio-Seiten oder Produktlisten ist das ein erheblicher Fortschritt gegenüber statischen Shortcodes.

## Wo Block Themes und FSE noch Schwächen zeigen

Ehrlichkeit ist hier wichtiger als Euphorie. Es gibt weiterhin Bereiche, in denen Block Themes Projektteams vor Herausforderungen stellen.

**WooCommerce-Integration:** WooCommerce hat die Unterstützung für Block Themes deutlich verbessert, aber komplexe Shops — mit benutzerdefinierten Checkout-Flows, Mitgliederseiten oder umfangreichen Produktattributen — erfordern weiterhin erheblichen Entwicklungsaufwand. Viele WooCommerce-Extensions rendern klassische PHP-Templates, die im Site Editor unsichtbar sind.

**Gutenberg-Plugins und Block-Bibliotheken:** Drittanbieter-Plugins, die zusätzliche Blöcke liefern, haben unterschiedliche Qualität. Manche integrieren sich nahtlos in `theme.json`, andere bringen eigenes CSS mit, das die globalen Stile überschreibt und zu uneinheitlichem Design führt.

**Migration bestehender Websites:** Die Migration von einem Classic Theme zu einem Block Theme ist keine Kleinigkeit. Widgets werden zu Blöcken, Shortcodes müssen durch Block-Äquivalente ersetzt werden, und Child Themes funktionieren anders als gewohnt. Für etablierte Websites empfiehlt sich ein schrittweiser Ansatz oder ein vollständiger Relaunch.

**Performance durch unkontrollierte Block-Stile:** Jedes Block-Plugin lädt potenziell eigene CSS- und JavaScript-Dateien. Ohne aktives Performance-Management kann FSE-Projekte trotz leistungsstarker Hardware langsam machen. Hier helfen Tools wie das [Perfmatters Plugin](https://perfmatters.io/) zur selektiven Skript-Deaktivierung.

## Welche Block Themes empfiehlt die Community?

Auf r/wordpress tauchen immer wieder dieselben Empfehlungen auf, und das aus gutem Grund:

**Twenty Twenty-Four / Twenty Twenty-Five:** Die offiziellen Standard-Themes sind hervorragende Ausgangspunkte für Entwickler, die FSE lernen wollen. Sie sind schlank, gut dokumentiert und zeigen Best Practices für `theme.json`.

**Kadence Blocks mit Kadence Theme:** Kadence hat sich als de-facto-Standard für viele professionelle WordPress-Projekte etabliert. Das kostenlose Theme bietet solide Block-Unterstützung, und die Pro-Version erweitert es um erweiterte Layouts und WooCommerce-Integration.

**GeneratePress:** Langjährige Community-Empfehlung für performance-optimierte Projekte. GeneratePress unterstützt FSE in seiner Block-Theme-Variante und bietet dabei sehr schlanken Output.

**Blocksy:** Besonders für WooCommerce-Projekte beliebt. Blocksy bringt tiefe WooCommerce-Integration und einen eigenen Block-Builder mit, der viele Drittanbieter-Plugins überflüssig macht.

## Für wen lohnt sich der Wechsel zu Block Themes jetzt?

Die Frage ist nicht ob, sondern wann und für welche Projekte. Hier eine ehrliche Einschätzung:

**Jetzt wechseln, wenn:**
- Sie ein neues Projekt starten, das längerfristig gepflegt wird
- Ihr Team regelmäßig neue Seiten und Templates anlegt und von der visuellen Bearbeitung profitiert
- Sie auf Plugin-Abhängigkeiten für Page Builder verzichten möchten
- Das Projekt relativ standard-nahe ist (Blog, Unternehmenswebsite, einfacher Shop)

**Noch warten oder Classic Theme behalten, wenn:**
- Eine bestehende Website mit vielen Seiten und komplexen Shortcodes migriert werden müsste
- WooCommerce-Extensions im Einsatz sind, die klassische Templates voraussetzen
- Das Team keine Kapazität für die Lernkurve hat
- Hochgradig benutzerdefinierte PHP-Logik im Theme verankert ist

## Praktische Tipps für den Einstieg in Block Themes

Wenn Sie einsteigen wollen, beginnen Sie mit einer frischen Installation und einem offiziellen Theme als Basis. Arbeiten Sie sich durch die `theme.json`-Datei, bevor Sie im Site Editor Änderungen vornehmen — das Verständnis der Designtoken-Logik macht vieles einfacher. Nutzen Sie Browser-DevTools konsequent, um zu verstehen, welche Blöcke welche CSS-Klassen ausgeben.

Für Teams empfiehlt sich außerdem ein eigenes Child-Theme oder ein vollständiges Custom Block Theme, das über eine klare `theme.json`-Struktur verfügt. Das verhindert, dass Theme-Updates unerwartete Stiländerungen einführen.

Die [offizielle Gutenberg-Plugin-Seite](https://wordpress.org/plugins/gutenberg/) bietet regelmäßige Updates über neue Block-Funktionen, die erst später in WordPress Core landen — wer FSE-Entwicklungen früh verfolgen möchte, sollte das Plugin im Blick behalten.

## Fazit: Block Themes sind bereit — aber nicht für jedes Projekt

Full Site Editing ist kein Hype mehr, sondern gelebte Praxis in vielen professionellen WordPress-Projekten. Die Lernkurve ist real, der langfristige Gewinn ebenfalls. Wer heute mit einem neuen Projekt startet, sollte ernsthaft in Block Themes investieren. Wer eine bestehende Website betreibt, sollte eine Migration sorgfältig planen — oder bis zu einem geplanten Relaunch warten.

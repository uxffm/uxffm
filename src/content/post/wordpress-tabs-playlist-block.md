---
publishDate: 2026-08-23T00:00:00Z
title: "WordPress 7.1: Tabs und Playlisten nativ – schluss mit unnötigen Plugins"
excerpt: "WordPress 7.1 bringt einen nativen Tabs-Block und einen Audio-Playlist-Block. Was das konkret bedeutet, wie Sie beide Blöcke einsetzen – und warum Sie dafür kein Plugin mehr brauchen."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-tabs-playlist-block
---

Mit WordPress 7.1 „Mary Lou", das am 19. August 2026 auf dem WordCamp US in Phoenix veröffentlicht wurde, hält eine Funktion Einzug ins Core, auf die viele Websitebetreiber seit Jahren warten: ein nativer **Tabs-Block** und ein **Audio-Playlist-Block** – ohne Plugin, ohne Zusatzkosten, ohne Kompatibilitätsprobleme.

Für Unternehmen, die ihre Website selbst pflegen, bedeutet das weniger Abhängigkeiten, schnellere Ladezeiten und ein einheitlicheres Erscheinungsbild. In diesem Artikel zeigen wir Ihnen, was die beiden neuen Blöcke können, wie Sie sie einsetzen und was Sie beim Umstieg von Plugin-Lösungen beachten sollten.

## Was ist der neue Tabs-Block?

Der Tabs-Block ermöglicht es, Inhalte in klickbare Tab-Reiter aufzuteilen. Jede Registerkarte enthält einen vollständigen Block-Bereich – Sie können dort Text, Bilder, Listen, Tabellen oder beliebige andere Blöcke einfügen. Die Verschachtelung ist vollständig unterstützt.

Das klingt simpel, hat aber eine große praktische Bedeutung: Bislang mussten Websitebetreiber für tabsartige Inhalte auf Plugins wie „Tabs Block by Gutentor", „Advanced Tabs" oder ähnliche Lösungen zurückgreifen. Diese Plugins bringen eigene Stile, eigene JavaScript-Bibliotheken und oft Kompabilitätsprobleme mit anderen Plugins oder dem Theme mit.

Der native Tabs-Block funktioniert anders: Er nutzt die bestehende Styling-Infrastruktur von WordPress. Das bedeutet, er respektiert automatisch Ihre Schriftarten, Abstände, Farben und alle anderen Theme-Einstellungen. Die drei Ebenen, auf denen Sie ihn gestalten können, sind:

- **Tab-Leiste** (der obere Bereich mit den Reitern)
- **Tab-Panel** (der Inhaltsbereich jedes einzelnen Tabs)
- **Äußerer Block** (der gesamte Container)

In der Praxis sieht das so aus: Sie fügen den Tabs-Block ein, benennen Ihre Reiter, befüllen jeden Tab-Bereich mit beliebigen Blöcken und passen das Aussehen über die Block-Einstellungen an – ganz ohne CSS-Kenntnisse.

## Typische Anwendungsfälle für Unternehmen

Für kleine und mittlere Unternehmen in Frankfurt und Umgebung bieten sich sofort mehrere Szenarien an, in denen der Tabs-Block wertvolle Dienste leistet:

**Produktseiten:** Statt alles untereinander aufzulisten, können Sie auf einer Produktseite separate Tabs für „Beschreibung", „Technische Daten", „Lieferumfang" und „Kundenstimmen" anlegen. Der Besucher sieht sofort alle Kategorien und kann gezielt klicken.

**FAQ-Bereiche:** Häufig gestellte Fragen strukturiert nach Themen präsentieren – jede Kategorie bekommt ihren eigenen Tab. Das ist übersichtlicher als eine lange scrollbare Liste.

**Standort- oder Leistungsübersichten:** Wenn Ihr Unternehmen mehrere Standorte oder Dienstleistungsbereiche hat, können Sie jeden in einem Tab zusammenfassen und so Ihren Besuchern eine kompakte Übersicht bieten.

**Portfolio und Referenzen:** Arbeiten Sie in verschiedenen Branchen oder haben Sie Projekte in unterschiedlichen Formaten? Tabs ermöglichen eine saubere Kategorisierung ohne separate Seiten anlegen zu müssen.

## Was kann der neue Audio-Playlist-Block?

Der zweite große Block-Neuzugang ist der **Audio-Playlist-Block**. Er ermöglicht es, mehrere Audiodateien mit optionaler Wellenformvisualisierung in einer übersichtlichen Playlist darzustellen. Für jede Datei können Sie Titel, Künstler und Cover-Art hinterlegen.

Damit bringt WordPress 7.1 Audio-Publishing als erstklassiges Format zurück in den Core. Bisher war der eingebaute Audio-Block auf eine einzelne Datei beschränkt – wer eine Playlist präsentieren wollte, musste auf externe Lösungen oder eingebettete Spotify/SoundCloud-Widgets ausweichen.

Wer profitiert davon? Unter anderem:

- **Podcaster**, die ihre Episoden direkt auf ihrer Website hosten möchten
- **Musiker und Bands**, die Demos oder Aufnahmen präsentieren
- **Coaches und Trainer**, die Audio-Lernmaterialien anbieten
- **Unternehmen**, die Kunden-Testimonials oder Interviews in Audio-Form veröffentlichen

Die Wellenformdarstellung macht den Block dabei optisch ansprechend – kein Vergleich zu einem schlichten HTML-Audio-Element. Und da die Dateien auf Ihrem eigenen Server liegen, sind Sie unabhängig von Drittanbieterdiensten.

## Wann sollten Sie auf Plugin-Lösungen verzichten?

Mit dem Release von WordPress 7.1 stellt sich für viele Websites die Frage: Welche Plugins kann ich jetzt abschalten?

**Empfehlung:** Wenn Sie derzeit ein Plugin ausschließlich für Tab-Inhalte oder Audio-Playlisten verwenden und kein Feature nutzen, das über das hinausgeht, was der Core-Block bietet, können Sie das Plugin in Ruhe deaktivieren und den nativen Block testen. Das gilt insbesondere dann, wenn:

- Das Plugin seit längerer Zeit keine Updates erhalten hat
- Sie Konflikte mit anderen Plugins oder Ihrem Theme bemerkt haben
- Das Plugin schlechte Performance-Werte erzeugt (eigene JavaScript-Bibliotheken, unnötige CSS-Dateien)

**Vorsicht ist geboten**, wenn das Plugin sehr umfangreiche Konfigurationen mitbringt oder proprietäre Shortcodes verwendet. In diesem Fall sollten Sie den Umstieg sorgfältig planen und erst alle bestehenden Inhalte prüfen, bevor Sie deaktivieren.

## So integrieren Sie die neuen Blöcke auf Ihrer Website

Der Einstieg ist denkbar einfach – vorausgesetzt, Sie haben WordPress 7.1 bereits installiert. Wenn nicht, sollten Sie das Update zeitnah einspielen; seriöse Managed-Hosting-Anbieter empfehlen es ausdrücklich. Die offiziellen [Release Notes zu WordPress 7.1](https://wordpress.org/news/) finden Sie direkt auf WordPress.org.

**Tabs-Block einfügen:**

1. Öffnen Sie den Block-Editor einer Seite oder eines Beitrags
2. Tippen Sie `/Tabs` in einen leeren Block oder suchen Sie im Inserter nach „Tabs"
3. Fügen Sie dem neuen Block Ihre gewünschten Tab-Titel hinzu
4. Wechseln Sie in den jeweiligen Tab-Bereich und befüllen Sie ihn mit beliebigen Blöcken
5. Passen Sie Farben, Abstände und Typografie in der Seitenleiste an

**Audio-Playlist-Block einfügen:**

1. Suchen Sie im Inserter nach „Audio-Playlist"
2. Laden Sie Ihre Audiodateien hoch oder wählen Sie sie aus der Mediathek
3. Ergänzen Sie optional Titel, Künstler und Cover-Art für jede Datei
4. Aktivieren Sie bei Bedarf die Wellenformdarstellung

Achten Sie darauf, dass Ihre Audiodateien in einem weit verbreiteten Format vorliegen – MP3 wird am besten unterstützt. Für technische Details zur Block-Entwicklung lohnt sich ein Blick in die [offizielle Block-Dokumentation](https://developer.wordpress.org/block-editor/).

## Was bedeutet das für die Performance Ihrer Website?

Einer der unterschätzten Vorteile der nativen Blöcke ist die **Performance-Verbesserung** durch das Abschalten unnötiger Plugins. Jedes deaktivierte Plugin reduziert potenzielle HTTP-Requests, spart CSS und JavaScript-Dateien und verringert die Datenbankabfragen beim Laden der Seite.

Das ist besonders relevant für die **Core Web Vitals** – Googles Metriken zur Nutzererfahrung, die seit Jahren einen direkten Einfluss auf die Suchrankings haben. Wer durch das Entfernen von Plugin-Ballast seinen **Largest Contentful Paint (LCP)** oder den **Interaction to Next Paint (INP)** verbessert, profitiert im Idealfall auch in den Suchergebnissen.

Als Faustregel gilt: Weniger aktive Plugins bedeuten weniger potenzielle Konflikte, weniger Angriffsfläche für Sicherheitslücken und in der Regel schnellere Ladezeiten – besonders auf Shared-Hosting-Servern, die unter Last schnell an ihre Grenzen geraten.

## Unser Fazit

WordPress 7.1 setzt einen klaren Trend fort: Immer mehr Funktionen, für die früher Plugins notwendig waren, wandern in den Core. Das ist eine gute Nachricht für alle Websitebetreiber, die ihre Website schlank, sicher und wartungsarm halten möchten.

Der neue Tabs-Block und der Audio-Playlist-Block sind keine großen Sprünge, aber sie lösen zwei häufige Alltagsprobleme elegant – direkt im Editor, ohne Umwege. Wenn Sie Ihre Website auf WordPress 7.1 aktualisiert haben, lohnt es sich, Ihren Plugin-Stack kritisch zu prüfen und alles zu entfernen, was Sie nicht mehr brauchen.

Haben Sie Fragen zur Umstellung oder möchten Sie die neuen Blöcke auf Ihrer Website einbauen lassen? Das Team von Frankfurt Marketing Studio hilft Ihnen gerne – wir sind Ihre WordPress-Agentur in Frankfurt am Main.

---
publishDate: 2026-06-22T00:00:00Z
title: "WordPress 7.1: Bilder direkt im Browser verarbeiten – VIPS & WebAssembly"
excerpt: "WordPress 7.1 verarbeitet Bilder künftig direkt im Browser mit WebAssembly. Was das für Upload-Speed, Serverauslastung und unterstützte Formate bedeutet."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wasm-bildverarbeitung-wordpress
---

WordPress verändert sich gerade grundlegend – und zwar dort, wo Sie es vielleicht am wenigsten erwarten: im Upload-Dialog. Mit WordPress 7.1 zieht eine clientseitige Bildverarbeitungs-Pipeline ein, die auf wasm-vips basiert, dem WebAssembly-Port der leistungsstarken Bildverarbeitungsbibliothek libvips. Was das für Ihren Workflow, Ihre Website-Performance und Ihre Server-Infrastruktur bedeutet, erklären wir in diesem Artikel.

## Was steckt hinter der VIPS/WebAssembly-Pipeline?

Bisher lief Bildverarbeitung in WordPress ausschließlich auf dem Server: Sie luden ein Bild hoch, es landete auf Ihrem Webserver, PHP und GD-Library (oder Imagick) erzeugten daraus sämtliche Thumbnail-Größen – und erst danach wurden diese in der Mediathek gespeichert. Bei großen Bilddateien oder schwach ausgestatteten Shared-Hosting-Paketen konnte dieser Prozess Sekunden dauern und die Server-CPU spürbar belasten.

WordPress 7.1 dreht dieses Prinzip um. Dank wasm-vips läuft die Bildverarbeitung künftig direkt im Browser des Nutzers, bevor auch nur ein Byte auf den Server übertragen wird. Der Browser erzeugt alle konfigurierten Bildgrößen lokal, und erst das fertig prozessierte Bildpaket geht über die Leitung. Das klingt nach einem technischen Detail – hat aber weitreichende Konsequenzen für Upload-Geschwindigkeit, Serverauslastung und die unterstützten Bildformate.

## Welche Bildformate werden unterstützt?

Ein zentraler Vorteil von libvips gegenüber der klassischen GD-Library ist die deutlich breitere Formatunterstützung. Die neue Pipeline in WordPress 7.1 soll folgende Formate verarbeiten können:

- **HEIC**: Das von Apple-Geräten verwendete hocheffiziente Bildformat, das bislang in WordPress kaum nativ unterstützt wurde
- **JPEG XL (JXL)**: Der moderne JPEG-Nachfolger mit besserer Kompression und verlustfreier Option
- **Ultra HDR**: Googles HDR-Erweiterung für JPEG, die auf modernen Displays mehr Dynamikumfang zeigt
- **GIF-zu-Video-Konvertierung**: Animierte GIFs können künftig clientseitig in kompaktere Video-Formate umgewandelt werden, was Ladezeiten erheblich reduziert

Gerade für kleine Unternehmen, die viele Produktfotos direkt vom iPhone hochladen, ist die HEIC-Unterstützung ein echter Gewinn: Bislang mussten diese Bilder manuell konvertiert oder über Plugins behandelt werden.

## Wann greift die neue Pipeline – und wann nicht?

WordPress 7.1 schaltet die clientseitige Verarbeitung nicht für jeden Nutzer und jede Situation ein. Es gibt klare Ausschlusskriterien:

**Geräte mit 2 GB RAM oder weniger** werden von der Pipeline ausgenommen. Bildverarbeitung im Browser ist speicherintensiv, und auf schwächeren Geräten würde dies die Nutzererfahrung verschlechtern statt verbessern. WordPress erkennt die Geräteleistung und fällt automatisch auf die klassische Server-Verarbeitung zurück.

**Langsame Verbindungen** sind ein weiteres Kriterium. Wenn die Netzwerkbedingungen schlecht sind, macht clientseitige Verarbeitung weniger Sinn – das Hochladen vieler kleiner Dateien statt einer großen kann unter schlechten Bedingungen sogar langsamer sein.

**Browser-Kompatibilität**: Derzeit ist die Funktion aktiv in Chromium-basierten Browsern (Chrome, Edge, Brave) mit dem aktuellen Gutenberg-Plugin. In Firefox und Safari ist sie noch deaktiviert – nicht weil die Browser WebAssembly nicht unterstützen, sondern weil Kompatibilitätstests noch ausstehen. Sie können die Funktion bereits heute testen, indem Sie das aktuelle Gutenberg-Plugin installieren und einen Chromium-Browser verwenden.

## Der „Call for Testing" – was Sie jetzt tun können

Auf [make.wordpress.org](https://make.wordpress.org/core/2026/06/04/call-for-testing-client-side-media-processing/) läuft derzeit ein offizieller „Call for Testing" für diese Funktion. Das WordPress-Core-Team sucht gezielt nach Feedback aus der Praxis: Welche Bildformate funktionieren reibungslos? Wo treten Fehler auf? Wie verhält sich die Pipeline auf verschiedenen Geräteklassen?

Wenn Sie eine Testumgebung betreiben, lohnt es sich, an diesem Prozess teilzunehmen. Dokumentieren Sie Ihre Erfahrungen und melden Sie Issues direkt im [WordPress/gutenberg GitHub-Repository](https://github.com/WordPress/gutenberg). Gerade Edge Cases – ungewöhnliche Bildformate, sehr große Dateien, bestimmte Browser-Erweiterungen – sind für das Core-Team wertvolles Feedback.

## Was bedeutet die größere Core-ZIP für Sie?

Ein konkreter Nachteil der neuen Funktion: Die WordPress-Core-ZIP-Datei wächst durch die eingebettete wasm-vips-Bibliothek um etwa 20 MB. Das klingt bescheiden, hat aber praktische Auswirkungen:

- **Deployments und CI/CD-Pipelines** müssen entsprechend angepasste Timeouts und Bandbreitenbudgets einkalkulieren
- **Shared Hosting** mit strikten Upload-Limits für Installationspakete könnte Probleme bekommen
- **Staging-Umgebungen** mit langsameren Verbindungen zum Server werden Updates länger benötigen

Für die meisten professionell betriebenen WordPress-Sites ist das kein Blocker – aber es gehört in die Kalkulation.

## Was sonst noch in WordPress 7.1 steckt

Die clientseitige Medienverarbeitung ist das technisch aufwändigste Feature des Releases, aber nicht das einzige nennenswerte. **Echtzeit-Kollaboration** befindet sich in aktiver Entwicklung: Mehrere Redakteure sollen künftig gleichzeitig an einem Beitrag arbeiten können, mit Live-Cursor-Anzeige und Konfliktauflösung – ähnlich wie in Google Docs. Das würde besonders für Redaktionsteams in mittelständischen Unternehmen den Workflow grundlegend verändern.

Ebenfalls relevant: **Gutenberg 23.4** wurde mit verbessertem Media-Upload-Fortschritt veröffentlicht. Der Upload-Dialog zeigt nun deutlich detailliertere Status-Informationen, was gerade bei der neuen clientseitigen Verarbeitung wichtig ist – der Nutzer sieht jetzt, ob der Browser gerade Bilder verarbeitet oder ob der Upload läuft.

Weniger erfreulich: Das **React 19 Upgrade in Gutenberg** wurde nach Kompatibilitätsproblemen mit zahlreichen Plugins vorübergehend zurückgerollt. Viele Plugin-Entwickler hatten sich auf interne React-APIs verlassen, die in React 19 entfernt wurden. Das Core-Team arbeitet an einer Migration, die Rückwärtskompatibilität besser gewährleistet. Bis dahin bleibt React 18 die Basis – und Plugin-Entwickler sollten ihre React-Abhängigkeiten vorab sorgfältig prüfen.

## Was das für Ihre WordPress-Site in der Praxis bedeutet

Für Betreiber von WordPress-Sites in Frankfurt und Umgebung lässt sich folgendes festhalten:

Wenn Sie regelmäßig Bilder hochladen – Produktfotos, Event-Fotos, Immobilienbilder – wird WordPress 7.1 Ihre Upload-Erfahrung spürbar verbessern, vorausgesetzt Sie nutzen einen modernen Rechner und einen Chromium-Browser. Die Verarbeitung im Browser ist bei guter Hardware tatsächlich schneller als der klassische Server-Workflow, weil die Netzwerkübertragung auf das Wesentliche reduziert wird.

Für Ihre Server-Infrastruktur bedeutet die neue Pipeline eine Entlastung der CPU: Thumbnail-Generierung, die bislang PHP und Imagick beschäftigt hat, verlagert sich zum Client. Auf Shared-Hosting-Paketen mit CPU-Limits kann das einen merklichen Unterschied machen.

Wenn Sie eine [WordPress Agentur in Frankfurt](/) suchen, die Ihre Website professionell betreut, lohnt es sich, WordPress 7.1 mit einem strukturierten Testplan einzuführen: Staging-Umgebung aufsetzen, Gutenberg-Plugin aktualisieren, kritische Upload-Flows durchspielen – und erst dann in Produktion gehen.

## Fazit

Die VIPS/WebAssembly-Pipeline ist eines der architektonisch bedeutendsten Features seit Jahren. Sie verschiebt die Grenze zwischen Client und Server – und zwar in eine Richtung, die bei guter Implementierung echte Vorteile bringt: schnellere Uploads, breitere Formatunterstützung, weniger Serverlast. Die Einschränkungen (Browser-Kompatibilität, RAM-Anforderungen, größere Core-ZIP) sind real, aber handhabbar.

Ob Ihre bestehende WordPress-Installation und Ihr Hosting-Setup von diesem Upgrade profitieren oder ob Anpassungen notwendig sind – Frankfurt Marketing Studio unterstützt Sie gern bei der Analyse, dem Testing und dem sicheren Rollout von WordPress-Updates. Sprechen Sie uns an.

## Quellen

- [Call for Testing: client-side media processing – Make WordPress Core](https://make.wordpress.org/core/2026/06/04/call-for-testing-client-side-media-processing/) — r/wordpress
- [What's new for developers? (June 2026)](https://developer.wordpress.org/news/2026/06/whats-new-for-developers-june-2026/) — r/wordpress
- [React 19 upgrade temporarily reverted in Gutenberg – Make WordPress Core](https://make.wordpress.org/core/2026/06/05/react-19-upgrade-temporarily-reverted-in-gutenberg/) — r/wordpress

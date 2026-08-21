---
publishDate: 2026-08-21T00:00:00Z
title: "WordPress 7.1 \"Mary Lou\" ist da: Was Websitebetreiber jetzt wissen müssen"
excerpt: "WordPress 7.1 wurde live auf dem WordCamp US in Phoenix veröffentlicht. Alle bestätigten Neuerungen, was das Update für Ihre Website bedeutet und ob Sie jetzt aktualisieren sollten."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-mary-lou-live
---

WordPress 7.1 „Mary Lou" ist offiziell veröffentlicht. Die neue Version wurde am 19. August 2026 — dem letzten Tag des [WordCamp US 2026](https://us.wordcamp.org/2026/) in Phoenix, Arizona — live gestellt, wie es bei großen WordPress-Releases Tradition ist. Mehr als 1.100 Teilnehmende aus aller Welt waren dabei. Was bringt das Update, was hat sich im Vergleich zu den Vorab-Ankündigungen geändert, und wann sollten Sie als Websitebetreiber aktualisieren?

## Was wirklich in WordPress 7.1 landet

Nach mehreren Beta-Phasen und einem Release Candidate mit 145 Fehlerbehebungen sind die bestätigten Kernfunktionen nun offiziell:

**Interaktive Zustände ohne CSS.** Das ist das Flaggschiff-Feature dieser Version. Sie können jetzt direkt im Editor festlegen, wie ein Button beim Darüberfahren (`:hover`), beim Fokussieren per Tastatur (`:focus`) oder beim Klicken (`:active`) aussieht — Hintergrundfarbe, Textfarbe, Rahmen, alles visuell einstellbar. Bisher war dafür zwingend eigenes CSS oder ein Page-Builder-Plugin nötig. In 7.1 stehen zunächst Buttons und Navigationslinks als unterstützte Blöcke bereit; weitere Blocktypen sollen in kommenden Versionen folgen. Für Entwickler lassen sich die Zustände auch in `theme.json` definieren und mit responsiven Regeln kombinieren.

**Responsives Styling direkt im Editor.** Websitebetreiber können einstellen, wie ihre Website auf Tablets und Smartphones aussieht — ohne eine Zeile CSS zu schreiben. Entwickler können in `theme.json` eigene Breakpoints festlegen, die dann im Editor sichtbar werden.

**Notes: Inline-Kommentare mit @mentions.** Das Kommentarsystem für den Editor wird erheblich ausgebaut. Redakteure können jetzt Notizen direkt an bestimmten Textstellen hinterlassen, andere Nutzer per @mention benachrichtigen und mehrere parallele Diskussionsstränge führen. Formatierungen wie Fett oder Kursiv sind in Notizen möglich. Das ist besonders für Teams mit mehreren Autoren ein echter Fortschritt.

**Neue Core-Blöcke: Tabs und Playlist.** Der Tabs-Block erlaubt es, Inhalte in Registerkarten aufzuteilen, ohne ein Plugin. Der Playlist-Block kann Audio-Dateien mit Wellenform-Visualisierung abspielen — interessant vor allem für Podcaster und Musiker. Beide Blöcke sind vollständig im Site Editor steuerbar.

**Verbessertes Medien-Handling.** WordPress 7.1 unterstützt jetzt HEIC-Dateien — das ist das Standardformat von Fotos, die auf iPhones aufgenommen wurden. Außerdem können unterbrochene Uploads fortgesetzt werden, wenn die Internetverbindung kurzzeitig abbricht, anstatt von vorne zu beginnen. Wer regelmäßig große Mengen an Bildmaterial hochlädt, wird das zu schätzen wissen.

**Reorganisiertes Interface.** Die Befehlspalette (Strg+K) wurde überarbeitet und zeigt Aktionen kontextbezogener an. Die Admin-Leiste bleibt jetzt auch innerhalb des Site Editors sichtbar. Revisionen einzelner Seiten lassen sich per Link direkt teilen — hilfreich, wenn Sie einem Kunden eine bestimmte Version zur Freigabe zeigen möchten.

## Was nicht in 7.1 gelandet ist

Die [WordPress Abilities API](https://frankfurtmarketingstudio.de/wordpress-abilities-api-7-1) — ein System, das Plugins mehr Kontrolle über Benutzerrechte geben sollte — wurde kurz vor dem Release zurückgezogen. Ein Core-Maintainer hatte grundlegende Bedenken an der Implementierung geäußert. Das Feature wird nun für eine spätere Version neu evaluiert.

## WordCamp US 2026: Was Matt Mullenweg angekündigt hat

Auf dem WordCamp US in Phoenix hielt Automattic-CEO Matt Mullenweg seine State-of-the-Word-Rede und betonte einen neuen Fokus: **Vereinfachung statt Feature-Inflation**. Mullenweg sprach davon, dass WordPress in den kommenden Versionen vor allem bestehende Funktionen polieren und konsistenter machen soll, anstatt ständig neue Bausteine hinzuzufügen. Für Agenturen und Websitebetreiber bedeutet das mittelfristig: weniger Breaking Changes, mehr Stabilität.

Das WordCamp US war auch das erste, das einen echten Hackathon-Tag einschloss — Entwickler arbeiteten einen Tag lang gemeinsam an Core-Patches und Plugin-Integrationen, was als großer Erfolg gewertet wurde.

## Soll ich jetzt aktualisieren?

Die Faustregel gilt auch für WordPress 7.1: **Warten Sie auf das erste Patch-Release (7.1.1)**, bevor Sie produktive Websites aktualisieren. Erfahrungsgemäß erscheinen kleinere Fehlerbehebungen innerhalb der ersten zwei bis vier Wochen nach einem Major Release.

Was Sie bis dahin tun können:

1. **Staging-Umgebung nutzen.** Spielen Sie das Update auf einer Kopie Ihrer Website ein und prüfen Sie, ob alle Plugins und das Theme korrekt funktionieren.
2. **Plugin-Kompatibilität prüfen.** Besonders Page-Builder-Plugins und SEO-Plugins reagieren manchmal empfindlich auf große WordPress-Releases. Schauen Sie in die Changelogs Ihrer installierten Plugins.
3. **Backup anlegen.** Bevor Sie aktualisieren, sollte immer ein vollständiges Backup (Datenbank + Dateien) vorhanden sein.
4. **PHP-Version prüfen.** WordPress 7.x setzt PHP 8.1 oder höher voraus. Falls Sie noch auf einer älteren PHP-Version laufen, sprechen Sie Ihren Hoster an.

Wenn Sie ein Managed-WordPress-Hosting nutzen, wird Ihr Anbieter das Update wahrscheinlich automatisch einspielen — prüfen Sie in diesem Fall im Hosting-Dashboard, ob automatische Updates aktiviert sind und ob Sie benachrichtigt werden.

## Was bedeutet 7.1 für Ihre Website?

Für die meisten Unternehmenswebsites sind die Neuerungen in WordPress 7.1 keine Revolution, aber ein solider Schritt nach vorne. Das interaktive Styling macht es einfacher, professionell aussehende Hover-Effekte umzusetzen, ohne einen Entwickler zu beauftragen. Das verbesserte Medien-Management spart Zeit bei der redaktionellen Arbeit. Und die Notes-Funktion ist ein echter Fortschritt für alle, die ihre Website im Team pflegen.

Wenn Sie sich unsicher sind, ob das Update für Ihre WordPress-Website sicher und reibungslos verläuft, unterstützen wir Sie gerne: von der Kompatibilitätsprüfung über den begleiteten Update-Prozess bis hin zur Optimierung der neuen Funktionen für Ihren konkreten Anwendungsfall. Nehmen Sie einfach [Kontakt auf](https://frankfurtmarketingstudio.de/kontakt).

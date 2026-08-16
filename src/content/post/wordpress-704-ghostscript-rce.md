---
publishDate: 2026-08-14T00:00:00Z
title: "WordPress 7.0.4: Kritische RCE-Lücke via Ghostscript – sofort updaten"
excerpt: "CVE-2026-65640 erlaubt Angreifern mit Autorenrechten, über präparierte PostScript-Dateien Code auszuführen. CVSS 8.8 – alle Versionen ab 4.7 betroffen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-704-ghostscript-rce
---

Am 12. August 2026 hat das WordPress-Sicherheitsteam Version 7.0.4 veröffentlicht – eine reine Sicherheitsversion, die eine einzige, aber besonders kritische Schwachstelle schließt. Wer WordPress mit den Bildverarbeitungsbibliotheken Imagick und Ghostscript betreibt, sollte das Update ohne Verzögerung einspielen. Die Lücke ermöglicht unter bestimmten Bedingungen die Ausführung von Code auf dem Server – und das bereits durch Nutzer mit normalen Autorenrechten.

## Was steckt hinter CVE-2026-65640?

Die Schwachstelle trägt die Kennung **CVE-2026-65640** und erhält im Common Vulnerability Scoring System (CVSS) einen Wert von **8.8** – eingestuft als „Hoch". Entdeckt wurde sie vom Sicherheitsforschungsteam bei [pwn.ai](https://pwn.ai), das sie dem WordPress-Sicherheitsteam über koordinierte Offenlegung meldete, bevor sie öffentlich bekannt wurde.

Das technische Problem liegt im Zusammenspiel von Imagick und Ghostscript: WordPress erlaubt es Nutzern mit der Rolle „Autor" oder höher, Dateien hochzuladen. Imagick wird intern genutzt, um hochgeladene Bilder zu verarbeiten. Unter bestimmten Umständen – wenn Ghostscript auf dem Server installiert ist – reichte eine manipulierte PostScript-Datei aus, um Imagick dazu zu bringen, die darin eingebetteten Befehle auszuführen.

Konkret: Ein Angreifer lädt eine Datei hoch, die als Bild getarnt ist, aber tatsächlich PostScript-Code enthält. WordPress's `load()`-Funktion übergab die Datei ohne vorherige Inhaltsprüfung an Imagick – was Ghostscript auf dem Server aktivieren und beliebigen Code ausführen konnte.

## Welche Installationen sind betroffen?

Die Lücke greift nur dann, wenn **beide** folgenden Voraussetzungen erfüllt sind:

1. Auf dem Server ist **Imagick** als PHP-Erweiterung installiert (Standard bei den meisten Managed-Hosting-Umgebungen).
2. Außerdem ist **Ghostscript** auf dem Server verfügbar (z. B. zur PDF-Verarbeitung).

Wer keines von beidem oder nur eines davon einsetzt, ist nicht direkt angreifbar. Dennoch empfiehlt das WordPress-Sicherheitsteam das Update in jedem Fall: Administratoren wissen oft nicht, welche Systemkomponenten ihr Hoster installiert hat.

Betroffen sind **alle WordPress-Versionen ab 4.7**. Das Sicherheitsteam hat Patches für einen außergewöhnlich breiten Versions-Stack veröffentlicht – von 7.0.4 bis hinunter zu 5.0.27, 5.1.24 und weiter. Auch wer bewusst auf einer alten Version läuft, bekommt also eine Absicherung.

## Wie wurde die Lücke geschlossen?

Der Fix ist technisch sauber und minimal-invasiv: Die `load()`-Funktion prüft jetzt den **tatsächlichen Dateiinhalt**, bevor sie die Datei an Imagick übergibt. Enthält die Datei PostScript-Sequenzen, wird die Übergabe an Imagick verweigert. Zusätzlich wurde verhindert, dass Angreifer über manipulierte Dateinamen Imagick dazu bringen können, intern Ghostscript aufzurufen.

Das Prinzip: Eingaben werden jetzt am Eintrittspunkt geprüft, nicht erst tief in der Verarbeitungskette – ein klassischer Defense-in-Depth-Ansatz.

## Wie dringend ist das Update wirklich?

Sehr dringend. Ein CVSS-Score von 8.8 bedeutet in der Praxis: Die Lücke ist ohne Authentifizierungshürde im klassischen Sinne – ein regulärer Autorenzugang reicht aus. Und Autorenzugänge sind in vielen WordPress-Installationen vorhanden: Redakteure, Gastautorinnen, Freelancer, die Beiträge einreichen.

Angreifer müssen keine Administratorrechte haben und keine komplexen Exploitketten bauen. Der Angriff ist relativ geradlinig, sobald die technischen Voraussetzungen (Imagick + Ghostscript) bekannt sind.

Das WordPress-Sicherheitsteam hat **automatische Updates für alle aktiven WordPress-Installationen** ausgelöst – ähnlich wie bei den schwerwiegenden Fixes in 7.0.2. Wer automatische Kernsicherheitsupdates aktiviert hat, hat das Update möglicherweise bereits erhalten. Überprüfen Sie in Ihrem Dashboard unter „Dashboard → Updates", welche Version aktuell aktiv ist.

## Was sollten Betreiber jetzt konkret tun?

**Sofortmaßnahmen:**

- Prüfen Sie die aktuell installierte WordPress-Version unter „Dashboard → Über WordPress".
- Wenn Sie noch auf 7.0.3 oder älter sind: Spielen Sie 7.0.4 umgehend ein.
- Falls Sie Ghostscript nicht benötigen: Sprechen Sie mit Ihrem Hoster oder Systemadministrator darüber, ob es deinstalliert oder deaktiviert werden kann – das reduziert die Angriffsfläche dauerhaft.
- Prüfen Sie Ihre Nutzerliste auf Accounts mit der Rolle „Autor" oder höher. Gibt es Accounts, die nicht mehr aktiv sein sollten? Jetzt ist ein guter Zeitpunkt für Aufräumarbeiten.

**Mittelfristig:**

- Stellen Sie sicher, dass automatische Sicherheitsupdates für den WordPress-Kern aktiviert sind. Die entsprechende Einstellung finden Sie unter „Dashboard → Updates" oder in der `wp-config.php` über die Konstante `WP_AUTO_UPDATE_CORE`.
- Prüfen Sie, ob Ihr Hoster oder Ihre Verwaltungsplattform (ManageWP, MainWP, WP Remote) Update-Benachrichtigungen sendet. Reagieren Sie auf Sicherheitsreleases stets innerhalb von 24 Stunden.
- Erwägen Sie eine Web Application Firewall (WAF), die Datei-Uploads auf Serverebene vorscannt – etwa über Dienste wie Cloudflare WAF oder Wordfence mit entsprechenden Regeln.

## Einordnung: WordPress-Sicherheit im Sommer 2026

CVE-2026-65640 ist bereits der dritte Sicherheitspatch innerhalb weniger Wochen: Auf das kritische Update 7.0.2 im Juli folgte 7.0.3 mit zwölf Fixes am 6. August, jetzt kommt 7.0.4. Das ist kein Zeichen für eine besonders unsichere Plattform – im Gegenteil: Sicherheitsforschungsteams analysieren WordPress intensiver denn je, und das Sicherheitsteam reagiert schnell.

Für Betreiberinnen und Betreiber bedeutet das jedoch: Reaktionsfähigkeit ist keine Option mehr, sondern Pflicht. Wer WordPress professionell einsetzt, braucht Prozesse, die sicherstellen, dass Sicherheitsupdates zeitnah eingespielt werden – automatisch, wenn möglich, manuell überwacht, wenn nötig.

Wenn Sie bei der Absicherung Ihrer WordPress-Installation Unterstützung suchen, hilft Ihnen die [WordPress-Agentur Frankfurt am Main](/) gerne weiter – von der Update-Verwaltung über Sicherheits-Audits bis hin zur Einrichtung automatisierter Monitoring-Prozesse.

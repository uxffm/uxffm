---
publishDate: 2026-08-03T00:00:00Z
title: "Gravity Forms Supply-Chain-Hack: Backdoor in offiziellem Plugin-Download"
excerpt: "Angreifer injizierten eine Backdoor in offizielle Gravity Forms-Downloads vom 10.–11. Juli. Über 5 Millionen Sites nutzen das Plugin – das müssen Betroffene jetzt wissen."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/gravity-forms-backdoor
---

Die WordPress-Sicherheitscommunity hat einen neuen Supply-Chain-Angriff aufgedeckt, der eines der meistgenutzten Premium-Plugins überhaupt trifft: Gravity Forms. Patchstack-Sicherheitsforscher bestätigten, dass offizielle Download-Pakete der Versionen 2.9.11.1 und 2.9.12 am 10. und 11. Juli 2026 Schadcode enthielten. Gravity Forms wird auf über 5 Millionen WordPress-Installationen eingesetzt – der potenzielle Schaden ist erheblich.

## Was genau passiert ist

Die Angreifer drangen in die Download-Infrastruktur von Rocketgenius ein, dem Unternehmen hinter Gravity Forms, und infizierten die Plugin-Pakete mit einem Backdoor. Betroffen waren ausschließlich manuelle Downloads der Versionen 2.9.11.1 und 2.9.12, die am 10. und 11. Juli über die offizielle Website verfügbar waren. Wer an diesen Tagen über Composer `gravityforms/2.9.11` installierte, erhielt ebenfalls eine infizierte Kopie.

[Patchstack](https://patchstack.com/articles/critical-malware-found-in-gravityforms-official-plugin-site/) wurde am 11. Juli auf den Vorfall aufmerksam, nachdem ein Nutzer meldete, dass das Plugin HTTP-Anfragen an eine verdächtige Domain stellte: `gravityapi.org` — eine Domain, die erst am 8. Juli registriert worden war und keinerlei Verbindung zu Rocketgenius hat.

## Technische Details: Wie der Backdoor funktioniert

Der Schadcode steckte in der Datei `gravityforms/common.php`. Diese sammelte beim Aufruf umfangreiche Metadaten der betroffenen Website und übermittelte sie an die Angreifer:

- Website-URL und Admin-Pfad
- Installierte Plugins und aktives Theme
- PHP-Version und WordPress-Version
- Weitere Systemkonfigurationen

Als Antwort lieferte der externe Server eine Base64-kodierte PHP-Payload zurück. Diese wurde auf dem Server der betroffenen WordPress-Installation als `wp-includes/bookmark-canonical.php` gespeichert — getarnt als legitime WordPress-Systemdatei mit dem Anzeigenamen „WordPress Content Management Tools".

Diese Datei ermöglichte Remote Code Execution (RCE): Die Angreifer konnten beliebigen Code auf der Website ausführen, neue Administrator-Konten anlegen und die gesamte Installation aus der Ferne kontrollieren.

## Wer ist betroffen?

Laut offiziellem [Security Incident Notice von Rocketgenius](https://www.gravityforms.com/blog/security-incident-notice/) betraf der Angriff ausschließlich manuelle Downloads — automatische Updates über die integrierte Gravity Forms-Updatefunktion lieferten zu keinem Zeitpunkt infizierte Versionen aus. Wer das Plugin über das WordPress-Dashboard oder Gravity Forms Autopilot aktualisiert hat, ist mit hoher Wahrscheinlichkeit nicht betroffen.

Betroffen sind Website-Betreiber, die:

- Gravity Forms 2.9.11.1 oder 2.9.12 am **10. oder 11. Juli 2026 manuell heruntergeladen** haben
- Das Plugin über **Composer** mit `gravityforms/2.9.11` an diesen Tagen installiert haben

Da Gravity Forms ein Premium-Plugin ist und nicht über das WordPress.org-Verzeichnis vertrieben wird, war die Angriffsfläche auf Nutzer dieser spezifischen Download-Kanäle begrenzt. Dennoch: Auch ein kleiner Prozentsatz von 5 Millionen Installationen kann Tausende von betroffenen Sites bedeuten.

## Was Sie jetzt tun müssen

**1. Versionsnummer prüfen**

Öffnen Sie Ihr WordPress-Dashboard und navigieren Sie zu „Plugins → Installierte Plugins". Prüfen Sie, welche Gravity Forms-Version installiert ist. Falls Sie Version 2.9.11.1 oder 2.9.12 sehen und diese am 10. oder 11. Juli manuell installiert haben, handeln Sie sofort.

**2. Auf Version 2.9.13 aktualisieren**

Rocketgenius hat Version 2.9.13 als bereinigte Sicherheitsversion veröffentlicht. Aktualisieren Sie umgehend. Wer bereits 2.9.13 oder höher einsetzt und das Update über die reguläre Updatefunktion bezogen hat, war wahrscheinlich nicht Angriffsziel.

**3. Backdoor-Datei entfernen**

Prüfen Sie, ob die Datei `wp-includes/bookmark-canonical.php` in Ihrer WordPress-Installation existiert. Diese Datei ist kein legitimer WordPress-Bestandteil — wenn sie vorhanden ist, entfernen Sie sie sofort und gehen davon aus, dass Ihre Site kompromittiert wurde.

**4. Sicherheitsscanner ausführen**

Wordfence, Patchstack und SolidWP erkennen den Schadcode zuverlässig. Führen Sie einen vollständigen Scan Ihrer Installation durch. Die kostenlosen Versionen dieser Tools reichen für die initiale Überprüfung aus.

**5. Alle Passwörter und API-Keys zurücksetzen**

Bei einer bestätigten Kompromittierung setzen Sie alle WordPress-Administratorkennwörter zurück, ändern den Datenbankzugang in `wp-config.php` und widerrufen alle API-Keys — insbesondere jene für Zahlungsanbieter und E-Mail-Dienste.

**6. Unbekannte Administratorkonten entfernen**

Gehen Sie zu „Benutzer → Alle Benutzer" und filtern Sie nach der Rolle „Administrator". Entfernen Sie alle Konten, die Sie nicht selbst angelegt haben.

**7. DSGVO-Meldepflicht prüfen**

Wenn personenbezogene Daten Ihrer Nutzer — etwa Formulareinreichungen aus Kontaktformularen, Bewerbungen oder anderen Gravity-Forms-basierten Formularen — von der Kompromittierung betroffen sein könnten, besteht nach DSGVO eine Meldepflicht gegenüber der zuständigen Datenschutzbehörde innerhalb von 72 Stunden. Prüfen Sie dies mit Ihrem Datenschutzbeauftragten.

## Was dieser Angriff über das Plugin-Ökosystem sagt

Der Gravity Forms-Angriff ist der jüngste in einer wachsenden Serie von Supply-Chain-Angriffen auf WordPress-Plugins. Allein im Jahr 2026 wurden OptinMonster, ShapedPlugin und weitere Anbieter kompromittiert. Das Muster ist jeweils dasselbe: Angreifer zielen nicht auf einzelne Websites, sondern auf den Vertrauenskanal — den Plugin-Hersteller selbst. Ein erfolgreicher Angriff auf die Infrastruktur eines einzigen Anbieters kann Tausende von Websites gleichzeitig kompromittieren.

Für WordPress-Betreiber ergibt sich daraus eine wichtige Konsequenz: Das Risiko liegt nicht nur im installierten Code, sondern in der gesamten Lieferkette. Einige Maßnahmen, die das Risiko dauerhaft senken:

- **File-Integrity-Monitoring**: Tools, die neu auftauchende oder veränderte Dateien im WordPress-Verzeichnis sofort melden
- **Staging-First-Updates**: Plugin-Updates zuerst auf einem Testsystem einzuspielen ist bei kritischer Infrastruktur sinnvoll
- **Minimal-Plugin-Prinzip**: Nur wirklich genutzte Plugins installiert lassen — weniger Angriffsfläche bedeutet weniger Risiko
- **Regelmäßige Backups außerhalb der WordPress-Umgebung**: Im Ernstfall ist eine saubere Wiederherstellung die schnellste Lösung

## Rocketgenius' Reaktion

Rocketgenius hat transparent kommuniziert: Die offizielle Stellungnahme auf gravityforms.com beschreibt den Vorfall, die betroffenen Versionen und die empfohlenen Schritte. CEO Carl Hancock bestätigte gegenüber SC Media, dass automatische Updates sicher waren und der Angriff auf manuelle Download-Kanäle begrenzt blieb.

Das Unternehmen hat die kompromittierten Versionen umgehend aus dem Download-Bereich entfernt und [Version 2.9.13](https://www.gravityforms.com/blog/security-incident-notice/) als Sicherheitsupdate veröffentlicht. Die schnelle Reaktion und offene Kommunikation sind positiv zu bewerten — dennoch verdeutlicht der Vorfall, dass selbst etablierte Premium-Anbieter Angriffsziele sind.

## Fazit

Der Gravity Forms-Backdoor ist ein ernster Vorfall — und ein weiterer Beleg dafür, dass auch Premium-Plugins und seriöse Anbieter kompromittiert werden können. Wer am 10. oder 11. Juli manuell heruntergeladen hat, sollte sofort handeln. Für alle anderen gilt: Auf Version 2.9.13 aktualisieren und eine File-Integrity-Prüfung als feste Gewohnheit etablieren.

---
publishDate: 2026-07-31T00:00:00Z
title: "wp2shell: Kritische WordPress-Sicherheitslücke – Sofort auf 7.0.2 aktualisieren"
excerpt: "CVE-2026-63030 und CVE-2026-60137 erlauben vollständige Website-Übernahme ohne Login. Millionen WordPress-Sites betroffen – so schützen Sie sich jetzt."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wp2shell-wordpress-sicherheit
---

Am 17. Juli 2026 hat das WordPress-Sicherheitsteam mit den Versionen 6.9.5 und 7.0.2 zwei kritische Sicherheitslücken geschlossen, die unter dem Namen „wp2shell" bekannt geworden sind. Die Schwachstellen – CVE-2026-63030 und CVE-2026-60137 – ermöglichen es nicht authentifizierten Angreifern, vollständige Kontrolle über eine WordPress-Website zu erlangen, ohne ein einziges gültiges Passwort zu besitzen. Wenn Sie WordPress noch nicht aktualisiert haben, sollten Sie das jetzt sofort tun.

## Was ist wp2shell – und warum ist es so gefährlich?

wp2shell ist der Sammelbegriff für eine Exploit-Kette aus zwei einzeln gemeldeten Sicherheitslücken im WordPress-Core. Jede Lücke für sich ist bereits problematisch, doch erst in Kombination entfalten sie ihre zerstörerische Wirkung: Ein anonymer Angreifer kann ohne Konto, ohne Passwort und ohne jegliche Benutzerinteraktion beliebigen Code auf einem betroffenen WordPress-Server ausführen.

Was diesen Fall besonders alarmierend macht: Die Lücken betreffen keine spezifischen Plugins, keine Themes und keine ungewöhnliche Konfiguration. Sie stecken im WordPress-Core selbst – in einer Standardinstallation, so wie sie unmittelbar nach der Installation vorliegt. Schätzungen zufolge waren zum Zeitpunkt der Bekanntgabe Millionen von WordPress-Websites angreifbar.

## Die zwei CVEs im Detail

**CVE-2026-63030 – REST-API-Batch-Endpoint-Fehler (CVSS 9.1)**

Die erste Lücke steckt in der Verarbeitung von Batch-Anfragen über den WordPress-REST-API-Endpunkt `/wp-json/batch/v1`. Der Batch-Prozessor führt Validierung und Ausführung der eingehenden Anfragen in getrennten Schleifen durch. Durch diesen Aufbau geraten die internen Arrays aus der Synchronisation: Jede nachfolgende Anfrage wird unter dem falschen Handler verarbeitet.

In der Praxis bedeutet das: Ein Angreifer kann mithilfe dieser Logiklücke eine Anfrage so formulieren, dass sie unter den Rechten eines anderen Endpunkts ausgeführt wird – und dabei Zugangskontrollen umgeht, die den eigentlichen Endpunkt schützen.

**CVE-2026-60137 – SQL-Injection im Post-Query-Layer (CVSS 9.8)**

Die zweite Lücke ist eine klassische SQL-Injection im Parameter `author__not_in` des Posts-Endpunkts. Für sich allein betrachtet ist diese Schwachstelle nur für eingeloggte Benutzer ausnutzbar – WordPress schränkt den Zugriff auf diesen Endpunkt normalerweise auf authentifizierte Nutzer ein.

Genau hier greift die Wechselwirkung mit CVE-2026-63030: Der Batch-Endpunkt-Fehler hebt diese Zugangsbeschränkung auf. Dadurch wird die SQL-Injection – die ursprünglich nur für Admins gefährlich wäre – plötzlich von außen, ohne Anmeldung, erreichbar.

Das Ergebnis der Exploit-Kette: Ein anonym gesendeter HTTP-Request reicht aus, um über SQL-Injection und anschließende Objekt-Hydration einen Administrator-Account zu fälschen und danach beliebigen Code auf dem Server auszuführen.

## Welche WordPress-Versionen sind betroffen?

Die Schwachstellen betreffen folgende WordPress-Versionen:

- **WordPress 6.9.x**: Versionen 6.9.0 bis 6.9.4
- **WordPress 7.0.x**: Versionen 7.0.0 und 7.0.1

Nicht betroffen sind Versionen vor 6.9.0 (dort existiert die betreffende REST-API-Batch-Funktionalität noch nicht in dieser Form) sowie die gepatchten Versionen 6.9.5 und 7.0.2.

## Aktive Ausnutzung bestätigt – Handeln Sie jetzt

Die Bedrohung ist nicht theoretisch. Bereits einen Tag nach Veröffentlichung des Patches wurden öffentliche Proof-of-Concept-Exploits auf GitHub bereitgestellt. Sicherheitsanbieter wie Patchstack, Hexastrike und watchTowr haben aktive Angriffe ab dem 18. Juli 2026 bestätigt.

Am 21. Juli 2026 haben die US-amerikanischen Behörden beide CVEs in den [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) aufgenommen – ein klares Signal, dass reale Angriffe in erheblichem Umfang stattfinden. Aus dem CISA-Katalog ergibt sich auch eine Handlungspflicht für alle US-Bundesbehörden, doch die Empfehlung gilt universell: sofort patchen.

Das WordPress-Team hat als Reaktion die automatischen Zwangsupdates aktiviert – viele Websites wurden dadurch bereits automatisch auf die sichere Version aktualisiert. Dennoch sollten Sie selbst prüfen, ob Ihre Website tatsächlich die aktuelle Version läuft.

## So prüfen Sie Ihren Update-Status und schützen sich

**1. WordPress-Version prüfen**

Melden Sie sich in Ihrem WordPress-Dashboard an und gehen Sie zu **Dashboard → Aktualisierungen**. Die aktuelle Version wird oben auf der Seite angezeigt. Sehen Sie dort eine Version kleiner als 6.9.5 (im 6.x-Zweig) oder 7.0.2 (im 7.x-Zweig), führen Sie das Update sofort durch.

**2. Administrator-Konten kontrollieren**

Da wp2shell das Anlegen von Administrator-Konten ermöglicht, sollten Sie unter **Benutzer → Alle Benutzer** alle Konten mit der Rolle „Administrator" prüfen. Unbekannte Konten müssen sofort gelöscht werden.

**3. Datei-Integrität überprüfen**

Nutzen Sie die [Wordfence-Sicherheitssuite](https://www.wordfence.com/) oder einen vergleichbaren Dienst, um zu prüfen, ob Kern-Dateien von WordPress verändert wurden. Veränderte Kerndateien sind ein starkes Indiz für eine kompromittierte Website.

**4. REST-API-Zugriff einschränken**

Falls Ihre Website keine REST-API für externe Dienste benötigt, können Sie den öffentlichen Zugriff darauf einschränken. Auch nach dem Einspielen des Updates ist eine restriktive REST-API-Konfiguration eine sinnvolle Härtungsmaßnahme.

**5. Automatische Updates dauerhaft aktivieren**

Das WordPress-Core-Auto-Update ist standardmäßig nur für kleine Sicherheits-Releases aktiviert. Für alle Major-Releases empfiehlt es sich, automatische Updates dauerhaft zu aktivieren – entweder über die WordPress-Einstellungen oder durch folgenden Code-Schnipsel in der `wp-config.php`:

```php
define( 'WP_AUTO_UPDATE_CORE', true );
```

## Was tun, wenn Ihre Website bereits kompromittiert wurde?

Falls Sie vermuten, dass Ihre Website in dem Zeitraum zwischen dem Erscheinen der Exploits (18. Juli) und dem Update-Einspielen kompromittiert wurde, sind folgende Schritte notwendig:

- Website sofort offline nehmen oder in den Wartungsmodus setzen
- Alle Passwörter (WordPress-Admin, FTP, Datenbank, Hosting-Panel) ändern
- Sauberes Backup einspielen – sofern verfügbar und aus einem Zeitraum vor der Kompromittierung
- Professionelle Bereinigung durch einen Sicherheitsdienstleister beauftragen, wenn kein sauberes Backup existiert

Eine kompromittierte Website, die ohne vollständige Bereinigung wieder online geht, bleibt angreifbar – selbst nach dem Update. Backdoors, die im Zuge eines wp2shell-Angriffs installiert wurden, verbleiben auf dem System und ermöglichen weiterhin unbefugten Zugriff.

## Warum WordPress-Core-Lücken besonders ernst zu nehmen sind

Plugin-Schwachstellen sind im WordPress-Ökosystem häufig. Core-Lücken dieser Schwere sind deutlich seltener – und deutlich gefährlicher, weil keine optionale Komponente deaktiviert werden kann, um das Risiko zu eliminieren.

wp2shell zeigt, wie eine Kombination aus einem Logikfehler und einer SQL-Injection zu einer vollständigen, unauthentifizierten Website-Übernahme führen kann. [Patchstack](https://patchstack.com/) und andere Sicherheitsanbieter, die den Angriff analysiert haben, beschreiben ihn als eine der schwerwiegendsten Core-Schwachstellen der letzten Jahre.

Das unterstreicht, wie wichtig eine proaktive Sicherheitsstrategie für WordPress-Websites ist: regelmäßige Updates, Monitoring, Backup-Strategien und im Zweifel professionelle Unterstützung.

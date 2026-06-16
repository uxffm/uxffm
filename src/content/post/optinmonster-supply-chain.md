---
publishDate: 2026-06-16T00:00:00Z
title: "OptinMonster-CDN-Hack: 1,2 Millionen WordPress-Sites betroffen"
excerpt: "Ein CDN-Supply-Chain-Angriff über Awesome Motive infizierte OptinMonster, TrustPulse und PushEngage. Was Sie jetzt prüfen und tun müssen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/optinmonster-supply-chain
---

Millionen von WordPress-Websites standen in den vergangenen Tagen vor einer ernsthaften Sicherheitsbedrohung: Ein gezielter Supply-Chain-Angriff auf das Content Delivery Network (CDN) des Plugin-Anbieters Awesome Motive hat die weitverbreiteten Plugins OptinMonster, TrustPulse und PushEngage kompromittiert. Besonders beunruhigend: Die Schadsoftware wurde direkt über die offizielle Infrastruktur des Anbieters ausgeliefert — und traf dabei angemeldete WordPress-Administratoren.

## Was ist passiert?

Am 12. Juni 2026, um 22:17 UTC, entdeckten Sicherheitsforscher schadhaften JavaScript-Code in den CDN-Dateien von OptinMonster und TrustPulse. Der Code war in legitime Dateien eingebettet, die über Awesome Motives offizielle CDN-Infrastruktur an Millionen von Websites ausgeliefert werden.

Wie [Patchstack in einer technischen Analyse](https://patchstack.com/articles/supply-chain-attack-on-optinmonster-trustpulse-and-pushengage-tampered-cdn-scripts-auto-creating-rogue-admins/) aufdeckte, hatten die Angreifer die Kampagne bereits Wochen zuvor vorbereitet: Am 28. April 2026 registrierten sie die Lookalike-Domain `tidio.cc` — eine täuschend echte Nachahmung des legitimen Dienstes `tidio.com` — und richteten sie als Command-and-Control-Server ein.

OptinMonster und TrustPulse waren innerhalb von 25 Minuten wieder sauber. Doch PushEngage lieferte die infizierten Skripte bis zum 14. Juni 2026 aus. In diesem Zeitraum war jede WordPress-Website gefährdet, auf der eines dieser Plugins installiert war und die von einem angemeldeten Administrator aufgerufen wurde.

Awesome Motive hat den Vorfall bestätigt: Ein CDN-API-Schlüssel wurde kompromittiert. Anwendungsserver, Quellcode-Repositories und gespeicherte Kundendaten waren laut aktuellem Kenntnisstand nicht betroffen.

## Wie gelangten die Angreifer an den CDN-Schlüssel?

Die Ursache ist ein klassisches Beispiel für eine Schwachstellenkette: Auf dem Marketing-Webserver von OptinMonster lief eine verwundbare Version des Backup-Plugins UpdraftPlus. Über diese Lücke verschafften sich die Angreifer Zugriff auf den Server — und fanden dort einen CDN-API-Schlüssel gespeichert, mit dem sie die JavaScript-Dateien auf den CDN-Edge-Servern modifizieren konnten.

Das verdeutlicht ein oft übersehenes Risiko: Nicht nur die WordPress-Instanzen der Kunden müssen sicher sein — auch die internen Systeme eines Plugin-Anbieters sind Teil der Sicherheitskette.

## Wie funktionierte der Schadcode technisch?

Der injizierte JavaScript-Code war raffiniert gestaltet. Er führte mehrere Prüfungen durch, bevor er aktiv wurde:

- **Headless-Browser-Erkennung:** War der Browser ein automatisierter Scanner oder Crawler, blieb der Code inaktiv. Die Payload lief nur in echten Browsern.
- **Administrator-Prüfung:** Das Skript überprüfte, ob der aktuelle Benutzer als WordPress-Administrator angemeldet war. Nur dann schritt es zur Tat.

Waren beide Bedingungen erfüllt, lief der Angriff in drei Schritten ab:

1. **Versteckten Administrator-Account anlegen:** Das Skript nutzte die aktive Admin-Session — inklusive gültigem Nonce — um über die WordPress-REST-API einen neuen Benutzer mit Administratorrechten zu erstellen. Von außen sah dieser Request aus wie eine normale Aktion des echten Admins.
2. **Backdoor-Plugin installieren:** Unmittelbar danach wurde ein selbstversteckendes Backdoor-Plugin installiert. Es taucht weder in der normalen Plugin-Liste auf, noch bei einer Suche in der WordPress-Oberfläche.
3. **Zugangsdaten exfiltrieren:** Die neu erstellten Admin-Zugangsdaten wurden an `tidio.cc` übertragen, wo die Angreifer dauerhaften Zugang zur kompromittierten Website erhielten.

Nach diesem Ablauf haben die Angreifer uneingeschränkten Dauerzugriff — selbst wenn das ursprüngliche Schadskript längst entfernt wurde und alle Plugin-Updates eingespielt sind.

## Was sollten Websitebetreiber jetzt tun?

Falls Sie OptinMonster, TrustPulse oder PushEngage nutzen und Ihre Website zwischen dem 12. und 14. Juni 2026 von Administratoren aufgerufen wurde, müssen Sie von einer möglichen Kompromittierung ausgehen. Führen Sie sofort folgende Schritte durch:

**1. Alle Administrator-Accounts prüfen**
Öffnen Sie *Benutzer → Alle Benutzer* und filtern Sie nach der Rolle „Administrator". Achten Sie auf unbekannte Konten — besonders solche mit zufälligen Benutzernamen, fehlenden E-Mail-Adressen oder unerwarteten Registrierungsdaten.

**2. Plugin-Verzeichnis direkt prüfen**
Das Backdoor-Plugin versteckt sich in der WordPress-Oberfläche. Prüfen Sie daher das Verzeichnis `wp-content/plugins/` direkt via FTP, SSH oder Ihrem Hosting-Dateimanager auf unbekannte Ordner oder Dateien.

**3. Alle Passwörter zurücksetzen und Sessions invalidieren**
Setzen Sie die Passwörter aller Administrator-Konten zurück und beenden Sie alle aktiven Sessions unter *Benutzer → Profil → Sitzungen aller anderen Orte abmelden*.

**4. Sicherheitsscan durchführen**
Tools wie Wordfence oder der [Sansec-Malware-Scanner](https://sansec.io/) können bekannte Backdoor-Muster erkennen. Führen Sie einen vollständigen Scan durch und prüfen Sie die Ergebnisse sorgfältig.

**5. WordPress-Kerndateien auf Integrität prüfen**
Via WP-CLI können Sie Ihre Kerndateien gegen die offiziellen Prüfsummen abgleichen: `wp core verify-checksums`. Abweichungen deuten auf Manipulationen hin.

**6. Hosting-Provider kontaktieren**
Falls Sie eine Kompromittierung feststellen oder Unsicherheit besteht, informieren Sie Ihren Hosting-Provider. Viele Anbieter bieten Malware-Scans und Bereinigungsservices an.

## Warum Supply-Chain-Angriffe so gefährlich sind

Dieser Vorfall illustriert ein fundamentales Problem der modernen Software-Lieferkette: Selbst wenn ein Plugin von einem renommierten Anbieter stammt und seit Jahren zuverlässig funktioniert, kann die Auslieferungsinfrastruktur kompromittiert werden — mit verheerenden Folgen für alle Nutzer gleichzeitig.

Bei klassischen Plugin-Angriffen müssen Angreifer eine konkrete Schwachstelle im Code eines einzelnen Plugins ausnutzen. Bei einem Supply-Chain-Angriff auf das CDN reicht die Kompromittierung eines einzigen API-Schlüssels, um Millionen von Websites zu erreichen. Schutzmechanismen wie Plugin-Updates, Code-Reviews oder Sicherheits-Audits greifen hier nicht — der schadhafte Code kommt von einer vertrauenswürdigen Quelle.

[Bleeping Computer berichtet](https://www.bleepingcomputer.com/news/security/optinmonster-wordpress-plugin-hacked-in-cdn-supply-chain-attack/), dass die Anzahl betroffener Websites bei OptinMonster allein über 1,2 Millionen liegt — und macht diesen Angriff zu einem der größten bekannten CDN-Supply-Chain-Vorfälle im WordPress-Ökosystem.

## Langfristige Schutzmaßnahmen für Ihre WordPress-Website

Aus diesem Vorfall lassen sich konkrete Lehren für die eigene WordPress-Sicherheitsstrategie ziehen:

- **Regelmäßige Backups** mit Off-Site-Speicherung — mindestens täglich, auf einem vom Webserver getrennten System
- **Zwei-Faktor-Authentifizierung** für alle Administrator-Konten, damit gestohlene Passwörter allein keinen Zugriff ermöglichen
- **Minimale Admin-Konten** — nur so viele Administratoren wie unbedingt notwendig
- **Monitoring auf neue Benutzerkonten** und unerwartet installierte Plugins, idealerweise mit automatischen Benachrichtigungen
- **Web Application Firewall (WAF)** zum Schutz vor bekannten Angriffsvektoren auf REST-API-Endpunkte
- **Regelmäßige Sicherheits-Audits** der installierten Plugins und deren Hersteller

## Fazit: WordPress-Sicherheit ist eine kontinuierliche Aufgabe

Der OptinMonster-CDN-Angriff zeigt: Vertrauen in einen Plugin-Anbieter reicht nicht aus, um dauerhaft sicher zu sein. Selbst etablierte und weitverbreitete Plugins können zum Einfallstor werden — wenn auch nicht durch eigene Fehler, sondern durch Schwachstellen in der Infrastruktur dahinter.

Als [WordPress-Agentur aus Frankfurt](/) helfen wir kleinen und mittelständischen Unternehmen dabei, ihre WordPress-Websites sicher, aktuell und zuverlässig zu betreiben — mit regelmäßigen Sicherheits-Audits, durchdachten Backup-Strategien und einer schnellen Reaktion bei Sicherheitsvorfällen. Wenn Sie unsicher sind, ob Ihre Website von diesem Angriff betroffen ist, oder wenn Sie Ihre WordPress-Sicherheit grundlegend auf ein professionelles Niveau heben möchten, sprechen Sie uns an.

## Quellen

- [Supply Chain Attack on OptinMonster, TrustPulse, and PushEngage: Tampered CDN Scripts Auto-Creating Rogue Admins](https://patchstack.com/articles/supply-chain-attack-on-optinmonster-trustpulse-and-pushengage-tampered-cdn-scripts-auto-creating-rogue-admins/) — Patchstack
- [OptinMonster supply chain attack hits 1.2 million sites](https://sansec.io/research/optinmonster-supply-chain-attack) — Sansec
- [OptinMonster WordPress plugin hacked in CDN supply-chain attack](https://www.bleepingcomputer.com/news/security/optinmonster-wordpress-plugin-hacked-in-cdn-supply-chain-attack/) — Bleeping Computer
- [Supply-chain attack hits OptinMonster plugin used in 1.2 million WordPress sites](https://cyberinsider.com/supply-chain-attack-hits-optinmonster-plugin-used-in-1-2-million-wordpress-sites/) — r/wordpress

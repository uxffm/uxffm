---
publishDate: 2026-05-29T00:00:00Z
title: "Kritische WordPress-Sicherheitslücken Mai 2026: Was Sie jetzt tun müssen"
excerpt: "Im Mai 2026 gefährden CVE-2026-8181 in Burst Statistics und CVE-2026-4798 in Avada Builder über 1,5 Millionen WordPress-Seiten — hier erfahren Sie, was zu tun ist."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-plugin-sicherheit-mai
---

Im Mai 2026 hat die WordPress-Community innerhalb weniger Tage gleich zwei schwerwiegende Sicherheitsvorfälle erlebt. Die Lücke CVE-2026-8181 in Burst Statistics ermöglicht unauthentifizierten Angreifern die vollständige Übernahme einer WordPress-Website — ohne gültiges Passwort. Zeitgleich wurden über eine Million Avada-Builder-Websites durch eine SQL-Injection-Schwachstelle (CVE-2026-4798) gefährdet. Für Betreiber beider Plugins besteht akuter Handlungsbedarf.

## Burst Statistics: Vollständige Admin-Übernahme ohne Passwort (CVE-2026-8181)

Burst Statistics ist ein datenschutzfreundliches Analytics-Plugin für WordPress mit rund 100.000 aktiven Installationen. Am 23. April 2026 führte Version 3.4.0 eine neue MainWP-Integration ein — und damit unbeabsichtigt eine der gefährlichsten Sicherheitslücken des Jahres.

### Wie die Lücke technisch funktioniert

Der Fehler sitzt in der Funktion `is_mainwp_authenticated()` innerhalb der Datei `class-mainwp-proxy.php`. Die Funktion ruft intern `wp_authenticate_application_password()` auf, prüft aber lediglich, ob das Ergebnis ein `WP_Error`-Objekt ist — nicht jedoch, ob tatsächlich eine erfolgreiche Authentifizierung stattgefunden hat.

WordPress gibt in bestimmten Kontexten (wenn die Anfrage nicht über den regulären REST-API-Pfad läuft) nicht `WP_Error`, sondern `null` zurück. Diese `null`-Rückgabe wird von der Prüfung als Erfolg gewertet. Das Ergebnis: Wer den Benutzernamen eines Administrators kennt, kann mit *jedem beliebigen Passwort* in Basic-Auth-Headern einen REST-API-Aufruf mit Administratorrechten ausführen.

Im schlimmsten Fall können Angreifer darüber:

- Neue Administratorkonten anlegen
- Dateien auf dem Server manipulieren
- Schadcode über den Plugin- oder Theme-Editor einschleusen
- Vollständige Kontrolle über die WordPress-Installation übernehmen

### Aktive Ausnutzung in großem Umfang bestätigt

[Wordfence](https://www.wordfence.com/) hat innerhalb von 24 Stunden nach Veröffentlichung der technischen Details über **7.400 Angriffsversuche** auf CVE-2026-8181 blockiert. Die Schwachstelle ist damit nicht nur theoretisch riskant — sie wird aktiv und im industriellen Maßstab ausgenutzt.

Der CVSS-Score liegt bei **9,8 von 10** — das entspricht der höchsten Kategorie „Kritisch". Wordfence initiierte die verantwortungsvolle Offenlegung am 8. Mai, veröffentlichte vollständige Details am 11. Mai, und der Hersteller lieferte die gepatchte Version 3.4.2 am 12. Mai 2026 aus.

### Was jetzt sofort zu tun ist

Update auf Burst Statistics Version **3.4.2 oder höher** sofort durchführen. Version 3.4.2 wurde am 12./13. Mai 2026 veröffentlicht und schließt die Lücke vollständig. Wer das Plugin noch nicht aktualisiert hat, sollte es bis zum Update deaktivieren. Zusätzlich empfiehlt es sich dringend, die Benutzerliste unter „Benutzer → Alle Benutzer" auf unbekannte Administratorkonten zu prüfen und alle Sitzungen unbekannter Benutzer sofort zu beenden.

## Avada Builder: SQL-Injection trifft über eine Million Websites (CVE-2026-4798)

Nahezu zeitgleich wurde bekannt, dass das populäre Avada Builder Plugin in Versionen bis einschließlich 3.15.1 eine hochgefährliche SQL-Injection-Lücke enthält. Avada gilt als eines der meistverkauften WordPress-Themes weltweit — entsprechend groß ist das betroffene Ökosystem mit über einer Million aktiver Installationen.

### Technischer Hintergrund: Fehlende Datenbankabsicherung

Die Sicherheitslücke befindet sich im Parameter `product_order` eines Avada-Builder-Fusion-Elements. Dem Code fehlt die notwendige Datenbankabfrage-Absicherung mit `$wpdb->prepare()`. Ein Angreifer kann über time-based SQL Injection — also durch das Messen von Antwortverzögerungen mithilfe von SQL-Funktionen wie `SLEEP()` — Datenbankabfragen rekonstruieren, ohne dass die Ergebnisse direkt im Browser erscheinen.

Die Lücke ist **unauthentifiziert** ausnutzbar, erfordert jedoch eine wichtige Voraussetzung: WooCommerce muss auf der Website zumindest einmal aktiv gewesen sein. Websites, die WooCommerce nie installiert haben, sind von CVE-2026-4798 nicht betroffen.

Mögliche Konsequenzen bei erfolgreicher Ausnutzung:

- Auslesen von Datenbankzugangsdaten
- Extraktion von Benutzerdaten inklusive gehashter Passwörter
- Zugriff auf gespeicherte Transaktionsdaten und Bestellinformationen (bei aktiver WooCommerce-Nutzung)

### Patch und empfohlene Maßnahmen

ThemeFusion hat am 12. Mai 2026 die Version **3.15.3** veröffentlicht, die beide Avada-Builder-Lücken schließt — neben CVE-2026-4798 auch CVE-2026-4782, eine Arbitrary-File-Read-Schwachstelle, die mit Subscriber-Zugriff ausnutzbar ist. Avada-Builder-Nutzer sollten sofort auf 3.15.3 aktualisieren und anschließend Datenbankprotokolle auf ungewöhnliche Abfragemuster prüfen.

## Was diese Vorfälle über WordPress-Sicherheit lehren

Beide Lücken zeigen exemplarisch, wie schnell vertrauenswürdige Plugins zu einem Einfallstor werden können:

**Integrationscode ist gefährlicher als Kernfunktionen.** Der Burst-Statistics-Fehler entstand nicht in der Analytics-Logik selbst, sondern in einem neu hinzugefügten Integrations-Modul für MainWP. Jede neue Plugin-Funktion vergrößert die Angriffsfläche — auch wenn die eigentliche Kernfunktion des Plugins seit Jahren sicher ist.

**Unauthentifizierte Lücken sind das höchste Risiko.** Beide Schwachstellen erfordern keine vorherige Anmeldung. Das macht automatisierte Massenangriffe trivial: Angreifer scannen permanent alle erreichbaren WordPress-Instanzen und nutzen anfällige Versionen sofort aus — oft innerhalb von Stunden nach Veröffentlichung der Details.

**Regelmäßige Updates sind der wichtigste Schutz.** Kein Firewall-Plugin wäre in der Lage gewesen, CVE-2026-8181 zu blockieren, solange Burst Statistics selbst nicht gepatcht war. Der wirksamste Schutz ist stets das zeitnahe Einspielen von Updates — idealerweise automatisiert für kritische Plugins.

**Benutzerpflege wird unterschätzt.** Bei kompromittierten Instanzen ist der häufigste Angriffspfad das Anlegen versteckter Administratorkonten, die auch nach dem Schließen der ursprünglichen Lücke bestehen bleiben. Regelmäßige Audits der Benutzerverwaltung gehören zur Grundhygiene jeder WordPress-Website.

## Praktische Sicherheits-Checkliste für WordPress-Betreiber

Wer eine WordPress-Website betreibt, sollte jetzt folgende Schritte ausführen:

1. **Dashboard öffnen:** Unter „Plugins → Installierte Plugins" alle ausstehenden Updates prüfen und sofort einspielen
2. **Burst Statistics:** Update auf ≥ 3.4.2; danach Benutzerliste auf unbekannte Administratoren prüfen und alle Sitzungen zurücksetzen
3. **Avada Builder:** Update auf ≥ 3.15.3; WooCommerce-Bestelldaten und Datenbankprotokolle auf ungewöhnliche Abfragemuster prüfen
4. **Automatische Updates aktivieren:** Unter „Dashboard → Aktualisierungen" automatische Hintergrund-Updates für alle Plugins aktivieren
5. **Sicherheits-Scan durchführen:** Plugin wie Wordfence oder [Sucuri Security](https://wordpress.org/plugins/sucuri-scanner/) für einen vollständigen Malware-Scan nutzen
6. **Zugangsdaten rotieren:** Admin-Passwörter und Datenbank-Credentials als Vorsichtsmaßnahme ändern

Für professionell verwaltete WordPress-Websites — bei denen ein spezialisiertes Team Updates einspielt, Logs überwacht und im Ernstfall sofort reagiert — ist die [Frankfurt WordPress Agentur](/) von Frankfurt Marketing Studio der richtige Ansprechpartner für genau solche Situationen.

## Fazit: Proaktive Sicherheit ist keine Option mehr

Der Mai 2026 hat erneut gezeigt: WordPress-Sicherheit ist ein laufendes Projekt, kein einmaliger Setup-Schritt. Plugins mit Hunderttausenden aktiver Installationen können innerhalb von Tagen nach einem Update zur gefährlichsten Komponente einer Website werden. Wer keinen internen IT-Administrator mit WordPress-Expertise beschäftigt, sollte professionelle Unterstützung in Betracht ziehen — bevor ein Vorfall eintritt, nicht danach. Die Konsequenzen einer kompromittierten Website reichen von Datenverlust über DSGVO-Bußgelder bis hin zu dauerhaftem Reputationsschaden.

## Quellen

- [Hackers exploit auth bypass flaw in Burst Statistics WordPress plugin](https://www.bleepingcomputer.com/news/security/hackers-exploit-auth-bypass-flaw-in-burst-statistics-wordpress-plugin/) — r/wordpress
- [1 Million WordPress Sites Exposed by Avada Builder Security Flaws](https://rewterz.com/threat-advisory/1-million-wordpress-sites-exposed-by-avada-builder-security-flaws) — r/wordpress
- [WordPress Vulnerability Roundup: May 2026](https://wpvanguard.com/blog/wordpress-vulnerability-roundup-may-2026) — r/wordpress

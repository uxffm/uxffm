---
publishDate: 2026-07-24T00:00:00Z
title: "Kritische WordPress-Lücke wp2shell: Was Sie jetzt sofort tun müssen"
excerpt: "Eine kritische Remote-Code-Execution-Lücke namens wp2shell bedroht Millionen WordPress-Sites. So prüfen und schützen Sie Ihre Installation jetzt."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wp2shell-rce-wordpress-patch
---

Die WordPress-Community befindet sich seit dem 17. Juli 2026 im Ausnahmezustand: Eine kritische Sicherheitslücke mit dem Namen **wp2shell** ermöglicht es unauthentifizierten Angreifern, auf verwundbaren WordPress-Installationen beliebigen Code auszuführen – ohne Login, ohne spezielles Plugin, ohne jegliche Vorbedingung. Was hinter dieser Schwachstelle steckt, welche Versionen betroffen sind und was Sie jetzt sofort unternehmen sollten, lesen Sie in diesem Artikel.

## Was ist wp2shell?

wp2shell ist der Name für eine gefährliche Angriffskette, die zwei separate Sicherheitslücken im WordPress-Core zu einem vollständigen Angriffsszenario kombiniert: **CVE-2026-63030** und **CVE-2026-60137**. Einzeln sind beide Lücken bereits ernst zu nehmen – zusammen ermöglichen sie jedoch eine vollständige Serverübernahme, und das ohne jede Authentifizierung.

Der Name ist dabei Programm: „wp" steht für WordPress, „2" signalisiert die Verkettung zweier Schwachstellen, und „shell" beschreibt das Angriffsziel – die Ausführung einer Remote-Shell auf dem Webserver des Opfers. Die Lücke wurde von Sicherheitsforschern entdeckt und am 17. Juli 2026 koordiniert gemeinsam mit einem Notfall-Patch veröffentlicht.

## Die zwei Schwachstellen im Detail

### CVE-2026-63030 – REST API Batch-Route Confusion

Die erste Schwachstelle sitzt im WordPress-REST-API-Batch-Prozessor unter `/wp-json/batch/v1`. Seit WordPress 6.9 enthält diese Komponente einen Logikfehler: Wenn `wp_parse_url()` bei der Verarbeitung einer Sub-Anfrage-URL fehlschlägt, wird der Fehler zwar in das Validierungs-Array geschrieben – nicht aber in das Matches-Array. Dadurch laufen beide Arrays auseinander. Das Ergebnis: Jede nachfolgende Sub-Anfrage wird unter dem falschen Handler ausgeführt, und eigentlich gesperrte Endpunkte werden erreichbar.

### CVE-2026-60137 – SQL-Injection in WP_Query

Die zweite Schwachstelle betrifft den Parameter `author__not_in` in `WP_Query`. Dieser Parameter wird unter bestimmten Bedingungen direkt in SQL-Abfragen interpoliert, ohne korrekte Bereinigung. Normalerweise verhindert die WordPress-Eingabevalidierung solche Angriffe – doch genau diese Validierung hebelt die Desynchronisierung durch CVE-2026-63030 aus. Das Ergebnis ist eine UNION-basierte SQL-Injection, die mit einem anonymen HTTP-Request ausgeführt werden kann.

### Die Angriffskette Schritt für Schritt

Ein Angreifer sendet zunächst eine speziell präparierte Batch-Anfrage an die REST-API, um die Array-Desynchronisierung auszulösen. Darüber werden GET-Restriktionen umgangen und die SQL-Injection aktiviert. Anschließend extrahiert der Angreifer Administratoranmeldedaten aus der Datenbank, erstellt einen gefälschten Admin-Account – und kann über die reguläre WordPress-Plugin-Upload-Funktion beliebigen Code auf dem Server platzieren und ausführen. Der gesamte Ablauf funktioniert ohne einen einzigen gültigen Login.

## Welche WordPress-Versionen sind betroffen?

Die vollständige wp2shell-Angriffskette funktioniert gegen:

- **WordPress 6.9.0 bis 6.9.4**
- **WordPress 7.0.0 bis 7.0.1**

Die SQL-Injection (CVE-2026-60137) betrifft zwar auch WordPress 6.8.0 bis 6.8.5, lässt sich dort jedoch nicht zur Remote-Code-Execution eskalieren – der REST-API-Logikfehler, der als Einstiegspunkt dient, wurde erst in Version 6.9 eingeführt.

## Der Patch: WordPress 6.9.5 und 7.0.2

Die WordPress Security-Arbeitsgruppe hat die Lücke in Rekordzeit geschlossen. Nur Stunden nach der koordinierten Offenlegung erschienen am **17. Juli 2026** die Versionen [WordPress 6.9.5 und 7.0.2](https://wordpress.org/news/category/releases/) mit den entsprechenden Korrekturen. WordPress hat darüber hinaus erzwungene automatische Updates aktiviert, um möglichst viele Installationen ohne manuelles Eingreifen zu schützen.

**Wichtig:** Trotz automatischer Updates sollten Sie aktiv prüfen, ob die Aktualisierung auf Ihrer Installation tatsächlich durchgeführt wurde. Fehlkonfigurationen, deaktivierte Auto-Updates oder Hosting-Einschränkungen können das Update blockiert haben.

## Wie Sie prüfen, ob Ihre Website aktuell ist

Der einfachste Weg: Melden Sie sich in Ihrem WordPress-Dashboard an und gehen Sie zu **Dashboard > Aktualisierungen**. Steht dort Version 7.0.2 (oder 6.9.5 im 6.x-Zweig) oder höher, sind Sie geschützt. Ältere Versionsnummern bedeuten dringenden Handlungsbedarf.

Technisch versierte Nutzende können die Version auch per WP-CLI abfragen:

```
wp core version
```

Das Ergebnis sollte `7.0.2` oder höher anzeigen.

## Was Sie jetzt sofort tun sollten

**1. Update einspielen:** Spielen Sie WordPress 7.0.2 beziehungsweise 6.9.5 sofort ein, falls noch nicht geschehen. Gehen Sie im Dashboard auf **Aktualisierungen** und führen Sie das Core-Update manuell aus.

**2. Server- und Zugangslogs prüfen:** Durchsuchen Sie Ihre Server- und WordPress-Logs nach ungewöhnlichen Anfragen an `/wp-json/batch/v1`. Verdächtige POST-Anfragen an diesen Endpunkt vor dem 17. Juli können auf eine Kompromittierung hinweisen.

**3. Adminbenutzer kontrollieren:** Prüfen Sie unter **Benutzer > Alle Benutzer**, ob unbekannte Administrator-Accounts erstellt wurden. Das Anlegen eines gefälschten Admin-Accounts ist fester Bestandteil der Angriffskette.

**4. Malware-Scan durchführen:** Tools wie [Wordfence Security](https://www.wordfence.com/) oder Sucuri können Ihre Installation auf kompromittierte Dateien und unbekannte Code-Injektionen scannen.

**5. Hosting-Anbieter fragen:** Falls Ihr Managed-Hosting-Anbieter für WordPress-Updates verantwortlich ist, fragen Sie aktiv nach, ob das Sicherheitsupdate vom 17. Juli bereits eingespielt wurde.

**6. Passwörter zurücksetzen:** Als Vorsichtsmaßnahme empfiehlt sich ein Passwortwechsel für alle Administratoren – insbesondere wenn Sie nicht ausschließen können, dass Ihre Installation im Zeitraum zwischen Lückenentstehung und Patch angegriffen wurde.

## Warum wp2shell so außergewöhnlich gefährlich ist

Was diese Lücke von den meisten anderen WordPress-Schwachstellen unterscheidet, ist die vollständige Voraussetzungslosigkeit des Angriffs. Keine Anmeldung, kein bestimmtes Plugin, keine ungewöhnliche Konfiguration. Eine Standard-WordPress-Installation auf einer betroffenen Version ist vollständig angreifbar.

Sicherheitsforschende bestätigten ab dem **20. Juli 2026** aktive Ausnutzung in freier Wildbahn. Öffentliche Proof-of-Concept-Exploits kursieren seither auf GitHub, was die Angriffsschwelle weiter senkt – auch technisch weniger versierte Angreifer können die Lücke damit ausnutzen.

Wer heute noch auf einer verwundbaren Version läuft, muss damit rechnen, bereits angegriffen worden zu sein oder aktiv ins Visier genommen zu werden.

## Langfristige WordPress-Sicherheitsmaßnahmen

Die wp2shell-Lücke ist ein eindringliches Signal: WordPress-Sicherheit ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess. Einige Maßnahmen, die das Risiko zukünftiger Angriffe deutlich reduzieren:

**Automatische Updates konsequent aktivieren:** Für Sicherheits-Releases sollte Auto-Update in jeder Installation aktiv sein. WordPress kann so kritische Patches binnen Stunden einspielen.

**Web Application Firewall (WAF) einsetzen:** Eine WAF erkennt bekannte Angriffsmuster und kann viele Exploits blockieren, bevor sie die WordPress-Applikation überhaupt erreichen.

**Staging-Umgebung nutzen:** Testen Sie reguläre Updates immer zunächst auf einer Testinstallation. Bei Sicherheits-Releases gilt jedoch: Sofort patchen, dann testen.

**Regelmäßige externe Backups anlegen:** Im Fall einer Kompromittierung ist ein sauberes, externes Backup die schnellste Möglichkeit zur Wiederherstellung. Backups auf demselben Server wie die Website sind im Ernstfall wertlos.

**Pluginanzahl minimieren:** Jedes Plugin ist eine potenzielle zusätzliche Angriffsfläche. Deinstallieren Sie nicht mehr benötigte Erweiterungen vollständig.

**Regelmäßige Sicherheitsaudits einplanen:** Einmal jährlich einen strukturierten Check durchzuführen – Benutzerrechte, installierte Plugins, veraltete Themes, Datenbankzugriffe – deckt Risiken auf, bevor sie zu Problemen werden.

## Frankfurt Marketing Studio hilft beim WordPress-Sicherheitscheck

Als [WordPress Agentur Frankfurt am Main](/) unterstützen wir kleine und mittelständische Unternehmen dabei, ihre WordPress-Installationen sicher und aktuell zu halten. Nach Vorfällen wie wp2shell erhalten wir regelmäßig Anfragen von Betreibern, die nicht sicher sind, ob ihre Website kompromittiert wurde – oder die wissen möchten, ob alle notwendigen Schutzmaßnahmen aktiv sind.

Sprechen Sie uns an: Wir helfen Ihnen bei der Versionsprüfung, der Analyse von Serverprotokollen, der Bereinigung kompromittierter Installationen und der langfristigen Absicherung Ihrer WordPress-Präsenz in der Rhein-Main-Region.

## Quellen

- [WordPress Core "wp2shell" RCE flaws get public exploits, patch now](https://www.bleepingcomputer.com/news/security/wordpress-core-wp2shell-rce-flaws-get-public-exploits-patch-now/) — r/wordpress
- [CVE-2026-63030 and CVE-2026-60137 (wp2shell): WordPress RCE Explained](https://www.picussecurity.com/resource/blog/cve-2026-63030-and-cve-2026-60137-wp2shell-wordpress-rce-explained) — r/wordpress
- [New wp2shell WordPress Core Flaw Lets Unauthenticated Attackers Run Code](https://thehackernews.com/2026/07/new-wp2shell-wordpress-core-flaw-lets.html) — r/wordpress

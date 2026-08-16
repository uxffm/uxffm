---
publishDate: 2026-07-25T00:00:00Z
title: "wp2shell: Die Angriffswelle rollt – So erkennen Sie eine Kompromittierung"
excerpt: "Seit dem PoC-Release explodieren die Angriffe auf WordPress: Tausende Versuche, 100+ Backdoor-Accounts. Was Sie jetzt prüfen müssen, wenn Sie noch nicht sicher sind."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wp2shell-angriffswelle-recovery
---

Vor einer Woche wurden die WordPress-Lücken CVE-2026-63030 und CVE-2026-60137 öffentlich gemacht – inzwischen hat sich die Lage dramatisch zugespitzt. Seit dem 20. Juli 2026 kursieren vollständige Proof-of-Concept-Exploits, und die Angriffszahlen sind explodiert. WatchTowr, ein auf offensive Sicherheitsforschung spezialisiertes Unternehmen, meldete aus seinen Honeypots **zehntausende Exploit-Versuche** und mehr als **100 von verschiedenen Angreifern angelegte Backdoor-Accounts** – allein in den ersten Tagen nach der PoC-Veröffentlichung.

Wer gestern noch dachte, das eigene Patch-Timing sei noch unkritisch, muss heute neu kalkulieren.

## Die Lage eine Woche nach der Offenlegung

Die Angriffsmuster entwickeln sich. Sicherheitsforschende bei Field Effect und Wiz haben mindestens **13 verschiedene IP-Adressen** in mehreren Ländern identifiziert, die aktiv Exploit-Versuche fahren. Das Verhalten reicht von gezieltem Probing einzelner Ziele bis zu flächendeckendem Internet-Scanning – das bedeutet: Kein verwundbareres System bleibt dauerhaft unentdeckt.

Eine Analyse von Swif AI zeigt, wie dramatisch die Ausgangslage war: Zum Zeitpunkt der Offenlegung hatten **60 % aller Organisationen, die WordPress einsetzen, mindestens eine verwundbare Instanz**. Und 25 % exponierten einen solchen Server direkt ins Internet – ohne jede zusätzliche Schutzschicht.

Zur Einordnung: WordPress betreibt schätzungsweise 500 Millionen Websites weltweit. Das Schadensausmaß einer schlecht kontrollierten Exploitation-Welle ist kaum zu überschätzen.

## Was Angreifer auf kompromittierten Sites hinterlassen

Die Payloads, die Sicherheitsforscher auf kompromittierten Sites gefunden haben, folgen einem klaren Muster:

**Webshells** – Versteckte PHP-Dateien, die eine dauerhafte Backdoor im Dateisystem der Site verankern. Auch nach einem WordPress-Update bleiben diese Dateien bestehen, sofern sie manuell nicht entfernt werden.

**Malicious Plugin Uploads** – Angreifer nutzen die vollständige Admin-Kontrolle, um ein scheinbar harmloses Plugin hochzuladen, das tatsächlich Schadcode enthält. Diese Methode überlebt Core-Updates, Theme-Wechsel und viele automatisierte Bereinigungstools.

**Credential-Exfiltration** – Gehashte und in einigen Fällen bereits geknackte Passwort-Hashes aus der `wp_users`-Tabelle wurden aus betroffenen Datenbanken extrahiert. Diese Hashes können Angreifern dauerhaften Zugang ermöglichen, auch wenn die ursprüngliche Lücke geschlossen ist.

**Rogue Administrator Accounts** – Die bekannteste Komponente der Angriffskette: Automatisiert angelegte Admin-Accounts, die unter unauffälligen Namen wie „plugin-updater" oder mit zufälligen E-Mail-Adressen angelegt werden, um nicht sofort aufzufallen.

## Vier Prüfschritte: Wurde Ihre Site kompromittiert?

Die gute Nachricht: Es gibt konkrete Indikatoren, die auf eine Kompromittierung hinweisen. Gehen Sie diese vier Bereiche systematisch durch – auch wenn Ihre Site bereits gepatcht ist.

### 1. Unbekannte Administratoren prüfen

Gehen Sie in Ihrem WordPress-Dashboard zu **Benutzer > Alle Benutzer** und filtern Sie nach der Rolle „Administrator". Kennen Sie jeden Account persönlich? Prüfen Sie insbesondere:

- Accounts mit unbekannten E-Mail-Adressen
- Kürzlich erstellte Accounts (Erstellungsdatum sichtbar in der Spalte „Mitglied seit")
- Accounts ohne Vor- oder Nachname, oder mit offensichtlich automatisch generierten Nutzernamen

Per WP-CLI lässt sich das schneller durchsuchen:

```bash
wp user list --role=administrator --fields=ID,user_login,user_email,user_registered
```

### 2. Unbekannte Plugins und Dateien identifizieren

Rufen Sie **Plugins > Installierte Plugins** auf und überprüfen Sie die Liste kritisch. Unbekannte Plugins – vor allem solche, die nach dem 17. Juli installiert wurden – sind ein klares Warnsignal. Deaktivieren und löschen Sie Unbekanntes sofort.

Ergänzend: Durchsuchen Sie per SFTP oder SSH den Ordner `wp-content/plugins/` nach Dateien oder Verzeichnissen, die Sie nicht angelegt haben. Webshells verstecken sich gelegentlich auch unter `wp-content/uploads/` als scheinbar harmlose PHP-Dateien.

### 3. Server-Logs auswerten

Suchen Sie in Ihren Access-Logs nach POST-Anfragen an `/wp-json/batch/v1` aus der Zeit **vor dem 17. Juli**. Das ist der Einstiegspunkt der Angriffskette. Beispielbefehl für Nginx-Logs:

```bash
grep "POST /wp-json/batch/v1" /var/log/nginx/access.log | head -50
```

Erscheinen dort Einträge aus der Zeit vor dem Patch, hat möglicherweise eine aktive Kompromittierung stattgefunden – auch wenn der Angreifer möglicherweise keinen sichtbaren Schaden hinterlassen hat.

### 4. Malware-Scan durchführen

Tools wie [Wordfence Security](https://www.wordfence.com/) oder der [Sucuri SiteCheck](https://sitecheck.sucuri.net/) können Ihre Installation auf bekannte Webshell-Signaturen und verdächtige Codeänderungen untersuchen. Kostenlose Versionen reichen für einen ersten Schnellcheck aus; für eine vollständige Bereinigung ist die Premium-Version in der Regel erforderlich.

## Was tun, wenn Sie eine Kompromittierung feststellen?

Wenn einer der obigen Prüfschritte positiv ausfällt, empfehlen wir folgende Reihenfolge:

**1. Sofort offline nehmen** – Stellen Sie die Site auf Wartungsmodus oder deaktivieren Sie sie temporär über Ihren Hoster. Jede weitere Minute gibt dem Angreifer Zeit, weitere Backdoors zu setzen.

**2. Backup des kompromittierten Zustands sichern** – Klingt kontraintuitiv, aber ein vollständiges Backup des aktuellen Zustands (Dateisystem + Datenbank) hilft bei der forensischen Analyse, welche Daten abgeflossen sein könnten.

**3. Clean Install mit Datenmigration** – Die sicherste Option ist eine frische WordPress-Installation und die Migration ausschließlich sauberer Daten: Medien-Uploads nach manueller Prüfung, keine Plugins aus dem Backup, neue Datenbankzugangsdaten.

**4. Alle Passwörter zurücksetzen** – Datenbank-User, WordPress-Adminpasswörter, FTP/SSH-Credentials, Hosting-Panel-Zugänge. Alle. Wer kompromittierte Hashes exfiltriert hat, kann diese offline knacken.

**5. Hosting und Registrar informieren** – Falls Ihr Webserver als Teil eines Botnetzes missbraucht wird, kann Ihr Hoster zusätzliche Maßnahmen ergreifen. Manche Hoster haben eigene Incident-Response-Teams für genau solche Fälle.

## Der historische Kontext: Warum diese Lücke besonders ist

Sicherheitsforscher bei PwnDefend haben die wp2shell-Welle in eine direkte Linie mit den größten WordPress-Exploitation-Ereignissen der letzten 25 Jahre gestellt: [TimThumb (2011)](https://blog.sucuri.net/2011/08/timthumb-php-the-backdoor-patch-and-all-the-shenanigans.html), RevSlider (2014), MailPoet (2014). Was wp2shell von früheren Massenangriffen unterscheidet: Die Lücke sitzt im Core selbst – nicht in einem Plugin. Es gibt kein „Nicht-Betroffene, die dieses Plugin nie installiert haben". Jede Standard-WordPress-Installation auf einer verwundbaren Version war potenziell angreifbar.

## Prävention: Aus wp2shell lernen

Die wp2shell-Welle zeigt deutlich, wie kurz das Fenster zwischen Lücken-Offenlegung und aktivem Exploit inzwischen ist. Sicherheitsteams und WordPress-Betreiber haben oft keine Woche mehr, um zu reagieren – manchmal nur Stunden.

Konkrete strukturelle Maßnahmen, die künftig helfen:

- **Auto-Updates für Security-Releases aktivieren** – WordPress kann kritische Patches eigenständig einspielen, bevor Sie sie überhaupt bemerkt haben.
- **WAF / CDN mit Exploit-Erkennung vorschalten** – Cloudflare, Akamai und andere haben bereits innerhalb von Stunden nach der Offenlegung WAF-Regeln für wp2shell veröffentlicht.
- **REST-API-Zugang beschränken** – Falls Ihre Site die Batch-Route nicht aktiv nutzt, können Sie den `/wp-json/batch/v1`-Endpunkt auf Infrastrukturebene (Nginx, Apache, .htaccess) blockieren.
- **Monitoring einrichten** – Tools wie [WP Activity Log](https://wordpress.org/plugins/wp-security-audit-log/) protokollieren Admin-Aktivitäten und machen nachträgliche Kompromittierungen rekonstruierbar.

## Frankfurt Marketing Studio unterstützt bei der Incident Response

Als [WordPress-Experten aus Frankfurt](/) begleiten wir Unternehmen in der Rhein-Main-Region bei der Analyse, Bereinigung und Absicherung ihrer WordPress-Installationen nach Sicherheitsvorfällen. Falls Sie unsicher sind, ob Ihre Site betroffen war, oder eine professionelle Einschätzung benötigen – sprechen Sie uns an. Eine erste Einschätzung geben wir gerne.

---
publishDate: 2026-07-26T00:00:00Z
title: "WordPress 2FA einrichten: So schützen Sie Admin-Zugänge wirklich"
excerpt: "Nach der wp2shell-Welle ist Zwei-Faktor-Authentifizierung für WordPress-Admins Pflicht. Wir zeigen, welche Plugins sich bewähren und wie die Einrichtung in 15 Minuten gelingt."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-2fa-einrichten
---

Die wp2shell-Angriffswelle der letzten Woche hat eine unbequeme Wahrheit enthüllt: Ein gestartetes kompromittiertes WordPress-Admin-Passwort ist für Angreifer der schnellste Weg zur vollständigen Kontrolle über eine Website. Hunderte rogue Administrator-Accounts wurden automatisiert angelegt – und in vielen Fällen hätte eine einzige Maßnahme die Schadenswirkung erheblich begrenzt: Zwei-Faktor-Authentifizierung. In diesem Artikel zeigen wir Ihnen, welche 2FA-Lösungen für WordPress empfehlenswert sind, wie die Einrichtung konkret aussieht und worauf Sie bei der Plugin-Wahl achten sollten.

## Warum 2FA nach wp2shell nicht mehr optional ist

Bei den wp2shell-Angriffen haben Angreifer über den `/wp-json/batch/v1`-Endpunkt vollständige Adminrechte erlangt und anschließend neue Administrator-Accounts angelegt. Wer hingegen Zwei-Faktor-Authentifizierung aktiv hatte, profitierte von einem wichtigen Schutzwall: Selbst wenn ein Angreifer die Passwort-Hashes aus der Datenbank extrahiert und offline geknackt hat, kann er sich ohne den zweiten Faktor nicht einloggen.

Das ist keine hypothetische Überlegung. Security-Forscher bei Wordfence haben dokumentiert, dass ein erheblicher Anteil der nach wp2shell kompromittierten Sites nachweislich schwache oder wiederverwendete Passwörter hatte. Viele dieser Angriffe wären mit 2FA zum Scheitern verurteilt gewesen – selbst bei bekanntem Passwort.

Die aktuelle Situation zeigt auch: Sicherheitsmaßnahmen sollten nicht reaktiv nach einem Angriff eingeführt werden, sondern Teil der Grundkonfiguration jeder WordPress-Installation sein.

## Welche 2FA-Methoden stehen zur Verfügung?

WordPress unterstützt verschiedene Arten der Zwei-Faktor-Authentifizierung. Die wichtigsten im Überblick:

**TOTP (Time-based One-Time Password)** – Der derzeit stärkste und am weitesten verbreitete Standard. Eine Authenticator-App wie Google Authenticator, Authy oder Bitwarden Authenticator generiert alle 30 Sekunden einen neuen 6-stelligen Code. Kein SMS-Empfang erforderlich, kein Server, der Codes versendet. Funktioniert offline und gilt als phishing-resistent.

**E-Mail-OTP** – Ein Einmalcode wird an die hinterlegte E-Mail-Adresse gesendet. Einfach einzurichten, aber schwächer als TOTP: Wer Zugriff auf das E-Mail-Postfach hat, umgeht den zweiten Faktor.

**WebAuthn / Passkeys** – Der modernste Ansatz, der auf kryptographischen Schlüsselpaaren basiert. Phishing-resistent und ohne gemeinsames Geheimnis – aber noch nicht von allen 2FA-Plugins für WordPress vollständig unterstützt.

**Backup-Codes** – Kein eigenständiger zweiter Faktor, sondern Einmal-Codes für den Notfall, wenn das primäre 2FA-Gerät nicht verfügbar ist. Sollten immer parallel aktiviert sein.

Für die meisten WordPress-Setups empfehlen wir **TOTP als primären Faktor plus Backup-Codes** als Ausfallsicherung.

## Plugin-Vergleich: Die bewährtesten 2FA-Lösungen

### Two Factor (offizielles WordPress-Plugin)

Das [Two Factor Plugin](https://wordpress.org/plugins/two-factor/) aus dem WordPress-Plugin-Repository ist das meistgenutzte 2FA-Plugin und wird aktiv vom WordPress-Sicherheitsteam unterstützt. Es unterstützt TOTP, E-Mail, FIDO U2F und Backup-Codes. Der Vorteil: minimale Abhängigkeiten, schlanker Code, keine kostenpflichtigen Erweiterungen. Ideal für Setups, bei denen Einfachheit und Zuverlässigkeit Vorrang haben.

Einschränkung: Die Oberfläche ist funktional, aber nicht besonders anwenderfreundlich für Kunden, die wenig Erfahrung mit Sicherheits-Tools haben.

### Wordfence Security

Wer [Wordfence](https://www.wordfence.com/) ohnehin für Firewall und Malware-Scanning nutzt, bekommt 2FA für Admin-Rollen ohne zusätzliches Plugin. Wordfence erzwingt 2FA konfigurierbar für bestimmte Rollen und bietet eine übersichtliche Verwaltungsoberfläche. Die Integration mit dem Wordfence-Dashboard macht es für bestehende Wordfence-Nutzer zur naheliegenden Wahl.

Wichtig: 2FA ist auch in der kostenlosen Wordfence-Version verfügbar – man muss nicht zur Premium-Lizenz upgraden.

### WP 2FA

WP 2FA ist ein dediziertes Plugin mit besonders guter Nutzererfahrung für Endanwender. Es bietet geführte Einrichtungsassistenten, E-Mail-Erinnerungen und unterstützt eine breite Auswahl an Authenticator-Apps. Für Agenturen, die 2FA für Kundenseiten mit wenig technisch versierten Redakteuren einrichten, ist es oft die praktischste Wahl. Eine kostenlose Basisversion ist verfügbar; erweiterte Funktionen wie Zwangs-Enrollment für bestimmte Rollen sind in der Pro-Version enthalten.

## Schritt-für-Schritt: 2FA mit dem Two-Factor-Plugin einrichten

### 1. Plugin installieren und aktivieren

Navigieren Sie zu **Plugins > Neues Plugin hinzufügen**, suchen Sie nach „Two Factor" und installieren Sie das Plugin von WordPress Contributors. Aktivieren Sie es anschließend.

### 2. Zwei-Faktor für Ihren Nutzer einrichten

Gehen Sie zu **Benutzer > Ihr Profil** (oder bearbeiten Sie direkt den gewünschten Nutzer unter „Benutzer > Alle Benutzer"). Scrollen Sie nach unten zum Abschnitt **Two-Factor Options**.

Aktivieren Sie dort **Time Based One-Time Password (TOTP)** und klicken Sie auf den QR-Code, um ihn mit Ihrer Authenticator-App zu scannen. Geben Sie anschließend einen frisch generierten Code ein, um die Verbindung zu bestätigen.

Aktivieren Sie parallel dazu **Backup Verification Codes** – laden Sie die Codes herunter und bewahren Sie sie sicher auf.

### 3. Aktiven Provider auswählen

Markieren Sie in der Spalte „Primary" das Häkchen bei TOTP, damit dieser als Standardmethode beim nächsten Login verwendet wird. Beim nächsten Einloggen werden Sie nach dem Passwort zusätzlich nach dem TOTP-Code gefragt.

### 4. Für alle Administratoren durchsetzen

In einer Agentur- oder Teamumgebung reicht es nicht, 2FA nur für den eigenen Account zu aktivieren. Nutzen Sie WP-CLI, um den Status aller Administratoren zu prüfen:

```bash
wp user list --role=administrator --fields=ID,user_login,user_email
```

Aktivieren Sie 2FA manuell für jeden Admin-Account oder verwenden Sie ein Plugin wie WP 2FA, das ein erzwungenes Enrollment für bestimmte Rollen ermöglicht: Nutzer werden nach dem Login aufgefordert, 2FA einzurichten, bevor sie das Dashboard aufrufen können.

## 2FA und Application Passwords: Was zu beachten ist

WordPress nutzt Application Passwords für die REST API, WP-CLI und externe Dienste. Diese sind von der 2FA-Pflicht bewusst ausgenommen – andernfalls würden alle Integrationen brechen. Das ist architektonisch korrekt, hat aber eine Konsequenz: Angreifer, die Application Passwords exfiltrieren konnten, können sich weiterhin programmatisch zur REST API authentifizieren, ohne den zweiten Faktor zu kennen.

Die Gegenmaßnahme: Prüfen Sie unter **Benutzer > Ihr Profil > Anwendungspasswörter**, ob unbekannte Application Passwords hinterlegt sind. Widerrufen Sie alle, die Sie nicht aktiv verwenden. Nach dem wp2shell-Incident empfiehlt sich ein genereller Reset aller Application Passwords als Vorsichtsmaßnahme.

## 2FA für WooCommerce-Shopbetreiber

WooCommerce-Shops haben eine besondere Exposition: Kunden-Accounts sind zwar selten mit Admin-Rechten ausgestattet, aber ein kompromittierter Shop-Admin kann Bestelldaten, Kundendaten und Zahlungsinformationen offenlegen. Für WooCommerce-Setups empfehlen wir:

- **Nur TOTP für Admin- und Shop-Manager-Rollen** – E-Mail-OTP ist hier zu schwach.
- **WooCommerce-Kundenkennungen separiert halten** – Kunden-Accounts sollten nie Admin-Rollen erhalten.
- **Login-Versuche begrenzen** – Kombinieren Sie 2FA mit einem Login-Limiter (z.B. Limit Login Attempts Reloaded), um Brute-Force-Angriffe auf den zweiten Faktor zu erschöpfen.

## Die häufigsten Fehler bei der 2FA-Einrichtung

**Nur für den Hauptadministrator aktiviert** – Häufiger Fehler. Alle Nutzer mit erhöhten Rechten (Administrator, Editor mit sensiblen Rechten) sollten 2FA nutzen.

**Backup-Codes nicht gesichert** – Verlieren Sie Ihr 2FA-Gerät, sind Sie ohne Backup-Codes ausgesperrt. Legen Sie Backup-Codes in einem Passwortmanager oder einem physisch gesicherten Ort ab.

**2FA ohne Recovery-Prozess aktiviert** – Definieren Sie vorab, wie ein Nutzer 2FA zurücksetzen kann, wenn er sein Gerät verliert. Via WP-CLI ist das möglich:

```bash
wp user meta delete <user-id> two_factor_enabled_providers
wp user meta delete <user-id> two_factor_totp_key
```

**Plugin nicht aktuell gehalten** – Auch das 2FA-Plugin selbst muss regelmäßig aktualisiert werden. Autorisierungslücken in Sicherheits-Plugins sind ein bekanntes Angriffsmuster.

## Fazit: 2FA gehört zur Grundausstattung

Die wp2shell-Welle hat gezeigt, dass Admin-Credential-Diebstahl ein reales und aktives Risiko ist. Zwei-Faktor-Authentifizierung ist keine Raketenwissenschaft – sie lässt sich in unter 15 Minuten einrichten und bietet eine der wirkungsvollsten Schutzmaßnahmen gegen Account-Übernahmen. Wer heute noch ohne 2FA betreibt, setzt seine Website unnötig einem Risiko aus.

---
publishDate: 2026-08-11T00:00:00Z
title: "WordPress 7.0.3: 12 Sicherheitslücken geschlossen – sofort aktualisieren"
excerpt: "Am 6. August 2026 hat WordPress ein dringendes Sicherheitsupdate veröffentlicht. CVE-2026-64638 erreicht einen CVSS-Score von 8.9 – alle Sites bis Version 4.7 sind betroffen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-7-0-3-sicherheitsupdate
---

Am 6. August 2026 hat das WordPress-Sicherheitsteam die Version 7.0.3 veröffentlicht – ein reines Sicherheitsrelease, das zwölf Schwachstellen im WordPress-Core schließt. Die Lücken betreffen alle WordPress-Installationen von Version 4.7 bis einschließlich 7.0.2, also nahezu ein Jahrzehnt an Releases. Wenn Ihre Website noch nicht auf dem neuesten Stand ist, sollten Sie jetzt handeln.

## Was ist in WordPress 7.0.3 behoben?

Die [offiziellen Release Notes zu Version 7.0.3](https://wordpress.org/documentation/wordpress-version/version-7-0-3/) listen zwölf eigenständige Sicherheitsprobleme auf. Die Bandbreite ist erheblich:

- **Reflected Cross-Site Scripting (XSS)** – Angreifer können bösartigen JavaScript-Code über präparierte URLs einschleusen, der im Browser eines ahnungslosen Besuchers ausgeführt wird.
- **Stored XSS** – Schadcode wird dauerhaft in der Datenbank gespeichert und bei jedem Seitenaufruf für andere Nutzer ausgegeben.
- **Server-Side Request Forgery (SSRF)** – WordPress kann als Relay missbraucht werden, um interne Netzwerkanfragen von außen zu steuern.
- **Privilege Escalation** – Nutzer mit niedrigen Berechtigungen können unter Umständen administrativen Zugriff erlangen.
- **Information Disclosure** – Sensible Systeminformationen können unbeabsichtigt preisgegeben werden.
- **CSS Injection** – Stile lassen sich so einschleusen, dass sie die Darstellung der Administratoroberfläche manipulieren.
- **E-Mail-Verifikations-Bypass** – Der Bestätigungsschritt beim Registrieren neuer Accounts kann unter bestimmten Umständen umgangen werden.

Dass in einem einzigen Release so viele unterschiedliche Schwachstellenklassen auftauchen, zeigt, wie breit das Angriffsspektrum ist, das WordPress-Betreiber permanent bedenken müssen.

## Die kritischste Lücke: CVE-2026-64638 (CVSS 8.9)

Die schwerwiegendste der zwölf behobenen Schwachstellen trägt die Kennung CVE-2026-64638 und erreicht einen [CVSS-Score von 8.9 (High)](https://patchstack.com/articles/wordpress-7-0-3-released-12-vulnerabilities-found-and-fixed/). Es handelt sich um eine pre-authentifizierte Reflected-XSS-Lücke auf der WordPress-Anmeldeseite selbst – also noch bevor ein Nutzer eingeloggt ist.

Das bedeutet konkret: Ein Angreifer muss kein gültiges Konto besitzen, um die Schwachstelle auszunutzen. Es genügt, eine manipulierte Login-URL an ein Opfer zu schicken. Klickt dieses auf den Link, wird Schadcode im Browser ausgeführt – potenziell mit Zugriff auf Session-Cookies, Formulardaten oder andere sensible Informationen der aktuellen Sitzung.

Besonders tückisch: Die Anmeldeseite gilt bei vielen Website-Betreibern als „sichere Zone", weil sie keinen echten Inhalt anzeigt. In diesem Fall ist genau sie der Angriffsvektor.

## Warum diese Lücken fast alle WordPress-Sites betreffen

Die in 7.0.3 behobenen Schwachstellen wurden in Codebestandteilen entdeckt, die seit WordPress 4.7 (erschienen Ende 2016) unverändert oder nur geringfügig verändert existieren. Das bedeutet: Praktisch jede WordPress-Installation weltweit war bis zum 6. August 2026 angreifbar – unabhängig davon, ob sie auf dem neuesten Feature-Release stand oder eine ältere Branch-Version verwendete.

Das WordPress-Team pflegt ältere Versionen aktiv nach (aktuell bis zurück zur 4.1er-Serie), sodass Sicherheitsupdates wie 7.0.3 automatisch auch als Patches für ältere Branches erscheinen. Wer also noch WordPress 6.5 oder 6.8 betreibt, hat ebenfalls ein entsprechendes Update erhalten.

## Bin ich betroffen? Das sollten Sie jetzt prüfen

Öffnen Sie das WordPress-Dashboard und navigieren Sie zu **Dashboard → Aktualisierungen**. Wenn dort noch keine Version 7.0.3 (oder das jeweilige Sicherheitsäquivalent für Ihre Branch) als installiert angezeigt wird, aktualisieren Sie sofort.

Prüfen Sie außerdem:

1. **Automatische Updates aktiviert?** WordPress kann Minor-Releases wie Sicherheitsupdates automatisch einspielen. Falls das bei Ihrer Installation noch nicht eingerichtet ist, holen Sie es jetzt nach – in der `wp-config.php` mit `define('WP_AUTO_UPDATE_CORE', true);` oder über einen entsprechenden Filter im Theme oder Plugin.

2. **Hosting-Anbieter informiert?** Viele Managed-WordPress-Hoster spielen Sicherheitsupdates automatisch ein. Überprüfen Sie im Kundenbereich oder über Ihren Anbieter, ob die Aktualisierung bereits durchgeführt wurde.

3. **Staging-Umgebung zuerst testen?** Bei umfangreichen Anpassungen oder kritischen Shops empfiehlt sich ein kurzer Test auf einer Staging-Kopie, bevor Sie das Update auf der Live-Site einspielen. Die meisten hochwertigen WordPress-Hoster bieten diese Funktion an.

## Was tun, wenn Sie nicht sofort aktualisieren können?

In manchen Fällen – etwa bei stark angepassten Themes oder kritischer Plugin-Abhängigkeit von einer bestimmten WordPress-Version – ist ein sofortiges Update nicht ohne weiteres möglich. Für diese Situation gibt es kurzfristige Maßnahmen:

- **Web Application Firewall (WAF) einsetzen**: Dienste wie Cloudflare oder Wordfence können XSS-Angriffsmuster filtern, bevor sie WordPress erreichen.
- **Login-URL absichern**: Schränken Sie den Zugriff auf `/wp-login.php` auf bekannte IP-Adressen ein, sofern das für Ihren Betrieb praktikabel ist.
- **Aktivitäten im Adminbereich engmaschig überwachen**: Nutzen Sie ein Audit-Log-Plugin, um ungewöhnliche Anmeldeversuche oder Rechteänderungen frühzeitig zu erkennen.

Diese Maßnahmen ersetzen das Update nicht – sie reduzieren lediglich das Angriffsfenster, bis das Update eingespielt werden kann.

## WordPress-Sicherheit ist kein einmaliges Projekt

Die Veröffentlichung von WordPress 7.0.3 ist eine Erinnerung daran, dass Website-Sicherheit kontinuierliche Aufmerksamkeit erfordert. Schwachstellen entstehen nicht nur durch neue Features – oft stecken sie jahrelang unentdeckt in bestehendem Code, bis ein Sicherheitsforscher sie findet und meldet.

Ein strukturierter Ansatz für WordPress-Sicherheit umfasst:

- **Regelmäßige Updates** für Core, Themes und Plugins – idealerweise automatisiert für Minor-Releases
- **Minimal-Prinzip bei Plugins**: Jedes aktive Plugin ist eine potenzielle Angriffsfläche. Deaktivieren und deinstallieren Sie, was Sie nicht aktiv nutzen.
- **Starke Passwörter und Zwei-Faktor-Authentifizierung** für alle Admin-Accounts
- **Tägliche Backups** an einem externen Speicherort, auf den WordPress selbst keinen Zugriff hat
- **Monitoring**: Wissen Sie innerhalb von Minuten, wenn Ihre Site nicht erreichbar ist oder ungewöhnliche Aktivitäten auftreten

## Wie Frankfurt Marketing Studio helfen kann

Wenn Sie unsicher sind, ob Ihre WordPress-Website aktuell und ausreichend abgesichert ist, unterstützen die [WordPress-Experten aus Frankfurt](/). Wir prüfen Ihre Installation, spielen ausstehende Sicherheitsupdates ein, richten automatische Update-Prozesse ein und implementieren ein Sicherheitskonzept, das zu Ihrer Website und Ihrem Betrieb passt – von der kleinen Unternehmensseite bis zum komplexen WooCommerce-Shop.

Sprechen Sie uns an, wenn Sie Fragen zu WordPress 7.0.3 oder zum Thema Website-Sicherheit allgemein haben.

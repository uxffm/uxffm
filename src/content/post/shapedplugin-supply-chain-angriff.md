---
publishDate: 2026-06-27T00:00:00Z
title: "ShapedPlugin-Hack: Backdoor in Pro-Plugins stahl WooCommerce-Daten"
excerpt: "Angreifer injizierten seit Mai 2026 eine Backdoor in ShapedPlugin Pro-Updates. WordPress-Shops verloren Zugangsdaten, 2FA-Secrets und Bestelldaten."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/shapedplugin-supply-chain-angriff
---

Die WordPress-Community steht erneut vor einem schwerwiegenden Supply-Chain-Angriff: Sicherheitsforscher von Wordfence haben bestätigt, dass Angreifer die Update-Infrastruktur des Plugin-Herstellers ShapedPlugin kompromittiert haben. Seit dem 21. Mai 2026 wurden schadhafte Versionen mehrerer ShapedPlugin-Pro-Plugins über den offiziellen Lizenz-Update-Kanal verteilt. Das Ergebnis: Tausende WordPress-Betreiber – viele davon WooCommerce-Shops – haben ohne ihr Wissen eine Backdoor installiert, die Zugangsdaten, Zwei-Faktor-Geheimnisse und Bestelldaten gestohlen hat.

Die dem Angriff zugewiesene CVE-Kennung CVE-2026-49777 trägt einen CVSS-Score von **10,0** – dem absoluten Maximum. CVE-2026-10735 (CVSS 9,8) dokumentiert den Gesamtvorfall. Beide Einstufungen unterstreichen: Dieser Angriff ist einer der gravierendsten WordPress-Sicherheitsvorfälle des Jahres.

## Welche Plugins sind betroffen?

Ausschließlich die **kostenpflichtigen Pro-Versionen** der folgenden ShapedPlugin-Produkte wurden kompromittiert. Die kostenlosen Versionen im WordPress.org-Plugin-Verzeichnis sind nicht betroffen:

- **Product Slider Pro for WooCommerce** – Versionen vor 3.5.4
- **Real Testimonials Pro** – Version 3.2.5
- **Smart Post Show Pro** – Versionen vor 4.0.2

Wenn Sie eines dieser Plugins in einer betroffenen Version einsetzen, sollten Sie davon ausgehen, dass Ihre Website kompromittiert wurde – selbst wenn Sie bislang keine Anzeichen bemerkt haben.

## Wie der Angriff technisch funktioniert

Die Angreifer drangen in die Update-Auslieferungs-Infrastruktur von ShapedPlugin ein und schleusten einen Loader in die Plugin-Pakete ein. Dieser Loader aktivierte sich bei jedem Seitenaufruf im WordPress-Admin-Bereich. Dann lud er eine verschlüsselte Payload von einem externen Server (`194.76.217[.]28:2871`) nach, installierte diese als gefälschtes Plugin und aktivierte es – alles vollautomatisch, unsichtbar für den Administrator.

Die Fake-Plugins tarnten sich mit täuschend echten Namen: `woocommerce-subscription` oder `woocommerce-notification`. Für ungeübte Augen sehen diese wie legitime WooCommerce-Erweiterungen aus – ein bewusst gewählter Trick, um der Entdeckung zu entgehen.

Nach der Installation sammelte das Schadprogramm systematisch sensible Daten:

- WordPress-Anmeldedaten (Benutzername und Passwort-Hash)
- Zwei-Faktor-Authentifizierungs-Secrets (TOTP-Schlüssel)
- Datenbankzugangsdaten aus `wp-config.php`
- Administratorkonten und E-Mail-Adressen
- SMTP-Zugangsdaten für den E-Mail-Versand
- WooCommerce-Bestelldaten

Alle gesammelten Informationen wurden anschließend an einen Remote-Server der Angreifer übermittelt.

## Warum dieser Angriff besonders gefährlich ist

Bei klassischen Plugin-Hacks ist die Angriffskette klar: Ein Plugin auf WordPress.org oder einem Marktplatz enthält Schadcode. Wer das Plugin nicht installiert oder rechtzeitig aktualisiert, ist sicher.

Der ShapedPlugin-Angriff funktioniert anders: Hier wurde die **Update-Infrastruktur selbst** kompromittiert. Betreiber, die automatische Plugin-Updates aktiviert hatten oder dem offiziellen Update-Kanal vertrauten, haben den Schadcode aktiv auf ihre eigene Website geladen – in dem Glauben, ihre Sicherheit durch ein Update zu verbessern.

Das ist das Kernprinzip eines Supply-Chain-Angriffs: Der Angriff kommt nicht von außen durch eine bekannte Schwachstelle, sondern von innen – durch den Vertrauenskanal, dem man glaubt, sicher sein zu können. Für WooCommerce-Shops ist das besonders heikel: Neben WordPress-Zugangsdaten wurden auch Bestelldaten und Zahlungsabwicklungs-Konfigurationen erbeutet.

## Was Sie jetzt sofort tun müssen

Wenn Sie Product Slider Pro for WooCommerce (vor 3.5.4), Real Testimonials Pro (3.2.5) oder Smart Post Show Pro (vor 4.0.2) auf Ihrer Website einsetzen oder eingesetzt haben, handeln Sie jetzt nach dieser Prioritätenreihenfolge:

**1. Verdächtige Plugins entfernen**
Prüfen Sie Ihre Plugin-Liste – sowohl aktive als auch inaktive Plugins – auf Einträge mit den Namen `woocommerce-subscription`, `woocommerce-notification` oder ähnlich klingende Erweiterungen, die Sie nicht selbst installiert haben. Entfernen Sie diese sofort.

**2. ShapedPlugin-Pro-Plugins aktualisieren**
Führen Sie unverzüglich ein Update auf die bereinigten Versionen durch:
- Product Slider Pro for WooCommerce: **Version 3.5.4 oder höher**
- Smart Post Show Pro: **Version 4.0.2 oder höher**

Für Real Testimonials Pro prüfen Sie den ShapedPlugin-Changelog auf eine Sicherheitsversion.

**3. Alle Passwörter zurücksetzen**
Setzen Sie die Passwörter aller WordPress-Benutzerkonten zurück – insbesondere alle Administratoren. Ändern Sie außerdem:
- Das Datenbankpasswort (und aktualisieren Sie `wp-config.php` entsprechend)
- SMTP-Zugangsdaten und E-Mail-Service-API-Schlüssel
- Alle API-Schlüssel für WooCommerce-Zahlungsanbieter (Stripe, PayPal etc.)

**4. Zwei-Faktor-Authentifizierung neu einrichten**
Da die Angreifer TOTP-Secrets gestohlen haben, sind bestehende 2FA-Konfigurationen als kompromittiert zu betrachten. Richten Sie 2FA für alle Administratoren neu ein und verwenden Sie dabei neue Geräte-Pairings.

**5. Administratoren-Konten prüfen**
Navigieren Sie in Ihrem WordPress-Dashboard zu „Benutzer → Alle Benutzer" und filtern Sie nach der Rolle „Administrator". Entfernen Sie alle unbekannten Konten sofort.

**6. WooCommerce-Bestelldaten und Kunden informieren**
Wenn Bestelldaten Ihrer Kunden abgeflossen sind, kann dies datenschutzrechtliche Meldepflichten nach der DSGVO auslösen. In Deutschland gilt: Meldepflicht gegenüber der Datenschutzbehörde innerhalb von 72 Stunden, wenn ein Risiko für betroffene Personen besteht. Prüfen Sie Ihren Vorfall mit einem Datenschutzbeauftragten.

## Was ShapedPlugin bisher kommuniziert hat

ShapedPlugin hat nach Bekanntwerden des Vorfalls die Update-Auslieferung gestoppt, die kompromittierte Infrastruktur isoliert und bereinigte Plugin-Versionen veröffentlicht. Eine offizielle Stellungnahme des Unternehmens empfiehlt allen Nutzern der betroffenen Versionen, sofort auf die Sicherheitsversionen zu aktualisieren und die beschriebenen Schritte zur Überprüfung ihrer Website durchzuführen.

[Bleeping Computer](https://www.bleepingcomputer.com/news/security/shapedplugin-update-flow-hacked-to-infect-wordpress-sites/) berichtet, dass Wordfence-Sicherheitsforscher die Sicherheitslücke am 11. Juni 2026 bestätigten, nachdem Site-Betreiber ungewöhnliches Verhalten gemeldet hatten. Die Backdoor war jedoch bereits seit dem 21. Mai aktiv – das bedeutet, dass Angreifer knapp drei Wochen Zeit hatten, betroffene Websites zu kompromittieren, bevor der Vorfall öffentlich wurde.

## Was dieser Angriff für Plugin-Käufer bedeutet

Der ShapedPlugin-Vorfall reiht sich in eine beunruhigende Serie von Supply-Chain-Angriffen auf WordPress ein – nach dem Flippa-Angriff auf 31 gekaufte Plugins und dem CDN-Angriff auf OptinMonster und TrustPulse. Alle diese Angriffe teilen eine zentrale Erkenntnis: Das Plugin-Ökosystem ist ein hochattraktives Ziel, weil ein erfolgreicher Angriff auf einen Hersteller Tausende von Websites gleichzeitig kompromittiert.

Für WordPress-Betreiber ergeben sich daraus konkrete Schlussfolgerungen:

- **Automatische Updates mit Vorsicht genießen**: Automatisches Aktualisieren ist sinnvoll, aber idealerweise mit einem Staging-System kombiniert, das Updates erst testet, bevor sie auf der Produktivsite landen.
- **File-Integrity-Monitoring**: Tools wie [Wordfence](https://www.wordfence.com/) oder iThemes Security können neu hinzugekommene oder veränderte Dateien sofort melden.
- **Minimalprinzip**: Installieren Sie nur Plugins, die Sie aktiv benötigen. Weniger Plugins bedeuten weniger Angriffsfläche.
- **Regelmäßige Backups mit Offline-Kopie**: Ein sauberes Backup, das außerhalb Ihrer WordPress-Installation liegt, ermöglicht eine schnelle Wiederherstellung im Ernstfall.

## Fazit: Vertrauen muss verdient werden – auch von Plugin-Herstellern

Der ShapedPlugin-Angriff erinnert uns daran, dass Sicherheit keine einmalige Einstellung ist, sondern ein kontinuierlicher Prozess. Wer heute seine Website für sicher hält, weil alle Plugins aktuell sind, kann morgen trotzdem betroffen sein – wenn die Update-Infrastruktur selbst angegriffen wird.

Wenn Sie unsicher sind, ob Ihre WordPress-Installation betroffen ist, oder wenn Sie Ihre Sicherheitsstrategie grundlegend überdenken möchten, stehen Ihnen die [WordPress-Agentur aus Frankfurt](/) von Frankfurt Marketing Studio gerne zur Seite. Wir führen WordPress-Sicherheitsaudits durch, richten proaktives Monitoring ein und begleiten Sie Schritt für Schritt – damit Sie sich auf Ihr Geschäft konzentrieren können.

## Quellen

- [ShapedPlugin WordPress Pro Plugins Backdoored in Supply Chain Attack](https://thehackernews.com/2026/06/shapedplugin-wordpress-pro-plugins.html) — r/wordpress
- [ShapedPlugin update flow hacked to infect WordPress sites](https://www.bleepingcomputer.com/news/security/shapedplugin-update-flow-hacked-to-infect-wordpress-sites/) — r/wordpress
- [ShapedPlugin Supply Chain Attack Backdoors Pro Plugin Updates](https://securityaffairs.com/194059/hacking/shapedplugin-supply-chain-attack-backdoors-pro-plugin-updates.html) — r/wordpress

---
publishDate: 2026-06-10T00:00:00Z
title: "WordPress & DSGVO 2026: Die Checkliste für rechtssichere Websites"
excerpt: "Cookies, Google Fonts, Kontaktformulare – was Ihre WordPress-Website 2026 wirklich DSGVO-konform macht. Eine praxisnahe Checkliste für kleine Unternehmen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-dsgvo-checkliste
---

Die DSGVO tritt 2026 in ihr achtes Jahr – und dennoch taucht auf r/wordpress regelmäßig dieselbe Frage auf: „Meine WordPress-Website läuft seit Jahren, ist sie überhaupt DSGVO-konform?" Viele Betreiber kleiner Websites glauben, die wichtigsten Punkte erledigt zu haben, und übersehen dabei kritische Details. Ob Consent-Banner, lokal eingebundene Schriften oder Datenweitergabe durch Plugins – die Fallstricke sind zahlreich und die Abmahnrisiken real. Diese Checkliste zeigt Ihnen, worauf es 2026 tatsächlich ankommt.

## Consent-Management: Was ein rechtsgültiges Cookie-Banner leisten muss

Seit dem Urteil des Europäischen Gerichtshofs aus dem Jahr 2020 ist klar: Cookies dürfen erst nach einer ausdrücklichen, aktiven Einwilligung gesetzt werden. Das bedeutet: kein vorausgewähltes Häkchen, keine „OK"-Schaltfläche, die gleichzeitig als Einwilligung gilt, und kein verstecktes Ablehnen hinter mehreren Klicks.

Ein rechtsgültiges Consent-Management-Plugin für WordPress muss folgende Anforderungen erfüllen:

- **Opt-in vor Opt-out**: Kein Cookie darf gesetzt werden, bevor der Nutzer aktiv zugestimmt hat.
- **Separate Kategorien**: Notwendig, Statistik, Marketing und externe Medien müssen einzeln abgelehnt werden können.
- **Einwilligungsprotokolle**: Wann hat welche Sitzung was eingewilligt? Diese Nachweise müssen speicherbar sein.
- **Nachträglicher Widerruf**: Ein dauerhaft sichtbarer Link zum erneuten Öffnen des Banners – typischerweise in der Fußzeile – ist Pflicht.

Für WordPress haben sich vor allem [Borlabs Cookie](https://borlabs.io/borlabs-cookie/) und Complianz als zuverlässige Lösungen etabliert. Beide aktualisieren ihre Vorlagen, wenn sich Rechtslagen ändern. Bei kostenlosen Plugins fehlen diese Funktionen häufig – bei rechtlichen Konsequenzen sollte man nicht sparen.

## Google Fonts lokal einbinden – nach wie vor Pflicht

Das Landgericht München I hat 2022 entschieden: Das Einbinden von Google Fonts über externe Server ohne Einwilligung verstößt gegen die DSGVO. Die IP-Adresse des Besuchers wird an Google-Server übertragen – ein personenbezogenes Datum. An dieser Rechtslage hat sich 2026 nichts geändert. Viele WordPress-Themes und Seitenbuilder laden Schriften nach wie vor extern.

So binden Sie Schriften korrekt lokal ein:

1. Laden Sie die benötigten Schriftschnitte über den [Google Fonts Helper](https://gwfh.madebyoliver.eu/) herunter.
2. Laden Sie die Dateien in Ihr WordPress-Child-Theme hoch.
3. Registrieren Sie die Schriften per `wp_enqueue_style()` mit lokalem Pfad in der `functions.php`.
4. Deaktivieren Sie das externe Laden der Schriften in Ihrem Theme oder Seitenbuilder.

Plugins wie OMGF (Optimize My Google Fonts) automatisieren diesen Prozess, sollten aber regelmäßig auf Aktualität geprüft werden.

## Kontaktformulare: Was vor dem Absenden stehen muss

Jedes Kontaktformular ist aus DSGVO-Sicht ein sensibles Element. Folgende Punkte sind nicht verhandelbar:

- **Hinweis vor dem Absenden**: Der Nutzer muss wissen, welche Daten gespeichert werden, zu welchem Zweck und wie lange.
- **Einwilligungs-Checkbox**: Eine separate, nicht vorausgewählte Checkbox zur Datenschutzerklärung ist geboten, wenn Daten über die reine Bearbeitungsgrundlage hinaus genutzt werden.
- **SSL-Pflicht**: Das Formular muss über HTTPS übertragen werden.
- **Datenspeicherung**: Contact Form 7 speichert standardmäßig keine Einträge; WPForms und Gravity Forms hingegen schon. Richten Sie automatische Löschroutinen ein.
- **Auftragsverarbeitungsvertrag (AVV)**: Wer Formulardaten an externe E-Mail-Dienste wie Mailchimp oder Brevo weiterleitet, benötigt einen AVV mit dem jeweiligen Anbieter.

## WordPress-Plugins und externe Dienste: Unsichtbare Datenübermittlungen erkennen

Viele Plugins übertragen Daten an externe Server, ohne dass Website-Betreiber es bemerken. Typische Beispiele:

- **Google Analytics / Tag Manager**: Nur nach Einwilligung aktivieren – das Consent-Plugin muss das Skript blockieren, bis die Zustimmung erfolgt ist.
- **reCAPTCHA**: Ein Google-Dienst, der IP-Adressen überträgt. Datenschutzfreundliche Alternativen sind hCaptcha oder Cloudflare Turnstile.
- **Gravatar**: WordPress lädt Nutzeravatare standardmäßig von externen Gravatar-Servern. Dies muss in der Datenschutzerklärung erwähnt oder per Plugin deaktiviert werden.
- **Eingebettete Inhalte**: YouTube-Videos, Google Maps oder Social-Media-Widgets müssen hinter einer Einwilligungsschranke stehen. Sogenannte 2-Klick-Lösungen oder Consent-Wrapper im iframe sind hierfür gängige Methoden.

Führen Sie regelmäßig ein Plugin-Audit durch: Welche Plugins sind aktiv, welche externen Dienste verbinden sie, und sind alle in der Datenschutzerklärung dokumentiert?

## Datenschutzerklärung und Impressum: Aktualität ist keine Option

Eine Datenschutzerklärung ist kein Einmal-Dokument. Jedes neue Plugin und jeder neue Dienst erfordert eine Aktualisierung. Wichtige Pflichtinhalte:

- **Verantwortlicher**: Name, Adresse, E-Mail-Adresse und Telefonnummer
- **Auflistung aller Dienste**: Analytics, Kontaktformulare, Hosting-Anbieter mit Serverstandort, Newsletter-Tools
- **Rechtsgrundlage für jede Verarbeitung**: Art. 6 DSGVO (Einwilligung, berechtigtes Interesse, Vertragserfüllung)
- **Betroffenenrechte**: Auskunft, Löschung, Berichtigung, Datenübertragbarkeit
- **Widerspruchsmöglichkeit**: Verlinkter, erreichbarer Widerspruchsprozess

Generatoren wie der von e-recht24.de bieten gute Ausgangspunkte, müssen aber individuell angepasst werden. Ein generisch kopierter Text schützt nicht.

## Technische Maßnahmen: SSL, Server-Logs und regelmäßige Updates

Die DSGVO fordert neben rechtlicher Dokumentation auch „technische und organisatorische Maßnahmen" (TOMs). Für WordPress bedeutet das konkret:

- **SSL/TLS**: HTTPS ist Pflicht – auch auf Unterseiten, im Adminbereich und bei Weiterleitungen.
- **Server-Logs**: Ihr Hoster speichert IP-Adressen in Zugriffslogs. Wie lange? Prüfen Sie die Einstellungen und dokumentieren Sie die Aufbewahrungsfrist.
- **WordPress-Updates**: Sicherheitslücken durch veraltete Plugins sind ein Datenschutzrisiko. Regelmäßige Updates sind nicht nur technisch sinnvoll, sondern datenschutzrechtlich geboten.
- **Benutzerrollen**: Beschränken Sie WordPress-Rollen auf das notwendige Minimum. Nicht jeder Autor benötigt Administratorrechte.
- **Backups**: Verschlüsselte Backups an einem gesicherten Ort außerhalb des Webservers gehören zur technischen Grundausstattung.

## DSGVO-Checkliste für WordPress 2026: Schnellübersicht

| Maßnahme | Prüfpunkt |
|---|---|
| Rechtsgültiges Consent-Banner (Opt-in) | Kein Cookie vor Einwilligung |
| Google Fonts lokal eingebunden | Kein externer Google-Aufruf beim Laden |
| Kontaktformular mit Datenschutzhinweis | Checkbox und Hinweistext vorhanden |
| Google Analytics nur nach Consent | Skript durch Banner blockiert |
| AVV mit E-Mail-Diensten abgeschlossen | Dokument vorhanden und unterzeichnet |
| Datenschutzerklärung aktuell | Alle aktiven Dienste dokumentiert |
| SSL/HTTPS durchgehend aktiv | Auch Admin-Bereich und Weiterleitungen |
| Plugin-Updates regelmäßig eingespielt | Keine veralteten Plugins mit bekannten Lücken |
| Backups verschlüsselt und extern | Außerhalb des Webservers gespeichert |
| Server-Log-Laufzeit dokumentiert | Im Hosting-Vertrag oder AVV festgehalten |

## Fazit: DSGVO-Konformität ist ein laufender Prozess

Die DSGVO-Konformität Ihrer WordPress-Website ist keine einmalige Aufgabe. Sie erfordert regelmäßige Überprüfung – insbesondere wenn neue Plugins installiert, externe Dienste integriert oder das Theme gewechselt wird. Wer das Thema systematisch angeht, schützt sich vor Abmahnungen und Bußgeldern und stärkt zugleich das Vertrauen seiner Besucher.

Als [WordPress Agentur Frankfurt am Main](/) unterstützt Frankfurt Marketing Studio Sie dabei, Ihre Website auf DSGVO-Konformität zu überprüfen und die notwendigen technischen und rechtlichen Maßnahmen umzusetzen – von der Cookie-Integration bis zum vollständigen Datenschutz-Audit.

## Quellen

- [GDPR compliance checklist for WordPress site — what am I missing?](https://www.reddit.com/r/wordpress/comments/1l4g8vx/gdpr_compliance_checklist_for_wordpress_site/) — r/wordpress
- [Best cookie consent plugin in 2026? Borlabs vs Complianz vs Cookiebot](https://www.reddit.com/r/wordpress/comments/1l3r2kp/best_cookie_consent_plugin_in_2026_borlabs_vs/) — r/wordpress
- [Got a GDPR warning letter — what do I need to fix on my WP site?](https://www.reddit.com/r/wordpress/comments/1l2m9qw/got_a_gdpr_warning_letter_what_do_i_need_to_fix/) — r/wordpress

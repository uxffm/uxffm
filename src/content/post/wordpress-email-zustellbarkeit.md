---
publishDate: 2026-07-20T00:00:00Z
title: "WordPress E-Mails landen im Spam: So lösen Sie das Problem dauerhaft"
excerpt: "Wenn WordPress-E-Mails im Spam landen oder gar nicht ankommen, liegt es meist an PHP-Mail und fehlenden DNS-Einträgen. Mit SMTP und DKIM lösen Sie das dauerhaft."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-email-zustellbarkeit
---

Die Situation kennen viele WordPress-Betreiber: Ein Kunde füllt ein Kontaktformular aus, die Bestätigungs-E-Mail landet im Spam. Eine Bestellbestätigung aus dem WooCommerce-Shop kommt nie an. Das Passwort-Zurücksetzen schlägt fehl, weil der Link einfach nicht zugestellt wird. Das Problem ist struktureller Natur – und es lässt sich mit den richtigen Maßnahmen dauerhaft lösen.

## Warum WordPress E-Mails standardmäßig scheitern

WordPress verwendet für den E-Mail-Versand standardmäßig die PHP-Funktion `mail()`. Diese Funktion nutzt den Mailserver des Webhosters, der häufig überhaupt nicht für den Versand von Anwendungs-E-Mails konfiguriert ist. Das Ergebnis:

- **Kein SPF-Eintrag**: Die Domain, von der die E-Mail gesendet wird, ist nicht autorisiert, E-Mails vom betreffenden Server zu versenden.
- **Kein DKIM**: Die E-Mail ist nicht kryptografisch signiert und kann auf dem Transportweg manipuliert worden sein.
- **Schlechte Serverreputation**: Shared-Hosting-Server versenden Mails von Tausenden Websites gleichzeitig, darunter auch Spam – die IP-Reputation ist oft entsprechend schlecht.
- **Kein rDNS**: Der Reverse-DNS-Eintrag des Servers stimmt nicht mit der Absenderadresse überein.

Die großen E-Mail-Anbieter – Gmail, Microsoft Outlook, GMX, Web.de – filtern nach genau diesen Kriterien. Eine E-Mail von WordPress direkt über `php mail()` zu versenden, ist wie ein Brief ohne Absenderangabe aus einem anonymen Briefkasten: Der Empfänger misstraut ihr, zu Recht.

## Die Lösung: SMTP und transaktionale E-Mail-Dienste

Statt `mail()` zu verwenden, sollte WordPress seine E-Mails über einen dedizierten SMTP-Server versenden. Noch besser: über einen spezialisierten transaktionalen E-Mail-Dienst. Diese Dienste sind genau dafür gebaut, einzelne, wichtige E-Mails zuverlässig zuzustellen – im Gegensatz zu Newsletter-Diensten, die auf Massen-E-Mails ausgelegt sind.

Die wichtigsten Anbieter im Überblick:

**[Mailgun](https://www.mailgun.com/)**: Sehr verbreitet, gut dokumentiert, günstiger Einstiegspunkt. API und SMTP sind verfügbar. Gut geeignet für WooCommerce-Shops mit mittlerem E-Mail-Volumen.

**[Postmark](https://postmarkapp.com/)**: Fokus auf Zustellbarkeit und Transparenz. Sehr gute Reporting-Dashboards und schnelle Zustellung. Etwas teurer, aber für Kundenprojekte, bei denen Zuverlässigkeit kritisch ist, eine ausgezeichnete Wahl.

**SendGrid** (Twilio SendGrid): Weit verbreitet, gut dokumentiert, für hohe Volumen skalierbar. Die kostenlose Stufe reicht für kleinere WordPress-Seiten oft aus.

**Amazon SES**: Günstigster Dienst bei hohem Volumen, aber die Einrichtung ist deutlich komplexer. Für technisch versierte Teams eine Option, wenn Kosten eine Rolle spielen.

## WordPress SMTP-Plugin: Was Sie installieren sollten

Um WordPress auf SMTP umzustellen, benötigen Sie ein Plugin. Die bewährtesten Optionen:

**WP Mail SMTP** (von WPForms): Das meistgenutzte Plugin für diesen Zweck. Es unterstützt alle gängigen Transaktionsdienste und bietet auch eine Diagnose-Funktion für fehlgeschlagene E-Mails. Die kostenlose Version ist für die meisten Websites ausreichend.

**FluentSMTP**: Komplett kostenlos und leistungsstark, inklusive eigenem E-Mail-Log. Eine hervorragende Alternative zu WP Mail SMTP, die in den letzten Jahren erheblich an Qualität gewonnen hat.

**Post SMTP**: Ebenfalls eine bewährte Wahl mit detailliertem E-Mail-Log und Debugging-Werkzeugen.

Die Konfiguration ist in der Regel unkompliziert: API-Key des Transaktionsdienstes im Plugin eintragen, Absender-E-Mail-Adresse und Name festlegen, eine Test-E-Mail versenden und überprüfen, ob sie ankommt.

## SPF, DKIM und DMARC: Die technischen DNS-Einträge

Kein Transaktionsdienst hilft dauerhaft, wenn die DNS-Einträge der Domain nicht korrekt konfiguriert sind. Diese drei Einträge sind Pflicht:

**SPF (Sender Policy Framework)**: Ein TXT-Eintrag in der DNS-Zone der Domain, der festlegt, welche Server E-Mails im Namen dieser Domain versenden dürfen. Ein Beispiel für Mailgun:

```
v=spf1 include:mailgun.org ~all
```

Jeder Transaktionsdienst liefert den genauen SPF-Eintrag in seiner Dokumentation; die Anpassung erfolgt im DNS-Verwaltungsbereich des Domain-Registrars oder Hosters.

**DKIM (DomainKeys Identified Mail)**: Ein kryptografischer Schlüssel, mit dem ausgehende E-Mails signiert werden. Der Transaktionsdienst stellt den öffentlichen Schlüssel als DNS-Eintrag bereit; der private Schlüssel signiert jede gesendete E-Mail automatisch. Empfänger-Mailserver können die Signatur verifizieren und wissen so, dass die E-Mail wirklich von der angegebenen Domain stammt.

**DMARC**: Baut auf SPF und DKIM auf und legt fest, was passieren soll, wenn eine E-Mail keinen dieser Tests besteht. Ein sinnvoller Einstiegs-DMARC-Eintrag:

```
v=DMARC1; p=none; rua=mailto:dmarc@ihredomain.de
```

`p=none` bedeutet zunächst nur Monitoring ohne direkte Auswirkung auf den Versand. Nach einigen Wochen Laufzeit und der Analyse der DMARC-Berichte kann man schrittweise auf `p=quarantine` oder `p=reject` wechseln.

Seit 2024 verlangen Google und Yahoo DMARC für alle Versender, die mehr als 5.000 E-Mails pro Tag versenden. Für kleinere WordPress-Seiten ist die Einrichtung dennoch empfehlenswert – schon allein, um nicht als Spam eingestuft zu werden.

## Typische Fallstricke, die Sie vermeiden sollten

**Mehrere Plugins senden E-Mails, ohne koordiniert zu sein**: WooCommerce, das Kontaktformular-Plugin und das SMTP-Plugin müssen harmonieren. Prüfen Sie nach der Konfiguration alle E-Mail-Flows: Bestellbestätigung, Versandbenachrichtigung, Passwort-Zurücksetzen, Kontaktformular-Benachrichtigungen an Sie und den Kunden.

**Absender-E-Mail stimmt nicht mit der sendenden Domain überein**: Wenn die From-Adresse `noreply@wordpress.com` lautet, aber die Domain `ihreshop.de` ist, kommen E-Mails trotz SMTP-Plugin im Spam an. Absender-Domain und sendende Domain müssen übereinstimmen und der SPF-Eintrag muss für diese Domain gepflegt sein.

**Kein E-Mail-Log**: Ohne Logging wissen Sie nicht, ob eine E-Mail überhaupt gesendet wurde. FluentSMTP und WP Mail SMTP bieten ein eingebautes Log; alternativ gibt es dedizierte Log-Plugins. Ein E-Mail-Log ist besonders bei WooCommerce-Shops wertvoll, wo Kunden sich über nicht erhaltene Bestellbestätigungen beschweren.

**Rate-Limits des Transaktionsdienstes unterschätzen**: Bei einem größeren WooCommerce-Angebot oder einem Flash-Sale können viele E-Mails gleichzeitig ausgelöst werden. Prüfen Sie vorab, ob Ihr gewählter Transaktionsdienst die erwarteten Spitzenwerte innerhalb der gebuchten Rate-Limits verarbeiten kann.

**Domain-Authentifizierung beim Transaktionsdienst vergessen**: Nur weil das SMTP-Plugin konfiguriert ist, bedeutet das nicht automatisch, dass DKIM aktiv ist. Viele Dienste erfordern, dass Sie die Domain explizit verifizieren und die DKIM-DNS-Einträge selbst setzen. Ohne diesen Schritt werden E-Mails zwar gesendet, aber ohne kryptografische Signatur.

## E-Mail-Zustellbarkeit testen

Bevor Sie die Konfiguration als erledigt betrachten, sollten Sie sie gründlich testen:

1. **mail-tester.com**: Sendet eine E-Mail an eine temporäre Testadresse und bewertet SPF, DKIM, DMARC, Serverreputation und Inhaltsqualität mit einer Punktzahl von 10.
2. **MXToolbox**: Prüft Blacklist-Einträge, SPF- und DKIM-Konfiguration und hilft bei der Diagnose von DNS-Problemen.
3. **Google Postmaster Tools**: Für Domains, die regelmäßig an Gmail-Adressen senden, liefert dieses kostenlose Tool Daten zur Spam-Rate und Reputation der sendenden Domain.

Ein Testergebnis von 9 oder 10 bei mail-tester.com ist das Ziel; alles darunter deutet auf Konfigurationsprobleme hin, die Zustellbarkeit kosten.

## Zuverlässige WordPress-E-Mails aus Frankfurt

E-Mail-Zustellbarkeit ist eines der häufig unterschätzten technischen Themen im WordPress-Alltag – bis das erste kritische Bestellformular im Spam landet oder ein Neukunde sich beschwert, keine Willkommens-E-Mail erhalten zu haben. Als WordPress Agentur Frankfurt unterstützt Frankfurt Marketing Studio kleine und mittelständische Unternehmen bei genau solchen Konfigurationen: von der SMTP-Einrichtung über die korrekten DNS-Einträge bis zum vollständigen Test aller Formulare und WooCommerce-E-Mail-Flows – damit Ihre Kunden bekommen, was sie erwarten.

## Quellen

- [Why are my WordPress emails going to spam?](https://www.reddit.com/r/wordpress/) — r/wordpress
- [Best transactional email service for WooCommerce in 2026?](https://www.reddit.com/r/wordpress/) — r/wordpress
- [FluentSMTP vs WP Mail SMTP – which do you use?](https://www.reddit.com/r/wordpress/) — r/wordpress

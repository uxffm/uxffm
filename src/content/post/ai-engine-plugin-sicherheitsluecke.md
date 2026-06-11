---
publishDate: 2026-06-11T00:00:00Z
title: "AI Engine Plugin-Sicherheitslücke: 100.000 WordPress-Sites in Gefahr"
excerpt: "CVE-2025-11749 im AI Engine Plugin ermöglicht unbefugten Zugriff auf über 100.000 WordPress-Sites. Was Sie jetzt sofort tun müssen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/ai-engine-plugin-sicherheitsluecke
---

Das AI Engine Plugin für WordPress ist bei Tausenden von Website-Betreibern beliebt – es verbindet WordPress direkt mit ChatGPT, Claude, Gemini und anderen KI-Modellen. Doch genau dieses Plugin steht derzeit im Zentrum einer ernstzunehmenden Sicherheitslücke, die über 100.000 aktive Installationen betrifft. Die Schwachstelle wurde als **CVE-2025-11749** klassifiziert und ermöglicht Angreifern ohne jede vorherige Anmeldung, vollständige Administrator-Rechte zu erlangen.

## Was steckt hinter der Sicherheitslücke CVE-2025-11749?

Der Fehler liegt in einer Funktion, die für viele Nutzer zunächst harmlos klingt: der „No-Auth URL"-Option in den MCP-Einstellungen (Model Context Protocol) des Plugins. Wenn diese Funktion aktiviert ist, registriert AI Engine spezielle REST-API-Endpunkte – und dabei unterlässt es einen entscheidenden Sicherheitsschritt.

Das Plugin setzt den Parameter `show_in_index` beim Erstellen dieser API-Routen nicht auf `false`. Die Folge: Die zugehörigen Bearer-Token werden im öffentlich zugänglichen WordPress-API-Index unter `/wp-json/` sichtbar. Diese Token dienen als Zugangsdaten für KI-Agenten wie Claude oder ChatGPT – und jetzt kann sie jeder Unbekannte einfach abrufen.

**Der Angriffsweg in der Praxis:**
1. Angreifer ruft `https://ihre-domain.de/wp-json/` auf – ohne Anmeldung.
2. Der Bearer-Token des KI-Agenten erscheint im API-Index.
3. Der Angreifer nutzt den Token, um sich am MCP-Endpunkt zu authentifizieren.
4. Von dort aus eskaliert er seine Rechte auf Administrator-Ebene.
5. Die Website ist vollständig kompromittiert.

## Was können Angreifer mit Administrator-Zugriff anrichten?

Sobald jemand administrativen Zugang zu Ihrer WordPress-Website hat, sind die Schäden potenziell erheblich:

- **Schadhafte Plugins einschleusen:** Backdoors oder Malware werden still installiert und ermöglichen dauerhaften Zugriff.
- **Inhalte manipulieren:** Ihre Seiteninhalte können gegen Phishing-Seiten oder Werbe-Spam ausgetauscht werden.
- **Besucher umleiten:** Interne Links führen plötzlich auf gefährliche Drittseiten.
- **Kundendaten abgreifen:** Kontaktdaten, Bestellhistorien oder Passwort-Hashes können entwendet werden.
- **Persistente Hintertüren hinterlassen:** Selbst nach einer Bereinigung bleiben versteckte Zugangskanäle aktiv.

Besonders beunruhigend ist, dass dieser Angriff vollständig ohne Authentifizierung durchführbar ist – die Angreifer benötigen kein Passwort, keinen Account und keine Vorkenntnisse über Ihre spezifische Installation.

## Welche Versionen sind betroffen – und wie aktualisieren Sie?

**Betroffen:** Alle Versionen des AI Engine Plugins bis einschließlich **3.1.3**.

**Nicht betroffen:** Versionen ab 3.1.4, in denen der Entwickler den Fehler mit dem Parameter `show_in_index: false` behoben hat.

So gehen Sie vor:

1. Melden Sie sich in Ihrem WordPress-Backend an.
2. Navigieren Sie zu **Plugins → Installierte Plugins**.
3. Suchen Sie nach „AI Engine" und prüfen Sie die angezeigte Versionsnummer.
4. Ist die Version 3.1.3 oder älter, klicken Sie sofort auf **Jetzt aktualisieren**.
5. Überprüfen Sie anschließend in den Plugin-Einstellungen, ob die „No-Auth URL"-Funktion überhaupt benötigt wird – falls nicht, deaktivieren Sie diese Option.

Den aktuellen Stand des Plugins finden Sie direkt im [offiziellen WordPress Plugin-Verzeichnis](https://wordpress.org/plugins/ai-engine/).

## Warum sind KI-Plugins ein besonderes Sicherheitsrisiko?

Die Schwachstelle im AI Engine Plugin ist kein Zufall, sondern Teil eines größeren Musters. KI-Plugins boomen gerade – und mit ihnen wächst die Angriffsfläche für WordPress-Websites erheblich. Diese Plugins unterscheiden sich in einem wesentlichen Punkt von klassischen WordPress-Erweiterungen: Sie speichern hochsensible API-Zugangsdaten, stellen Verbindungen zu externen Diensten her und benötigen erweiterte Rechte, um KI-Modelle im Namen des Website-Betreibers anzusprechen.

Genau diese Kombination macht sie zu einem attraktiven Angriffsziel. Laut Sicherheitsforschern werden verwundbare WordPress-Plugins heute innerhalb von Stunden nach Bekanntwerden einer Lücke automatisiert gescannt und angegriffen. Wer also ein veraltetes Plugin betreibt, läuft Gefahr, bereits kompromittiert zu sein, bevor er überhaupt von der Lücke erfahren hat.

Das [WordPress Security Team stellt auf make.wordpress.org](https://make.wordpress.org/core/) regelmäßig Updates und Sicherheitshinweise bereit – es lohnt sich, diesen Kanal zu abonnieren.

## Fünf Sofortmaßnahmen für mehr WordPress-Sicherheit

Neben dem Update des AI Engine Plugins empfehlen wir folgende Maßnahmen, um Ihre WordPress-Website grundsätzlich besser abzusichern:

**1. Automatische Updates aktivieren**
Nutzen Sie WordPress' eingebaute Funktion für automatische Minor-Updates und aktivieren Sie diese Option auch für Plugins, sofern Ihre Hosting-Umgebung das unterstützt.

**2. Zwei-Faktor-Authentifizierung einrichten**
Schützen Sie alle Administrator-Accounts mit einem zweiten Faktor. Selbst wenn ein Angreifer ein Passwort erbeutet oder einen Token abfängt, bleibt der Zugang verwehrt.

**3. REST-API-Exposition prüfen**
Prüfen Sie regelmäßig, welche Endpunkte Ihre Website unter `/wp-json/` öffentlich exponiert. Nicht benötigte Endpunkte können mit geeigneten Plugins oder direkt in der `functions.php` eingeschränkt werden.

**4. Sicherheits-Monitoring aktivieren**
Tools wie Wordfence oder Sucuri protokollieren verdächtige Login-Versuche, Dateiänderungen und unbekannte REST-API-Zugriffe in Echtzeit.

**5. Regelmäßige Backups anlegen**
Selbst bei einem erfolgreichen Angriff können Sie Ihre Website aus einem aktuellen Backup wiederherstellen – vorausgesetzt, das Backup liegt außerhalb der WordPress-Installation und ist nicht selbst kompromittiert.

## Was bedeutet das für Website-Betreiber in Frankfurt?

Die WordPress-Community diskutiert den AI Engine Vorfall intensiv – und das zu Recht. Er zeigt exemplarisch, wie schnell ein beliebtes Plugin zur Schwachstelle wird, wenn der Druck steigt, neue KI-Funktionen zu integrieren, ohne dabei alle Sicherheitsaspekte vollständig zu durchdenken.

Für kleine und mittelständische Unternehmen in Frankfurt und Umgebung ist das eine klare Botschaft: Eine WordPress-Website ist keine einmalige Investition, sondern ein laufendes Projekt, das kontinuierliche Pflege erfordert. KI-Plugins bieten echte Mehrwerte – aber nur, wenn sie sicher konfiguriert und aktuell gehalten werden.

Als [WordPress-Experten aus Frankfurt](/), die täglich WordPress-Websites betreuen und absichern, sehen wir solche Sicherheitsvorfälle leider regelmäßig. Das gute Ergebnis: Wer proaktiv handelt und sein System aktuell hält, ist in den allermeisten Fällen gut geschützt.

Frankfurt Marketing Studio hilft Ihnen dabei, Ihre WordPress-Website sicherheitstechnisch zu prüfen, laufend zu warten und optimal gegen aktuelle Bedrohungen zu schützen – sprechen Sie uns gerne an.

## Quellen

- [WordPress AI Engine Plugin Exposes 100,000 WordPress Sites to Privilege Escalation Attacks](https://cybersecuritynews.com/ai-engine-wordpress-plugin-exposes-100000-wordpress-sites/) — r/wordpress
- [AI Engine Flaw Exposes 100,000 WordPress Sites to Attack](https://www.esecurityplanet.com/threats/news-wordpress-vulnerability-100k-impact/) — r/wordpress
- [WordPress AI Security Risk 2026: 100K+ Sites Exposed Through Plugins](https://www.pandacodegen.com/blog/wordpress-ai-security-risk-2026) — r/wordpress

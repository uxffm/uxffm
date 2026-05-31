---
publishDate: 2026-05-31T00:00:00Z
title: "WordPress 7.0 Armstrong: KI-API-Schlüssel schützen – das müssen Sie jetzt wissen"
excerpt: "WordPress 7.0 bringt KI direkt in den Core – doch Sicherheitsforscher warnen: gespeicherte AI-API-Keys sind ein hochattraktives Angriffsziel. So schützen Sie sich."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-70-ki-api-schluessel-sicherheit
---

Am 20. Mai 2026 wurde WordPress 7.0 „Armstrong" veröffentlicht – benannt nach dem Jazzlegenden Louis Armstrong. Innerhalb von nur sieben Tagen hatten bereits 46 % aller WordPress-Installationen weltweit auf die neue Version aktualisiert. Das ist ein Rekord. Doch während die Community die KI-Funktionen des neuen Releases feiert, haben Sicherheitsforscher bereits am Erscheinungstag eine beunruhigende Schwachstelle identifiziert: WordPress 7.0 macht KI-API-Schlüssel zum attraktivsten Angriffsziel, das WordPress je hatte.

## Was ist neu in WordPress 7.0 Armstrong?

WordPress 7.0 markiert einen Paradigmenwechsel. Erstmals gehört eine KI-Schnittstelle direkt zum WordPress-Core – die sogenannte **Abilities API**. Damit können Plugins und Themes KI-Funktionen nutzen, ohne selbst eine Verbindung zu KI-Diensten aufzubauen. Nutzer hinterlegen ihren API-Schlüssel (etwa für OpenAI, Anthropic oder Google Gemini) einmalig in den WordPress-Einstellungen, und alle kompatiblen Plugins greifen darüber auf KI-Dienste zu.

Weitere Neuerungen in WordPress 7.0:

- **Neues Admin-Design:** Ein komplett überarbeitetes Admin-Interface mit modernerem Look, verbesserter Navigation und klareren Workflows soll den Arbeitsalltag im Dashboard erleichtern.
- **Neue Blöcke und Design-Tools:** Der Block-Editor wurde erneut ausgebaut. Neue Layout-Optionen, ein überarbeitetes Grid-System und verbesserte Content-Type-Unterstützung stehen Entwicklern und Redakteuren zur Verfügung.
- **Verbesserter API-Layer:** Zahlreiche REST-API-Verbesserungen machen WordPress als Headless-CMS leistungsfähiger und ermöglichen neue Architekturmuster.
- **Real-Time Collaboration verschoben:** Die lang erwartete Echtzeit-Zusammenarbeit im Editor – ähnlich wie bei Google Docs – wird nicht in 7.0 erscheinen. Das Core-Team hat die Funktion wegen offener Fragen zu Race Conditions, Serverlast und Speicherverbrauch auf eine spätere Version verschoben.

Für Agenturen und Unternehmen ist die KI-Integration das zentral interessante Feature. Doch genau hier liegt auch das Problem.

## Die neue Sicherheitsbedrohung: KI-API-Schlüssel als lukratives Angriffsziel

Sicherheitsforscher haben schon am Erscheinungstag von WordPress 7.0 auf eine fundamentale Veränderung der Bedrohungslage hingewiesen. Oliver Sild, CEO des WordPress-Sicherheitsunternehmens [Patchstack](https://patchstack.com/), warnte öffentlich: Es werde einen „absoluten Ansturm von Hackern geben, um KI-API-Schlüssel zu stehlen."

Warum? Früher war eine kompromittierte WordPress-Website für Angreifer in erster Linie interessant, um Spam-Links einzuschleusen, Kundendaten zu stehlen oder Rechenleistung für Kryptomining zu missbrauchen. Der direkte monetäre Wert war begrenzt.

Das hat sich geändert. Ein gestohlener OpenAI- oder Gemini-API-Schlüssel kann Tausende oder sogar Zehntausende Euro wert sein – und zwar sofort, weil Angreifer ihn für eigene KI-Anfragen auf Kosten des Schlüsselinhabers verwenden können. Ein Entwickler berichtete im März 2026 von einer Rechnung über 82.000 US-Dollar für Gemini-API-Anfragen, nachdem sein Schlüssel kompromittiert worden war. Solche Schadenssummen entstehen in wenigen Stunden.

## Warum ist die Situation bei WordPress 7.0 besonders heikel?

Das technische Problem ist vielschichtig:

**Sichtbarkeit im Browser:** Beim Einrichten eines KI-Providers in WordPress 7.0 kann der API-Schlüssel im Browser-Autofill-Dropdown im Klartext erscheinen. Wer Zugang zum Browser oder Screen-Sharing-Aufzeichnungen hat, kann den Schlüssel abgreifen, ohne jemals in die WordPress-Datenbank schauen zu müssen.

**Jedes Plugin bekommt Zugriff:** Die Abilities API gibt grundsätzlich allen kompatiblen Plugins Zugriff auf den hinterlegten API-Schlüssel. Es gibt keine granulare Zugriffskontrolle und keine integrierten Ausgabenlimits pro Plugin. Ein schlecht programmiertes oder kompromittiertes Plugin kann den Schlüssel auslesen und exfiltrieren.

**Keine nativen Spend Caps:** WordPress 7.0 bringt keine eingebaute Ausgabenbegrenzung für die KI-API-Nutzung mit. Sobald ein Angreifer den Schlüssel hat, kann er unbegrenzt Anfragen stellen – bis das Tageslimit beim KI-Anbieter greift oder der Kontoinhaber die Abrechnung bemerkt.

**Architektonisches Grundproblem:** WordPress wurde zu einer Zeit entworfen, als Websites keine hochwertige, direkt monetarisierbare Credentials enthielten. Die Sicherheitsarchitektur war auf Benutzerdaten und Datenbankzugänge ausgerichtet – nicht auf API-Schlüssel, die sekundenschnell Rechnungen in fünfstelliger Höhe verursachen können.

## So schützen Sie Ihre WordPress-Website jetzt

Die gute Nachricht: Es gibt konkrete Schritte, die Sie sofort umsetzen können, um das Risiko drastisch zu senken.

**1. Ausgabenlimits direkt beim KI-Anbieter setzen**

Das ist die wichtigste Maßnahme. Nahezu alle großen KI-Anbieter – OpenAI, Anthropic, Google Cloud – ermöglichen es, harte Ausgabenlimits (Hard Limits) für API-Schlüssel zu setzen. Setzen Sie das monatliche Limit auf einen realistischen Wert für Ihren tatsächlichen Bedarf. Auch wenn ein Angreifer Ihren Schlüssel stiehlt, ist der maximale Schaden dadurch gedeckelt.

**2. Separaten API-Schlüssel für WordPress verwenden**

Erstellen Sie für Ihre WordPress-Installation einen eigenen, dedizierten API-Schlüssel mit eingeschränkten Berechtigungen – getrennt von Schlüsseln, die Sie in anderen Projekten nutzen. So bleibt ein Kompromiss auf WordPress isoliert.

**3. Plugins kritisch prüfen**

Aktivieren Sie nicht wahllos alle Plugins, die „WordPress 7.0 Abilities API" als Feature bewerben. Prüfen Sie den Entwickler, die Bewertungen, das Update-Verhalten und den Quellcode (sofern möglich). Die Abilities API macht Plugin-Qualität direkt zu einem finanziellen Sicherheitsthema.

**4. Zugriff auf das WordPress-Admin einschränken**

KI-API-Schlüssel sind nur dann gefährdet, wenn sich jemand unauthorisierter Zugang zum Dashboard verschafft. Daher gelten alle klassischen Absicherungsmaßnahmen umso dringlicher:
- Zwei-Faktor-Authentifizierung (2FA) für alle Admin-Konten aktivieren
- Login-URL anpassen oder verstecken
- Fehlgeschlagene Login-Versuche mit Plugins wie Limit Login Attempts Reloaded begrenzen
- Starke, einzigartige Passwörter verwenden

**5. Automatische Updates aktivieren**

Das WordPress-Sicherheitsteam und die Plugin-Entwickler werden auf die neuen Bedrohungsszenarien reagieren und Patches veröffentlichen. Stellen Sie sicher, dass kritische Sicherheitsupdates automatisch eingespielt werden.

**6. Verdächtige Aktivitäten im API-Dashboard überwachen**

Richten Sie bei Ihrem KI-Anbieter Benachrichtigungen für ungewöhnlich hohe API-Nutzung ein. Bei OpenAI, Anthropic und Google gibt es Nutzungsdashboards mit Alarmfunktionen. Prüfen Sie diese regelmäßig.

## Was die WordPress-Community derzeit diskutiert

In der r/wordpress-Community und auf Make WordPress ist die Diskussion lebhaft. Viele Entwickler und Agenturen begrüßen die KI-Integration prinzipiell – sie vereinfacht die Implementierung von KI-Features erheblich. Gleichzeitig wächst der Druck auf das Core-Team, in künftigen WordPress-Versionen eine granulare Zugriffskontrolle für die Abilities API nachzurüsten: Welches Plugin darf den Schlüssel nutzen? Welches Ausgabenlimit gilt pro Plugin? Welche KI-Aktionen sind erlaubt?

Das Grundproblem ist bekannt: WordPress priorisiert historically Abwärtskompatibilität und einfache Bedienbarkeit. Granulare Sicherheitskontrollen für API-Schlüssel sind technisch anspruchsvoll und können die User Experience verkomplizieren. Es bleibt abzuwarten, wie das Core-Team in WordPress 7.1 oder 8.0 reagiert.

## Ausblick: Was kommt als nächstes?

Real-Time Collaboration – das Feature, das am heißesten erwartet wurde – wird nicht in 7.0 landen. Das Core-Team hat technische Gründe genannt: Race Conditions bei gleichzeitigen Bearbeitungen, potenziell hohe Serverlast und ungelöste Probleme bei der Speichereffizienz. Wann genau RTC kommt, ist noch offen. Für Agenturen, die auf eine Google-Docs-ähnliche Kollaboration in WordPress gewartet haben, bedeutet das: Weiterhin auf Drittlösungen oder dedizierte Collaboration-Tools setzen.

Was in 7.0 jedoch funktioniert, ist das überarbeitete Content-Type-System, das flexiblere Inhaltsstrukturen ohne Custom Post Types ermöglicht, sowie das neue Grid-Paket für präzisere Layoutkontrolle im Block-Editor. Für Entwickler und Designer sind das bedeutende Qualitätsverbesserungen.

## Fazit: WordPress 7.0 ist ein Meilenstein – mit neuen Verantwortlichkeiten

WordPress 7.0 ist ein ehrgeiziges Release, das die Plattform in eine neue Ära führt. Die KI-Integration eröffnet echte neue Möglichkeiten für Websites und Anwendungen. Aber sie bringt auch eine neue Klasse von Sicherheitsrisiken mit sich, die bisher in der WordPress-Welt unbekannt waren.

Die wichtigste Botschaft: Wenn Sie KI-API-Schlüssel in WordPress hinterlegen, behandeln Sie diese wie Zahlungsdaten. Setzen Sie Ausgabenlimits, verwenden Sie dedizierte Schlüssel, sichern Sie Ihr Dashboard konsequent ab – und bleiben Sie informiert.

Als [Frankfurt WordPress Agentur](/) unterstützen wir Unternehmen aus Frankfurt und der Rhein-Main-Region bei genau diesen Fragen: von der sicheren Konfiguration von WordPress 7.0 über die Auswahl und Härtung von KI-Plugins bis hin zu vollständigen Security-Audits. Sprechen Sie uns an, wenn Sie Ihre WordPress-Installation fit für die KI-Ära machen wollen.

## Quellen

- [Security Researcher: WordPress 7.0 Could Trigger Rush To Steal AI API Keys](https://www.searchenginejournal.com/wordpress-7-0-faces-security-concerns-over-ai-api-keys/575679/) — r/wordpress
- [WordPress 7.0 Armstrong release: AI Abilities API](https://wppoland.com/en/wordpress-7-0-complete-guide-ai-integration/) — r/wordpress
- [Patchstack CEO Warns WordPress 7.0 Could Trigger "Absolute Rush" To Steal AI API Keys](https://www.therepository.email/patchstack-ceo-warns-wordpress-7-0-could-trigger-absolute-rush-to-steal-ai-api-keys) — r/wordpress
- [WordPress 7.0 AI Engine: Every Plugin Gets Your API Key, No Spend Cap](https://www.thewordpresscompany.co.uk/blog/2026/04/12/wordpress-7-ai-engine-budget-risk/) — r/wordpress

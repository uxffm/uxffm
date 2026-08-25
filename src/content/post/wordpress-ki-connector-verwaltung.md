---
publishDate: 2026-08-25T00:00:00Z
title: "WordPress 7.0: Der neue KI-Connector-Manager erklärt"
excerpt: "WordPress 7.0 bringt eine zentrale Verwaltung für KI-Anbieter direkt ins Dashboard. Was das für Ihre Website bedeutet."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-ki-connector-verwaltung
---

Mit WordPress 7.0 hat die Plattform einen entscheidenden Schritt in Richtung künstliche Intelligenz gemacht — nicht durch ein einzelnes KI-Feature, sondern durch eine grundlegende Infrastruktur, die alle zukünftigen KI-Funktionen trägt. Im Mittelpunkt steht ein neuer Bereich im Dashboard: der Connector-Manager unter *Einstellungen → Connectors*.

## Was ist der WordPress Connector-Manager?

Der Connector-Manager ist ein zentrales Verwaltungssystem für externe Dienste — in der aktuellen Version vor allem für KI-Anbieter. Stellen Sie sich vor, es gibt ein Plugin-Verzeichnis, aber statt Plugins installieren Sie dort Verbindungen zu KI-Diensten. Sie wählen Ihren Anbieter, tragen Ihre API-Zugangsdaten einmalig ein, und jedes Plugin oder Theme, das die neue WordPress KI-API unterstützt, kann diese Verbindung automatisch nutzen.

Zur Markteinführung von WordPress 7.0 sind drei Anbieter verfügbar:

- **OpenAI** (ChatGPT und GPT-4o)
- **Google** (Gemini)
- **Anthropic** (Claude)

Das klingt zunächst nach einem technischen Detail. In der Praxis bedeutet es: Sie müssen Ihren API-Schlüssel nicht mehr in jedem einzelnen Plugin separat eingeben. Einmal konfiguriert, steht die Verbindung systemweit zur Verfügung.

## Die neue Funktion `wp_ai_client_prompt()`

Der technische Kern des Systems ist die Funktion `wp_ai_client_prompt()`. Sie erlaubt es Entwicklern, eine Anfrage an ein Sprachmodell zu schicken, ohne den Anbieter kennen zu müssen, den der Site-Betreiber konfiguriert hat. Ein Plugin fragt einfach: "Generiere mir eine Zusammenfassung dieses Textes" — und WordPress leitet die Anfrage an den konfigurierten Anbieter weiter.

Für Agenturinhaber und Website-Betreiber hat das einen praktischen Vorteil: Sie entscheiden selbst, welchen KI-Dienst Ihre Plugins nutzen. Wenn Sie aus Datenschutzgründen ChatGPT ablehnen, konfigurieren Sie Claude oder einen anderen Anbieter — und alle kompatiblen Plugins folgen automatisch dieser Einstellung.

## Warum das für Frankfurter Unternehmen relevant ist

Im Bereich der DSGVO und des deutschen Datenschutzrechts ist die Frage, welche KI Ihre Daten verarbeitet, keine Kleinigkeit. Mit dem WordPress Connector-Manager können Sie bewusst einen europäisch-konformen oder zumindest datenschutzfreundlicheren Anbieter wählen und diese Entscheidung zentral durchsetzen.

Konkret: Wenn Ihre Website KI-gestützte Funktionen nutzt — etwa automatische Übersetzungen, Zusammenfassungen von Blog-Beiträgen, oder KI-generierte Produktbeschreibungen — können Sie ab WordPress 7.0 auf Ebene des CMS festlegen, welcher Anbieter diese Aufgaben übernimmt.

## Was kommen wird: WordPress 7.1 und Abilities

WordPress 7.1, das im weiteren Verlauf von 2026 erwartet wird, soll das System um ein sogenanntes Abilities-Layer erweitern. Damit können Administratoren feingranular steuern, was KI-Agenten auf ihrer Website dürfen: Darf die KI Beiträge anlegen? Kommentare moderieren? Medien hochladen?

Das ist die Architektur hinter dem aktuellen System: WordPress 7.0 hat die Leitungen verlegt, 7.1 installiert die Sicherungen.

## So bereiten Sie Ihre Website vor

Wenn Sie eine WordPress-Seite betreiben, die professionell gewartet wird, gibt es einige praktische Schritte:

**API-Schlüssel beschaffen:** Falls Sie KI-Funktionen nutzen möchten, legen Sie bei einem der drei Anbieter ein Konto an und generieren Sie einen API-Schlüssel. Bei Anthropic (Claude) geht das unter [console.anthropic.com](https://console.anthropic.com/), bei OpenAI unter [platform.openai.com](https://platform.openai.com/).

**Connector konfigurieren:** Nach dem Update auf WordPress 7.0 finden Sie den neuen Bereich unter *Einstellungen → Connectors*. Tragen Sie dort Ihren Schlüssel ein — einmalig, zentral, sicher.

**Plugin-Kompatibilität prüfen:** Nicht alle Plugins unterstützen die neue API sofort. Achten Sie in den nächsten Monaten auf Plugin-Updates, die explizit WordPress 7.0 KI-Kompatibilität ankündigen.

**Datenschutz dokumentieren:** Wenn auf Ihrer Website KI-Dienste Nutzerdaten verarbeiten, muss das in Ihrer Datenschutzerklärung erwähnt werden. Prüfen Sie gemeinsam mit Ihrem Datenschutzbeauftragten, welche Daten an welchen Anbieter übermittelt werden.

## Fazit: Infrastruktur vor Features

Die wichtigste Botschaft von WordPress 7.0 ist, dass es sich nicht um ein "KI-Update" im Sinne eines neuen Buttons oder einer neuen Oberfläche handelt. Es ist ein Fundament. Die eigentlichen Anwendungsfälle — KI-gestützte Texterstellung, automatische Inhaltspflege, smarte Suche — werden in den kommenden Monaten durch Plugin-Entwickler realisiert, die auf dieser Infrastruktur aufbauen.

Für Website-Betreiber bedeutet das: Jetzt ist der richtige Zeitpunkt, die technischen Grundlagen zu verstehen und sich zu positionieren, bevor das Thema im Tagesgeschäft dringend wird.

Frankfurt Marketing Studio berät Unternehmen aus Frankfurt und der Rhein-Main-Region bei der strategischen und technischen Integration von WordPress-Lösungen. Sprechen Sie uns an, wenn Sie Ihre Website zukunftssicher aufstellen möchten.

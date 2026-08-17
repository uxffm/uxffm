---
publishDate: 2026-08-17T00:00:00Z
title: "WordPress Abilities API: Warum die geplante Erweiterung für 7.1 scheiterte"
excerpt: "Die WordPress-Community diskutiert hitzig: Drei neue Abilities sollten in 7.1 landen – doch ein Core-Maintainer zog die Notbremse. Was steckt dahinter?"
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-abilities-api-7-1
---

Wenn Kernentwickler öffentlich widersprechen, hört die WordPress-Community hin. Genau das ist passiert: Ein Vorschlag, die Abilities API in WordPress 7.1 deutlich zu erweitern, stieß auf starken Widerstand aus dem eigenen Team – und die vorgeschlagenen Fähigkeiten schafften es letztendlich nicht in das Release, das am 19. August 2026 auf dem WordCamp US in Phoenix veröffentlicht wird. Was war geplant, warum scheiterte es, und was bedeutet das für Entwickler?

## Was ist die Abilities API überhaupt?

Die Abilities API wurde mit [WordPress 6.9](https://make.wordpress.org/core/2026/07/02/merge-proposal-expanding-wordpress-core-abilities/) eingeführt und in WordPress 7.0 um eine clientseitige Implementierung erweitert. Das Konzept dahinter ist einfach, aber mächtig: WordPress erhält eine strukturierte, maschinenlesbare Beschreibung seiner eigenen Fähigkeiten.

Statt dass externe Systeme – KI-Agenten, Automatisierungstools oder Drittanbieter-Plugins – raten oder per Trial-and-Error herausfinden müssen, was eine WordPress-Instanz kann, können sie die registrierten Abilities gezielt abfragen und nutzen. Jede Ability ist ein benannter Endpunkt mit definierten Ein- und Ausgaben. Das macht WordPress zu einer kontrolliert ansprechbaren Plattform, nicht nur zu einer Website.

Der Anwendungsfall ist klar: KI-Assistenten und Automatisierungstools sollen in der Lage sein, mit WordPress zu interagieren, ohne dass dafür Sondercode geschrieben werden muss. Die Abilities API ist das standardisierte Interface dafür.

## Was wurde für WordPress 7.1 vorgeschlagen?

Core Committer Jorge Costa veröffentlichte im Juli 2026 einen [Merge-Vorschlag auf make.wordpress.org](https://make.wordpress.org/core/2026/07/02/merge-proposal-expanding-wordpress-core-abilities/), der drei neue, lesende Abilities in den WordPress-Kern einbringen sollte:

- **`core/read-settings`** – Ermöglicht das Auslesen von WordPress-Einstellungen über die Abilities API
- **`core/read-content`** – Stellt Inhalte (Beiträge, Seiten, benutzerdefinierte Beitragstypen) strukturiert bereit
- **`core/read-users`** – Gibt Benutzerinformationen auf definierte Weise aus

Das Ziel war, KI-Agenten und Automatisierungstools einen konsistenten, sicheren Lesezugriff auf die wichtigsten WordPress-Datenbereiche zu geben – ohne dass dafür REST-API-Endpunkte direkt abgefragt oder Plugin-spezifische Lösungen implementiert werden müssten.

## Warum zog der Maintainer die Notbremse?

David Levine, Mitglied des WordPress AI Teams und Component Maintainer der Abilities API, widersprach öffentlich. Seine Kritik hatte mehrere Dimensionen.

**Mangelnde Tests:** Nur eine der drei vorgeschlagenen Abilities – `core/read-settings` – war überhaupt in das WordPress AI Plugin gemergt worden. Und das sei ausdrücklich unter der Annahme geschehen, dass dort noch ausreichend Zeit für Review und Iteration bleiben würde. Das AI Team hatte in einem Meeting zuvor festgestellt, dass die Abilities noch nicht reif für den Kern seien.

**Inkonsistente Namensgebung:** Levine wies darauf hin, dass die vorgeschlagenen `read-*`-Präfixe mit dem in WordPress 6.9 eingeführten `get-*`-Muster kollidierten. Benennungskonventionen mögen nach Details klingen – in APIs, die langfristig stabil bleiben müssen, sind sie jedoch fundamental. Eine inkonsistente Namensgebung erzeugt Verwirrung für alle Entwickler, die auf der API aufbauen.

**Fehlender Konsens:** Das Kernproblem war, dass es keinen Konsens im Team gab. Ein Vorschlag, der von den zuständigen Maintainern nicht unterstützt wird, in ein Major Release zu pressen – das wäre ein schlechtes Signal für den gesamten Beitragsprozess.

## Was ist statt dessen in WordPress 7.1 gelandet?

Die drei neuen Abilities kamen nicht in 7.1. Allerdings wurden kleinere, bereits konsolidierte Verbesserungen an der Abilities API doch noch aufgenommen: verbesserte Abfragemöglichkeiten, verfeinerte Filteroptionen und robustere Eingabevalidierung. Details dazu finden sich in den [offiziellen Developer Notes auf make.wordpress.org](https://make.wordpress.org/core/2026/07/31/abilities-api-improvements-in-wordpress-7-1/).

Was heißt das für Entwickler? Die Abilities API ist vorhanden, stabil und für eigene Implementierungen nutzbar – aber der standardisierte Lesezugriff auf Settings, Inhalte und Benutzer wird noch warten müssen. Wer heute schon KI-Agenten oder Automatisierungstools an WordPress anbinden will, muss weiterhin auf die REST API oder Plugin-spezifische Ansätze setzen.

## Was die Diskussion über das WordPress-Ökosystem verrät

Die Geschichte hinter diesem Streit ist eigentlich eine gute Nachricht für das WordPress-Projekt: Das Review-System funktioniert. Ein Vorschlag, der zu schnell zu viel wollte, wurde durch etablierte Prozesse und klare Kommunikation gestoppt – von einem Maintainer, der seine Verantwortung ernst nimmt.

Für Agenturen und Entwickler, die mit WordPress arbeiten, ist das ein wichtiges Signal: WordPress entwickelt sich als Plattform weiter, aber nicht kopflos. Die Abilities API wird kommen – in dem Umfang, in dem sie sauber spezifiziert und getestet ist. Wer jetzt schon plant, KI-gestützte Workflows auf WordPress aufzubauen, sollte die Entwicklung auf [make.wordpress.org/core](https://make.wordpress.org/core/) verfolgen und eigene Implementierungen auf stabile, dokumentierte Schnittstellen stützen.

## Was das für Ihre WordPress-Website bedeutet

Wenn Sie eine WordPress-Site betreiben, ändert sich durch den Abilities-API-Streit kurzfristig nichts. Das Release WordPress 7.1 selbst bringt dennoch relevante Neuerungen: responsives Block-Styling direkt im Editor, Pseudo-Zustände für Buttons und Navigationslinks, persistente Admin-Toolbar und neue Blöcke wie Playlist und Tabs.

Langfristig ist die Abilities API ein Baustein für die KI-fähige WordPress-Infrastruktur der Zukunft. Wer heute schon Automatisierung in WordPress-Projekte integriert – sei es für redaktionelle Workflows, Kundenkommunikation oder Performance-Monitoring – sollte diesen Bereich im Auge behalten.

---
publishDate: 2026-06-13T00:00:00Z
title: "WordPress MCP Adapter: KI-Agenten direkt mit Ihrer Website verbinden"
excerpt: "Der WordPress MCP Adapter macht Ihre Website zur Schnittstelle für KI-Agenten. So steuern Claude, Cursor & Co. Ihr WordPress per natürlicher Sprache."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-mcp-adapter-ki-agenten
---

Der Weg, wie Entwickler und Websitebetreiber mit WordPress arbeiten, ändert sich gerade grundlegend. Während frühere KI-Integrationen vor allem auf Textgenerierung in Plugins beschränkt waren, eröffnet der [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter) eine neue Kategorie: KI-Agenten, die eigenständig Beiträge erstellen, Plugins verwalten, Kommentare moderieren oder WooCommerce-Produkte aktualisieren – alles über natürliche Sprache, ohne dass ein Entwickler manuell eingreift. Dieses Thema wird derzeit intensiv in der WordPress-Community diskutiert, und mit gutem Grund.

## Was ist der Model Context Protocol (MCP) Standard?

MCP steht für Model Context Protocol – ein offenes Protokoll, das von Anthropic initiiert wurde und inzwischen von einem breiten Ökosystem unterstützt wird. Es definiert, wie KI-Assistenten mit externen Systemen kommunizieren können. Vereinfacht gesagt: MCP ist die Sprache, die KI-Agenten sprechen, wenn sie auf Werkzeuge, Daten oder Funktionen zugreifen wollen.

Ein MCP-Server stellt sogenannte *Tools* (ausführbare Funktionen), *Resources* (lesbare Daten) und *Prompts* (vordefinierte Abläufe) bereit. Ein KI-Client – etwa Claude Desktop, Claude Code oder Cursor – verbindet sich mit diesem Server und kann dann die angebotenen Fähigkeiten nutzen.

Bisher mussten Entwickler für jede Anwendung eigene Integrations-Skripte schreiben. MCP standardisiert diesen Prozess. Der WordPress MCP Adapter setzt genau hier an: Er macht eine WordPress-Installation zum MCP-Server.

## Die Abilities API: Grundlage für sichere KI-Aktionen

Der MCP Adapter baut auf der [Abilities API](https://make.wordpress.org/ai/) auf, die mit WordPress 6.9 eingeführt und in WordPress 7.0 weiter ausgebaut wurde. Die Abilities API ist Wordpress Core's sichere Schicht für KI-Integration: Plugins, Themes und WordPress Core selbst können darin sogenannte *Abilities* registrieren – diskrete, klar abgegrenzte Aktionen wie `create_post`, `update_product`, `moderate_comment` oder `install_plugin`.

Jede Ability enthält eine maschinenlesbare Beschreibung und eine integrierte Berechtigungsprüfung auf Basis des WordPress-Capability-Systems. Eine Ability, die das Erstellen von Beiträgen erlaubt, prüft also automatisch, ob der verbundene Benutzer die Berechtigung `edit_posts` hat. Das KI-System bekommt nie mehr Zugriffsrechte, als der verbundene WordPress-Account hätte.

Eine wichtige Sicherheitseigenschaft: Der MCP Adapter exponiert standardmäßig *keine* Abilities. Nur Abilities, die explizit als `meta.mcp.public = true` markiert sind, werden für KI-Clients sichtbar. Damit gibt es keine unbeabsichtigten Zugriffsöffnungen durch Drittanbieter-Plugins.

## Einrichtung: In unter 15 Minuten startklar

Die Einrichtung des WordPress MCP Adapters ist überraschend unkompliziert. Die folgenden Schritte gelten für eine selbst gehostete WordPress-Installation:

**1. Adapter installieren**

Der Adapter steht als Composer-Paket oder als direktes WordPress-Plugin zur Verfügung:

```bash
composer require wordpress/mcp-adapter
```

Alternativ kann er als Plugin aus dem offiziellen WordPress-Plugin-Verzeichnis installiert werden.

**2. Application Password erstellen**

Unter *Benutzer → Profil* findet sich der Abschnitt *Anwendungspasswörter*. Dort einen neuen Eintrag mit einem beschreibenden Namen anlegen (z. B. „Claude MCP"), das generierte Passwort kopieren und sicher aufbewahren – es wird nur einmal angezeigt.

**3. KI-Client konfigurieren**

In Claude Desktop, Cursor oder einem anderen MCP-kompatiblen Client wird der WordPress-Server als MCP-Quelle eingetragen. Die Konfiguration sieht beispielhaft so aus:

```json
{
  "mcpServers": {
    "meine-website": {
      "command": "npx",
      "args": ["-y", "@wordpress/mcp-adapter-cli"],
      "env": {
        "WP_URL": "https://meine-website.de",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
    }
  }
}
```

Nach dem Neustart des Clients erkennt der KI-Assistent automatisch alle verfügbaren Abilities der WordPress-Installation.

## Praktische Anwendungsfälle

Was lässt sich nach der Einrichtung tatsächlich tun? Die Community berichtet über eine Reihe sehr konkreter Workflows:

**Content-Produktion per Chat:** Statt Beiträge manuell zu verfassen, können Redakteure einem KI-Agenten Thema, Ton und SEO-Anforderungen nennen. Der Agent schreibt den Beitrag und legt ihn direkt als Entwurf in WordPress an.

**WooCommerce-Pflege:** Produktbeschreibungen aktualisieren, Preise anpassen oder Kategorien umstrukturieren – alles auf Anweisung in natürlicher Sprache, ohne den Shop-Backend aufzurufen.

**Technische Wartung:** Plugin-Updates prüfen, Caches leeren oder Benutzerverwaltung anpassen – besonders nützlich für Agenturen, die viele Websites gleichzeitig betreuen.

**SEO-Workflows:** In Kombination mit SEO-Plugins, die eigene Abilities registrieren, kann ein KI-Agent Meta-Beschreibungen aller Beiträge auswerten und verbessern.

**Kommentar-Moderation:** Spam-Kommentare identifizieren und löschen, legitime Kommentare freigeben – delegierbar an einen Agenten mit klar definiertem Regelwerk.

## Sicherheitsüberlegungen für den Produktivbetrieb

Die Kontrolle bleibt beim Websitebetreiber. Einige Punkte, die im Produktivbetrieb beachtet werden sollten:

- **Dediziertes Benutzerkonto:** Für den MCP-Adapter sollte ein eigenes WordPress-Konto mit minimalen, aufgabenspezifischen Berechtigungen angelegt werden – kein Administrator-Account.
- **Application Passwords rückrufbar:** Falls ein KI-Client kompromittiert wird, lässt sich das Application Password jederzeit in WordPress löschen, ohne das Hauptpasswort zu ändern.
- **Audit Logging:** WordPress-Plugins für Activity Logging (z. B. WP Activity Log) machen alle Aktionen des KI-Agenten nachvollziehbar.
- **Abilities explizit prüfen:** Regelmäßig kontrollieren, welche Abilities durch installierte Plugins exponiert werden, insbesondere nach Plugin-Updates.

## WordPress als Knotenpunkt im KI-Ökosystem

Die Einführung des MCP Adapters ist mehr als ein technisches Feature – sie markiert einen strategischen Wandel. WordPress positioniert sich nicht nur als CMS, sondern als steuerbarer Knotenpunkt innerhalb von KI-gestützten Workflows. Eine WordPress-Website, die MCP-kompatibel ist, kann in automatisierte Redaktionsprozesse, Kundenservice-Pipelines oder Produktkatalogs-Pflege eingebunden werden, ohne dass Entwickler für jede neue KI-Integration eigene Schnittstellen bauen.

Für kleine Unternehmen und Agenturen bedeutet das: Aufgaben, die bisher feste Entwicklerstunden erforderten, werden zunehmend durch KI delegierbar – vorausgesetzt, die WordPress-Installation ist korrekt konfiguriert und abgesichert.

Die Frankfurt Marketing Studio begleitet Kunden beim Aufbau zukunftsfähiger WordPress-Infrastrukturen – von der MCP-Einrichtung über Plugin-Entwicklung bis hin zu sicheren, wartbaren Setups, die mit dem wachsenden KI-Ökosystem kompatibel sind.

## Quellen

- [WordPress MCP Adapter GitHub Repository](https://github.com/WordPress/mcp-adapter) — r/wordpress
- [From Abilities to AI Agents: Introducing the WordPress MCP Adapter](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/) — r/wordpress
- [WordPress AI Team Updates – Make WordPress](https://make.wordpress.org/ai/) — r/wordpress

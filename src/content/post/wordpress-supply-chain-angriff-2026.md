---
publishDate: 2026-05-23T00:00:00Z
title: "31 WordPress-Plugins mit Backdoor: Der Supply-Chain-Angriff, der 400.000 Sites traf"
excerpt: "Ein Angreifer kaufte 31 WordPress-Plugins auf Flippa und versteckte monatelang eine Backdoor. Was passiert ist und was Sie jetzt tun müssen."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-supply-chain-angriff-2026
---

Im April 2026 hat die WordPress-Community einen der ausgefeiltesten Sicherheitsvorfälle ihrer Geschichte erlebt. Ein unbekannter Angreifer erwarb das gesamte „Essential Plugin"-Portfolio — 31 WordPress-Plugins mit zusammen rund 400.000 aktiven Installationen — auf dem Digital-Marktplatz Flippa für eine sechsstellige Summe. Was folgte, war kein spontaner Hack, sondern ein monatelang geplanter Supply-Chain-Angriff, der zeigt, wie verwundbar das WordPress-Ökosystem in seiner Grundstruktur ist.

## Was ist passiert? Der Angriff in der Übersicht

Die Übernahme des Essential-Plugin-Portfolios fand im Sommer 2025 statt. Der Käufer — mit einem Hintergrund im SEO- und Glücksspielmarketing — erhielt nach dem Kauf automatisch Commit-Zugriff auf alle 31 Plugins sowie den Ruf und das Vertrauen, das die vorherigen Entwickler über Jahre aufgebaut hatten.

Am **8. August 2025** erschien Version 2.6.7 der Plugins. Der Changelog-Eintrag lautete schlicht: *„Check compatibility with WordPress version 6.8.2."* Harmlos klingende Worte — doch der Update enthielt versteckt 191 Zeilen PHP-Code, darunter eine PHP-Deserialisierungs-Backdoor.

Diese Backdoor blieb **acht Monate lang inaktiv**. Kein Alarm, kein sichtbares Fehlverhalten, keine Meldungen in Logs. Die Plugins verhielten sich exakt so, wie es von ihnen erwartet wurde. Automatische Updates liefen stillschweigend durch.

Am **5. und 6. April 2026**, in einem Zeitfenster von rund 6 Stunden und 44 Minuten (04:22 bis 11:06 UTC), wurde der Schadcode aktiviert. Das Ziel: cloaked SEO-Spam, der ausschließlich an den Googlebot ausgeliefert wurde — für normale Website-Besucher und Administratoren vollständig unsichtbar.

Am **7. April 2026** schloss WordPress.org alle 31 betroffenen Plugins dauerhaft.

## Welche Plugins waren betroffen?

Zu den geschlossenen Plugins gehören unter anderem:

- **Countdown Timer Ultimate**
- **Popup Anything on Click**
- **WP Testimonial with Widget**
- **WP Team Showcase and Slider**
- **Responsive WP FAQ with Category**
- **SP News and Widget**
- **WP Blog and Widgets**
- **Post Grid and Filter Ultimate**
- **Hero Banner Ultimate**

Alle 31 Plugins stammten aus dem Essential-Plugin-Portfolio und waren zum Zeitpunkt des Angriffs aktiv auf dem [WordPress.org Plugin-Verzeichnis](https://wordpress.org/plugins/) gelistet. Wer eines dieser Plugins installiert und automatische Updates aktiviert hatte, erhielt die verseuchte Version ohne jede Warnung.

## Die technische Dimension: Ethereum-Smart-Contract als C2

Was diesen Angriff besonders bemerkenswert macht, ist die Infrastruktur dahinter. Üblicherweise nutzen Angreifer eigene Server als Command-and-Control (C2) — also als Steuerzentrale, die dem Schadcode Befehle gibt. Behörden oder Plattformen können solche Domains relativ schnell sperren.

In diesem Fall löste die Backdoor die C2-Domain über einen **Ethereum-Smart-Contract** auf — über öffentliche Blockchain-RPC-Endpunkte. Das bedeutet: Ein klassisches Domain-Takedown hätte nicht funktioniert, weil der Angreifer die Zieldomain jederzeit über den Smart-Contract aktualisieren konnte, ohne eine neue Domain registrieren zu müssen.

Diese Technik ist neu im WordPress-Kontext und zeigt, wie schnell sich die Angriffsmethoden weiterentwickeln. Wer nach kompromittierten Domains im Server-Traffic sucht, findet hier nichts Verdächtiges.

## Das eigentliche Problem: Kein Schutz bei Plugin-Übernahmen

Der technische Trick ist beeindruckend — das strukturelle Problem ist es mehr. Wenn ein WordPress-Plugin den Besitzer wechselt, passiert folgendes: **gar nichts**. Keine Benachrichtigung an die Nutzer, kein zusätzlicher Code-Review, keine Warnung auf dem WordPress.org-Eintrag.

Der neue Eigentümer erbt automatisch:
- Den vollständigen Commit-Zugriff auf das Plugin-Repository
- Die bisherige Bewertung und den Ruf des Plugins
- Die Vertrauensstellung bei allen Nutzern, die automatische Updates aktiviert haben
- Die Reichweite über alle bestehenden Installationen

Das ist kein Versehen — so ist das System gebaut. Und solange das so ist, bleibt der Kauf etablierter Plugins mit großer Nutzerbasis ein attraktiver Angriffsvector für gut kapitalisierte Akteure.

## Was bedeutet das für SEO und Rankings?

Der Schadcode lieferte cloaked SEO-Spam ausschließlich an den Googlebot. Für echte Besucher sah die Website normal aus — in der Google Search Console und im Index jedoch erschienen Seiten, die der Administrator nie erstellt hatte.

Mögliche Konsequenzen für betroffene Sites:
- **Manual Actions** durch Google wegen Cloaking
- Ranking-Verluste durch Spam-Assoziationen
- Beschädigung der Domain-Reputation
- Verlust von vertrauenswürdigen Featured Snippets oder Rich Results

Der Angriff war nicht darauf ausgelegt, die Website zu zerstören oder Daten zu stehlen — er war darauf ausgelegt, unentdeckt zu bleiben und stil SEO-Wert abzusaugen. Das macht ihn in mancher Hinsicht gefährlicher: Wer nicht aktiv sucht, findet den Schaden möglicherweise erst Wochen oder Monate später.

## Sofortmaßnahmen: Was Sie jetzt tun sollten

Wenn Sie eines der betroffenen Plugins installiert haben, handeln Sie umgehend:

**1. Plugin sofort deinstallieren**
Alle 31 Essential-Plugins sind auf WordPress.org dauerhaft geschlossen — es gibt keine sichere Version. Entfernen Sie das Plugin vollständig, inklusive der Datenbanktabellen.

**2. Google Search Console prüfen**
Öffnen Sie die Search Console und suchen Sie unter „Seiten" nach URLs, die Sie nicht kennen. Überprüfen Sie den Indexierungsstatus auf unbekannte Seiten.

**3. Crawl-Log analysieren**
Wenn Ihr Hosting Zugriff auf Server-Logs bietet, durchsuchen Sie diese nach auffälligen Googlebot-Anfragen aus dem Zeitraum 5.–7. April 2026.

**4. Automatische Updates überdenken**
Automatische Updates für Plugins sind praktisch — aber sie bedeuten auch, dass kompromittierter Code automatisch auf Ihrer Site landet. Eine sinnvolle Strategie ist es, automatische Updates nur für Sicherheits-Patches zu aktivieren und größere Updates manuell nach einem kurzen Beobachtungszeitraum einzuspielen.

**5. Plugin-Herkunft bei zukünftigen Installationen prüfen**
Schauen Sie sich an, wann ein Plugin zuletzt den Entwickler gewechselt hat. Das „Last updated"-Datum sagt wenig — interessanter ist, ob sich der Entwicklername oder das Plugin-Konto kürzlich geändert hat.

## Was WordPress.org jetzt ändern muss

Die Community diskutiert intensiv, welche Konsequenzen gezogen werden sollten. Ein zentraler Punkt ist die fehlende Transparenz bei Eigentumsübergängen. Forderungen an WordPress.org:

- Öffentliche Anzeige bei Wechsel des Plugin-Eigentümers
- Opt-in-Benachrichtigungen für Nutzer, wenn ein Plugin den Besitzer wechselt
- Pflicht-Code-Review nach einem Eigentumsübergang
- Einfrieren automatischer Updates für eine Karenzzeit nach einer Übernahme

Matt Mullenweg und das WordPress.org-Team haben sich bisher nicht zu konkreten strukturellen Maßnahmen geäußert. Die Diskussion im [WordPress Support-Forum](https://wordpress.org/support/) und auf Make WordPress läuft weiterhin.

## Fazit: Vertrauen ist keine Sicherheitsstrategie

Dieser Vorfall ist eine Erinnerung daran, dass das Vertrauen in einen Plugin-Entwickler kein dauerhaftes Gut ist — es kann verkauft werden. Die Qualität eines Plugins gestern ist kein Garant für die Sicherheit heute.

Für Unternehmen, die auf WordPress setzen, bedeutet das: Ein professionelles Plugin-Management ist keine optionale Maßnahme mehr, sondern Teil der Grundsicherheit jeder Installation. Dazu gehören regelmäßige Audits, kontrollierte Update-Prozesse und das Wissen, welche Software auf der eigenen Website läuft.

Als [WordPress-Agentur aus Frankfurt](/) helfen wir Unternehmen dabei, ihre WordPress-Installationen sicher, aktuell und performant zu halten — mit strukturierten Wartungskonzepten, die genau solche Vorfälle frühzeitig erkennen. Sprechen Sie uns an, wenn Sie Ihre Website überprüfen lassen möchten.

## Quellen

- [Attacker Bought 30 WordPress Plugins on Flippa and Backdoored All of Them](https://www.infoq.com/news/2026/05/wordpress-plugins-supply-chain/) — InfoQ
- [30+ WordPress plugins bought on Flippa and backdoored in supply chain attack](https://thenextweb.com/news/wordpress-plugins-backdoor-supply-chain-essential-plugin-flippa-2) — The Next Web
- [How a Six-Figure Flippa Buy Backdoored 31 WordPress Plugins](https://cyberspit.com/essentialplugin-supply-chain-attack.html) — CyberSpit

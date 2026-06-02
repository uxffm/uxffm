---
publishDate: 2026-06-02T00:00:00Z
title: "WordPress Supply-Chain-Angriff: 31 gekaufte Plugins als Hintertür"
excerpt: "Ein Angreifer kaufte 31 WordPress-Plugins mit 400.000 Installationen auf Flippa und versteckte eine Backdoor 8 Monate lang im Code – bis sie im April 2026 aktiviert wurde."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-supply-chain-angriff-essential-plugins
---

Im April 2026 erschütterte ein beispielloser Supply-Chain-Angriff die WordPress-Gemeinschaft: Ein unbekannter Käufer hatte sich über die Plattform Flippa ein ganzes Portfolio von 31 WordPress-Plugins gesichert, still und heimlich eine Backdoor eingebaut – und diese acht Monate lang schlummern lassen, bevor sie aktiviert wurde. Das Ergebnis: 400.000 WordPress-Websites weltweit kompromittiert, cloaktes SEO-Spam unbemerkt an Googlebot ausgeliefert. Dieser Fall zeigt, warum Plugin-Sicherheit weit über das schlichte Aktualisieren hinausgeht.

## Was genau ist passiert?

Im Frühjahr 2025 erwarb eine Person, die in Berichten nur als „Kris" identifiziert wird und einen Hintergrund in SEO, Kryptowährungen und Online-Glücksspielmarketing haben soll, das gesamte sogenannte Essential Plugin-Portfolio auf Flippa – einer Marktplatz-Plattform für digitale Businesses. Der Kaufpreis lag im sechsstelligen Bereich. Die 31 übernommenen Plugins kamen zusammen auf rund 400.000 aktive Installationen.

Die erste auffällige Code-Änderung kam am 8. August 2025 mit Version 2.6.7. Der Changelog-Eintrag lautete lapidar: „Check compatibility with WordPress version 6.8.2." Tatsächlich versteckten sich hinter diesem harmlosen Hinweis 191 zusätzliche PHP-Zeilen – darunter eine PHP-Deserialisierungs-Backdoor, die Remote Code Execution (RCE) ermöglichte. Wer den Code nicht Zeile für Zeile las, bemerkte nichts.

Der schadhafte Code verhielt sich unauffällig. Er sammelte keinen Traffic ab, verlangsamte keine Website, löste keine Alarm-Systeme aus. Acht Monate lang verhielt er sich wie regulärer Plugin-Code – und gewann damit genau das Vertrauen, das Angreifer für einen erfolgreichen Supply-Chain-Angriff brauchen.

## Die Aktivierung: April 2026

Am 5. und 6. April 2026 wurde die Backdoor aktiviert. Sie begann damit, ausschließlich dem Googlebot – dem Crawler von Google – versteckte SEO-Spam-Links und gefälschte Inhalte auszuliefern. Für normale Besucher und für Website-Betreiber selbst blieben die Seiten unauffällig. Nur Googles Indexierungssystem sah manipulierte Inhalte.

Besonders raffiniert war die Command-and-Control-Infrastruktur (C2): Anstatt auf klassische Server zu setzen, verwendete der Angreifer einen Ethereum-Smart-Contract als Nameserver. Die Backdoor rief öffentliche Blockchain-RPC-Endpunkte ab, um die Adresse des C2-Servers aufzulösen – eine Methode, die klassische Domain-Block-Listen und Firewalls vollständig umgeht. Dezentralisierte Infrastruktur ist schwer zu sperren: Man kann eine Domain auf eine Blacklist setzen, aber nicht die Ethereum-Blockchain abschalten.

Am 7. April 2026 reagierte WordPress.org und sperrte alle 31 betroffenen Plugins aus dem offiziellen Plugin-Verzeichnis. Wer eines dieser Plugins installiert hatte, erhielt keine Updates mehr und wurde mit einer Warnung konfrontiert.

## Warum ist das ein Supply-Chain-Angriff?

Ein klassischer Hack zielt auf eine einzelne Website. Ein Supply-Chain-Angriff hingegen zielt auf einen vertrauenswürdigen Lieferpfad – in diesem Fall auf den Update-Mechanismus von WordPress selbst. Millionen von Website-Betreibern vertrauen darauf, dass ein Plugin aus dem offiziellen WordPress-Verzeichnis sicher ist und bleibt. Sie aktivieren automatische Updates, weil das als „best practice" gilt.

Genau das nutzte der Angreifer aus. Er musste keine einzige Seite direkt hacken. Er kaufte einfach das Vertrauen, das in 31 bestehende Plugins investiert worden war – und nutzte den legitimen Update-Kanal als Angriffsvektor. Jede automatische Aktualisierung auf Version 2.6.7 war unwissentlich die Auslieferung der Backdoor an die eigene Website.

Dies ist kein Einzelfall. Bereits in den Jahren zuvor gab es ähnliche Vorfälle in anderen Ökosystemen, beispielsweise npm-Pakete oder VS-Code-Extensions, die nach einem Eigentümerwechsel kompromittiert wurden. Das WordPress-Ökosystem ist durch seinen dezentralen Charakter und die schiere Anzahl von über 60.000 Plugins im offiziellen Verzeichnis besonders exponiert.

## Welche Plugins waren betroffen?

Die betroffenen Plugins laufen alle unter der Marke „Essential Plugin" und umfassen unter anderem Tools für Formulare, SEO-Hilfe, Social-Media-Einbindung, Caching und Performance. Wer diese Plugins aktiv nutzt oder genutzt hat, sollte umgehend handeln. Eine vollständige Liste der gesperrten Plugins findet sich im [WordPress.org Plugin-Verzeichnis](https://wordpress.org/plugins/) – gesperrte Plugins werden dort entsprechend markiert.

## Was Website-Betreiber jetzt tun sollten

**1. Installierte Plugins auf Betreiberwechsel prüfen**

WordPress.org zeigt im Plugin-Verzeichnis den aktuellen Autor und die Update-Historie an. Wenn ein Plugin, das Sie seit Jahren nutzen, plötzlich einen neuen Hauptentwickler hat und eine ungewöhnlich kleine Änderung eine große Anzahl neuer Codezeilen enthält, ist Vorsicht geboten.

**2. Changelogs genau lesen**

„Minor update" oder „Kompatibilitätsprüfung" sollten keine blinden Update-Auslöser sein. Schauen Sie sich bei wichtigen Plugins gelegentlich die tatsächlich geänderten Dateien an – auf GitHub ist das oft einfacher als direkt im Plugin-Verzeichnis.

**3. Automatische Updates selektiv einsetzen**

Automatische Updates für WordPress-Core sind in der Regel sinnvoll. Bei Plugins empfiehlt sich eine differenziertere Strategie: Kritische Sicherheits-Updates sofort, Feature-Updates nach kurzer Wartezeit und manuellem Changelog-Review.

**4. Dateiintegrität überwachen**

Plugins wie [Wordfence](https://www.wordfence.com/) oder iThemes Security können Änderungen an Plugin-Dateien erkennen und melden. Das schützt nicht nur vor externen Angriffen, sondern auch vor manipulierten Update-Inhalten.

**5. Regelmäßiges Plugin-Audit durchführen**

Entfernen Sie Plugins, die Sie nicht aktiv nutzen. Jedes inaktive Plugin ist eine potenzielle Angriffsfläche – besonders, wenn es keinen aktiven Betreiber mehr hat oder seit Monaten keine Updates erhalten hat.

**6. Staging-Umgebung für Updates nutzen**

Testen Sie Updates zunächst in einer Kopie Ihrer Website, bevor Sie sie live schalten. Das kostet etwas Zeit, schützt aber vor Situationen wie dieser, in der ein Update selbst der Angriff ist.

## Was dieser Fall über das WordPress-Ökosystem verrät

Das WordPress-Plugin-Verzeichnis basiert auf einem kollektiven Vertrauenssystem. WordPress.org prüft Plugins beim erstmaligen Einreichen, aber nicht jede einzelne Code-Änderung in jedem späteren Update. Das ist bei über 60.000 Plugins und tausenden von Updates täglich schlicht nicht leistbar.

Das Flippa-Marketplatz-Modell für Plugin-Portfolios existiert schon lange und ermöglicht Plugin-Entwicklern, ihre Arbeit zu monetarisieren. In den meisten Fällen ist das unkritisch. Der vorliegende Fall zeigt jedoch, dass Käufer mit schlechten Absichten dieses System gezielt ausnutzen können – und dass Flippa selbst den Verkauf zunächst sogar als Erfolgsgeschichte präsentiert hatte, bevor der Angriff aufflog.

WordPress.org hat nach diesem Vorfall angekündigt, die Überprüfung von Eigentumsübertragungen bei Plugins zu verschärfen. Details dazu sind jedoch noch rar. Für Betreiber von WordPress-Websites bleibt das Fazit klar: Die Verantwortung für die Sicherheit liegt letztlich immer auch beim Betreiber selbst.

## Fazit: Vertrauen ist kein Sicherheitskonzept

Der Essential-Plugin-Angriff ist ein Lehrstück darüber, dass im digitalen Bereich Vertrauen kein statisches Gut ist. Ein Plugin, dem Sie fünf Jahre lang zu Recht vertraut haben, kann nach einem Eigentümerwechsel binnen Monaten zur Waffe gegen Ihre eigene Website werden.

Für kleine Unternehmen und Selbstständige, die keine eigene IT-Abteilung haben, ist es schwer, all diese Entwicklungen im Blick zu behalten. Als [WordPress-Agentur Frankfurt am Main](/) unterstützen wir Unternehmen dabei, ihre WordPress-Websites nicht nur technisch sauber aufzusetzen, sondern auch langfristig sicher zu betreiben – von regelmäßigen Plugin-Audits bis zur Einrichtung von Monitoring-Systemen, die solche Angriffe frühzeitig sichtbar machen.

## Quellen

- [30+ WordPress plugins bought on Flippa and backdoored in supply chain attack](https://thenextweb.com/news/wordpress-plugins-backdoor-supply-chain-essential-plugin-flippa-2) — r/wordpress
- [Attacker Bought 30 WordPress Plugins on Flippa and Backdoored All of Them](https://www.infoq.com/news/2026/05/wordpress-plugins-supply-chain/) — r/wordpress
- [Flippa Promoted the Plugin Portfolio Sale as a Success Story. It Was a Supply Chain Attack.](https://webhosting.today/2026/04/17/flippa-promoted-the-plugin-portfolio-sale-as-a-success-story-it-was-a-supply-chain-attack/) — r/wordpress

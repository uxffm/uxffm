---
publishDate: 2026-06-28T00:00:00Z
title: "MonsterInsights unter Angriff: Phishing, Typosquat-Domain und OAuth-Lücke bedrohen 2 Millionen WordPress-Sites"
excerpt: "Eine Phishing-Kampagne mit gefälschter CVE, eine Typosquat-Domain und CVE-2026-5371 treffen MonsterInsights – so schützen Sie Ihre WordPress-Site jetzt."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/monsterinsights-phishing-oauth-sicherheit
---

In der zweiten Juniwoche 2026 war die Website von MonsterInsights plötzlich offline – ersetzt durch eine Sicherheitswarnung an alle Nutzer. Das Unternehmen kämpfte gegen einen laufenden Angriff und bat Kunden ausdrücklich, das Plugin nicht von Drittanbieter-Websites herunterzuladen. Was dahinter steckt, ist komplexer und gefährlicher als ein einfacher Website-Ausfall: Es ist die bisher weitreichendste Sicherheitskrise rund um das Google-Analytics-Plugin mit über zwei Millionen aktiven Installationen.

## Was beim MonsterInsights-Angriff im Juni 2026 passierte

Am 12. Juni 2026 schaltete das MonsterInsights-Team die eigene Website ab und veröffentlichte eine Sicherheitswarnung. Gleichzeitig begannen registrierte Kunden, verdächtige E-Mails zu erhalten.

Die Phishing-Kampagne arbeitete mit einem klassisch professionellen Trick: Die E-Mails zitierten eine angebliche, hochkritische Sicherheitslücke – CVE-2026-1337 – und forderten Nutzer auf, ein dringendes Update herunterzuladen. Der Link in der Mail führte jedoch nicht zur echten MonsterInsights-Website, sondern zu *monsteriinsights.com* – einer Typosquat-Domain mit doppeltem „i", die die legitime Website bis ins Detail imitierte. Die Domain wurde inzwischen abgeschaltet, doch während sie aktiv war, lud jeder, der dem Link vertraute und das vermeintliche Update installierte, Schadsoftware auf seinen WordPress-Server.

Besonders tückisch: Viele der Phishing-E-Mails wurden von Spam-Filtern abgefangen. Das führte dazu, dass manche Nutzer die Warnung im Junk-Ordner übersahen – und das vermeintliche Update im regulären Posteingang für legitim hielten, weil es dort nicht auftauchte. Die CVE-2026-1337 existiert übrigens nicht. Es handelte sich um eine erfundene Kennung, die ausschließlich dazu diente, Dringlichkeit zu erzeugen.

## CVE-2026-5371: Die echte Sicherheitslücke im Plugin

Neben der Phishing-Kampagne existiert auch eine handfeste, technisch verifizierte Sicherheitslücke im MonsterInsights-Plugin: CVE-2026-5371 mit einem CVSS-Score von 7.1 – „high severity".

Das Problem liegt in fehlenden Zugriffskontrollen auf zwei interne Funktionen des Plugins: `get_ads_access_token()` und `reset_experience()`. Diese Funktionen prüfen nicht, ob der aufrufende WordPress-Nutzer die nötige Berechtigung besitzt. Das Ergebnis: Jeder authentifizierte Angreifer mit einem einfachen Subscriber-Konto kann live Google-OAuth-Tokens aus der Datenbank abrufen und gleichzeitig alle Google-Ads-Integrationen zurücksetzen.

Was das in der Praxis bedeutet, ist gravierend: Ein Google-OAuth-Bearer-Token ist eine portable Anmeldeinformation. Es kann außerhalb von WordPress direkt gegen Google-APIs verwendet werden – solange es nicht abläuft oder manuell widerrufen wird. Ein Angreifer mit einem gestohlenen Token hat potenziell Lesezugriff auf Ihre Analytics-Daten und kann die Verbindung zwischen Ihrem WordPress und Google kappen.

Die niedrige Einstiegsschwelle ist das eigentlich Beunruhigende: Subscriber ist die niedrigste WordPress-Benutzerrolle – die Stufe, auf der sich Kommentatoren oder einfache Registrierungen befinden. Auf einer Site, die Nutzerregistrierung erlaubt – etwa einem WooCommerce-Shop, einem Mitgliederportal oder einem News-Blog –, reicht eine einfache Anmeldung aus, um den Angriff auszuführen. Die Schwachstelle wurde in Version 10.1.3 geschlossen.

## Teil eines größeren Angriffs auf Awesome Motive

MonsterInsights ist kein isolierter Einzelfall. Das Plugin gehört zum Portfolio von Awesome Motive, einem der größten Anbieter von WordPress-Plugins weltweit – und dieses Unternehmen befindet sich seit Wochen im Visier koordinierter Angriffe.

Bereits Mitte Juni hatte ein CDN-Supply-Chain-Angriff auf Awesome Motive die Plugins OptinMonster, TrustPulse und PushEngage getroffen und schadhafte JavaScript-Payloads in über 1,2 Millionen WordPress-Sites eingeschleust. Wenige Tage darauf bestätigte Uncanny Automator – ebenfalls ein Awesome-Motive-Produkt – dass Kundendaten bei einem Einbruch gestohlen wurden.

Das Muster ist eindeutig: Angreifer haben das gesamte Produktökosystem eines Unternehmens als Angriffsfläche identifiziert und gehen systematisch vor. Wer mehrere Awesome-Motive-Plugins betreibt – und das ist aufgrund ihrer Verbreitung bei vielen WordPress-Sites der Fall –, sollte alle Produkte sofort auditieren und nicht nur das auffälligste Problem adressieren.

## Was Sie jetzt konkret tun müssen

**MonsterInsights auf Version 10.1.3 oder höher aktualisieren**

Navigieren Sie in Ihrem WordPress-Dashboard zu *Plugins → Installierte Plugins* und suchen Sie nach MonsterInsights. Falls eine Version ≤ 10.1.2 installiert ist, führen Sie sofort ein Update durch. Das Patch-Release schließt CVE-2026-5371 vollständig.

**Google-OAuth-Token widerrufen und neu verbinden**

Loggen Sie sich in Ihrem [Google-Konto unter myaccount.google.com](https://myaccount.google.com/security) ein, navigieren Sie zu *Sicherheit → Apps mit Zugriff auf Ihr Konto* und entziehen Sie MonsterInsights alle Berechtigungen. Verbinden Sie das Plugin danach in WordPress neu – so stellen Sie sicher, dass potenziell kompromittierte Tokens nicht mehr gültig sind.

**WordPress-Nutzerrollen prüfen**

Da für CVE-2026-5371 ein Subscriber-Konto ausreicht, sollten Sie unter *Benutzer → Alle Benutzer* alle registrierten Konten sichten und unbekannte oder inaktive Nutzer entfernen. Wenn Ihre Site keine Benutzerregistrierung benötigt, deaktivieren Sie diese unter *Einstellungen → Allgemein* durch Entfernen des Häkchens bei „Jeder kann sich registrieren".

**Phishing-Muster für die Zukunft kennen**

MonsterInsights und andere seriöse Plugin-Anbieter fordern Sie niemals per E-Mail auf, ein Update über einen direkten Downloadlink zu installieren. Der sichere Weg ist immer der WordPress-Dashboard-Updater oder die direkte Suche auf [wordpress.org/plugins](https://wordpress.org/plugins). Prüfen Sie bei jeder sicherheitsbezogenen E-Mail den genauen Absender und fahren Sie mit der Maus über Links, bevor Sie klicken – eine abweichende Domain fällt dabei sofort auf.

**Sicherheits-Scan durchführen**

Plugins wie [Wordfence](https://www.wordfence.com) oder Patchstack können Ihre WordPress-Installation auf bekannte Schwachstellen und schädliche Dateien prüfen. Ein Scan nach einem Sicherheitsvorfall dieser Art ist keine Überreaktion – er ist Standardvorgehen.

## Was der MonsterInsights-Vorfall über die aktuelle Bedrohungslage lehrt

Dieser Fall ist lehrreich, weil er zeigt, wie moderne WordPress-Angriffe konstruiert sind. Die Kombination aus einer echten, technisch verifizierten Schwachstelle (CVE-2026-5371), einer zeitlich koordinierten Phishing-Kampagne und einer täuschend echten Typosquat-Domain ist kein Zufall. Angreifer nutzen legitime Sicherheitslücken als Glaubwürdigkeitsanker für Social-Engineering-Angriffe.

Das bedeutet: Wer seine WordPress-Site als „sicher genug" betrachtet, weil er ein Security-Plugin installiert hat, unterschätzt das Problem. Echte Sicherheit ist ein Prozess, keine Einmalmaßnahme. Er umfasst regelmäßige Updates, minimale Nutzerrechte nach dem Least-Privilege-Prinzip, kritisches Lesen von E-Mails, die Dringlichkeit signalisieren, und die Bereitschaft, nach einem Vorfall strukturiert zu reagieren.

Als WordPress-Experten aus Frankfurt helfen wir kleinen und mittelständischen Unternehmen dabei, ihre WordPress-Installationen dauerhaft sicher zu halten – von der initialen Härtung über Zugriffskontrollen bis zum laufenden Plugin-Monitoring. Wenn Sie unsicher sind, ob Ihre Website betroffen ist oder Unterstützung bei der Absicherung benötigen, sprechen Sie uns gerne an.

## Quellen

- [MonsterInsights Website Compromised And Sending Phishing Emails](https://www.searchenginejournal.com/monsterinsights-website-compromised-and-sending-phishing-emails/579140/) — Search Engine Journal
- [Awesome Motive Breach Widens as Uncanny Automator Confirms Customer Data Theft](https://www.therepository.email/awesome-motive-breach-widens-as-uncanny-automator-confirms-customer-data-theft-monsterinsights-users-hit-with-phishing-campaign) — The Repository
- [MonsterInsights CVE-2026-5371: High-Severity Plugin Vulnerability](https://www.webmastered.com/blog/monsterinsights-oauth-token-vulnerability/) — Webmastered

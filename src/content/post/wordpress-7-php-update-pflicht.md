---
publishDate: 2026-05-25T00:00:00Z
title: "WordPress 7.0: PHP 7.4 ist jetzt Pflicht – handeln Sie jetzt"
excerpt: "WordPress 7.0 erhöht die PHP-Mindestanforderung auf 7.4. Sites auf älteren PHP-Versionen erhalten kein Update – und riskieren Sicherheitslücken."
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-7-php-update-pflicht
---

Mit dem Release von WordPress 7.0 am 20. Mai 2026 hat die Community eine klare Grenze gezogen: PHP 7.2 und PHP 7.3 werden nicht mehr unterstützt. Wer seine Website noch auf einer dieser veralteten PHP-Versionen betreibt, erhält das WordPress-7.0-Update schlicht nicht angeboten und bleibt auf dem 6.9-Sicherheitszweig — ohne neue Features, aber mit wachsendem Risiko. Für viele Betreiber kleiner und mittelständischer Websites ist jetzt Handlungsbedarf angesagt.

## Warum WordPress PHP 7.4 als Mindestversion setzt

Die Entscheidung, PHP 7.2 und 7.3 zu streichen, ist keine Überraschung. Beide Versionen haben ihr offizielles End-of-Life längst hinter sich: PHP 7.2 wurde bereits im November 2020 eingestellt, PHP 7.3 im Dezember 2021. Wer heute noch auf diesen Versionen läuft, betreibt seinen Webserver mit bekannten, ungepatchten Sicherheitslücken — ohne je einen Fix dafür zu erhalten.

Das WordPress-Core-Team begründet den Schritt mit zwei Hauptargumenten: Zum einen ermöglicht PHP 7.4 moderne Sprachfeatures wie Typed Properties und Arrow Functions, die der Core für neue Funktionen wie das integrierte KI-SDK benötigt. Zum anderen schützt die Mindestversionsanhebung die gesamte WordPress-Ökosystem-Gemeinschaft: Wenn Hosting-Anbieter und Plugin-Entwickler wissen, dass PHP 7.4 vorausgesetzt wird, können sie veralteten Kompatibilitätscode endlich streichen und sicherere, schlankere Software ausliefern.

Die offizielle Ankündigung des Core-Teams finden Sie auf [make.wordpress.org](https://make.wordpress.org/core/2026/01/09/dropping-support-for-php-7-2-and-7-3/) — dort wird auch erläutert, wie der Entscheidungsprozess verlief und welche Übergangsfrist für Hosting-Anbieter vorgesehen war.

## Was passiert mit Sites, die kein Update erhalten?

Sites auf PHP 7.2 oder 7.3 bleiben auf WordPress 6.9 stecken. Das klingt zunächst harmlos, ist es aber nicht. Der 6.9-Sicherheitszweig erhält zwar weiterhin Security-Patches — jedoch nur so lange, wie das Core-Team diese auch pflegt. Sobald der Fokus vollständig auf 7.0 und folgende Versionen wechselt, werden auch diese Patches seltener und irgendwann ganz eingestellt.

Noch problematischer: Plugin- und Theme-Entwickler richten ihre Kompatibilitätstests ab sofort auf PHP 7.4+ aus. Wer auf 7.2 bleibt, riskiert zunehmend, dass beliebte Plugins ihre Unterstützung für ältere PHP-Versionen still und leise einstellen — oder schlimmer, dass Updates Funktionen einführen, die auf alten Servern zu fatalen Fehlern führen.

## Welche Plugins sind besonders gefährdet?

Die Umstellung auf PHP 7.4 und darüber hinaus auf PHP 8.x ist für gut gepflegte, aktive Plugins kein Problem. Gefährdet sind dagegen vor allem drei Kategorien:

**Ältere kommerzielle Plugins** mit kleinen Entwicklerteams, die selten Updates veröffentlichen, nutzen häufig Codebases, die seit Jahren nicht auf moderne PHP-Standards aktualisiert wurden.

**Nischen-Add-ons** für spezifische Branchen oder Workflows wurden oft von einem einzelnen Entwickler geschrieben und seit Jahren nicht mehr angefasst. Diese Plugins arbeiten mitunter noch mit Funktionen, die in PHP 8.2 als deprecated markiert und in PHP 8.4 vollständig entfernt wurden — etwa bestimmte mbstring-Funktionen für die Zeichenkodierung.

**Benutzerdefinierte Plugins und Themes**, die von früheren Agenturen entwickelt wurden, ohne dass ein Wartungsvertrag besteht. Hier fehlt oft schlicht jemand, der sich um Updates kümmert.

Bevor Sie Ihren Server auf PHP 7.4 oder höher aktualisieren, empfiehlt sich ein Kompatibilitätscheck. Tools wie der [PHP Compatibility Checker](https://wordpress.org/plugins/php-compatibility-checker/) aus dem offiziellen Plugin-Verzeichnis scannen Ihre installierten Plugins und Themes und zeigen konkret an, wo Anpassungen nötig sind.

## So prüfen Sie Ihre aktuelle PHP-Version

Den einfachsten Überblick liefert das WordPress-Dashboard selbst: Unter **Tools → Site Health** zeigt WordPress im Tab **Info** die aktuell verwendete PHP-Version an. Zusätzlich sehen Sie dort, ob Ihre Version als „empfohlen", „akzeptabel" oder „veraltet" eingestuft wird.

Alternativ bieten die meisten Hosting-Panels — ob cPanel, Plesk oder das Dashboard eines Managed-WordPress-Anbieters — eine direkte Auswahl der PHP-Version pro Domain. Ein Blick in diese Einstellungen genügt in der Regel.

Wer sichergehen möchte, kann auch eine einfache `phpinfo.php`-Datei temporär in das Webroot-Verzeichnis legen. Da diese Datei jedoch sensible Serverinformationen offenlegt, sollte sie unmittelbar nach dem Check wieder gelöscht werden.

## Der sichere Upgrade-Pfad: Schritt für Schritt

Ein unkontrollierter Sprung von PHP 7.2 direkt auf 8.3 kann zur Katastrophe führen, wenn zwischendurch nicht getestet wird. Empfehlenswert ist ein stufenweises Vorgehen:

1. **Staging-Umgebung aufsetzen**: Erstellen Sie eine Kopie Ihrer Website auf einer Test-Umgebung. Viele Managed-WordPress-Hoster bieten One-Click-Staging an.
2. **Kompatibilitätsscan durchführen**: Führen Sie den PHP Compatibility Checker auf der Staging-Umgebung aus und notieren Sie alle Warnungen.
3. **PHP auf 7.4 anheben und testen**: Wechseln Sie zunächst auf PHP 7.4 und prüfen Sie alle wichtigen Seitentypen, Formulare, Shop-Funktionen und Admin-Bereiche.
4. **Schrittweise auf PHP 8.x aktualisieren**: Wenn 7.4 stabil läuft, können Sie denselben Prozess für PHP 8.1 oder 8.3 wiederholen — die aktuelle Empfehlung des WordPress-Teams ist PHP 8.1 oder 8.3 für optimale Performance und Sicherheit.
5. **Plugins und Themes aktualisieren**: Bringen Sie alle Erweiterungen auf den neuesten Stand, bevor Sie die PHP-Version in der Produktionsumgebung wechseln.
6. **Produktionsumgebung umstellen**: Erst wenn Staging grünes Licht zeigt, übertragen Sie die Änderungen auf Ihre Live-Site.

## PHP 8.x: Lohnt sich der direkte Sprung?

Wenn Sie ohnehin migrieren, sollten Sie ernsthaft überlegen, nicht bei PHP 7.4 stehen zu bleiben, sondern direkt auf PHP 8.1 oder 8.3 zu wechseln. Neuere PHP-Versionen bringen teils erhebliche Performance-Gewinne: PHP 8.0 führte den JIT-Compiler ein, PHP 8.1 brachte Fibers für asynchronen Code, und PHP 8.3 optimierte viele interne Datenstrukturen.

In der Praxis bedeutet das messbar kürzere Ladezeiten, besonders für datenbanklastige Seiten wie WooCommerce-Shops oder Membership-Sites. Der [offiziellen Kompatibilitätstabelle von WordPress](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/) können Sie entnehmen, welche PHP-Versionen mit welchen WordPress-Releases getestet und freigegeben wurden.

WordPress 7.4 selbst wird voraussichtlich PHP 8.2 als Mindestversion voraussetzen — wer heute schon auf 8.1 oder 8.3 wechselt, ist also auch für die nächsten ein bis zwei Hauptversionen gut aufgestellt.

## Was Hosting-Anbieter jetzt tun sollten

Für Agenturen und Entwickler, die mehrere Kundenprojekte betreuen, ist die Situation noch komplexer. Viele Shared-Hosting-Umgebungen laufen standardmäßig noch auf älteren PHP-Versionen, wenn der Kunde die Einstellungen nie angefasst hat. Hier lohnt es sich, systematisch alle verwalteten Sites zu inventarisieren und Kunden proaktiv auf den Upgrade-Bedarf hinzuweisen.

Einige Hosting-Anbieter haben angekündigt, veraltete PHP-Versionen bis Ende 2026 zwangsweise zu deaktivieren. Wer nicht aktiv wird, riskiert also nicht nur fehlende WordPress-Updates, sondern auch einen ungeplanten Serverausfall.

## Frankfurt Marketing Studio hilft beim PHP-Upgrade

Die PHP-Versionsanhebung in WordPress 7.0 ist technisch lösbar — aber sie erfordert Sorgfalt, die richtigen Werkzeuge und Zeit, die viele Website-Betreiber nicht haben. Als WordPress Agentur Frankfurt am Main begleiten wir Unternehmen durch genau diesen Prozess: von der Bestandsaufnahme über den Staging-Test bis hin zur sicheren Migration auf PHP 8.x und WordPress 7.0.

Wenn Sie nicht sicher sind, auf welcher PHP-Version Ihre Website läuft, oder wenn Sie befürchten, dass ein Update Ihre Plugin-Landschaft destabilisieren könnte — sprechen Sie uns an. Ein kurzes Audit zeigt schnell, wo Sie stehen und was zu tun ist.

## Quellen

- [Dropping PHP 7.2 and 7.3 support – Make WordPress Core](https://make.wordpress.org/core/2026/01/09/dropping-support-for-php-7-2-and-7-3/) — wordpress.org
- [WordPress 7.0 ships: PHP 7.4 required, AI built-in](https://webhosting.today/2026/05/20/wordpress-7-0-ships-php-7-4-required-ai-built-in-real-time-collaboration-delayed/) — webhosting.today
- [PHP Compatibility and WordPress Versions](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/) — make.wordpress.org

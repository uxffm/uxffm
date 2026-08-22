---
publishDate: 2026-08-22T00:00:00Z
title: "WordPress 7.1: Hover-Effekte ohne CSS – so nutzen Sie interaktive Zustände"
excerpt: "Mit WordPress 7.1 lassen sich Hover- und Fokus-Effekte erstmals direkt im Editor einstellen – ohne eine Zeile CSS. Was das konkret bedeutet und wie Sie die Funktion optimal einsetzen."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-interaktive-zustaende-hover
---

Mit WordPress 7.1 „Mary Lou" hat das Core-Team eines der meistgewünschten Editor-Features endlich umgesetzt: Interaktive Zustände. Was sich etwas technisch anhört, ist in der Praxis eine erhebliche Vereinfachung — denn Sie können ab sofort festlegen, wie Buttons und Navigationslinks beim Darüberfahren, beim Fokussieren per Tastatur oder beim Klicken aussehen, und zwar direkt im Block-Editor, ohne eine einzige Zeile CSS zu schreiben. In der WordPress-Community ist das Thema seit dem Release am 19. August eine der meistdiskutierten Neuerungen, und das aus gutem Grund.

## Was sind interaktive Zustände in WordPress 7.1?

CSS kennt seit Jahrzehnten sogenannte Pseudoklassen wie `:hover`, `:focus` oder `:active`. Sie beschreiben den Zustand eines Elements in einem bestimmten Moment — wenn die Maus darüberfährt, wenn das Element per Tastatur fokussiert wird oder wenn ein Klick stattfindet. Bisher war es in WordPress nicht möglich, diese Zustände direkt im Editor zu steuern. Wer einen Button haben wollte, der sich beim Hovern blau einfärbt, musste entweder eigenes CSS im Customizer hinterlegen, einen Page Builder mit entsprechenden Optionen nutzen oder ein Child-Theme anlegen.

WordPress 7.1 ändert das grundlegend. Im Einstellungsbereich eines Buttons oder Navigationslinks finden Sie nun zusätzliche Tabs für die Zustände „Standard", „Hover", „Fokus" und „Aktiv". Für jeden Zustand lassen sich separat einstellen:

- Hintergrundfarbe
- Textfarbe
- Rahmenfarbe und -dicke
- Rahmenradius (abgerundete Ecken)

Das klingt überschaubar, deckt aber den weitaus größten Teil der Anwendungsfälle ab, die Websitebetreiber in der Praxis benötigen.

## Welche Blöcke werden unterstützt?

Zum Launch von WordPress 7.1 unterstützen zwei Blocktypen interaktive Zustände: der **Button-Block** und der **Navigations-Block**. Das ist bewusst konservativ gewählt — das Core-Team hat die Feature-Entwicklung so strukturiert, dass die Implementierung zunächst an stabilen, weit verbreiteten Blöcken validiert wird, bevor sie auf weitere Typen ausgeweitet wird. Für WordPress 7.2 ist geplant, auch Links im Paragraph-Block sowie Bild-Blöcke mit Verlinkung zu unterstützen.

Für die meisten Unternehmenswebsites sind Button und Navigation die entscheidenden Stellen, an denen Hover-Feedback wirklich gebraucht wird. Insofern ist der Start sinnvoll priorisiert.

## Wie richten Sie interaktive Zustände ein?

Die Einrichtung ist bewusst niederschwellig gestaltet. Gehen Sie so vor:

1. Öffnen Sie den Site Editor über **Darstellung → Editor** oder die Werkzeuge des Themes.
2. Klicken Sie auf einen Button-Block oder ein Navigationselement auf Ihrer Seite.
3. Im Einstellungsbereich rechts erscheinen die gewohnten Optionen — zusätzlich sehen Sie jetzt einen Bereich **„Zustände"** (englisch: „States").
4. Wechseln Sie mit einem Klick zu „Hover". Alle Farbfelder und Rahmenoptionen zeigen jetzt an, wie das Element beim Darüberfahren aussieht.
5. Passen Sie die Werte an Ihr Design an. Die Änderungen werden im Editor-Vorschaumodus sofort sichtbar, wenn Sie mit der Maus über das Element fahren.
6. Speichern Sie das Template oder die Seite wie gewohnt.

WordPress speichert die Zustandsdefinitionen direkt in den Block-Attributen. Es wird kein zusätzliches CSS erzeugt — der Browser rendert die Zustände aus den gespeicherten Definitionen. Das macht die Lösung sauberer und wartungsfreundlicher als nachträglich eingefügtes Custom-CSS.

## Interaktive Zustände in theme.json

Für Theme-Entwickler und Agenturen, die maßgeschneiderte WordPress-Themes bauen, gibt es eine weitere wichtige Neuerung: Interaktive Zustände lassen sich auch direkt in der [`theme.json`-Konfiguration](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/) definieren. Das ist besonders hilfreich, wenn Sie konsistente Hover-Farben site-wide festlegen möchten, die Redakteure nicht einzeln pro Block überschreiben sollen.

Ein vereinfachtes Beispiel, wie Hover-Farben für Buttons in `theme.json` definiert werden:

```json
{
  "styles": {
    "blocks": {
      "core/button": {
        "interactivity": {
          "hover": {
            "color": {
              "background": "#005fcc",
              "text": "#ffffff"
            }
          }
        }
      }
    }
  }
}
```

Die genaue Syntax ist in der [offiziellen Block-Editor-Dokumentation](https://developer.wordpress.org/block-editor/) dokumentiert und wird sich mit WordPress 7.2 noch weiterentwickeln. Wer eigene Themes baut, sollte die Release-Notes der kommenden Monate im Blick behalten.

## Was bedeutet das für bestehende CSS-Anpassungen?

Wenn Sie in der Vergangenheit eigenes CSS für Hover-Effekte hinzugefügt haben, müssen Sie das nicht zwingend entfernen. WordPress 7.1 lässt beides nebeneinander bestehen — Zustände, die im Editor definiert sind, und Zustände, die über Custom-CSS gesetzt werden. Wichtig zu wissen: Custom-CSS hat im Regelfall eine höhere CSS-Spezifizität als Block-Attribute, das heißt, Ihr bisheriges CSS hat Vorrang.

Wenn Sie die neuen visuellen Zustandsdefinitionen verwenden möchten, empfehlen wir, bestehendes Hover-CSS zu entfernen, um Konflikte zu vermeiden. Lassen Sie sich von Ihrem WordPress-Dienstleister zeigen, an welchen Stellen im Stylesheet Hover-Definitionen gesetzt sind — das kann je nach Themenalter und Anpassungstiefe einige Stellen betreffen.

## Performance-Auswirkungen: Gibt es welche?

Eine berechtigte Frage aus der Community: Verlangsamt das neue Feature die Seite? Die Antwort ist ein klares Nein. WordPress 7.1 erzeugt für die interaktiven Zustände kein JavaScript und kein zusätzliches Stylesheet. Die Zustandsdefinitionen werden als Inline-CSS direkt in das HTML-Markup eingebettet, ähnlich wie Block-spezifische Stile heute bereits gehandhabt werden. Der Performance-Overhead ist minimal.

Für Core-Web-Vitals-Werte wie LCP oder CLS gibt es keine negativen Auswirkungen. Wer hohe Google-PageSpeed-Werte hat, muss nichts befürchten.

## Einschränkungen, die Sie kennen sollten

Keine neue Funktion kommt ohne Grenzen. Was in WordPress 7.1 noch nicht möglich ist:

**Kein Transition/Animation-Support.** Wenn Sie möchten, dass der Hover-Effekt weich übergeht (fade, slide), brauchen Sie weiterhin CSS mit `transition`-Eigenschaft. Das ist im Editor nicht steuerbar und bleibt vorerst Custom-CSS-Territorium.

**Keine eigenen Zustände.** Sie können nur die vordefinierten Zustände `:hover`, `:focus` und `:active` anpassen — keine eigenen Pseudoklassen oder JavaScript-Zustände.

**Begrenzte Block-Unterstützung.** Wie beschrieben: Nur Button und Navigation in Version 7.1. Für alle anderen Blöcke gilt weiterhin Custom-CSS.

**Theme-Kompatibilität.** Nicht alle bestehenden Themes sind so gebaut, dass sie die neuen Zustandsdefinitionen korrekt aufnehmen. Block-Themes (basierend auf `theme.json`) sind kompatibel. Klassische Themes mit PHP-Templates können mit den neuen Einstellungen unter Umständen nicht korrekt interagieren.

## Sinnvoller Einsatz im Alltag

Für wen ist das Feature besonders nützlich? Vor allem für Websitebetreiber, die ihre Seite selbst pflegen und bisher für jeden Hover-Effekt einen Entwickler bemühen mussten. Und für Unternehmen, die ihren Redakteuren mehr gestalterische Kontrolle geben möchten, ohne dass dabei Fehler im Custom-CSS entstehen.

Konkrete Anwendungsfälle:

- **Call-to-Action-Buttons:** Hauptaktionen auf Landing Pages werden durch einen deutlichen Hover-Effekt besser sichtbar — das verbessert die Klickrate messbar.
- **Navigationselemente:** Klare visuelle Rückmeldung beim Hovern verbessert die Nutzerführung, besonders auf mobilen Geräten mit Stylus oder Trackpad.
- **Barrierefreiheit:** Sichtbare Fokus-Zustände (`:focus`) sind eine Anforderung der WCAG 2.2-Richtlinien für barrierefreie Websites. Das war bisher schwer umzusetzen; nun lässt es sich direkt im Editor konfigurieren.

## Unser Fazit

Interaktive Zustände in WordPress 7.1 sind ein durchdachtes, gut umgesetztes Feature, das eine echte Lücke schließt. Die Beschränkung auf Button und Navigation zum Start ist pragmatisch — lieber zwei Blöcke solide als zehn halbgar. Wir erwarten, dass das Feature in WordPress 7.2 und 7.3 deutlich ausgebaut wird, und empfehlen, bestehende Custom-CSS-Lösungen für Hover-Effekte mittelfristig auf die neuen Block-Einstellungen umzustellen.

Wenn Sie Ihre WordPress-Website auf 7.1 aktualisieren möchten oder Unterstützung beim sauberen Übergang von Custom-CSS zu den neuen Editor-Features benötigen, stehen wir Ihnen gerne zur Verfügung. [Sprechen Sie uns an](https://frankfurtmarketingstudio.de/kontakt) — wir begleiten Sie durch den Prozess, von der Staging-Prüfung bis zur finalen Implementierung.

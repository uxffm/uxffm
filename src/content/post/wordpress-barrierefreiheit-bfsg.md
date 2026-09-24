---
publishDate: 2026-09-24T00:00:00Z
title: "WordPress-Barrierefreiheit 2026: BFSG, WCAG 2.2 und was Sie jetzt konkret tun müssen"
excerpt: "Seit Juni 2025 gilt das BFSG für neue Websites. Viele WordPress-Betreiber sind noch nicht konform. Was die Pflichten bedeuten und welche Maßnahmen wirklich helfen."
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: https://frankfurtmarketingstudio.de/wordpress-barrierefreiheit-bfsg
---

Das Barrierefreiheitsstärkungsgesetz (BFSG) ist seit dem 28. Juni 2025 in Kraft – und trotzdem sind in der WordPress-Community auf r/wordpress Diskussionen über Compliance, technische Umsetzung und konkrete Pflichten noch immer ein täglich wiederkehrendes Thema. Zu Recht: Viele Unternehmen haben die Deadline verpasst oder wissen nicht genau, was von ihrer WordPress-Website erwartet wird. Dieser Artikel gibt einen praxisnahen Überblick – ohne Rechtsschwulst, aber mit konkreten Handlungsempfehlungen für WordPress-Betreiber in Frankfurt und ganz Deutschland.

## Was das BFSG von Ihrer Website verlangt

Das BFSG setzt die EU-Richtlinie über die Barrierefreiheitsanforderungen für Produkte und Dienstleistungen (European Accessibility Act, EAA) in deutsches Recht um. Es verpflichtet Unternehmen, die Verbrauchern digitale Produkte oder Dienstleistungen anbieten, zur Einhaltung technischer Barrierefreiheitsstandards.

Die technische Grundlage bildet der [WCAG 2.1 Level AA](https://www.w3.org/TR/WCAG21/)-Standard des W3C. Dieser definiert über 50 Erfolgskriterien in vier Kategorien: **Wahrnehmbar**, **Bedienbar**, **Verständlich** und **Robust**. In Deutschland gilt zusätzlich der europäische Standard EN 301 549, der WCAG 2.1 AA als verbindliche Anforderung beinhaltet.

Konkret bedeutet das für Ihre WordPress-Website:

- **Alternativtexte** für alle nicht-dekorativen Bilder
- **Tastaturbedienbarkeit** aller interaktiver Elemente (Navigation, Formulare, Buttons, Modals)
- **Ausreichende Farbkontraste** (mindestens 4,5:1 für normalen Text)
- **Klar erkennbare Fokus-Indikatoren** für alle fokussierbaren Elemente
- **Formular-Labels und Fehlermeldungen**, die von Screenreadern erfasst werden
- **Videountertitel** für alle aufgezeichneten Audioinhalte
- **Skalierbarkeit des Textes** bis 200 % ohne Verlust von Inhalt oder Funktionalität

Kleine Unternehmen mit weniger als zehn Beschäftigten und einem Jahresumsatz unter zwei Millionen Euro sind von bestimmten Anforderungen ausgenommen – aber diese Ausnahme greift enger als viele annehmen. Wer online Produkte oder Dienstleistungen verkauft, fällt in der Regel unter das Gesetz, unabhängig von der Unternehmensgröße.

## Warum WordPress-Websites besondere Herausforderungen haben

WordPress ist die meistgenutzte CMS-Plattform der Welt – und gleichzeitig eine der herausforderndsten, wenn es um Barrierefreiheit geht. Das liegt an mehreren strukturellen Faktoren.

**Themes und Page Builder sind das größte Problem.** Die meisten kommerziellen WordPress-Themes wurden nicht mit Barrierefreiheit im Fokus entwickelt. Typische Mängel: fehlende Fokus-Ringe (weil sie optisch stören), Farbkontraste, die auf Designvorlagen optimiert sind statt auf Lesbarkeit, und Navigationsmenüs, die per Tastatur nicht vollständig bedienbar sind. Page Builder wie Elementor, Divi oder Beaver Builder fügen oft eigene Markup-Strukturen ein, die semantisch inkorrekt sind – zum Beispiel verschachtelte `<div>`-Elemente statt logischer Heading-Hierarchien.

**Plugins fügen barrierefreie Inhalte und inbarrierefreie Komponenten gleichzeitig hinzu.** Ein Kontaktformular-Plugin kann technisch korrekte Labels verwenden und trotzdem Fehlermeldungen produzieren, die für Screenreader unsichtbar sind. Cookie-Banner – in Deutschland sowieso ein Pflichtthema – verstoßen regelmäßig gegen Barrierefreiheitsanforderungen: keine Fokus-Falle bei Modals, kein korrekt gesetztes `aria-modal`, kein programmatisches Fokus-Management.

**Dynamische Inhalte und JavaScript-Interaktionen** fehlt oft die korrekte ARIA-Implementierung. Das gilt für Sliders, Akkordeons, Tabs und Modal-Dialoge gleichermaßen. Die WordPress Interactivity API, die seit Version 6.2 eingeführt wurde, erleichtert die barrierefreie Implementierung – wenn Entwickler sie korrekt einsetzen.

## Wie Sie den aktuellen Zustand Ihrer Website prüfen

Bevor Sie Maßnahmen einleiten, brauchen Sie eine ehrliche Bestandsaufnahme. Automatisierte Tools sind ein guter Einstieg, aber kein vollständiger Ersatz für manuelle Prüfungen.

**Automatisierte Prüfwerkzeuge:**

- [axe DevTools](https://www.deque.com/axe/) als Browser-Extension (kostenlose Version prüft die wichtigsten WCAG-Verstöße)
- Google Lighthouse im Chrome DevTools unter dem Reiter „Barrierefreiheit" (Score 0–100, aber Achtung: ein Wert von 100 schließt manuelle Fehler nicht aus)
- WAVE (Web Accessibility Evaluation Tool) von WebAIM als Browser-Extension

**Was automatisierte Tools nicht finden:**

- Ob Alternativtexte inhaltlich korrekt sind (sie erkennen nur fehlende `alt`-Attribute)
- Ob Formulare logisch strukturiert und für Screenreader bedienbar sind
- Ob die Tastaturnavigation auf der gesamten Seite ohne Maus sinnvoll möglich ist
- Ob ARIA-Attribute korrekt eingesetzt werden

Für eine ernsthafte Prüfung empfiehlt sich eine manuelle Prüfung mit der Tastatur (Tab, Shift+Tab, Enter, Escape, Pfeiltasten) sowie ein Test mit einem Screenreader – NVDA ist kostenlos für Windows, VoiceOver ist in macOS integriert.

## Die häufigsten Verstöße auf WordPress-Seiten und wie Sie sie beheben

Aus der Praxis zeigt sich, dass die meisten WordPress-Websites an denselben Punkten scheitern. Hier sind die häufigsten Mängel und konkrete Lösungen:

### 1. Fehlende oder nichtssagende Alternativtexte

**Problem:** Bilder haben kein `alt`-Attribut oder es ist leer, oder der Alternativtext ist generisch ("Bild1.jpg", "Foto des Teams").

**Lösung:** Im WordPress-Medienmanager ist für jedes hochgeladene Bild ein Alternativtext hinterlegbar. Dekorative Bilder (rein visuelle Elemente ohne Informationswert) erhalten ein leeres `alt=""`-Attribut, damit Screenreader sie überspringen. Funktionale Bilder (Buttons, Icons) brauchen beschreibende Texte. Alle neuen Uploads sollten mit einer redaktionellen Richtlinie für Alt-Texte begleitet werden.

### 2. Unzureichende Farbkontraste

**Problem:** Graue Schrift auf weißem Hintergrund, helle Texte auf Farbflächen, deaktivierte Formularfelder ohne sichtbare Abgrenzung.

**Lösung:** Testen Sie Ihre Farbkombinationen mit dem [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Fließtext benötigt ein Kontrastverhältnis von mindestens 4,5:1, große Schrift (über 18pt oder 14pt fett) mindestens 3:1. Theme-Anpassungen lassen sich in WordPress über `theme.json` oder Custom CSS steuern.

### 3. Fehlende sichtbare Fokus-Indikatoren

**Problem:** Viele Themes entfernen den Standard-Browser-Fokus-Ring per `outline: none` oder `outline: 0` für alle Elemente, weil er optisch unerwünscht ist.

**Lösung:** Entfernen Sie diese CSS-Regel oder ersetzen Sie sie durch einen custom Fokus-Indikator, der sichtbar genug ist. WCAG 2.2 (und WCAG 2.1) verlangt einen sichtbaren Fokus-Indikator für alle fokussierbaren Elemente. Minimalbeispiel in CSS:

```css
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

Die `:focus-visible`-Pseudo-Klasse sorgt dafür, dass der Indikator nur bei Tastaturnavigation sichtbar ist, nicht beim Klicken mit der Maus.

### 4. Formulare ohne korrekte Labels

**Problem:** Platzhaltertexte (`placeholder`) werden als Ersatz für `<label>`-Elemente verwendet. Screenreader verlieren den Label-Kontext, sobald der Nutzer mit der Eingabe beginnt.

**Lösung:** Jedes Formularfeld braucht ein explizites `<label>`-Element, das per `for`-Attribut mit dem Feld verknüpft ist. Pflichtfelder sollten per `aria-required="true"` oder das HTML-Attribut `required` markiert sein. Fehlermeldungen nach der Validierung müssen programmatisch mit dem betreffenden Feld verknüpft sein – üblicherweise über `aria-describedby`.

### 5. Nicht-semantische Heading-Hierarchien

**Problem:** Der Seiteninhalt hat H1, H3, H5-Elemente ohne H2 und H4 dazwischen, weil die Überschriften per CSS-Klassen aus optischen Gründen formatiert werden statt per semantisch korrekter Ebene.

**Lösung:** Verwenden Sie Headings nach ihrer semantischen Bedeutung in der Seitenstruktur, nicht nach gewünschter visueller Größe. Wenn ein H3 optisch kleiner aussehen soll als ein H4, formatieren Sie es per CSS – aber ändern Sie nicht das semantische Heading-Level. Im Gutenberg-Editor ist die Heading-Ebene direkt im Block einstellbar.

## Welche WordPress-Plugins bei der Barrierefreiheit helfen

Es gibt keine Silberkugel – ein einziges Plugin kann keine vollständige WCAG-Konformität herstellen. Trotzdem gibt es Werkzeuge, die nützlich sind:

- **WP Accessibility** von Joe Dolson: Behebt häufige WordPress-spezifische Probleme automatisch, z. B. fehlende `lang`-Attribute, Skip-Links und Fokus-Management bei Themes.
- **Accessible Fonts**: Stellt sicher, dass Schriftarten-Einbindungen nicht zu Performance-Problemen führen, die Tastaturnavigation beeinträchtigen.
- **One Click Accessibility**: Ein einfaches Plugin für Basis-Korrekturen, das aber keine strukturellen Theme-Probleme löst.

Overlays wie UserWay oder accessiBe, die per KI automatisch Barrierefreiheit "reparieren" sollen, sind in der Accessibility-Community stark umstritten. Sie können bestimmte automatisch erkennbare Probleme beheben, lösen aber keine strukturellen Fehler und haben in der Vergangenheit selbst neue Barrieren eingeführt. Für rechtliche Compliance reichen sie nicht aus.

## Barrierefreiheit als kontinuierlicher Prozess, nicht als einmaliges Projekt

Der häufigste Fehler bei der BFSG-Compliance: Unternehmen betrachten Barrierefreiheit als einmalige Prüfung und Reparatur. Tatsächlich entsteht bei jeder Inhaltspflege, jedem Plugin-Update und jeder Theme-Änderung die Möglichkeit, neue Barrieren einzuführen.

Nachhaltige Barrierefreiheit auf WordPress-Websites erfordert:

1. **Redaktionelle Schulung**: Wer Inhalte einpflegt, muss wissen, wie Alt-Texte, Heading-Hierarchien und Tabellen korrekt eingesetzt werden.
2. **Deployment-Checks**: Vor jedem größeren Update oder Launch sollte eine automatisierte axe-Prüfung als Teil des Workflows laufen.
3. **Theme- und Plugin-Auswahl**: Barrierefreiheit als Kriterium bei der Evaluation neuer Themes und Plugins einbeziehen. Das WPORG-Verzeichnis kennzeichnet zunehmend Plugins mit Barrierefreiheits-Angaben.
4. **Zugänglichkeitserklärung**: Das BFSG verlangt eine öffentliche Zugänglichkeitserklärung, die den Stand der Konformität dokumentiert. Diese kann über das [EU Monitoring Framework](https://www.bfit-bund.de/) erstellt werden.

Barrierefreiheit ist kein Sonderthema für Behörden-Websites – sie betrifft Unternehmen in Frankfurt, die online tätig sind, genauso. Wer jetzt die strukturellen Grundlagen legt, vermeidet nicht nur rechtliches Risiko, sondern profitiert auch von besserer Suchmaschinenoptimierung, erhöhter Nutzbarkeit auf Mobilgeräten und einem Qualitätssignal gegenüber Kunden und Partnern.

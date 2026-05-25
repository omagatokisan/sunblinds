# Nasazení SunBlinds na sun.coolgui.cz (Webglobe FTP)

Tento balíček je **statický export** webu — HTML, CSS, JS, obrázky a PHP skripty pro formuláře.
Nevyžaduje Node.js na hostingu.

---

## 1. Co je uvnitř ZIP

Po rozbalení uvidíte např.:

```
index.html
404.html
reseni/
kontakt/
images/
_next/
api/
  contact.php
  inquiry.php
  reviews.php
  config.php
search-index.json
.htaccess
NAVOD-WEBGLOBE.md
```

- **Stránky** — kompletní katalog produktů a veřejné sekce
- **Formuláře** — kontakt, poptávka, recenze (odesílání e-mailem přes PHP)
- **Vyhledávání** — funguje lokálně ze souboru `search-index.json`
- **Admin `/admin`** — v tomto režimu **nefunguje** (vyžaduje Node.js server)

---

## 2. Příprava subdomény ve Webglobe

1. Přihlaste se do **Zákaznického centra Webglobe**.
2. Otevřete hosting u domény **coolgui.cz**.
3. V sekci **Subdomény** ověřte, že existuje **sun.coolgui.cz**.
4. Zapněte **HTTPS (Let's Encrypt)** pro subdoménu `sun.coolgui.cz`.
5. Poznamenejte si **FTP přístupy** a **kořenovou složku** subdomény (typicky něco jako):
   - `www/subdomény/sun/` nebo
   - `www/sun.coolgui.cz/` nebo
   - `public_html/sun/`

Do této složky nahrajete **obsah ZIP** (ne celou složku `out`, ale soubory přímo do kořene).

---

## 3. Nahrání přes FTP

### FileZilla (doporučeno)

1. Stáhněte [FileZilla Client](https://filezilla-project.org/).
2. **Soubor → Správce míst** → Nové místo:
   - Protokol: **FTP** nebo **SFTP** (pokud Webglobe nabízí)
   - Hostitel: z Webglobe (např. `ftp.coolgui.cz`)
   - Uživatel / heslo: z Webglobe
3. Připojte se.
4. Vpravo přejděte do **kořene subdomény** `sun.coolgui.cz`.
5. Vlevo otevřete rozbalený ZIP.
6. Označte **všechny soubory a složky** uvnitř a přetáhněte doprava.
7. Při dotazu na přepsání starých souborů zvolte **Přepsat**.

### Důležité

- V kořeni subdomény musí ležet **`index.html`** a **`.htaccess`**
- Soubor `.htaccess` je skrytý — ve FileZille zapněte **Zobrazit skryté soubory** (Server → Vynutit zobrazení skrytých souborů)
- Nahrávání může trvat 10–30 minut podle rychlosti linky (stovky MB obrázků)

---

## 4. Nastavení e-mailů (formuláře)

Před testem formulářů upravte na FTP soubor:

**`api/config.php`**

```php
return [
    'mail_to' => 'info@sunblinds.cz',      // kam chodí poptávky
    'mail_from' => 'noreply@sun.coolgui.cz', // odesílatel (ideálně doména subdomény)
    'site_name' => 'SunBlinds — sun.coolgui.cz',
];
```

U Webglobe musí být na hostingu **aktivní PHP** a funkce `mail()` (standardně ano).
Pokud e-maily nedorazí:

- zkontrolujte složku **Spam**
- v Webglobe nastavte **e-mailovou schránku** pro doménu a použijte ji jako `mail_from`
- kontaktujte podporu Webglobe kvůli odesílání PHP mailů

---

## 5. Kontrola po nasazení

Otevřete v prohlížeči:

| URL | Co ověřit |
|-----|-----------|
| https://sun.coolgui.cz/ | Úvod, obrázky, menu |
| https://sun.coolgui.cz/reseni/ | Katalog oblastí |
| https://sun.coolgui.cz/reseni/samonosne-systemy/venkovni-stineni/rovo/ | Produktová stránka |
| https://sun.coolgui.cz/kontakt/ | Kontaktní formulář |
| https://sun.coolgui.cz/poptavka/ | Poptávka |
| Vyhledávání v hlavičce | Min. 2 znaky, výsledky produktů |

**HTTPS:** adresa musí začínat `https://` (`.htaccess` přesměruje z HTTP).

---

## 6. Aktualizace webu později

Na svém počítači v projektu `sunblinds`:

```bash
npm run build:ftp
```

Vznikne nový ZIP v `Desktop\web\`. Nahrajte přes FTP znovu (přepsat soubory).
Pokud jste mezitím měnili obsah v CMS, upravte `data/cms/content.json` **před** buildem.

---

## 7. Řešení problémů

| Problém | Řešení |
|---------|--------|
| 403 / prázdná stránka | Chybí `index.html` v kořeni subdomény |
| 404 na podstránkách | Chybí `.htaccess` nebo mod_rewrite na Apache |
| Rozbité styly | Nenačetla se složka `_next/` — nahrajte znovu celý ZIP |
| Obrázky chybí | Nahrajte složku `images/` |
| Formulář neodešle | Upravte `api/config.php`, ověřte PHP na hostingu |
| Admin nefunguje | Očekávané — admin vyžaduje Node.js hosting |

---

## 8. Technické poznámky

- Export: Next.js `output: 'export'`, `trailingSlash: true`
- Obrázky z `sunblinds.cz` se načítají z původní URL (vyžaduje internet u návštěvníků)
- Lokální vývoj bez exportu: `npm run dev` (plná funkcionalita včetně API)

Podpora Webglobe: https://www.webglobe.cz/podpora/

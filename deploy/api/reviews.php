<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';
sb_require_post();

$data = sb_json_input();
if (!$data) sb_send_json(400, ['error' => 'Neplatná data.']);

$author = sb_str($data['author'] ?? '', 120);
$text = sb_str($data['text'] ?? '', 2000);
$location = sb_str($data['location'] ?? '', 120);
$productHint = sb_str($data['productHint'] ?? '', 200);
$rating = (int)($data['rating'] ?? 0);

if (strlen($author) < 2 || strlen($text) < 10 || $rating < 1 || $rating > 5) {
    sb_send_json(400, ['error' => 'Vyplňte povinná pole.']);
}

$cfg = sb_config();
$body = "Nová recenze (čeká na schválení)\n\n";
$body .= "Autor: {$author}\n";
$body .= "Hodnocení: {$rating}/5\n";
if ($location !== '') $body .= "Místo: {$location}\n";
if ($productHint !== '') $body .= "Produkt: {$productHint}\n";
$body .= "\nText:\n{$text}\n";

if (!sb_send_mail('Recenze — ' . ($cfg['site_name'] ?? 'SunBlinds'), $body)) {
    sb_send_json(500, ['error' => 'Odeslání se nezdařilo.']);
}

sb_send_json(200, ['ok' => true]);

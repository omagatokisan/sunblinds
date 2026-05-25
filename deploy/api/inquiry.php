<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';
sb_require_post();

$data = sb_json_input();
if (!$data) sb_send_json(400, ['error' => 'Neplatná data.']);

$name = sb_str($data['name'] ?? '', 120);
$phone = sb_str($data['phone'] ?? '', 40);
$email = sb_email($data['email'] ?? '');
$location = sb_str($data['location'] ?? '', 200);
$generalNote = sb_str($data['generalNote'] ?? '', 3000);
$lines = $data['lines'] ?? [];

if (strlen($name) < 2 || strlen($phone) < 6 || !is_array($lines) || count($lines) < 1) {
    sb_send_json(400, ['error' => 'Vyplňte povinná pole.']);
}

$cfg = sb_config();
$body = "Poptávka z webu\n\n";
$body .= "Jméno: {$name}\n";
$body .= "Telefon: {$phone}\n";
if ($email !== '') $body .= "E-mail: {$email}\n";
if ($location !== '') $body .= "Lokalita: {$location}\n";
if ($generalNote !== '') $body .= "\nPoznámka:\n{$generalNote}\n";
$body .= "\n--- Položky ---\n";

foreach (array_slice($lines, 0, 20) as $i => $line) {
    if (!is_array($line)) continue;
    $n = $i + 1;
    $body .= "\n#{$n}\n";
    $body .= 'Oblast: ' . sb_str($line['solutionSlug'] ?? '', 80) . "\n";
    $body .= 'Skupina: ' . sb_str($line['groupSlug'] ?? '', 80) . "\n";
    $body .= 'Produkt: ' . sb_str($line['productSlug'] ?? '', 80) . "\n";
    $body .= 'Rozměr: ' . sb_str($line['widthMm'] ?? '', 20) . ' × ' . sb_str($line['heightMm'] ?? '', 20) . " mm\n";
    $body .= 'Ks: ' . sb_str($line['quantity'] ?? '', 10) . "\n";
    if (!empty($line['mounting'])) $body .= 'Montáž: ' . sb_str($line['mounting'], 120) . "\n";
    if (!empty($line['control'])) $body .= 'Ovládání: ' . sb_str($line['control'], 120) . "\n";
    if (!empty($line['note'])) $body .= 'Poznámka: ' . sb_str($line['note'], 500) . "\n";
}

if (!sb_send_mail('Poptávka — ' . ($cfg['site_name'] ?? 'SunBlinds'), $body)) {
    sb_send_json(500, ['error' => 'Odeslání se nezdařilo. Zkuste e-mail nebo telefon.']);
}

sb_send_json(200, ['ok' => true]);

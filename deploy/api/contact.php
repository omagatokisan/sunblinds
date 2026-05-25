<?php
declare(strict_types=1);
require __DIR__ . '/_lib.php';
sb_require_post();

$data = sb_json_input();
if (!$data) sb_send_json(400, ['error' => 'Neplatná data.']);

$name = sb_str($data['name'] ?? '', 120);
$email = sb_email($data['email'] ?? '');
$phone = sb_str($data['phone'] ?? '', 40);
$subject = sb_str($data['subject'] ?? '', 200);
$message = sb_str($data['message'] ?? '', 3000);

if (strlen($name) < 2 || !$email || strlen($message) < 10) {
    sb_send_json(400, ['error' => 'Vyplňte povinná pole.']);
}

$cfg = sb_config();
$mailSubject = ($subject !== '' ? $subject : 'Kontakt z webu') . ' — ' . ($cfg['site_name'] ?? 'SunBlinds');
$body = "Kontaktní formulář\n\n";
$body .= "Jméno: {$name}\n";
$body .= "E-mail: {$email}\n";
if ($phone !== '') $body .= "Telefon: {$phone}\n";
$body .= "\nZpráva:\n{$message}\n";

if (!sb_send_mail($mailSubject, $body)) {
    sb_send_json(500, ['error' => 'Odeslání se nezdařilo. Zkuste e-mail nebo telefon.']);
}

sb_send_json(200, ['ok' => true]);

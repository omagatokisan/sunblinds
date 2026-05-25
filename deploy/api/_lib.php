<?php
declare(strict_types=1);

function sb_config(): array {
    static $cfg = null;
    if ($cfg === null) {
        $cfg = require __DIR__ . '/config.php';
    }
    return $cfg;
}

function sb_json_input(): ?array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return null;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

function sb_send_json(int $code, array $payload): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function sb_send_mail(string $subject, string $body): bool {
    $cfg = sb_config();
    $to = $cfg['mail_to'] ?? 'info@sunblinds.cz';
    $from = $cfg['mail_from'] ?? 'noreply@localhost';
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $from,
        'Reply-To: ' . $from,
    ];
    return mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

function sb_cors(): void {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function sb_require_post(): void {
    sb_cors();
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sb_send_json(405, ['error' => 'Metoda není povolena.']);
    }
}

function sb_str($value, int $max): string {
    $s = trim((string)($value ?? ''));
    if (strlen($s) > $max) $s = substr($s, 0, $max);
    return $s;
}

function sb_email($value): string {
    $s = sb_str($value, 120);
    return filter_var($s, FILTER_VALIDATE_EMAIL) ? $s : '';
}

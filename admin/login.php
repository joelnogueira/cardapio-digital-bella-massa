<?php
header('Content-Type: application/json; charset=utf-8');
session_start();
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receber os dados do formulário
    $pin = $_POST['senha'] ?? '';
    $telefone = $_POST['telefone'] ?? '';

    // Verificar campos vazios
    if (empty($pin) || empty($telefone)) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Preencha todos os campos.']);
        exit;
    }

    // Buscar usuário pelo telefone
    $stmt = $pdo->prepare("SELECT id, senha FROM usuario WHERE telefone = ?");
    $stmt->execute([$telefone]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificar se o usuário existe e se o PIN está correto
    if ($usuario && password_verify($pin, $usuario['senha'])) {
        $_SESSION['usuario'] = $usuario['id'];
        $_SESSION['logado'] = true;
        echo json_encode(['status' => 'sucesso']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'PIN ou número incorreto.']);
    }
    exit;
}

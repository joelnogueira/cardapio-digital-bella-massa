<?php
header('Content-Type: application/json');
include 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $senhaAntiga = $_POST['senha'] ?? '';
    $senhaNova   = $_POST['senha2'] ?? '';
    $telefone   = $_POST['telefone'] ?? '';
    $idUsuario   = $_SESSION['usuario'] ?? null;

    // Verificar sessão
    if (!$idUsuario) {
        echo json_encode(['status' => 'sem_sessao']);
        exit;
    }
    // Verificar campos
    if (empty($senhaAntiga) || empty($senhaNova) || empty($telefone)) {
        echo json_encode(['status' => 'campos_vazios']);
        exit;
    }
    // Buscar senha atual no banco
    $stmt = $pdo->prepare("SELECT senha FROM usuario WHERE id = ?");
    $stmt->execute([$idUsuario]);
    $dados = $stmt->fetch();

    // Validar senha antiga
    if (!password_verify($senhaAntiga, $dados['senha'])) {
        echo json_encode(['status' => 'senha_incorreta']);
        exit;
    }
     // Gerar o hash da nova senha
    $hashNovaSenha = password_hash($senhaNova, PASSWORD_DEFAULT);
    // Atualizar senha e telefone
    $stmt = $pdo->prepare("UPDATE usuario SET senha = ? , telefone = ? WHERE id = ?");
    $stmt->execute([$hashNovaSenha, $telefone, $idUsuario]);

    echo json_encode(['status' => 'sucesso']);
    exit;
    
}

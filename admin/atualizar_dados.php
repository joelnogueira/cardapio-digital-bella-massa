<?php
header('Content-Type: application/json');
session_start();
include_once 'config.php';

// 1. Verificar se o usuário está autenticado
$id_usuario = $_SESSION['usuario'] ?? null;
if (!$id_usuario) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não autenticado."]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 2. Buscar os valores atuais do usuário antes de atualizar
    $buscar = $pdo->prepare("SELECT nome, telefone, endereco, google_maps FROM usuario WHERE id = ?");
    $buscar->execute([$id_usuario]);
    $dadosAtuais = $buscar->fetch(PDO::FETCH_ASSOC);

    if (!$dadosAtuais) {
        echo json_encode(["status" => "erro", "mensagem" => "Usuário não encontrado."]);
        exit;
    }

    // 3. Campos enviados (podem estar vazios)
    $nome = !empty($_POST['nome']) ? $_POST['nome'] : $dadosAtuais['nome'];
    $telefone = !empty($_POST['telefone']) ? $_POST['telefone'] : $dadosAtuais['telefone'];
    $endereco = !empty($_POST['endereco']) ? $_POST['endereco'] : $dadosAtuais['endereco'];
    $google_maps = !empty($_POST['map']) ? $_POST['map'] : $dadosAtuais['google_maps'];

    // 4. Verificar se telefone está sendo usado por outro usuário
    $query = $pdo->prepare("SELECT id FROM usuario WHERE telefone = ? AND id != ?");
    $query->execute([$telefone, $id_usuario]);

    if ($query->rowCount() > 0) {
        echo json_encode([
            "status" => "telefone_em_uso",
            "mensagem" => "O telefone já está em uso por outro usuário."
        ]);
        exit;
    }

    // 5. Atualizar os dados
    $update = $pdo->prepare("
        UPDATE usuario 
        SET nome = ?, telefone = ?, endereco = ?, google_maps = ?
        WHERE id = ?
    ");
    $update->execute([$nome, $telefone, $endereco, $google_maps, $id_usuario]);

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Dados atualizados com sucesso."
    ]);
    exit;
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
    exit;
}

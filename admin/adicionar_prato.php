<?php
header("Content-Type: application/json; charset=utf-8");
include_once "config.php";
session_start();

// ATIVE modo exceção (coloque no config.php idealmente)
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Verifica usuário logado
$usuarioId = $_SESSION['usuario'] ?? null;
if (!$usuarioId) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não autenticado."]);
    exit;
}

$uploadDir = '../assets/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $idPrato = $_POST['id'] ?? null; // ID do prato (se for edição)

    $nome = trim($_POST['nome'] ?? '');
    $descricao = trim($_POST['descricao'] ?? '');
    $destaque = $_POST['destaque'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $preco = $_POST['preco'] ?? '';
    $imagem = $_FILES['imagem'] ?? null;

    if (empty($nome)) {
        echo json_encode(["status" => "erro", 'mensagem' => "Campo 'Nome' é obrigatório."]);
        exit;
    }

    $caminhoBD = null;
    if ($imagem && $imagem['error'] === UPLOAD_ERR_OK && $imagem['size'] > 0) {
        if ($imagem['size'] > 2 * 1024 * 1024) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Imagem excede 2MB.']);
            exit;
        }

        $mimeTiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
        $tipoArquivo = mime_content_type($imagem['tmp_name']);
        if (!in_array($tipoArquivo, $mimeTiposPermitidos)) {
            echo json_encode(['status' => 'erro_de_imagem', 
            'mensagem' => 'Tipo de imagem inválido. Adicione (jpeg, png, jpg) ']);
            exit;
        }

        $extensao = pathinfo($imagem['name'], PATHINFO_EXTENSION);
        $nomeArquivo = 'prato_' . time() . '.' . $extensao;
        $caminhoFinal = $uploadDir . $nomeArquivo;
        $caminhoBD = 'assets/uploads/' . $nomeArquivo;

        move_uploaded_file($imagem['tmp_name'], $caminhoFinal);
    }

    // EDIÇÃO
    if (!empty($idPrato)) {
        // Verifica se o prato existe e pertence ao usuário
        $sqlVerifica = "SELECT * FROM pratos WHERE id = ? AND id_usuario = ?";
        $stmtVerifica = $pdo->prepare($sqlVerifica);
        $stmtVerifica->execute([$idPrato, $usuarioId]);

        if ($stmtVerifica->rowCount() === 0) {
            echo json_encode(["status" => "erro", "mensagem" => "Prato não encontrado ou sem permissão."]);
            exit;
        }

        $row = $stmtVerifica->fetch(PDO::FETCH_ASSOC);

        // manter imagem antiga se não enviou nova
        if (!$caminhoBD) {
            $caminhoBD = $row['imagem'];
        }

        $sqlUpdate = "UPDATE pratos SET nome = ?, descricao = ?, preco = ?, categoria = ?, destaque = ?, imagem = ? WHERE id = ? AND id_usuario = ?";
        $stmt = $pdo->prepare($sqlUpdate);
        $stmt->execute([$nome, $descricao, $preco, $categoria, $destaque, $caminhoBD, $idPrato, $usuarioId]);

        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Prato atualizado com sucesso.",
            "imagem" => $caminhoBD
        ]);
        exit;
    }

    // ADIÇÃO: verifica se já existe prato com mesmo nome **do mesmo usuário**
    $stmt = $pdo->prepare("SELECT * FROM pratos WHERE nome = ? AND id_usuario = ?");
    $stmt->execute([$nome, $usuarioId]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "erro", "mensagem" => "Este prato já está no seu menu."]);
        exit;
    }

    // Inserir incluindo id_usuario
    $stmt = $pdo->prepare("INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nome, $descricao, $preco, $categoria, $destaque, $caminhoBD, $usuarioId]);

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Prato adicionado com sucesso.",
        "imagem" => $caminhoBD
    ]);
    exit;
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Método de requisição inválido"]);
}

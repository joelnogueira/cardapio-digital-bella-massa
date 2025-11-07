<?php
header("Content-Type: application/json; charset=utf-8");

include_once "config.php";

/*session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}*/

$uploadDir = '../assets/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $idPrato = $_POST['id'] ?? null; // ID do prato (se for edição)

    $nome = $_POST['nome'] ?? '';
    $descricao = $_POST['descricao'] ?? '';
    $destaque = $_POST['destaque'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $preco = $_POST['preco'] ?? '';
    $imagem = $_FILES['imagem'] ?? null;

    // Validação obrigatória
    if (empty($nome)) {
        echo json_encode(["status" => "erro", 'mensagem' => "Campo 'Nome' é obrigatório."]);
        exit;
    }

    // Caminho da imagem no BD
    $caminhoBD = null;

    // Se o usuário enviou uma nova imagem
    if ($imagem && $imagem['error'] === UPLOAD_ERR_OK && $imagem['size'] > 0) {
        if ($imagem['size'] > 2 * 1024 * 1024) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Imagem excede 2MB.']);
            exit;
        }

        $mimeTiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
        $tipoArquivo = mime_content_type($imagem['tmp_name']);
        if (!in_array($tipoArquivo, $mimeTiposPermitidos)) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Tipo de imagem inválido.']);
            exit;
        }

        $extensao = pathinfo($imagem['name'], PATHINFO_EXTENSION);
        $nomeArquivo = 'prato_' . time() . '.' . $extensao;
        $caminhoFinal = $uploadDir . $nomeArquivo;
        $caminhoBD = 'assets/uploads/' . $nomeArquivo;

        move_uploaded_file($imagem['tmp_name'], $caminhoFinal);
    }

    // Se for EDIÇÃO (tem id do prato)
    if (!empty($idPrato)) {
        // Se for editar, atualize os dados. Verifica se o id pertence ao prato.
        $sqlVerifica = "SELECT * FROM pratos WHERE id = ? ";
        $stmtVerifica = $pdo->prepare($sqlVerifica);
        $stmtVerifica->execute([$idPrato, ]);

        if ($stmtVerifica->rowCount() === 0) {
            echo json_encode(["status" => "erro", "mensagem" => "Prato não encontrado."]);
            exit;
        }

        // Se não foi enviada nova imagem, manter a antiga
        if (!$caminhoBD) {
            $caminhoBD = $stmtVerifica->fetch()['imagem'];
        }

        $sqlUpdate = "UPDATE pratos SET nome = ?, descricao = ?, preco = ?, categoria = ?, destaque = ?, imagem = ? WHERE id = ? ";
        $stmt = $pdo->prepare($sqlUpdate);
        $stmt->execute([$nome, $descricao, $preco, $categoria, $destaque, $caminhoBD, $idPrato, ]);

        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Prato atualizado com sucesso.",
            "imagem" => $caminhoBD
        ]);
        exit;
    }

    // Caso contrário, é adição de novo contato
    // Verifica se nome já existe
    $stmt = $pdo->prepare("SELECT * FROM pratos WHERE nome = ?");
    $stmt->execute([$nome]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "erro", "mensagem" => "Este prato já está no seu menu."]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nome, $descricao, $preco, $categoria, $destaque, $caminhoBD]);

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Prato adicionado com sucesso.",
        "imagem" => $caminhoBD
    ]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Método de requisição inválido"]);
}

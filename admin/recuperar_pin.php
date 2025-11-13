<?php

header('Content-Type: application/json');
session_start();
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $telefone = $_POST['telefone'];

    // Verifica se telefone existe
    $query = $pdo->prepare("SELECT id FROM usuario WHERE telefone = ?");
    $query->execute([$telefone]);

    if ($query->rowCount() == 0) {
        echo json_encode(["status" => "numero_errado" , "mensagem" => "Telefone não cadastrado."]);
        exit;
    }

    // Gera novo PIN
    $novo_pin = rand(1000, 9999);
    $novo_pin_hash = password_hash($novo_pin, PASSWORD_DEFAULT);

    $verificarSenha = $pdo->prepare("SELECT senha FROM usuario WHERE telefone = ?");
    $verificarSenha->execute([$telefone]);
    if ($verificarSenha->rowCount() == 0){
        $inserir = $pdo->prepare("INSERT INTO usuario (senha) VALUES (?)");
        $inserir->execute([$novo_pin_hash]);
    }else{
        // Atualiza no banco
        $update = $pdo->prepare("UPDATE usuario SET senha = ? WHERE telefone = ?");
        $update->execute([$novo_pin_hash, $telefone]);

    }

    

    // Envia via WhatsApp (API gratuita via link)
    $linkWhatsapp = "https://wa.me/" . $telefone . "?text=Seu%20novo%20PIN:%20" . $novo_pin;

    echo json_encode([ "status" => "sucesso" ,
        "mensagem" => "Novo PIN gerado com sucesso.",
        "whatsapp" => $linkWhatsapp
    ]);
    exit;
}

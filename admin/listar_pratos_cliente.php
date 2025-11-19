<?php
include "config.php";



$r = $_GET['r'] ?? 0;
if (!$r) {
    echo json_encode(["error" => "Restaurante não definido"]);
    exit;
}

//categorias
$entrada = "Entrada";
$pratoPrincipal = "Prato principal";
$sobremesa = "Sobremesa";
$bebida = "Bebida";

//-------PRATOS DE ENTRADA-------
$cat_entrada = $pdo->prepare("SELECT * FROM pratos WHERE categoria = ? AND id_usuario = ? ORDER BY nome ASC");
$cat_entrada->execute([$entrada, $r]);
$dados_entrada = $cat_entrada->fetchAll(PDO::FETCH_ASSOC);

//-------PRATO PRINCIPAL-------
$cat_prato_principal = $pdo->prepare("SELECT * FROM pratos WHERE categoria = ? AND id_usuario = ? ORDER BY nome ASC");
$cat_prato_principal->execute([$pratoPrincipal, $r]);
$dados_prato_principal = $cat_prato_principal->fetchAll(PDO::FETCH_ASSOC);

//-------SOBREMESA-------
$cat_sobremesa = $pdo->prepare("SELECT * FROM pratos WHERE categoria = ? AND id_usuario = ? ORDER BY nome ASC");
$cat_sobremesa->execute([$sobremesa, $r]);
$dados_sobremesa = $cat_sobremesa->fetchAll(PDO::FETCH_ASSOC);

//-------BEBIDA-------
$cat_bebida = $pdo->prepare("SELECT * FROM pratos WHERE categoria = ? AND id_usuario = ? ORDER BY nome ASC");
$cat_bebida->execute([$bebida, $r]);
$dados_bebida = $cat_bebida->fetchAll(PDO::FETCH_ASSOC);


//------ MONTAR RESPOSTA JSON-------
$resposta=[
    'categoria_entrada' => $dados_entrada,
    'categoria_prato_principal' => $dados_prato_principal,
    'categoria_sobremesa' => $dados_sobremesa,
    'categoria_bebida' => $dados_bebida
];

//-------ENVIAR APENAS 1 JSON-------
echo json_encode($resposta);

exit;
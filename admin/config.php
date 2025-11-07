<?php

// Conectar ao banco de dados
try {
    $pdo = new PDO("mysql:host=localhost;dbname=cardapio_1", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão ao banco de dados: " . $e->getMessage());
}


// Definir o charset para UTF-8
$pdo->exec("SET NAMES 'utf8mb4'");

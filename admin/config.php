<?php

//Dados do BD para Produção
/* $pdo = new PDO("mysql:host=sql100.infinityfree.com;dbname=if0_40454552_cardapio1_bd", "if0_40454552", "tininhaa2012181"); */

// Conectar ao banco de dados
try {
    $pdo = new PDO("mysql:host=localhost;dbname=cardapio_1", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão ao banco de dados: " . $e->getMessage());
}

// Definir o charset para UTF-8
$pdo->exec("SET NAMES 'utf8mb4'");

//Configurações do site
/* define('SITE_NAME', 'Cardápio Digital');
define('BASE_URL', 'http://localhost/cardapio_digital/');
define('ADMIN_EMAIL', 'joelnogueira080@gmail.com');
define('ITEMS_PER_PAGE', 10);
define('UPLOAD_DIR', __DIR__ . '/../uploads/'); // Diretório de uploads
define('ALLOWED_FILE_TYPES', ['image/jpeg', 'image/png', 'image/gif']); // Tipos de arquivo permitidos  
define('MAX_FILE_SIZE', 2 * 1024 * 1024); // Tamanho máximo do arquivo (2MB)
define('TIMEZONE', 'America/Sao_Paulo');
date_default_timezone_set(TIMEZONE); */
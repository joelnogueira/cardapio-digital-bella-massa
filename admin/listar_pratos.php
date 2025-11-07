<?php
include "config.php";

$stmt = $pdo->query("SELECT * FROM pratos ORDER BY id DESC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

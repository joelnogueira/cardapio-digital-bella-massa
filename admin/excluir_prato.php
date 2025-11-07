<?php
include "config.php";

$id = $_GET['id'];
$stmt = $pdo->prepare("DELETE FROM pratos WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["status" => "sucesso"]);

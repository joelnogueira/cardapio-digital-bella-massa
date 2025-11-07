<?php
include "config.php";

$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM pratos WHERE id = ?");
$stmt->execute([$id]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
//echo json_encode(["status" => "sucesso"]);
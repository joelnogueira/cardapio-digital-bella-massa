<?php
include "config.php";

session_start();

if (!isset($_SESSION['usuario'])) {
    echo json_encode(["id" => null]);
    exit;
}

echo json_encode(["id" => $_SESSION['usuario']]);
exit;

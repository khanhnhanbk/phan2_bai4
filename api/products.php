<?php
// Database connection settings
require_once('connection.php');

// Retrieve products from database
$offset = $_GET['offset'];
$limit = $_GET['limit'];
$sql = "SELECT * FROM products LIMIT $offset, $limit";
$result = $conn->query($sql);

// Convert results to array
$products = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}
// Close database connection
$conn->close();

// Return products in JSON format
header('Content-Type: application/json');
echo json_encode($products);

<?php
  // Allow your HTML page to read the JSON output
  header('Content-Type: application/json');

  // Include the database connection
  require_once 'db.php';
    
  // Whitelisted tables
  $allowedTables = ['customer',
                    'deliverystock',
                    'orderdetails',
                    'orders',
                    'payment',
                    'product',
                    'purchasedetails',
                    'purchaseitem',
                    'supplier']; 

  // Fetching ALL table contents (SELECT | Keyword: GET)
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (!isset($_GET['table']) || empty($_GET['table'])) {
        echo json_encode(["status" => "error", "message" => "Missing 'table' parameter."]);
        exit;
    }

    $requestedTable = $_GET['table'];

    if (!in_array($requestedTable, $allowedTables)) {
      echo json_encode(["status" => "error", "message" => "Access denied or table does not exist."]);
      exit;   // Securely reject the request if the table isn't allowed or doesn't exist
    }

    try {
      // Using the validated variable since placeholders don't work for table names
      $sql = "SELECT * FROM `$requestedTable`"; 
      $stmt = $pdo->query($sql);
      $results = $stmt->fetchAll();
        
      echo json_encode([
        "status" => "success",
        "table" => $requestedTable,
        "data" => $results
      ]);
        
    } catch (Exception $e) {
      echo json_encode(["status" => "error", "message" => "Query failed: " . $e->getMessage()]);
    }
  }
?>
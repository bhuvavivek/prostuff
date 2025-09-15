<?php
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Redirect /prosale/summitOrderReview.html → /order-summary
if ($requestUri === '/prosale/summitOrderReview.html') {
    header("Location: /order-summary", true, 301);
    exit();
}

// 1. Redirect /prosale/stellarAddressManager.html → /address
if ($requestUri === '/prosale/stellarAddressManager.html') {
    header("Location: /address", true, 301);
    exit();
}

// 2. Redirect /ProductManager/XYZ.html → /XYZ
if (preg_match('#^/ProductManager/(\d+)\.html$#', $requestUri, $matches)) {
    $id = $matches[1];
    header("Location: /$id", true, 301);
    exit();
}

// 3. Root "/" → prosale/index.html
if ($requestUri === '/' || $requestUri === '/index.php') {
    $filePath = __DIR__ . '/prosale/index.html';

// 4. /167 → prosale/ProductManager/167.html
} elseif (preg_match('#^/(\d+)$#', $requestUri, $matches)) {
    $id = $matches[1];
    $filePath = __DIR__ . "/prosale/ProductManager/{$id}.html";

// ✅ 5. /address → prosale/stellarAddressManager.html
} elseif ($requestUri === '/address') {
    $filePath = __DIR__ . '/prosale/stellarAddressManager.html';

// ✅ 6. /order-summary → prosale/summitOrderReview.html
} elseif ($requestUri === '/order-summary'){
    $filePath = __DIR__ . '/prosale/summitOrderReview.html';
}
// 6. Fallback to direct file request
else {
    $filePath = __DIR__ . $requestUri;
}

// Serve the file if it exists
if (is_file($filePath)) {
    $extension = pathinfo($filePath, PATHINFO_EXTENSION);
    switch ($extension) {
        case 'html': header('Content-Type: text/html'); break;
        case 'css': header('Content-Type: text/css'); break;
        case 'js': header('Content-Type: application/javascript'); break;
        case 'png': header('Content-Type: image/png'); break;
        case 'jpg':
        case 'jpeg': header('Content-Type: image/jpeg'); break;
        default: header('Content-Type: text/plain');
    }

    readfile($filePath);
    exit();
}

// 404 fallback
http_response_code(404);
echo "404 Not Found";

//wrote  command to start index.php with port 300


<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    $uploadDir = 'images/';
    $fileName = basename($file['name']);
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];

    $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

    if (in_array($fileType, $allowedTypes)) {
        $newFileName = uniqid('', true) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
        $fileDestination = $uploadDir . $newFileName;

        if ($fileError === 0) {
            if (move_uploaded_file($fileTmpName, $fileDestination)) {

                echo json_encode(["status" => "success", "filePath" => $fileDestination]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to upload the file."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "There was an error with the file upload."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Unsupported file type."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No file uploaded."]);
}
?>

<?php

$directory = 'images/';
$images = glob($directory . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

$files = [];
foreach ($images as $image) {
    $files[] = basename($image);
}


echo json_encode($files);
?>

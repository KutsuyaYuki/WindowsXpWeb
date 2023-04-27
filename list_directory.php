<?php
header('Content-Type: application/json');

$dir = "./os/";

if (isset($_GET['path'])) {
    $path = realpath($_GET['path']);
    if (strpos($path, realpath($dir)) === 0 && is_dir($path) && str_starts_with(realpath($path), realpath(dirname(__FILE__) . '/os'))) {
        $dir = $path;
    }
}

$files = [];

if ($handle = opendir($dir)) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            $full_path = $dir . '/' . $file;

            if (file_exists($full_path)) {
                $size = is_dir($full_path) ? '-' : filesize($full_path);
                $date = is_dir($full_path) ? '-' : date("d-m-Y", filectime($full_path));
            } else {
                $size = "N/A";
                $date = "N/A";
            }

            $ext = pathinfo($full_path, PATHINFO_EXTENSION);

            if (is_dir($full_path)) {
                $icon = "folder-icon";
                $type = "folder";
            } elseif (in_array($ext, array("mp3", "wav", "ogg"))) {
                $icon = "audio-icon";
                $type = "file";
            } elseif (in_array($ext, array("mp4", "avi", "mkv"))) {
                $icon = "movie-icon";
                $type = "file";
            } else {
                $icon = "file-icon";
                $type = "file";
            }

            $files[] = [
                'name' => $file,
                'path' => $full_path,
                'size' => $size,
                'date' => $date,
                'icon' => $icon,
                'type' => $type
            ];
        }
    }

    closedir($handle);
}

echo json_encode($files);
?>

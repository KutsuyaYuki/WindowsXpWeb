<!DOCTYPE html>
<html>

<head>
    <title>File Browser</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            background-color: #F1F1F1;
        }

        h1 {
            font-size: 18px;
            margin-bottom: 20px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
            background-color: #FFFFFF;
        }

        th,
        td {
            padding: 2px;
            border-bottom: 1px solid #E6E6E6;
            vertical-align: middle;
            font-size: 11px;
        }

        th {
            background-color: #F0F0F0;
            border-top: 1px solid #E6E6E6;
            border-bottom: 2px solid #E6E6E6;
            font-weight: bold;
            color: #777777;
        }

        tr:hover {
            background-color: #FFFFCC;
        }

        a {
            color: #0000CC;
            text-decoration: none;
        }

        a:hover {
            color: #000099;
            text-decoration: underline;
        }

        .icon {
            width: 16px;
            height: 16px;
            display: inline-block;
            background-size: contain;
            background-repeat: no-repeat;
            margin-right: 5px;
            vertical-align: middle;
        }

        .folder-icon {
            background-image: url('images/icons/folder.png');
        }

        .file-icon {
            background-image: url('images/icons/file.png');
        }

        .audio-icon {
            background-image: url('images/icons/audio.png');
        }

        .movie-icon {
            background-image: url('images/icons/movie.png');
        }
    </style>
</head>

<body>
    <h1>File Browser</h1>

    <table>
        <thead>
            <tr>
                <th colspan="2">Name</th>
                <th>Size</th>
                <th>Creation Date</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Set the directory to be browsed
            $dir = "../files/";

            // Open the directory
            if ($handle = opendir($dir)) {

                // Loop through the directory
                while (false !== ($file = readdir($handle))) {

                    // Ignore "." and ".." directories
                    if ($file != "." && $file != "..") {

                        // Get file size and creation date if the file exists
                        if (file_exists($file)) {
                            $size = filesize($file);
                            $date = date("d-m-Y", filectime($file));
                        } else {
                            $size = "N/A";
                            $date = "N/A";
                        }

                        // Get file extension
                        $ext = pathinfo($file, PATHINFO_EXTENSION);

                        // Determine icon based on file type
                        if (is_dir($file)) {
                            $icon = "folder-icon";
                        } elseif (in_array($ext, array("mp3", "wav", "ogg"))) {
                            $icon = "audio-icon";
                        } elseif (in_array($ext, array("mp4", "avi", "mkv"))) {
                            $icon = "movie-icon";
                        } else {
                            $icon = "file-icon";
                        }

                        // Display the file name, size, and creation date in a table row with the appropriate icon
                        echo "<tr><td><span class='icon $icon'></span></td><td><a href='$file'>$file</a></td><td>$size bytes</td><td>$date</td></tr>";
                    }
                }

                // Close the directory
                closedir($handle);
            }
            ?>
        </tbody>
    </table>
</body>

</html>
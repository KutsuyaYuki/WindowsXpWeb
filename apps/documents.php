<style>
    body {
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
<script>
    function navigate<?php echo $_GET['windowId']; ?>() {
        var path = document.querySelector(`.window[data-window-id='<?php echo $_GET['windowId']; ?>'] #address-bar`).value;
        openFolder<?php echo $_GET['windowId']; ?>(path);
    }

    function openFolder<?php echo $_GET['windowId']; ?>(path) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var files = JSON.parse(xhr.responseText);
                var tbody = document.querySelector(`.window[data-window-id='<?php echo $_GET['windowId']; ?>'] table tbody`);
                console.log(tbody);
                tbody.innerHTML = '';

                files.forEach(function(file) {
                    var tr = document.createElement("tr");
                    if (file.type === 'folder') {
                        tr.innerHTML = "<td><span class='icon folder-icon'></span></td><td><a href='#' onclick='openFolder<?php echo $_GET['windowId']; ?>(\"" + file.path + "\");'>" + file.name + "</a></td><td>" + file.size + "</td><td>" + file.date + "</td>";
                    } else {
                        tr.innerHTML = "<td><span class='icon " + file.icon + "'></span></td><td><a href='" + file.path + "'>" + file.name + "</a></td><td>" + file.size + " bytes</td><td>" + file.date + "</td>";
                    }
                    tbody.append(tr);
                });

                console.log(tbody);

                // Update the address bar with the new path
                document.querySelector(`.window[data-window-id='<?php echo $_GET['windowId']; ?>'] #address-bar`).value = path;
            }
        };

        xhr.open("GET", "list_directory.php?path=" + encodeURIComponent(path), true);
        xhr.send();
    }

    // Load the initial directory when the page loads
    $(document).ready(() => {
        var initialPath = document.querySelector(`.window[data-window-id='<?php echo $_GET['windowId']; ?>'] #address-bar`).value;
        openFolder<?php echo $_GET['windowId']; ?>(initialPath);
    });
</script>
<h1>File Browser</h1>
<div>
    <button onclick="window.history.back();">Back</button>
    <button onclick="window.history.forward();">Forward</button>
    <input type="text" id="address-bar" value="" style="width: 70%;">
    <button onclick="navigate<?php echo $_GET['windowId']; ?>();">Go</button>
</div>

<table>
    <thead>
        <tr>
            <th colspan="2">Name</th>
            <th>Size</th>
            <th>Creation Date</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
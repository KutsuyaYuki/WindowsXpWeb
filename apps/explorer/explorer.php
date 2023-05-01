<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Explorer</title>
    <link rel="stylesheet" type="text/css" href="apps/explorer/styles/explorer.css">
</head>

<body>
    <script>
        function navigate<?php echo $_GET['windowId']; ?>() {
            var path = document.querySelector(`.window[data-window-id='<?php echo $_GET['windowId']; ?>'] #address-bar`).value;
            openFolder<?php echo $_GET['windowId']; ?>(path);
        }

        var pathHistory = [];
        var historyIndex = -1;
        var currentPath = 'os/';

        function goBack<?php echo $_GET['windowId']; ?>() {
            if (historyIndex > 0) {
                historyIndex--;
                var previousPath = pathHistory[historyIndex];
                currentPath = previousPath;
                openFolder<?php echo $_GET['windowId']; ?>(currentPath, false);
            }
        }

        function goForward<?php echo $_GET['windowId']; ?>() {
            if (historyIndex < pathHistory.length - 1) {
                historyIndex++;
                var nextPath = pathHistory[historyIndex];
                currentPath = nextPath;
                openFolder<?php echo $_GET['windowId']; ?>(currentPath, false);
            }
        }

        function openFolder<?php echo $_GET['windowId']; ?>(path, updateHistory = true) {
            if (updateHistory) {
                if (historyIndex < pathHistory.length - 1) {
                    pathHistory = pathHistory.slice(0, historyIndex + 1);
                }
                pathHistory.push(path);
                historyIndex++;
            }

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
    <div class="explorer_navigation">
        <div onclick="goBack<?php echo $_GET['windowId']; ?>();" class="explorer_back_button"><img src="./images/icons/back.png" /></div>
        <div onclick="goForward<?php echo $_GET['windowId']; ?>();" class="explorer_forward_button"><img src="./images/icons/forward.png" /></div>
        <div class="explorer_address_bar">
            <input type="text" id="address-bar" value="">
        </div>
        <div class="explorer_go_button" onclick="navigate<?php echo $_GET['windowId']; ?>();"><img src="./images/icons/go.png" /> Go
        </div>
    </div>
    <div class="file-table">
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
    </div>
</body>

</html>
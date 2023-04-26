<!DOCTYPE html>
<html>

<head>
    <title>Draggable Windows Example</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
    <script src="script.js"></script>
</head>

<body>
<div class="window">
        <div class="title-bar">Window 1</div>
        <div class="menu-bar">
            <div class="menu-item">File
                <div class="sub-menu">
                    <div class="sub-menu-item">Exit</div>
                </div>
            </div>
            <div class="menu-item">Edit</div>
            <div class="menu-item">View</div>
            <div class="menu-item">Help</div>
        </div>
        <div class="content">This is the content of window 1.</div>
        <div class="drag-handle"></div>
        <div class="close-button">X</div>
    </div>

    <div class="window" style="margin-left: 500px;">
        <div class="title-bar">Window 2</div>
        <div class="menu-bar">
            <div class="menu-item">File
                <div class="sub-menu">
                    <div class="sub-menu-item">Exit</div>
                </div>
            </div>
            <div class="menu-item">Edit</div>
            <div class="menu-item">View</div>
            <div class="menu-item">Help</div>
        </div>
        <div class="content">This is the content of window 2.</div>
        <div class="drag-handle"></div>
        <div class="close-button">X</div>
    </div>

    <div class="taskbar">
        <div class="start-button">
            Start
            <div class="start-menu">
                <div class="start-menu-header">
                    <div class="start-menu-header-left">
                        <span>Start</span>
                    </div>
                    <div class="start-menu-header-right">
                    </div>
                </div>
                <div class="start-menu-body">
                    <div class="start-menu-group-right">
                        <button class="start-menu-button">My Documents</button>
                        <button class="start-menu-button">My Pictures</button>
                        <button class="start-menu-button">My Music</button>
                        <button class="start-menu-button">My Computer</button>
                        <button class="start-menu-button">Control Panel</button>
                    </div>
                    <div class="start-menu-group-left">
                        <div class="start-menu-group-item">Calculator</div>
                        <div class="start-menu-group-item">Notepad</div>
                    </div>
                    <div class="start-menu-group">
                        <div class="start-menu-group-item">System Information</div>
                    </div>
                </div>
                <div class="start-menu-footer">
                    <button class="start-menu-button">Log Off...</button>
                    <button class="start-menu-button">Shut Down...</button>
                </div>
            </div>
        </div>
        <div class="clock" id="current-time"></div>
    </div>
</body>

</html>
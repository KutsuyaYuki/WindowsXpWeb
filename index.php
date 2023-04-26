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

    <div class="window" style="margin: 32px; width: 350px" data-window-id="initial-window">
        <div class="title-bar">
            <div class="title-bar-text">
                Very important message!
            </div>

            <div class="title-bar-controls">
                <button class="minimize-button" aria-label="Minimize"></button>
                <button class="maximize-button" aria-label="Maximize"></button>
                <button class="close-button" aria-label="Close"></button>
            </div>
        </div>
        <div class="window-body">
            <div style="display: flex; align-items:center;">
                <img style="width: 25px; height: 25px;" src="//i.imgur.com/rJnYQnG.png" alt="">
                <p>　Cats are evil, but cute</p>
            </div>
            <section class="field-row" style="justify-content: flex-end">
                <button aria-label="OK">OK</button>
            </section>
        </div>
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
                        <div class="start-menu-group-right-items">
                            <button class="start-menu-button start-menu-item">
                                <p>Documents</p>
                            </button>
                            <button class="start-menu-button start-menu-item">
                                <p>My Pictures</p>
                            </button>
                            <button class="start-menu-button">
                                <p>My Music</p>
                            </button>
                            <button class="start-menu-button">
                                <p>My Computer</p>
                            </button>
                            <button class="start-menu-button">
                                <p>Control Panel</p>
                            </button>
                        </div>
                    </div>
                    <div class="start-menu-group-left">
                        <div class="start-menu-group-item">
                            <div class="start-menu-group-left-items">
                                <button class="start-menu-button-left">
                                    <p>Calculator</p>
                                </button>
                            </div>
                            <div class="start-menu-group-left-items">
                                <button class="start-menu-button-left">
                                    <p>Notepad</p>
                                </button>
                            </div>
                            <div class="start-menu-group-left-items">
                                <button class="start-menu-button-left">
                                    <p>All programs</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="start-menu-footer">
                    <!-- <button class="start-menu-button button-logoff">
                        <p>Log Off...</p>
                    </button>
                    <button class="start-menu-button button-shutdown">
                        <p>Shut Down...</p>
                    </button> -->
                </div>
            </div>
        </div>
        <div class="open-windows-list"></div>
    </div>
    <div class="clock" id="current-time"></div>
</body>

</html>
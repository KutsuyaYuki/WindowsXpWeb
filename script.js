$(function () {
  let maxZIndex = 9999;
  let startMenuOpen = false;

  initialize();

  function initialize() {
    registerInitialWindow();
    makeAllWindowsDraggable();
    toggleMenuBar();

    $(document).on("mousedown", ".window", handleWindowMouseDown);
    $(document).on("click", ".open-window-entry", handleOpenWindowEntryClick);
    $(document).on("click", ".minimize-button", handleMinimizeButtonClick);
    $(document).on("click", ".close-button", handleCloseButtonClick);
    $(".start-button").click(handleStartButtonClick);
    $(document).on("click", ".show-explorer", handleShowExplorerButtonClick);
    $(document).on("click", ".show-desktop", handleShowDesktopButtonClick);
    $(document).on("click", ".window button[aria-label='OK']", handleCloseButtonClick);
    $(".start-menu-item p").click(handleStartMenuItemClick);
    $(".sub-menu-item:contains('Exit')").click(handleExitSubMenuItemClick);
    $(document).keyup(handleEscapeKeyPress);

    updateTime();
    setInterval(updateTime, 1000);
  }

  function registerInitialWindow() {
    let initialWindowTitle = $('.window[data-window-id="initial-window"] .title-bar-text').text();
    let initialWindowEntry = $('<div class="open-window-entry" data-window-id="initial-window">' + initialWindowTitle + '</div>');
    $(".open-windows-list").append(initialWindowEntry);
  }

  function handleWindowMouseDown() {
    maxZIndex += 2;

    $(this).css("zIndex", maxZIndex - 1);
    $(".menu-bar").css("zIndex", maxZIndex);
    console.log("Window dragged");
    $(".window").removeClass("active-window");
    $(this).addClass("active-window");

    const windowId = $(this).data("window-id");
    updateTaskbar(windowId);
  }

  function makeAllWindowsDraggable() {
    $(".window").each(function () {
      makeWindowDraggable($(this));
      let zIndex = parseInt($(this).css("zIndex"));
      if (zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
  }

  function makeWindowDraggable(windowElement) {
    windowElement.draggable({
      snap: true,
      handle: ".title-bar",
      cancel: ".minimize-button, .maximize-button, .close-button",
      start: function () {
        maxZIndex++;
        $(this).css("zIndex", maxZIndex);
      }
    });
    windowElement.click(function () {
      maxZIndex++;
      $(this).css("zIndex", maxZIndex);
    });
  }

  function toggleMenuBar() {
    if ($(".window:visible").length > 0) {
      $(".menu-bar").show();
    } else {
      $(".menu-bar").hide();
    }
    $("#current-time").show(); // Always show the clock
  }

  function handleOpenWindowEntryClick() {
    let windowId = $(this).data("window-id");
    let windowElement = $(".window[data-window-id='" + windowId + "']");

    if (windowElement.is(":hidden")) {
      windowElement.css("display", "block");

      maxZIndex += 2;
      windowElement.css("zIndex", maxZIndex - 1);
      $(".menu-bar").css("zIndex", maxZIndex);
    } else {
      windowElement.hide();
    }
  }

  function handleMinimizeButtonClick() {
    const windowElement = $(this).closest(".window");
    windowElement.hide();
    toggleMenuBar();
  }

  function handleCloseButtonClick() {
    const windowElement = $(this).closest(".window");
    const windowId = windowElement.data("window-id");
    windowElement.remove();
    $(".open-window-entry[data-window-id='" + windowId + "']").remove();
    toggleMenuBar();
  }

  function handleStartButtonClick() {
    startMenuOpen = !startMenuOpen;
    if (startMenuOpen) {
      $(".start-menu").show();
    } else {
      $(".start-menu").hide();
    }
  }

  function handleShowExplorerButtonClick() {
    let explorerWindow = $(".window[data-window-id='explorer-window']");
    if (explorerWindow.length === 0) {
      let windowId = 'window' + Date.now();
      createNewWindow(windowId, "Explorer", "<p>Explorer window content here</p>");
    } else {
      explorerWindow.show();
    }
  }

  function handleShowDesktopButtonClick() {
    let allWindows = $(".window");
    let hiddenWindows = allWindows.filter(":hidden");

    if (hiddenWindows.length === allWindows.length) {
      // All windows are hidden, show them
      allWindows.show();
    } else {
      // At least one window is visible, hide all windows
      allWindows.hide();
    }
  }

  function handleStartMenuItemClick() {
    let title = $(this).text();
    let extensions = ['html', 'php', 'txt'];
    let basePath = 'apps/' + title.toLowerCase();
    let contentFound = false;

    function tryLoadContent(index) {
      if (index >= extensions.length) {
        console.error('Failed to load content for ' + title);
        return;
      }

      let windowId = 'window' + Date.now();
      let contentUrl = basePath + '.' + extensions[index] + '?windowId=' + windowId;

      $.ajax({
        url: contentUrl,
        dataType: 'html',
        success: function (content) {
          if (contentFound) return;

          contentFound = true;
          buttons = null;

          createNewWindow(windowId, title, content, buttons);

        },
        error: function () {
          if (!contentFound) {
            tryLoadContent(index + 1);
          }
        },
      });
    }

    tryLoadContent(0);

    $(".start-menu").hide();
    startMenuOpen = false;
  }

  function handleExitSubMenuItemClick() {
    $(".window").hide();
    $(".menu-bar").hide();
    $(".start-menu").hide();
    startMenuOpen = false;
  }

  function handleEscapeKeyPress(e) {
    if (e.keyCode == 27) {
      $(".start-menu").hide();
      startMenuOpen = false;
    }
  }

  function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
    $("#current-time").text(formattedTime);
  }

  function updateTaskbar(windowId) {
    $(".open-window-entry").removeClass("active-window-entry");
    $(".open-window-entry[data-window-id='" + windowId + "']").addClass("active-window-entry");
  }

  function createTaskbarEntry(title, windowId) {
    let taskbarEntry = $('<div class="open-window-entry" data-window-id="' + windowId + '">' + title + '</div>');
    $(".open-windows-list").append(taskbarEntry);
  }

  function createNewWindow(windowId, title, content, buttons) {
    // You can define the contents and structure of the new Explorer window here.
    // This is just a sample structure, modify it to fit your needs.
    const explorerWindow = $(`<div class="window" data-window-id="${windowId}">
      <div class="title-bar">
        <div class="title-bar-text">${title}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize" class="minimize-button"></button>
          <button aria-label="Maximize" class="maximize-button"></button>
          <button aria-label="Close" class="close-button"></button>
        </div>
      </div>
      <div class="window-body">
      ${content}
      <section class="field-row" style="justify-content: flex-end">
        <button aria-label="OK">OK</button>
      </section>
      </div>
    </div>`);

    $("body").append(explorerWindow);
    makeWindowDraggable(explorerWindow);
    createTaskbarEntry(title, windowId);

    const newWindow = $(`.window[data-window-id='${windowId}']`);

    // Calculate the position for the new window
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const newWindowWidth = newWindow.outerWidth();
    const newWindowHeight = newWindow.outerHeight();
    const left = (windowWidth - newWindowWidth) / 2;
    const top = (windowHeight - newWindowHeight) / 2;

    // Position the new window in the center
    newWindow.css({ top: top, left: left }).resizable();

  }
});

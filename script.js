$(function () {
  // Set initial variables
  let maxZIndex = 9999;
  let startMenuOpen = false;

  $(document).ready(function () {
    // Register the initial window in the taskbar
    let initialWindowTitle = $('.window[data-window-id="initial-window"] .title-bar-text').text();
    let initialWindowEntry = $('<div class="open-window-entry" data-window-id="initial-window">' + initialWindowTitle + '</div>');
    $(".open-windows-list").append(initialWindowEntry);
  });


  // Handle window click and drag events
  $(document).on("mousedown", ".window", function () {
    maxZIndex += 2;

    $(this).css("zIndex", maxZIndex - 1);
    $(".menu-bar").css("zIndex", maxZIndex);
    console.log("Window dragged");
    $(".window").removeClass("active-window");
    $(this).addClass("active-window");

    const windowId = $(this).data("window-id");
    updateTaskbar(windowId);
  });

  // Function to make a window draggable
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


  // Initialize draggable windows
  $(".window").each(function () {
    makeWindowDraggable($(this));
    let zIndex = parseInt($(this).css("zIndex"));
    if (zIndex > maxZIndex) {
      maxZIndex = zIndex;
    }
  });

  // Initialize menu bar
  toggleMenuBar();


  // Handle open window entry click (taskbar entry click)
  $(document).on("click", ".open-window-entry", function () {
    let windowId = $(this).data("window-id");
    let windowElement = $(".window[data-window-id='" + windowId + "']");

    // Check if the window is hidden (minimized)
    if (windowElement.is(":hidden")) {
      // Show the window if it's minimized
      windowElement.css("display", "block");

      maxZIndex += 2;
      windowElement.css("zIndex", maxZIndex - 1);
      $(".menu-bar").css("zIndex", maxZIndex);
    } else {
      // Minimize the window if it's visible
      windowElement.hide();
    }
  });

  // Handle minimize button click
  $(document).on("click", ".minimize-button", function () {
    let windowElement = $(this).closest(".window");
    windowElement.css("visibility", "hidden");
  });

  // Handle close button click
  $(document).on("click", ".close-button", function () {
    let windowElement = $(this).closest(".window");
    let windowId = windowElement.data("window-id"); // Retrieve the window ID from the data attribute
    windowElement.hide();
    toggleMenuBar();

    // Remove the entry from the open windows list using the unique window ID
    $(".open-window-entry[data-window-id='" + windowId + "']").remove();
  });

  // Handle start button click
  $(".start-button").click(function () {
    if (!startMenuOpen) {
      $(".start-menu").css({ bottom: "30px" }).show();
      startMenuOpen = true;
    } else {
      $(".start-menu").hide();
      startMenuOpen = false;
    }
  });

  // Toggle all windows function
  function toggleAllWindows() {
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

  function openExplorerWindow() {
    let windowId = 'window-' + Date.now();
    const explorerWindow = `
  <div class="window" style="width: 350px" data-window-id="${windowId}">
      <div class="title-bar">
          <div class="title-bar-text">
              Explorer
          </div>
          <div class="title-bar-controls">
              <button class="minimize-button" aria-label="Minimize"></button>
              <button class="maximize-button" aria-label="Maximize"></button>
              <button class="close-button" aria-label="Close"></button>
          </div>
      </div>
      <div class="window-body">
          <p>Explorer window content goes here.</p>
      </div>
  </div>`;
    $("body").append(explorerWindow);

    // Calculate the position for the new window
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const explorerWindowWidth = $(".window:last").outerWidth();
    const explorerWindowHeight = $(".window:last").outerHeight();
    const left = (windowWidth - explorerWindowWidth) / 2;
    const top = (windowHeight - explorerWindowHeight) / 2;

    // Position the new window in the center
    $(".window:last").css({ top: top, left: left }).draggable({ handle: ".title-bar" }).resizable();

    createTaskbarEntry("Explorer", windowId);
  }

  // Handle show explorer button click
  $(document).on("click", ".show-explorer", function () {
    openExplorerWindow();
  });


  // Handle show desktop button click
  $(document).on("click", ".show-desktop", function () {
    toggleAllWindows();
  });


  function createWindow(title) {
    let windowId = 'window-' + Date.now();
    let extensions = ['html', 'php', 'txt'];
    let basePath = 'apps/' + title.toLowerCase();
    let contentFound = false;

    function tryLoadContent(index) {
      if (index >= extensions.length) {
        console.error('Failed to load content for ' + title);
        return;
      }

      let contentUrl = basePath + '.' + extensions[index];

      $.ajax({
        url: contentUrl,
        dataType: 'html',
        success: function (content) {
          if (contentFound) return;

          contentFound = true;
          let newWindow = $('<div class="window" style="margin: 32px; width: 350px" data-window-id="' + windowId + '">' +
            '<div class="title-bar">' +
            '<div class="title-bar-text">' + title + '</div>' +
            '<div class="title-bar-controls">' +
            '<button class="minimize-button" aria-label="Minimize"></button>' +
            '<button class="maximize-button" aria-label="Maximize"></button>' +
            '<button class="close-button" aria-label="Close"></button>' +
            '</div>' +
            '</div>' +
            '<div class="window-body">' +
            '<div style="display: flex; align-items:center;">' + content + '</div>' +
            '<section class="field-row" style="justify-content: flex-end">' +
            '<button aria-label="OK">OK</button>' +
            '</section>' +
            '</div>' +
            '</div>');

          $('body').append(newWindow);

          makeWindowDraggable(newWindow);
          maxZIndex++;
          newWindow.css("zIndex", maxZIndex);
          toggleMenuBar();

          // Calculate the position for the new window
          const windowWidth = $(window).width();
          const windowHeight = $(window).height();
          const explorerWindowWidth = $(".window:last").outerWidth();
          const explorerWindowHeight = $(".window:last").outerHeight();
          const left = (windowWidth - explorerWindowWidth) / 2;
          const top = (windowHeight - explorerWindowHeight) / 2;

          // Position the new window in the center
          $(".window:last").css({ top: top, left: left }).draggable({ handle: ".title-bar" }).resizable();

          createTaskbarEntry(title, windowId);

        },
        error: function () {
          if (!contentFound) {
            tryLoadContent(index + 1);
          }
        },
      });
    }

    tryLoadContent(0);
  }

  // Handle OK button click
  $(document).on("click", ".window button[aria-label='OK']", function () {
    let windowElement = $(this).closest(".window");
    let windowId = windowElement.data("window-id");
    windowElement.hide();
    toggleMenuBar();

    // Remove the entry from the open windows list using the unique window ID
    $(".open-window-entry[data-window-id='" + windowId + "']").remove();
  });

  // Handle start menu item click
  $(".start-menu-item p").click(function () {
    let title = $(this).text();
    createWindow(title);
  });

  // Handle exit submenu item click
  $(".sub-menu-item:contains('Exit')").click(function () {
    let visibleWindows = $(".window").filter(":visible");
    if (visibleWindows.length > 0) {
      let topZIndex = -1;
      let topWindow = null;
      visibleWindows.each(function () {
        let zIndex = parseInt($(this).css("zIndex"));
        if (zIndex > topZIndex) {
          topZIndex = zIndex;
          topWindow = $(this);
        }
      });
      topWindow.hide();
      toggleMenuBar();
    }
  });

  // Handle escape key press
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      let visibleWindows = $(".window").filter(":visible");
      if (visibleWindows.length > 0) {
        let topZIndex = -1;
        let topWindow = null;
        visibleWindows.each(function () {
          let zIndex = parseInt($(this).css("zIndex"));
          if (zIndex > topZIndex) {
            topZIndex = zIndex;
            topWindow = $(this);
          }
        });
        let windowId = topWindow.data("window-id"); // Retrieve the window ID from the data attribute
        topWindow.hide();
        toggleMenuBar();

        // Remove the entry from the open windows list using the unique window ID
        $(".open-window-entry[data-window-id='" + windowId + "']").remove();

      }
    }
  });

  function updateTaskbar(windowId) {
    const openWindowEntries = document.querySelectorAll('.open-window-entry');
    openWindowEntries.forEach(entry => {
      if (entry.dataset.windowId === windowId) {
        entry.classList.add('selected');
      } else {
        entry.classList.remove('selected');
      }
    });
  }

  function createTaskbarEntry(title, windowId) {
    let taskbarEntry = $('<div class="open-window-entry" data-window-id="' + windowId + '">' + title + '</div>');
    $(".open-windows-list").append(taskbarEntry);
  }



  // Function to update the time displayed on the clock
  function updateTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    $(".clock").text(timeString);
  }

  // Initialize and update the clock
  updateTime();
  setInterval(updateTime, 1000);

});

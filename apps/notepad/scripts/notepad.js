let content = "";

function newFile() {
    content = "";
    document.getElementById("editor").innerHTML = "";
}

function saveFile() {
    let data = document.getElementById("editor").innerHTML;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("File saved successfully!");
        }
    };
    xhr.open("POST", "save.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("data=" + data);
}

function openFile() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            document.getElementById("editor").innerHTML = data.content;
            content = data.content;
        }
    };
    xhr.open("GET", "open.php", true);
    xhr.send();
}

document.getElementById("new-btn").addEventListener("click", newFile);
document.getElementById("save-btn").addEventListener("click", saveFile);
document.getElementById("open-btn").addEventListener("click", openFile);

document.getElementById("editor").addEventListener("input", function() {
    content = document.getElementById("editor").innerHTML;
});

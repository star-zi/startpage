var search = document.getElementById("search");
var help = document.getElementById("search-help");
var icon = document.getElementById("search-icon");
var form = document.getElementById("search-form");

var commands = [
    {
        command: "",
        label: "Google",
        icon: "fa fa-google",
        url: "https://www.google.com/search?q="
    },
    {
        command: "/a",
        label: "Amazon",
        icon: "fa fa-amazon",
        url: "https://www.amazon.com/s?k="
    },
    {
        command: "/d",
        label: "DuckDuckGo",
        icon: "fa fa-ban",
        url: "https://duckduckgo.com/?q="
    },
    {
        command: "/w",
        label: "Wikipedia",
        icon: "fa fa-wikipedia-w",
        url: "http://en.wikipedia.org/wiki/Special:Search/"
    },
    {
        command: "/y",
        label: "YouTube",
        icon: "fa fa-youtube-play",
        url: "https://www.youtube.com/results?search_query="
    },
];

var command = commands[0];

search.addEventListener("keyup", function (e) {
    var value = search.value;

    if (value.indexOf("/?") == 0) {
        help.style.opacity = 1;
        help.style["max-height"] = "1000px";
    } else if (e.keyCode == 13 || e.which == 13) {
        if (value.indexOf(".") > 0) {
            window.location.href = "http://" + encodeURIComponent(value);
        } else {
            window.location.href = command.url + encodeURIComponent(value);
        }
    } else if (value[0] == "/" && value[value.length - 1] == " ") {
        value = value.trim();
        for (var i = 0; i < commands.length; i++) {
            if (value == commands[i].command) {
                command = commands[i];
                icon.className = command.icon;
                search.value = "";
                form.setAttribute("action", command.url);
                break;
            }
        }
    }
});

search.addEventListener("keydown", function (e) {
    var value = search.value;
    var key = e.keyCode || e.which;

    if (key == 0 || key == 229) {
        key = isBackspace(value) ? 8 : 0;
    }

    if (key == 8) {
        if (value == "" && command.icon != commands[0].icon) {
            command = commands[0];
            icon.className = command.icon;
            search.value = "";
            form.setAttribute("action", command.url);
        }
        help.style.opacity = 0;
        help.style["max-height"] = "100px";
    }
});
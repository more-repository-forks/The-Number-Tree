// Load files
for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[file] + ".js");
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
};

for (file in modInfo.techFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/technical/" + modInfo.techFiles[file] + ".js");
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
};

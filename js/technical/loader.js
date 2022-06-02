// File names
cssFiles = ['bars', 'components', 'misc', 'popup', 'tree-node'];
htmlFiles = ['changelog', 'systemComponents'];
techFiles = ['break_eternity', 'temp', 'layerSupport', 'displays', 'systemComponents', 'canvas', 'particleSystem'];
utilFiles = ['easyAccess', 'NumberFormating', 'options', 'save', 'themes'];
modFiles = ['mod', 'layers', 'tree', 'game', 'utils', 'components'];

// Load files
for (file in cssFiles) {
    let script = document.createElement('link');
    script.setAttribute('rel', 'stylesheet');
    script.setAttribute('type', 'text/css');
    script.setAttribute('href', 'css/' + cssFiles[file] + '.css');
    document.head.insertBefore(script, document.getElementById('loader'));
};

for (file in htmlFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'html/' + htmlFiles[file] + '.html');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, document.getElementById('loader'));
};

for (file in techFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'js/technical/' + techFiles[file] + '.js');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, document.getElementById('loader'));
};

for (file in utilFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'js/utils/' + utilFiles[file] + '.js');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, document.getElementById('loader'));
};

for (file in modFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'js/' + modFiles[file] + '.js');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, document.getElementById('loader'));
};

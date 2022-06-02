// File names
cssFiles = ['animations', 'bars', 'components', 'misc', 'other-tabs', 'popup', 'tree-node'];
htmlFiles = ['changelog', 'systemComponents'];
techFiles = ['break_eternity', 'canvas', 'components', 'displays', 'layerSupport', 'particleSystem', 'systemComponents', 'temp'];
utilFiles = ['easyAccess', 'NumberFormating', 'options', 'save', 'themes', 'utils'];
jsFiles = ['mod', 'layers', 'tree', 'game'];

// Load files
for (file in cssFiles) {
    let script = document.createElement('link');
    script.setAttribute('rel', 'stylesheet');
    script.setAttribute('type', 'text/css');
    script.setAttribute('href', 'css/' + cssFiles[file] + '.css');
    document.head.insertBefore(script, null);
};

for (file in htmlFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'html/' + htmlFiles[file] + '.html');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, null);
};

for (file in techFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'js/technical/' + techFiles[file] + '.js');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, null);
};

for (file in utilFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'js/utils/' + utilFiles[file] + '.js');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, null);
};

for (file in jsFiles) {
    let script = document.createElement('script');
    script.setAttribute('src', 'js/' + jsFiles[file] + '.js');
    script.setAttribute('async', 'false');
    document.head.insertBefore(script, null);
};

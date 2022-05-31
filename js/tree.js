var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,
    treeLayout: "",
};

// A "ghost" layer which offsets other layers in the tree
addNode("spacer", {
    row: 1,
    layerShown: "ghost",
    size: "none",
});

addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
});

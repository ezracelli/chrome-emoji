/** @source https://stackoverflow.com/a/10730777 */
const textNodesUnder = (node = document.documentElement) => {
    const textNodes = [];
    const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    
    let textNode;
    while (textNode = walk.nextNode()) textNodes.push(textNode);

    return textNodes;
};

export default textNodesUnder;

// this script run on document_idle.

var substitutions = [
    // Batman: http://www.xkcd.com/1004/
    ["Batman", "A man dressed like a bat"],
    // s/keyboard/leopard: http://www.xkcd.com/1031/
    ["Keyboard", "Leopard"],
    // Substitutions: https://xkcd.com/1288/
    ["Witnesses", "These dudes I know"],
    ["Allegedly", "Kinda probably"],
    ["New study", "Tumblr post"],
    ["Rebuild", "Avenge"],
    ["Space", "Spaaace"],
    ["Google Glass", "Virtual Boy"],
    ["Google glass", "Virtual Boy"],
    ["Smartphone", "Pokédex"],
    ["Electric", "Atomic"],
    ["Senator", "Elf-lord"],
    ["Senators", "Elf-lords"],
    ["Car", "Cat"],
    ["Election", "Eating contest"],
    ["Congressional leaders", "River spirits"],
    ["Homeland security", "Homestar Runner"],
    ["Could not be reached for comment", "Is guilty and everyone knows it"],
    // Horse: http://www.xkcd.com/1418/
    ["Force", "Horse"],
    // Substitutions 2: http://xkcd.com/1625/
    ["Debate", "Dance-off"],
    ["Self driving", "Uncontrollably swerving"],
    ["Self-driving", "Uncontrollably swerving"],
    ["Poll", "Psychic reading"],
    ["Candidate", "Airbender"],
    ["Drone", "Dog"],
    ["Vows to", "Probably won't"],
    ["At large", "Very large"],
    ["Successfully", "Suddenly"],
    ["Expands", "Physically expands"],
    ["First-degree", "Friggin' awful"],
    ["Second-degree", "Friggin' awful"],
    ["Third-degree", "Friggin' awful"],
    ["First degree", "Friggin' awful"],
    ["Second degree", "Friggin' awful"],
    ["Third degree", "Friggin' awful"],
    ["An unknown number", "Like hundreds"],
    ["Frontrunner", "Blade runner"],
    ["Front runner", "Blade runner"],
    ["Global", "Spherical"],
    ["Minutes", "Years"],
    ["Years", "Minutes"],
    ["No indication", "Lots of signs"],
    ["Urged restraint by", "Drunkenly egged on"],
    ["Horsepower", "Tons of horsemeat"]
];

// create a walker that traverses all text nodes
var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
);

// xkcd the current page!
function makeItBetter() {
    var node;
    while(node = walker.nextNode()) {
        for (var substitution of substitutions) {
            // As is cases in the substitutions array.
            node.nodeValue = node.nodeValue.replace(new RegExp(substitution[0]), substitution[1]);
            // Lower case versions
            node.nodeValue = node.nodeValue.replace(new RegExp(substitution[0].toLowerCase()), substitution[1].toLowerCase());
            // All caps [cruise control for awesome] versions
            node.nodeValue = node.nodeValue.replace(new RegExp(substitution[0].toUpperCase()), substitution[1].toUpperCase());
        }
    }
}

// Check local storage. If the plugin is enabled run the xkcd substitutions.
chrome.storage.sync.get('xkcdEnabled', function(result) {
    if (result.xkcdEnabled) {
        makeItBetter();
    }
});

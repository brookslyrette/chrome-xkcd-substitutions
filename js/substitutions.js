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
    ["Minute", "Year"],
    ["Years", "Minutes"],
    ["Year", "Minute"],
    ["No indication", "Lots of signs"],
    ["Urged restraint by", "Drunkenly egged on"],
    ["Horsepower", "Tons of horsemeat"],
    // Substitutions 3: http://xkcd.com/1679/
    ["Gaffe", "Magic spell"],
    ["Ancient", "Haunted"],
    ["Star-Studded","Blood-soaked"],
    ["Remains to be seen", "Will never be known"],
    ["Silver bullet", "Way to kill werewolves"],
    ["Subway system", "Tunnels I found"],
    ["Surprising", "Surprising (but not to me)"],
    ["War of words", "Interplanetary war"],
    ["Tension", "Sexual tension"],
    ["Cautiously optimistic", "Delusional"],
    ["Doctor Who", "The Big Bang Theory"],
    ["Win votes", "Find Pokémon"],
    ["Behind the headlines", "Beyond the grave"],
    ["Email", "Poem"],
    ["Facebook Post", "Poem"],
    ["Tweet", "Poem"],
    ["Facebook CEO", "This guy"],
    ["Latest", "Final"],
    ["Disrupt", "Destroy"],
    ["Meeting", "Ménage à trois"],
    ["Scientists", "Channing Tatum and his friends"],
    ["You won't believe", "I'm really sad about"],
    // My Friend Catherine: http://xkcd.com/1689/
    ["My cat", "My Friend Catherine"]
];

// create a walker that traverses all text nodes
var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
);

// xkcd the current page!
// Why two steps?
// 1625 defines "Minutes" -> "Years" and "Years" -> "Minutes" so updating and replaing one at a time
// will cause  Minutes to map to Years then get picked up again as a match.
function makeItBetter() {
    var node;
    while(node = walker.nextNode()) {
        //first flag what we will replace
        for (var i = 0; i < substitutions.length; i++) {
            var substitution = substitutions[i];
            // As is cases in the substitutions array.
            node.nodeValue = node.nodeValue.replace(new RegExp(substitution[0]), '{' + i + '}');
            // Lower case versions
            node.nodeValue = node.nodeValue.replace(new RegExp(substitution[0].toLowerCase()), '{' + i + 'l}');
            // All caps [cruise control for awesome] versions
            node.nodeValue = node.nodeValue.replace(new RegExp(substitution[0].toUpperCase()), '{' + i + 'c}');
        }
        // replace the flaged items
        for (var i = 0; i < substitutions.length; i++) {
            var substitution = substitutions[i];
            node.nodeValue = node.nodeValue.replace(new RegExp('\\{' + i + '\\}'), substitution[1]);
            node.nodeValue = node.nodeValue.replace(new RegExp('\\{' + i + '\\l}'), substitution[1].toLowerCase());
            node.nodeValue = node.nodeValue.replace(new RegExp('\\{' + i + '\\c}'), substitution[1].toUpperCase());
        }
    }
}

// Check local storage. If the plugin is enabled run the xkcd substitutions.
chrome.storage.sync.get('xkcdEnabled', function(result) {
    if (result.xkcdEnabled) {
        makeItBetter();
    }
});

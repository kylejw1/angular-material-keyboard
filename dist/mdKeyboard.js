/**
 * angular-material-keyboard
 * Onscreen virtual keyboard for Angular (https://angularjs.org/) using Material (https://material.angularjs.org/)inspired by the Angular Virtual Keyboard by the-darc (https://github.com/the-darc/angular-virtual-keyboard).
 * @version v0.0.1
 * @author David Enke <postdavidenke.de>
 * @link https://github.com/davidenke/angular-material-keyboard
 * @license MIT
 */
(function (angular) {

'use strict';

/* See http://www.greywyvern.com/code/javascript/keyboard for examples
 * and usage instructions.
 *
 * Version 1.49 - November 8, 2011
 *   - Don't display language drop-down if only one keyboard available
 *
 *   See full changelog at:
 *     http://www.greywyvern.com/code/javascript/keyboard.changelog.txt
 *
 * Keyboard Credits
 *   - Yiddish (Yidish Lebt) keyboard layout by Simche Taub (jidysz.net)
 *   - Urdu Phonetic keyboard layout by Khalid Malik
 *   - Yiddish keyboard layout by Helmut Wollmersdorfer
 *   - Khmer keyboard layout by Sovann Heng (km-kh.com)
 *   - Dari keyboard layout by Saif Fazel
 *   - Kurdish keyboard layout by Ara Qadir
 *   - Assamese keyboard layout by Kanchan Gogoi
 *   - Bulgarian BDS keyboard layout by Milen Georgiev
 *   - Basic Japanese Hiragana/Katakana keyboard layout by Damjan
 *   - Ukrainian keyboard layout by Dmitry Nikitin
 *   - Macedonian keyboard layout by Damjan Dimitrioski
 *   - Pashto keyboard layout by Ahmad Wali Achakzai (qamosona.com)
 *   - Armenian Eastern and Western keyboard layouts by Hayastan Project (www.hayastan.co.uk)
 *   - Pinyin keyboard layout from a collaboration with Lou Winklemann
 *   - Kazakh keyboard layout by Alex Madyankin
 *   - Danish keyboard layout by Verner KjÃ¦rsgaard
 *   - Slovak keyboard layout by Daniel Lara (www.learningslovak.com)
 *   - Belarusian and Serbian Cyrillic keyboard layouts by Evgeniy Titov
 *   - Bulgarian Phonetic keyboard layout by Samuil Gospodinov
 *   - Swedish keyboard layout by HÃ¥kan Sandberg
 *   - Romanian keyboard layout by Aurel
 *   - Farsi (Persian) keyboard layout by Kaveh Bakhtiyari (www.bakhtiyari.com)
 *   - Burmese keyboard layout by Cetanapa
 *   - Bosnian/Croatian/Serbian Latin/Slovenian keyboard layout by Miran Zeljko
 *   - Hungarian keyboard layout by Antal Sall 'Hiromacu'
 *   - Arabic keyboard layout by Srinivas Reddy
 *   - Italian and Spanish (Spain) keyboard layouts by dictionarist.com
 *   - Lithuanian and Russian keyboard layouts by Ramunas
 *   - German keyboard layout by QuHno
 *   - French keyboard layout by Hidden Evil
 *   - Polish Programmers layout by moose
 *   - Turkish keyboard layouts by offcu
 *   - Dutch and US Int'l keyboard layouts by jerone
 *
 */

MdAutocompleteDecorator.$inject = ["$provide"];
MdKeyboardProvider.$inject = ["$$interimElementProvider", "keyboardLayouts", "keyboardDeadkey", "keyboardSymbols", "keyboardNumpad"];
MdKeyboardDirective.$inject = ["$mdKeyboard"];
useKeyboardDirective.$inject = ["$mdKeyboard", "$timeout", "$animate", "$rootScope"];
angular
    .module('material.components.keyboard', [
        'material.core',
        'material.components.icon'
    ]);

angular
    .module('material.components.keyboard')
    .config(["$mdIconProvider", function ($mdIconProvider) {
        $mdIconProvider
            .fontSet('md', 'material-icons');
    }]);


/* See http://www.greywyvern.com/code/javascript/keyboard for examples
 * and usage instructions.
 *
 * Version 1.49 - November 8, 2011
 *   - Don't display language drop-down if only one keyboard available
 *
 *   See full changelog at:
 *     http://www.greywyvern.com/code/javascript/keyboard.changelog.txt
 *
 * Keyboard Credits
 *   - Yiddish (Yidish Lebt) keyboard layout by Simche Taub (jidysz.net)
 *   - Urdu Phonetic keyboard layout by Khalid Malik
 *   - Yiddish keyboard layout by Helmut Wollmersdorfer
 *   - Khmer keyboard layout by Sovann Heng (km-kh.com)
 *   - Dari keyboard layout by Saif Fazel
 *   - Kurdish keyboard layout by Ara Qadir
 *   - Assamese keyboard layout by Kanchan Gogoi
 *   - Bulgarian BDS keyboard layout by Milen Georgiev
 *   - Basic Japanese Hiragana/Katakana keyboard layout by Damjan
 *   - Ukrainian keyboard layout by Dmitry Nikitin
 *   - Macedonian keyboard layout by Damjan Dimitrioski
 *   - Pashto keyboard layout by Ahmad Wali Achakzai (qamosona.com)
 *   - Armenian Eastern and Western keyboard layouts by Hayastan Project (www.hayastan.co.uk)
 *   - Pinyin keyboard layout from a collaboration with Lou Winklemann
 *   - Kazakh keyboard layout by Alex Madyankin
 *   - Danish keyboard layout by Verner KjÃ¦rsgaard
 *   - Slovak keyboard layout by Daniel Lara (www.learningslovak.com)
 *   - Belarusian and Serbian Cyrillic keyboard layouts by Evgeniy Titov
 *   - Bulgarian Phonetic keyboard layout by Samuil Gospodinov
 *   - Swedish keyboard layout by HÃ¥kan Sandberg
 *   - Romanian keyboard layout by Aurel
 *   - Farsi (Persian) keyboard layout by Kaveh Bakhtiyari (www.bakhtiyari.com)
 *   - Burmese keyboard layout by Cetanapa
 *   - Bosnian/Croatian/Serbian Latin/Slovenian keyboard layout by Miran Zeljko
 *   - Hungarian keyboard layout by Antal Sall 'Hiromacu'
 *   - Arabic keyboard layout by Srinivas Reddy
 *   - Italian and Spanish (Spain) keyboard layouts by dictionarist.com
 *   - Lithuanian and Russian keyboard layouts by Ramunas
 *   - German keyboard layout by QuHno
 *   - French keyboard layout by Hidden Evil
 *   - Polish Programmers layout by moose
 *   - Turkish keyboard layouts by offcu
 *   - Dutch and US Int'l keyboard layouts by jerone
 *
 */

angular
    .module('material.components.keyboard')
    .constant('keyboardLayouts', (function () {
        var layouts = {
            'US Standard': {
                'name': "US Standard", 'keys': [
                    [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
                    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
                    [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
                    [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
                    [[" ", " "]]
                ], 'lang': ["en-us"]
            },
            'US International': {
                'name': "US International", 'keys': [
                    [["`", "~"], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
                    [["Tab", "Tab"], ["q", "Q", "\u00e4", "\u00c4"], ["w", "W", "\u00e5", "\u00c5"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R", "\u00ae"], ["t", "T", "\u00fe", "\u00de"], ["y", "Y", "\u00fc", "\u00dc"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P", "\u00f6", "\u00d6"], ["[", "{", "\u00ab"], ["]", "}", "\u00bb"], ["\\", "|", "\u00ac", "\u00a6"]],
                    [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S", "\u00df", "\u00a7"], ["d", "D", "\u00f0", "\u00d0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u00f8", "\u00d8"], [";", ":", "\u00b6", "\u00b0"], ["'", '"', "\u00b4", "\u00a8"], ["Enter", "Enter"]],
                    [["Shift", "Shift"], ["z", "Z", "\u00e6", "\u00c6"], ["x", "X"], ["c", "C", "\u00a9", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N", "\u00f1", "\u00d1"], ["m", "M", "\u00b5"], [",", "<", "\u00e7", "\u00c7"], [".", ">"], ["/", "?", "\u00bf"], ["Shift", "Shift"]],
                    [[" ", " ", " ", " "], ["Alt", "Alt"]]
                ], 'lang': ["en"]
            }
        };

        return layouts;
    })());

// - Lay out each dead key set as an object of property/value
//   pairs.  The rows below are wrapped so uppercase letters are
//   below their lowercase equivalents.
//
// - The property name is the letter pressed after the diacritic.
//   The property value is the letter this key-combo will generate.
//
// - Note that if you have created a new keyboard layout and want
//   it included in the distributed script, PLEASE TELL ME if you
//   have added additional dead keys to the ones below.

angular
    .module('material.components.keyboard')
    .constant('keyboardDeadkey', (function () {
        var deadkey = {
            '"': {
                'a': "\u00e4",
                'e': "\u00eb",
                'i': "\u00ef",
                'o': "\u00f6",
                'u': "\u00fc",
                'y': "\u00ff",
                '\u03b9': "\u03ca",
                '\u03c5': "\u03cb",
                '\u016B': "\u01D6",
                '\u00FA': "\u01D8",
                '\u01D4': "\u01DA",
                '\u00F9': "\u01DC",
                'A': "\u00c4",
                'E': "\u00cb",
                'I': "\u00cf",
                'O': "\u00d6",
                'U': "\u00dc",
                'Y': "\u0178",
                '\u0399': "\u03aa",
                '\u03a5': "\u03ab",
                '\u016A': "\u01D5",
                '\u00DA': "\u01D7",
                '\u01D3': "\u01D9",
                '\u00D9': "\u01DB",
                '\u304b': "\u304c",
                '\u304d': "\u304e",
                '\u304f': "\u3050",
                '\u3051': "\u3052",
                '\u3053': "\u3054",
                '\u305f': "\u3060",
                '\u3061': "\u3062",
                '\u3064': "\u3065",
                '\u3066': "\u3067",
                '\u3068': "\u3069",
                '\u3055': "\u3056",
                '\u3057': "\u3058",
                '\u3059': "\u305a",
                '\u305b': "\u305c",
                '\u305d': "\u305e",
                '\u306f': "\u3070",
                '\u3072': "\u3073",
                '\u3075': "\u3076",
                '\u3078': "\u3079",
                '\u307b': "\u307c",
                '\u30ab': "\u30ac",
                '\u30ad': "\u30ae",
                '\u30af': "\u30b0",
                '\u30b1': "\u30b2",
                '\u30b3': "\u30b4",
                '\u30bf': "\u30c0",
                '\u30c1': "\u30c2",
                '\u30c4': "\u30c5",
                '\u30c6': "\u30c7",
                '\u30c8': "\u30c9",
                '\u30b5': "\u30b6",
                '\u30b7': "\u30b8",
                '\u30b9': "\u30ba",
                '\u30bb': "\u30bc",
                '\u30bd': "\u30be",
                '\u30cf': "\u30d0",
                '\u30d2': "\u30d3",
                '\u30d5': "\u30d6",
                '\u30d8': "\u30d9",
                '\u30db': "\u30dc"
            },
            '~': { // Tilde / Stroke
                'a': "\u00e3", 'l': "\u0142", 'n': "\u00f1", 'o': "\u00f5",
                'A': "\u00c3", 'L': "\u0141", 'N': "\u00d1", 'O': "\u00d5"
            },
            '^': { // Circumflex
                'a': "\u00e2", 'e': "\u00ea", 'i': "\u00ee", 'o': "\u00f4", 'u': "\u00fb", 'w': "\u0175", 'y': "\u0177",
                'A': "\u00c2", 'E': "\u00ca", 'I': "\u00ce", 'O': "\u00d4", 'U': "\u00db", 'W': "\u0174", 'Y': "\u0176"
            },
            '\u02c7': { // Baltic caron
                'c': "\u010D",
                'd': "\u010f",
                'e': "\u011b",
                's': "\u0161",
                'l': "\u013e",
                'n': "\u0148",
                'r': "\u0159",
                't': "\u0165",
                'u': "\u01d4",
                'z': "\u017E",
                '\u00fc': "\u01da",
                'C': "\u010C",
                'D': "\u010e",
                'E': "\u011a",
                'S': "\u0160",
                'L': "\u013d",
                'N': "\u0147",
                'R': "\u0158",
                'T': "\u0164",
                'U': "\u01d3",
                'Z': "\u017D",
                '\u00dc': "\u01d9"
            },
            '\u02d8': { // Romanian and Turkish breve
                'a': "\u0103", 'g': "\u011f",
                'A': "\u0102", 'G': "\u011e"
            },
            '-': { // Macron
                'a': "\u0101",
                'e': "\u0113",
                'i': "\u012b",
                'o': "\u014d",
                'u': "\u016B",
                'y': "\u0233",
                '\u00fc': "\u01d6",
                'A': "\u0100",
                'E': "\u0112",
                'I': "\u012a",
                'O': "\u014c",
                'U': "\u016A",
                'Y': "\u0232",
                '\u00dc': "\u01d5"
            },
            '`': { // Grave
                'a': "\u00e0", 'e': "\u00e8", 'i': "\u00ec", 'o': "\u00f2", 'u': "\u00f9", '\u00fc': "\u01dc",
                'A': "\u00c0", 'E': "\u00c8", 'I': "\u00cc", 'O': "\u00d2", 'U': "\u00d9", '\u00dc': "\u01db"
            },
            "'": { // Acute / Greek Tonos
                'a': "\u00e1",
                'e': "\u00e9",
                'i': "\u00ed",
                'o': "\u00f3",
                'u': "\u00fa",
                'y': "\u00fd",
                '\u03b1': "\u03ac",
                '\u03b5': "\u03ad",
                '\u03b7': "\u03ae",
                '\u03b9': "\u03af",
                '\u03bf': "\u03cc",
                '\u03c5': "\u03cd",
                '\u03c9': "\u03ce",
                '\u00fc': "\u01d8",
                'A': "\u00c1",
                'E': "\u00c9",
                'I': "\u00cd",
                'O': "\u00d3",
                'U': "\u00da",
                'Y': "\u00dd",
                '\u0391': "\u0386",
                '\u0395': "\u0388",
                '\u0397': "\u0389",
                '\u0399': "\u038a",
                '\u039f': "\u038c",
                '\u03a5': "\u038e",
                '\u03a9': "\u038f",
                '\u00dc': "\u01d7"
            },
            '\u02dd': {// Hungarian Double Acute Accent
                'o': "\u0151", 'u': "\u0171",
                'O': "\u0150", 'U': "\u0170"
            },
            '\u0385': { // Greek Dialytika + Tonos
                '\u03b9': "\u0390", '\u03c5': "\u03b0"
            },
            '\u00b0': { // Ring
                'a': "\u00e5", 'u': "\u016f",
                'A': "\u00c5", 'U': "\u016e"
            },
            '\u02DB': { // Ogonek
                'a': "\u0106", 'e': "\u0119", 'i': "\u012f", 'o': "\u01eb", 'u': "\u0173", 'y': "\u0177",
                'A': "\u0105", 'E': "\u0118", 'I': "\u012e", 'O': "\u01ea", 'U': "\u0172", 'Y': "\u0176"
            },
            '\u02D9': { // Dot-above
                'c': "\u010B", 'e': "\u0117", 'g': "\u0121", 'z': "\u017C",
                'C': "\u010A", 'E': "\u0116", 'G': "\u0120", 'Z': "\u017B"
            },
            '\u00B8':  { // Cedilla
                'c': "\u00e7", 's': "\u015F",
                'C': "\u00c7", 'S': "\u015E"
            },
            /*',': { // Comma
             's': (this.VKI_isIElt8) ? "\u015F" : "\u0219", 't': (this.VKI_isIElt8) ? "\u0163" : "\u021B",
             'S': (this.VKI_isIElt8) ? "\u015E" : "\u0218", 'T': (this.VKI_isIElt8) ? "\u0162" : "\u021A"
             },*/
            '\u3002': { // Hiragana/Katakana Point
                '\u306f': "\u3071", '\u3072': "\u3074", '\u3075': "\u3077", '\u3078': "\u307a", '\u307b': "\u307d",
                '\u30cf': "\u30d1", '\u30d2': "\u30d4", '\u30d5': "\u30d7", '\u30d8': "\u30da", '\u30db': "\u30dd"
            }
        };

        // aliases
        deadkey['\u00af'] = deadkey['-']; // Macron
        deadkey['\u00a8'] = deadkey['\u309B'] = deadkey['"']; // Umlaut / Diaeresis / Greek Dialytika / Hiragana/Katakana Voiced Sound Mark
        deadkey['\u00b4'] = deadkey['\u0384'] = deadkey["'"]; // Acute / Greek Tonos
        deadkey['\u00ba'] = deadkey['\u00b0']; // Ring
        deadkey['\u201a'] = deadkey['\u00B8'];

        return deadkey;
    })());

angular
    .module('material.components.keyboard')
    .constant('keyboardNumpad', [
        [["$"], ["\u00a3"], ["\u20ac"], ["\u00a5"]],
        [["7"], ["8"], ["9"], ["/"]],
        [["4"], ["5"], ["6"], ["*"]],
        [["1"], ["2"], ["3"], ["-"]],
        [["0"], ["."], ["="], ["+"]]
    ]);

angular
    .module('material.components.keyboard')
    .constant('keyboardSymbols', {
        '\u00a0': "NB\nSP", '\u200b': "ZW\nSP", '\u200c': "ZW\nNJ", '\u200d': "ZW\nJ"
    });

angular
    .module('material.components.keyboard')
    .config(MdAutocompleteDecorator);

function MdAutocompleteDecorator($provide) {
    // decorate md-autocomplete directive
    // with use-keyboard behavior
    $provide.decorator('mdAutocompleteDirective', ["$q", "$log", "$delegate", "$timeout", "$compile", "$mdUtil", "$mdConstant", function ($q, $log, $delegate, $timeout, $compile,
                                                            $mdUtil, $mdConstant) {
        var directive = $delegate[0];
        var compile = directive.compile;

        directive.compile = function () {
            var link = compile.apply(this, arguments);

            return function (scope, element, attrs, MdAutocompleteCtrl) {
                // call original link
                // function if existant
                if (angular.isDefined(link)) {
                    link.apply(this, arguments);
                }

                if (angular.isDefined(attrs.useKeyboard)) {
                    $timeout(function () {
                        var input = angular.element(element[0].querySelector('input[type="search"]:not(use-keyboard)'));
                        var cloned = input
                            .clone(true, true)
                            .attr('use-keyboard', attrs.useKeyboard);
                        var compiled = $compile(cloned)(scope);
                        input.replaceWith(compiled);
                        var keydown = MdAutocompleteCtrl.keydown;

                        function select (index) {
                            $mdUtil.nextTick(function () {
                                getDisplayValue(MdAutocompleteCtrl.matches[index]).then(function (val) {
                                    var ngModel = compiled.controller('ngModel');
                                    ngModel.$setViewValue(val);
                                    ngModel.$render();
                                }).finally(function () {
                                    scope.selectedItem = MdAutocompleteCtrl.matches[index];
                                    MdAutocompleteCtrl.loading = false;
                                    MdAutocompleteCtrl.hidden = true;
                                });
                            }, false);

                            function getDisplayValue(item) {
                                return $q.when(getItemText(item) || item);
                            }

                            function getItemText(item) {
                                return (item && scope.itemText) ? scope.itemText(getItemAsNameVal(item)) : null;
                            }

                            function getItemAsNameVal(item) {
                                if (!item) return undefined;

                                var locals = {};
                                if (MdAutocompleteCtrl.itemName) locals[MdAutocompleteCtrl.itemName] = item;

                                return locals;
                            }
                        }

                        function keydownDecorated(event) {
                            switch (event.keyCode) {

                                case $mdConstant.KEY_CODE.ENTER:
                                    if (MdAutocompleteCtrl.hidden
                                        || MdAutocompleteCtrl.loading
                                        || MdAutocompleteCtrl.index < 0
                                        || MdAutocompleteCtrl.matches.length < 1) return;
                                    if (hasSelection()) return;
                                    event.stopPropagation();
                                    event.preventDefault();
                                    select(MdAutocompleteCtrl.index);
                                    break;

                                case $mdConstant.KEY_CODE.TAB:
                                case $mdConstant.KEY_CODE.ESCAPE:
                                    compiled.blur();
                                    if (scope.searchText) {
                                        keydown.call(MdAutocompleteCtrl, event);
                                    }
                                    break;

                                default:
                                    keydown.call(MdAutocompleteCtrl, event);
                                    break;
                            }

                            function hasSelection() {
                                return MdAutocompleteCtrl.scope.selectedItem ? true : false;
                            }
                        }

                        MdAutocompleteCtrl.select = select;
                        MdAutocompleteCtrl.keydown = keydownDecorated;
                    });
                }
            };
        };

        return $delegate;
    }]);
}

angular
    .module('material.components.keyboard')
    .provider('$mdKeyboard', MdKeyboardProvider);

function MdKeyboardProvider($$interimElementProvider,
                            keyboardLayouts, keyboardDeadkey, keyboardSymbols, keyboardNumpad) {
    // how fast we need to flick down to close the sheet, pixels/ms
    keyboardDefaults.$inject = ["$window", "$animate", "$rootElement", "$mdConstant", "$mdUtil", "$mdTheming", "$mdKeyboard", "$mdGesture"];
    var SCOPE;
    var CLOSING_VELOCITY = 0.5;
    var PADDING = 80; // same as css
    var DEFAULT_LAYOUT = 'US International';
    var CURRENT_LAYOUT = DEFAULT_LAYOUT;
    var LAYOUTS = keyboardLayouts;
    var DEADKEY = keyboardDeadkey;
    var SYMBOLS = keyboardSymbols;
    var NUMPAD = keyboardNumpad;
    var VISIBLE = false;

    var $mdKeyboard = $$interimElementProvider('$mdKeyboard')
        .setDefaults({
            methods: ['themable', 'disableParentScroll', 'clickOutsideToClose', 'layout'],
            options: keyboardDefaults
        })
        .addMethod('getLayout', getLayout)
        .addMethod('getCurrentLayout', getCurrentLayout)
        .addMethod('getLayouts', getLayouts)
        .addMethod('defaultLayout', defaultLayout)
        .addMethod('useLayout', useLayout)
        .addMethod('addLayout', addLayout)
        .addMethod('isVisible', isVisible);

    // should be available in provider (config phase) not only
    // in service as defined in $$interimElementProvider
    $mdKeyboard.getLayout = getLayout;
    $mdKeyboard.getCurrentLayout = getCurrentLayout;
    $mdKeyboard.getLayouts = getLayouts;
    $mdKeyboard.defaultLayout = defaultLayout;
    $mdKeyboard.useLayout = useLayout;
    $mdKeyboard.addLayout = addLayout;
    $mdKeyboard.isVisible = isVisible;

    // get currently used layout object
    function getCurrentLayout() {
        return CURRENT_LAYOUT;
    }

    // get currently used layout object
    function getLayout(layout) {
        if (LAYOUTS[layout]) {
            return LAYOUTS[layout];
        }
    }

    // get names of available layouts
    function getLayouts() {
        var layouts = [];
        angular.forEach(LAYOUTS, function (obj, layout) {
            layouts.push(layout);
        });
        return layouts;
    }

    // set default layout
    function defaultLayout(layout) {
        if (LAYOUTS[layout]) {
            DEFAULT_LAYOUT = layout;
            CURRENT_LAYOUT = layout;
        } else {
            if (layout.length) {
                var msg = "" +
                    "The keyboard layout '" + layout + "' does not exists. \n" +
                    "The default layout \"" + DEFAULT_LAYOUT + "\" will be used.\n" +
                    "To get a list of the available layouts use 'showLayouts'.";
                console.warn(msg);
            }
        }
    }

    // set name of layout to use
    function useLayout(layout) {
        if (layout && LAYOUTS[layout]) {
            CURRENT_LAYOUT = layout;
        } else {
            CURRENT_LAYOUT = DEFAULT_LAYOUT;
            if (layout.length) {
                var msg = "" +
                    "The keyboard layout '" + layout + "' does not exists. \n" +
                    "The default layout \"" + DEFAULT_LAYOUT + "\" will be used.\n" +
                    "To get a list of the available layouts use 'showLayouts'.";
                console.warn(msg);
            }
        }
        // broadcast new layout
        if (SCOPE) {
            SCOPE.$broadcast('$mdKeyboardLayoutChanged', CURRENT_LAYOUT);
        }
    }

    // add a custom layout
    function addLayout(layout, keys) {
        if (!layout) return;
        if (!LAYOUTS[layout]) {
            LAYOUTS[layout] = keys;
        } else {
            var msg = "" +
                "The keyboard layout '" + layout + "' already exists. \n" +
                "Please use a different name.";
            console.warn(msg);
        }
    }

    // return if keyboard is visible
    function isVisible() {
        return VISIBLE;
    }

    return $mdKeyboard;

    /* @ngInject */
    function keyboardDefaults($window, $animate, $rootElement,
                              $mdConstant, $mdUtil, $mdTheming, $mdKeyboard, $mdGesture) {

        return {
            onShow: onShow,
            onRemove: onRemove,

            themable: true,
            disableParentScroll: true,
            clickOutsideToClose: true,
            layout: CURRENT_LAYOUT,
            layouts: LAYOUTS,
            deadkey: DEADKEY,
            symbols: SYMBOLS,
            numpad: NUMPAD
        };

        function onShow(scope, element, options) {

            //if (options.clickOutsideToClose) {
            //    document.body.on('click', function () {
            //        $mdUtil.nextTick($mdKeyboard.cancel, true);
            //    });
            //}

            var keyboard = new Keyboard(element, options.parent);
            options.keyboard = keyboard;
            options.parent.prepend(keyboard.element);

            SCOPE = scope;
            VISIBLE = true;

            $mdTheming.inherit(keyboard.element, options.parent);

            if (options.disableParentScroll) {
                options.restoreScroll = $mdUtil.disableScrollAround(keyboard.element, options.parent);
            }

            return $animate
                .enter(keyboard.element, options.parent)
                .then(function () {
                    if (options.escapeToClose) {
                        options.rootElementKeyupCallback = function (e) {
                            if (e.keyCode === $mdConstant.KEY_CODE.ESCAPE) {
                                $mdUtil.nextTick($mdKeyboard.cancel, true);
                            }
                        };
                        $rootElement.on('keyup', options.rootElementKeyupCallback);
                    }
                });

        }

        function onRemove(scope, element, options) {
            var keyboard = options.keyboard;

            return $animate
                .leave(keyboard.element)
                .then(function () {
                    VISIBLE = false;

                    if (options.disableParentScroll) {
                        options.restoreScroll();
                        delete options.restoreScroll;
                    }

                    keyboard.cleanup();
                });
        }

        /**
         * Keyboard class to apply keyboard behavior to an element
         */
        function Keyboard(element, parent) {
            var deregister = $mdGesture.register(parent, 'drag', {horizontal: false});

            element
                .on('mousedown', onMouseDown);
            parent
                .on('$md.dragstart', onDragStart)
                .on('$md.drag', onDrag)
                .on('$md.dragend', onDragEnd);

            return {
                element: element,
                cleanup: function cleanup() {
                    deregister();
                    parent.off('$md.dragstart', onDragStart);
                    parent.off('$md.drag', onDrag);
                    parent.off('$md.dragend', onDragEnd);
                    parent.triggerHandler('focus');
                }
            };

            function onMouseDown(ev) {
                ev.preventDefault();
            }

            function onDragStart(ev) {
                // Disable transitions on transform so that it feels fast
                element.css($mdConstant.CSS.TRANSITION_DURATION, '0ms');
            }

            function onDrag(ev) {
                var transform = ev.pointer.distanceY;
                if (transform < 5) {
                    // Slow down drag when trying to drag up, and stop after PADDING
                    transform = Math.max(-PADDING, transform / 2);
                }
                element.css($mdConstant.CSS.TRANSFORM, 'translate3d(0,' + (PADDING + transform) + 'px,0)');
            }

            function onDragEnd(ev) {
                if (ev.pointer.distanceY > 0 &&
                    (ev.pointer.distanceY > 20 || Math.abs(ev.pointer.velocityY) > CLOSING_VELOCITY)) {
                    var distanceRemaining = element.prop('offsetHeight') - ev.pointer.distanceY;
                    var transitionDuration = Math.min(distanceRemaining / ev.pointer.velocityY * 0.75, 500);
                    element.css($mdConstant.CSS.TRANSITION_DURATION, transitionDuration + 'ms');
                    $mdUtil.nextTick($mdKeyboard.cancel, true);
                    $window.document.activeElement.blur();
                } else {
                    element.css($mdConstant.CSS.TRANSITION_DURATION, '');
                    element.css($mdConstant.CSS.TRANSFORM, '');
                }
            }
        }
    }
}

angular
    .module('material.components.keyboard')
    .directive('mdKeyboard', MdKeyboardDirective)
    .directive('useKeyboard', useKeyboardDirective);

function MdKeyboardDirective($mdKeyboard) {
    return {
        restrict: 'E',
        link: function postLink(scope) {
            // When navigation force destroys an interimElement, then
            // listen and $destroy() that interim instance...
            scope.$on('$destroy', function () {
                $mdKeyboard.destroy();
            });
        }
    };
}

function useKeyboardDirective($mdKeyboard, $timeout, $animate, $rootScope) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            // requires ngModel silently
            if (!ngModelCtrl) {
                return;
            }

            // bind instance to that var
            var keyboard;

            // Don't show virtual keyboard in mobile devices (default)
            var isMobile = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                    isMobile = true;
                }
            })(navigator.userAgent || navigator.vendor || window.opera);
            if (isMobile && attrs.showInMobile !== true) {
                return;
            }

            // open keyboard on focus
            element
                .bind('focus', showKeyboard)
                .bind('blur', hideKeyboard);

            function showKeyboard() {
                if ($rootScope.keyboardTimeout) {
                    $timeout.cancel($rootScope.keyboardTimeout);
                }
                if ($rootScope.keyboardAnimation) {
                    $animate.cancel($rootScope.keyboardAnimation);
                }

                // no keyboard active, so add new
                if (!$mdKeyboard.isVisible()) {
                    $mdKeyboard.currentModel = ngModelCtrl;
                    $rootScope.keyboardAnimation = $mdKeyboard.show({
                        template:'<md-keyboard class="md-grid" layout="column" ng-cloak><div ng-repeat="row in keyboard.keys" layout="row"><div flex ng-repeat="key in row" ng-switch="key[0]" ng-class="getKeyClass(key)"><span ng-switch-when="Bksp"><md-button class="md-raised key-bksp" ng-mousedown="pressed($event, key[0])" aria-label="{{key[0] || \'key\'}}"><md-icon>keyboard_backspace</md-icon></md-button></span> <span ng-switch-when="Tab"><md-button class="md-raised key-tab" ng-mousedown="pressed($event, key[0])" aria-label="{{key[0] || \'key\'}}"><md-icon>keyboard_tab</md-icon></md-button></span> <span ng-switch-when="Caps"><md-button class="md-raised key-caps" ng-class="{\'locked\': capsLocked, \'md-focused\': capsLocked}" ng-mousedown="pressed($event, key[0])" aria-label="{{key[0] || \'key\'}}"><md-icon>keyboard_capslock</md-icon></md-button></span> <span ng-switch-when="Enter"><md-button class="md-raised key-enter" ng-mousedown="pressed($event, key[0])" aria-label="{{key[0] || \'key\'}}"><md-icon>keyboard_return</md-icon></md-button></span> <span ng-switch-when="Shift"><md-button class="md-raised key-shift" ng-mousedown="pressed($event, key[0])" aria-label="{{key[0] || \'key\'}}">{{key[0]}}</md-button></span> <span ng-switch-when="Spacer"></span> <span ng-switch-default><md-button class="md-raised key-char" ng-mousedown="pressed($event, key[!capsLocked && !caps ? 0 : 1] || key[0])" aria-label="{{key[!capsLocked && !caps ? 0 : 1] || \'key\'}}">{{key[!capsLocked && !caps ? 0 : 1] || key[0]}}</md-button></span></div></div></md-keyboard>',
                        controller: mdKeyboardController,
                        bindToController: true
                    });
                }

                // use existing keyboard
                else {
                    $mdKeyboard.currentModel = ngModelCtrl;
                    $mdKeyboard.useLayout(attrs.useKeyboard);
                }
            }

            function mdKeyboardController($scope) {
                $mdKeyboard.useLayout(attrs.useKeyboard);

                var getKeyClass = function (key) {
                    var k = (key[0] || ' ').toLowerCase();
                    var keys = ['bksp', 'tab', 'caps', 'enter', 'shift', 'alt', 'altgr', 'altlk'];

                    // space bar
                    if (k == ' ') {
                        k = 'space';
                    }
                    // special key
                    else if (keys.indexOf(k) < 0) {
                        k = 'char';
                    }
                    // spacer helper element
                    else if (k == 'spacer') {
                        return k;
                    }

                    return 'key-' + k;
                };

                var triggerKey = function($event, key) {
                    $event.preventDefault();

                    switch (key) {
                        case "Caps":
                            $scope.capsLocked = !$scope.capsLocked;
                            $scope.caps = false;
                            break;

                        case "Shift":
                            $scope.caps = !$scope.caps;
                            break;

                        case "Alt":
                        case "AltGr":
                        case "AltLk":
                            // modify input, visualize
                            //self.VKI_modify(type);
                            break;

                        case "Tab":

                            // cycle through elements
                            // or insert \t tab
                            //if (self.VKI_activeTab) {
                            //    if (self.VKI_target.form) {
                            //        var target = self.VKI_target, elems = target.form.elements;
                            //        self.VKI_close(false);
                            //        for (var z = 0, me = false, j = -1; z < elems.length; z++) {
                            //            if (j == -1 && elems[z].getAttribute("VKI_attached")) j = z;
                            //            if (me) {
                            //                if (self.VKI_activeTab == 1 && elems[z]) break;
                            //                if (elems[z].getAttribute("VKI_attached")) break;
                            //            } else if (elems[z] == target) me = true;
                            //        }
                            //        if (z == elems.length) z = Math.max(j, 0);
                            //        if (elems[z].getAttribute("VKI_attached")) {
                            //            self.VKI_show(elems[z]);
                            //        } else elems[z].focus();
                            //    } else self.VKI_target.focus();
                            //} else self.VKI_insert("\t");
                            //return false;

                            $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '') + "\t");
                            $mdKeyboard.currentModel.$validate();
                            $mdKeyboard.currentModel.$render();

                            break;

                        case "Bksp":

                            // backspace
                            //self.VKI_target.focus();
                            //if (self.VKI_target.setSelectionRange && hasSelectionStartEnd(self.VKI_target) && !self.VKI_target.readOnly) {
                            //    var rng = [self.VKI_target.selectionStart, self.VKI_target.selectionEnd];
                            //    if (rng[0] < rng[1]) rng[0]++;
                            //    self.VKI_target.value = self.VKI_target.value.substr(0, rng[0] - 1) + self.VKI_target.value.substr(rng[1]);
                            //    self.VKI_target.setSelectionRange(rng[0] - 1, rng[0] - 1);
                            //} else if (self.VKI_target.createTextRange && !self.VKI_target.readOnly) {
                            //    try {
                            //        self.VKI_target.range.select();
                            //    } catch (e) {
                            //        self.VKI_target.range = document.selection.createRange();
                            //    }
                            //    if (!self.VKI_target.range.text.length) self.VKI_target.range.moveStart('character', -1);
                            //    self.VKI_target.range.text = "";
                            //} else self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
                            //if (self.VKI_shift) self.VKI_modify("Shift");
                            //if (self.VKI_altgr) self.VKI_modify("AltGr");
                            //self.VKI_target.focus();
                            //self.keyInputCallback();
                            //return true;

                            $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '').slice(0, -1));
                            $mdKeyboard.currentModel.$validate();
                            $mdKeyboard.currentModel.$render();

                            break;

                        case "Enter":
                            if (element[0].nodeName.toUpperCase() != 'TEXTAREA') {
                                $timeout(function () {
                                    angular.element(element[0].form).triggerHandler('submit');
                                });
                            } else {
                                $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '') + "\n");
                                $mdKeyboard.currentModel.$validate();
                                $mdKeyboard.currentModel.$render();
                            }

                            break;

                        default:
                            $mdKeyboard.currentModel.$setViewValue(($mdKeyboard.currentModel.$viewValue || '') + key[0]);
                            $mdKeyboard.currentModel.$validate();
                            $mdKeyboard.currentModel.$render();

                            $scope.caps = false;
                    }
                };

                var _init = function () {
                    $scope.resolve = function () {
                        $mdKeyboard.hide('ok');
                    };
                    $scope.getKeyClass = getKeyClass;
                    $scope.keyboard = $mdKeyboard.getLayout($mdKeyboard.getCurrentLayout());
                    $scope.pressed = triggerKey;

                    $scope.$on('$mdKeyboardLayoutChanged', function ($event, layout) {
                        $scope.keyboard = $mdKeyboard.getLayout(layout);
                        $scope.$apply();
                    });
                };

                _init();
            }

            function _getCaretPosition() {
                if ('selectionStart' in element) {
                    return element.selectionStart;
                } else if (document.selection) {
                    element.focus();
                    var sel = document.selection.createRange();
                    var selLen = document.selection.createRange().text.length;
                    sel.moveStart('character', -element.value.length);
                    return sel.text.length - selLen;
                }
            }

            function hideKeyboard() {
                if ($rootScope.keyboardTimeout) {
                    $timeout.cancel($rootScope.keyboardTimeout);
                }
                $rootScope.keyboardTimeout = $timeout(function () {
                    $rootScope.keyboardAnimation = $mdKeyboard.hide();
                }, 200);
            }
        }
    }
}

})(angular);

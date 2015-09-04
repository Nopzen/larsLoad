/*
 * To my friend and colleague Lars Krieger who doesn't give any fucks.
 * @author  Rasmus Bangsted Pedersen
 * @github  https://github.com/rasmusbp
 */
(function larsLoading (win, doc) {

        var body = doc.getElementsByTagName('body')[0];

        var todaysLuckyNumber = getRandomNumber(10);

        var messages = [
                'So, you wanted me to load a JS file. Well too bad I couldn\'t care less for that shit.',
                'Nope. I\'m currently waiting for my train to Ringsted. Sooo, can\'t really deal with your script now.',
                'Get out of here. Your script is probably full of bugs anyway.',
                'Script loading? Nah, that\'s really not my thing.',
                'What? Load a script? Can\'t you just inline the shit or something?',
                'Who\'s lazy? You\'re the one using a lazy loader. Cunt.',
                'Boooyaa!! Almost loaded your script. But, then it hit me: I dont care!'
        ];

        var gifs = [
                'lRRyxHVuD8geI',
                '2rWAqlqMkBE1a',
                'hR45CIDrp2Iec',
                'Eufq2u6V4e4QE'
        ];

        var lazyOutcomes = [
                showRandomAlertMessage,
                renderCarelessGif,
                showAlertMessageAnBail
        ];

        win.larsLoading = function( path, done ) {

                var outcome = getRandomNumber( todaysLuckyNumber );

                done = done || noop;
                function cb( error, event ) {
                        return function() {
                                done.apply(null, [error].concat( (event ? [event] : Array.prototype.slice.call(arguments, 0)) ));
                        };
                }

                if ( lazyOutcomes[outcome] ) {
                        lazyOutcomes[outcome]();
                        cb(true, { type: 'no-fucks-given' })();
                        return;
                } 

                var script = loadScript( path );

                script.onload = cb(false);
                script.onerror = cb(true);

        }

        function showRandomAlertMessage() {
                var index = getRandomNumber( messages.length - 1 );
                showAlertMessage( messages[index] );    
        }

        function showAlertMessageAnBail() {
                showAlertMessage( 'I don\'t care for this shit. See ya!' );
                redirectTo( 'http://www.twitch.tv/' );
        }

        function renderCarelessGif() {

                var img = doc.createElement('img');
                var index = getRandomNumber( gifs.length - 1 ); 

                img.style.zIndex = 9999;
                img.style.position = 'fixed';
                img.src = 'https://media.giphy.com/media/' + gifs[index] + '/giphy.gif';
                prependToBody(img);

                setTimeout(function() {
                        img.remove();
                }, 10000);

        }

        function showAlertMessage( message ) {
                var preText = 'Attempting to load a script via larsLoading!'
                win.alert( preText + '\n\n' +  message);
        }

        function redirectTo( url ) {
                window.location = url;
        }

        function loadScript(path) {
                var tagNode = generateScriptNode(path);
                appendToBody( tagNode );
                return tagNode;
        }

        function generateScriptNode(path) {
                var node = doc.createElement('script');
                node.type = 'text/javascript';
                node.src = path + '.js';
                return node;
        }

        function appendToBody(node) {
                body.appendChild(node);
        }

        function prependToBody(node) {
                body.insertBefore(node, body.childNodes[0]);
        }

        function getRandomNumber( max ) {
                return Math.floor(Math.random() * (max + 1));
        }

        function noop() {}

})(window, document, undefined);
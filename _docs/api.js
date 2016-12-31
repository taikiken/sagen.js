YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Browser",
        "Classes",
        "Device",
        "Dom",
        "EventDispatcher",
        "Orientation",
        "Sagen",
        "Viewport"
    ],
    "modules": [
        "Classes",
        "Device",
        "Orientation",
        "Sagen",
        "Viewport"
    ],
    "allModules": [
        {
            "displayName": "Classes",
            "name": "Classes",
            "description": "html tag へ class を付与します"
        },
        {
            "displayName": "Device",
            "name": "Device",
            "description": "端末判定を行います"
        },
        {
            "displayName": "Orientation",
            "name": "Orientation",
            "description": "orientation 監視"
        },
        {
            "displayName": "Sagen",
            "name": "Sagen",
            "description": "## Browser detect helper\n\nhtmlタグへCSS classをセットします。<br>\nscriptタグdata属性から追加classをセットします<br>\n\n\n     <script type=\"text/javascript\" src=\"/js/sagen.min.js\"\n         id=\"sagen\"\n         data-orientation=\"true\"\n         data-browser=\"true\">\n     </script>\n\n\n     // html へ class を追加した例\n     // OS X Chrome\n\n     <html class=\"transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl\">\n\n\n     // Browser / 端末判定にも使えます\n\n     if ( Sagen.Browser.iOS.is() ) {\n       // iOS\n     }\n\n\n     // orientation 監視にも使えます(iOS, Android)\n     var Orientation = Sagen.Orientation;\n\n\n     Orientation.on( Orientation.CHANGE_ORIENTATION, function ( event ) {\n\n       var direction = event.direction;\n\n       if ( direction === 'portrait' ) {\n         // portrait\n       }\n\n       if ( direction === 'landscape' ) {\n         // landscape\n       }\n\n     } );\n\n     Orientation.listen();"
        },
        {
            "displayName": "Viewport",
            "name": "Viewport",
            "description": "meta viewport rewrite / write"
        }
    ],
    "elements": []
} };
});
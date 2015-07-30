YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Classes",
        "Device",
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
            "description": "license inazumatv.com\nauthor (at)taikiken / http://inazumatv.com\ndate 2015/04/10 - 16:02\n\nCopyright (c) 2011-2015 inazumatv.com, inc.\n\nDistributed under the terms of the MIT license.\nhttp://www.opensource.org/licenses/mit-license.html\n\nThis notice shall be included in all copies or substantial portions of the Software."
        },
        {
            "displayName": "Device",
            "name": "Device",
            "description": "license inazumatv.com\nauthor (at)taikiken / http://inazumatv.com\ndate 2015/04/10 - 15:34\n\nCopyright (c) 2011-2015 inazumatv.com, inc.\n\nDistributed under the terms of the MIT license.\nhttp://www.opensource.org/licenses/mit-license.html\n\nThis notice shall be included in all copies or substantial portions of the Software."
        },
        {
            "displayName": "Orientation",
            "name": "Orientation",
            "description": "license inazumatv.com\nauthor (at)taikiken / http://inazumatv.com\ndate 2015/04/10 - 19:33\n\nCopyright (c) 2011-2015 inazumatv.com, inc.\n\nDistributed under the terms of the MIT license.\nhttp://www.opensource.org/licenses/mit-license.html\n\nThis notice shall be included in all copies or substantial portions of the Software."
        },
        {
            "displayName": "Sagen",
            "name": "Sagen",
            "description": "htmlタグへCSS classをセットします。<br>\n scriptタグdata属性から追加classをセットします<br>\n\n     <script type=\"text/javascript\" src=\"/js/sagen.min.js\"\n          id=\"sagen\"\n          data-orientation=\"true\"\n          data-browser=\"true\">\n      </script>\n\n     // html へ class を追加した例\n      // OS X Chrome\n     <html class=\"transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl\">\n\n     // Browser / 端末判定にも使えます\n     if ( Sagen.Browser.iOS.is() ) {\n        // iOS\n      }\n\n     // orientation 監視にも使えます(iOS, Android)\n      var Orientation = Sagen.Orientation;\n\n     Orientation.on( Orientation.CHANGE_ORIENTATION, function ( event ) {\n       var direction = event.direction;\n       if ( direction === 'portrait' ) {\n          // portrait\n        }\n       if ( direction === 'landscape' ) {\n          // landscape\n        }\n     } );\n     Orientation.listen();"
        },
        {
            "displayName": "Viewport",
            "name": "Viewport",
            "description": "license inazumatv.com\nauthor (at)taikiken / http://inazumatv.com\ndate 2015/04/10 - 18:48\n\nCopyright (c) 2011-2015 inazumatv.com, inc.\n\nDistributed under the terms of the MIT license.\nhttp://www.opensource.org/licenses/mit-license.html\n\nThis notice shall be included in all copies or substantial portions of the Software."
        }
    ]
} };
});
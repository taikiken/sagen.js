Sagen.js
========

device detector, viewport write and rewrite

# 使用方法
`<script type="text/javascript" src="/js/sagen-VERSION.min.js" id="sagen" data-orientation="true" data-android="true" data-ios="true" data-canvas="true"></script>`


id: sagen に設定します。
html tag へ端末情報に基づくCSS classを書き込みます。


**iOS**
* ios
* mobile
* tablet
* iosVERSION_NUMBER(Full)
* iosVERSION_NUMBER(Major)
* iosVERSION_NUMBER(Major+Minor)

**Android**
* android
* mobile
* tablet
* androidVERSION_NUMBER(Full)
* androidVERSION_NUMBER(Major)
* androidVERSION_NUMBER(Major+Minor)

**Touch**
* touch （touche event が使用可能な場合）

**onorientationchange**
* orientation-change （onorientationchange eventが使用可能な場合）

**orientation**
* orientation （orientation: portrait / landscape が有効な場合）

## オプション
**data-orientation**


trueに設定するとorientationchangeあるいはwindow.resizeを監視しportrait / landscapeを切り替えます。


**data-canvas**


trueに設定するとcanvas, webgl使用判定を行います
* canvas
* webgl


# viewport
**data-android**


trueに設定するとAndroid端末でChromeでない場合viewportへtarget-densitydpi=device-dpiを追加します。


**data-ios**


trueに設定するとiOSでiOS 7.1以上の場合にviewportへminimal-uiを追加します。
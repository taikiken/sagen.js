Sagen.js
========

device detector, viewport write and rewrite

html tag へ端末情報に基づくCSS classを書き込みます。

original idea from [device.js](https://github.com/matthewhudson/device.js).

# 使用方法
    <script type="text/javascript" src="/js/sagen-VERSION.min.js"
        id="sagen"
        data-orientation="true"
        data-android="true"
        data-ios="true"
        data-canvas="true">
    </script>


script は viewport 指定の後にリンクして下さい。

id: **sagen** に設定します。

**iOS**

* ios
* mobile
* tablet
* ios+VERSION_NUMBER(Major+Minor+Build)
* ios+VERSION_NUMBER(Major)
* ios+VERSION_NUMBER(Major+Minor)

**Android**

* android
* mobile
* tablet
* android+VERSION_NUMBER(Major+Minor+Build)
* android+VERSION_NUMBER(Major)
* android+VERSION_NUMBER(Major+Minor)

**Touch**

* touch （touche event が使用可能な場合）

**onorientationchange**

* orientation-change （onorientationchange eventが使用可能な場合）

**orientation**

* orientation （orientation: portrait / landscape が有効な場合）

## オプション
**data-orientation**

trueに設定するとorientationchangeあるいはwindow.resizeを監視しportrait / landscape CSS classを切り替えます。

Sagen.Device.CHANGE_ORIENTATIONをaddEventListenerしevent通知を受け取ることも可能です。

    function _onOrientation ( eventObj ) {
        var direction = eventObj.params[ 0 ];

        console.log( direction );// portrait / landscape
    }

    Sagen.Device.addEventListener( Sagen.Device.CHANGE_ORIENTATION, _onOrientation );

**data-canvas**

trueに設定するとcanvas, webgl使用判定を行います

* canvas
* webgl


# viewport
**data-android**

trueに設定するとAndroid端末でChromeでない場合viewportへtarget-densitydpi=device-dpiを追加します。


**data-ios**

trueに設定するとiOSでiOS 7.1以上の場合viewportへminimal-uiを追加します。


## API
* write

meta name:viewport タグを書き込む。

dataset option は無視されます。

    Sagen.Viewport.write( "width=device-width, user-scalable=yes" );

* add

viewport へ指定オプションを追加します。

    Sagen.Viewport.add( "initial-scale=1" );

* replace

viewport へ指定オプションを変更します。

    // device-width を 320へ変更
    Sagen.Viewport.replace( "device-width", 320 );

    // initial-scale=1 を initial-scale=2 へ変更
    Sagen.Viewport.replace( "initial-scale=1", "initial-scale=2" );

* rewrite

meta viewport contentを全て書き換えます。

* Viewport.Android.targetDensity

viewport へ target-densitydpi=device-dpi を追加します。

    Viewport.Android.targetDensity();

* Viewport.iOS.minimalUI

viewport へ minimal-ui を追加します。

    Viewport.iOS.minimalUI();

## API Docs
docsフォルダzipを解凍しお使い下さい。
Sagen.js
========

device detector, viewport write and rewrite

html tag へ端末情報に基づくCSS classを書き込みます。

original idea from [device.js](https://github.com/matthewhudson/device.js).

# 使用方法
    <script type="text/javascript" src="/js/sagen.min.js"
        id="sagen"
        data-orientation="true"
        data-ios="true"
        data-canvas="true"
        data-browser="true"
        >
    </script>
    
script は viewport 指定の後にリンクして下さい。

id: **sagen** に設定します。

【必須】
id#sagen 

## 標準(default)
- SP 端末判定  
    iphone, ipad, ipod, mobile, tablet
    
- SP OS 判定  
    ios, android, ios_OS_VERSION, android_OS_VERSION
    
- SP Browser 判定  
    safari, chrome, android-standard
    
- transition, transform, background-size, matchMedia, orientation, orientation-change 判定

## data-オプション

- browser  
PC Browser 判定し class を設定します。

- ios  
iOS 7.1 時のみ viewport へ minimal-ui を追加します

- canvas  
canvas, web-gl 使用可否判定します

- orientation  
orientation-change(window.resize)を監視し portrait. landscape を随時変更します


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

**data-browser**

trueに設定すると UA より PC ブラウザ判定を行います  
PC OS も判定します。

* windows
* mac
* ie
* chrome
* firefox
* safari

ブラウザ名+VERSION 形式でバージョン付も出力します。

* ブラウザ名+VERSION_NUMBER(Major)
* ブラウザ名+VERSION_NUMBER(Major_Minor_Build)

# viewport
**data-android**

~~trueに設定するとAndroid端末でChromeでない場合viewportへtarget-densitydpi=device-dpiを追加します。~~

副作用が強いため廃止しました。


**data-ios**

trueに設定するとiOSでiOS 7.1~~以上~~の場合viewportへminimal-uiを追加します。

minimal-ui option は iOS 8 で廃止になりました。  
[iOS 8 Release Notes](https://developer.apple.com/library/prerelease/ios/releasenotes/General/RN-iOSSDK-8.0/)


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

~~viewport へ target-densitydpi=device-dpi を追加します。~~

    Viewport.Android.targetDensity();

廃止しました。

* Viewport.iOS.minimalUI

viewport へ minimal-ui を追加します。

    Viewport.iOS.minimalUI();

iOS 7.1 のみ対応しています。

## API Docs
docsフォルダzipを解凍しお使い下さい。
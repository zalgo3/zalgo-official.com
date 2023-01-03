---
title: "【IoT】Nature Remo×Alexa×IFTTTで家にリモコンはもう不要です【スマートホーム】"
---

どうも，京大博士課程のざるご( [@zalgo_sogo](https://www.twitter.com/zalgo_sogo) )です．

みなさんは，**リモコン**って使いますか？

電気をつけるときにピッ．エアコンをつけるときにピッ．
生活を送る上で，リモコンは欠かせない存在です．

ところが，**リモコンって失くしませんか？**

「あれ，リモコンどこいったっけ？」となり，結局立ち上がってスイッチをパチパチ．
はっきりいってストレスが溜まります．

そこで私ざるご，もうこんな日々はゴメンだ！と思った私ざるご，決意しました．

<span style="font-size: 36px" class="font-size"><span style="color: #20a39e" class="text-color">家の中から，リモコンを撤廃します！

この記事では，スマートホーム化により**「リモコンを捨てる方法」**を解説します．

## 「Nature Remo」でスマホをリモコン代わりに

リモコンをなくすには，**リモコンの代わりになるもの**が必要です．

そこで購入したのがこちら．

[amazon asin="B08P6ZSXWZ" kw="Nature Remo"]

**スマートリモコン「Nature Remo」**です．

スマートリモコンとは，スマホから操作することで
リモコンと同じ赤外線を出す事のできる装置です．
つまり，スマホがリモコンの代わりになるというわけです．

こいつのすごいのが，リモコンで操作できるあらゆる機器を操作できます．
当然，うちにあるシーリングライトやエアコン，テレビにも使えました．

これならひとまず，リモコンを捨てられます．
スマホ一台で済むなら失くす心配は少ないですね．

ちなみに，スマートリモコンには他にも
eRemoteやラトックといった商品がありますが，
2chの学習リモコンスレで一番評判が良かったのがNature Remoだったので，
今回はNature Remoを購入しました．

## Alexa×Nature Remoでスマホさえ要らない

このNature Remo，便利なことにGoogle HomeやAlexa (Amazon Echo)にも対応しています．

うちにはセールで購入したAmazon Echo Dotがいるので，こいつとの連携にチャレンジしました．

[amazon asin="B07PFFMQ64" kw="Echo Dot"]

Alexaアプリから，「Nature Remo」のスキルを追加すると，
「アレクサ，リモで電気をつけて」
で電気が付きます．

これでスマホも要りませんね（ニッコリ

## IFTTT×Alexa×Nature RemoでIoTの化身となれ

Alexaスキルでスマホ要らずになったわけですが，
いちいち「リモで」をつけなければいけないのが個人的に気に入りませんでした．

「アレクサ，電気をつけて」だけで電気がついてほしい．

でもそんな便利なツールが世の中にあるわけ…あるわけ…

<span style="color: #20a39e" class="text-color"><span style="font-size: 36px" class="font-size">あった！

あらゆるものを自動化できる無料アプリ**「IFTTT（イフト）」**を使います．

IFTTTは，指定したトリガーが検出されたら，指定したアクションを起こすことの出来るツールです．

今回は，「アレクサに「電気つけて」と言ったら，Nature Remoで電気をつける」という作業を，
このIFTTTを使って自動化してみました．

IFTTTの使い方については，↓のサイトが詳しいのでご参考にどうぞ．

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-none">

https://chasuke.com/smarthome-ifttt/

</div>

サイトを参考に，自動化のトリガーを検出する画面まで行きます．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180444-485x1024.png)</figure>

まず，Thisと書かれたところを選び，検索窓に「Alexa」と入力．
Amazon Alexaを選択します．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180527-485x1024.png)</figure>

Say a specific phrase （特定のフレーズを言ったら）を選択します．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180530-485x1024.png)</figure>

入力欄に，トリガーにしたい言葉（今回は「電気つけて」）を入力し，Continueを押します．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180540-485x1024.png)</figure>

次に，Thatと書かれたところを選び，検索窓に「nature remo」と入力．
Nature Remoを選択します．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180546-1-485x1024.png)</figure>

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180603-485x1024.png)</figure>

今回は電気を操作したいので，Control light（明かりを操作）を選択します．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180609-485x1024.png)</figure>

Please selectの中から，寝室の照明（ここは人によって違う） - ONを選択します．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-180617-485x1024.png)</figure>

これでIFTTTにトリガーを設定できました！

最後にAlexaアプリで定形アクションを設定し，
「アレクサ，電気つけて」でIFTTTを呼び出せるようにします．

<figure class="wp-block-image size-large is-resized">![](https://zalgo-official.com/img/Screenshot_20200429-182500-485x1024.png)</figure>

これで「リモで」という必要がなくなりました！

## まとめ

* スマートリモコンの「Nature Remo」
* スマートスピーカーの「Alexa (Amazon Echo)」(Google Homeでも可)
* 無料アプリの「[IFTTT](https://ifttt.com/)」

これらを組み合わせることで，リモコンを失くす悩みから永遠に解き放たれます．

皆さんも是非，スマートホーム化にチャレンジしてみてはいかがでしょうか？
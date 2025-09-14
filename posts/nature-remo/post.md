---
title: '【IoT】Nature Remo×Alexa×IFTTTで家にリモコンはもう不要です【スマートホーム】'
---

どうも，京大博士課程のざるご( [@zalgo_sogo](https://www.twitter.com/zalgo_sogo) )です．

みなさんは，**リモコン**って使いますか？

電気をつけるときにピッ．エアコンをつけるときにピッ．
生活を送る上で，リモコンは欠かせない存在です．

ところが，**リモコンって失くしませんか？**

「あれ，リモコンどこいったっけ？」となり，結局立ち上がってスイッチをパチパチ．
はっきりいってストレスが溜まります．

そこで私ざるご，もうこんな日々はゴメンだ！と思った私ざるご，決意しました．

家の中から，リモコンを撤廃します！

この記事では，スマートホーム化により**「リモコンを捨てる方法」**を解説します．

## 「Nature Remo」でスマホをリモコン代わりに

リモコンをなくすには，**リモコンの代わりになるもの**が必要です．

そこで購入したのがこちら．

<Affiliates asin="B08P6ZSXWZ" query="Nature Remo" />

**スマートリモコン「Nature Remo」**です．

スマートリモコンとは，スマホから操作することで
リモコンと同じ赤外線を出す事のできる装置です．
つまり，スマホがリモコンの代わりになるというわけです．

こいつのすごいのが，リモコンで操作できるあらゆる機器を操作できます．
当然，うちにあるシーリングライトやエアコン，テレビにも使えました．

これならひとまず，リモコンを捨てられます．
スマホ一台で済むなら失くす心配は少ないですね．

ちなみに，スマートリモコンには他にも
eRemote やラトックといった商品がありますが，
2ch の学習リモコンスレで一番評判が良かったのが Nature Remo だったので，
今回は Nature Remo を購入しました．

## Alexa×Nature Remo でスマホさえ要らない

この Nature Remo，便利なことに Google Home や Alexa (Amazon Echo)にも対応しています．

うちにはセールで購入した Amazon Echo Dot がいるので，こいつとの連携にチャレンジしました．

<Affiliates asin="B07PFFMQ64" query="Echo Dot" />

Alexa アプリから，「Nature Remo」のスキルを追加すると，
「アレクサ，リモで電気をつけて」
で電気が付きます．

これでスマホも要りませんね（ニッコリ

## IFTTT×Alexa×Nature Remo で IoT の化身となれ

Alexa スキルでスマホ要らずになったわけですが，
いちいち「リモで」をつけなければいけないのが個人的に気に入りませんでした．

「アレクサ，電気をつけて」だけで電気がついてほしい．

でもそんな便利なツールが世の中にあるわけ…あるわけ…

あった！

あらゆるものを自動化できる無料アプリ**「IFTTT（イフト）」**を使います．

IFTTT は，指定したトリガーが検出されたら，指定したアクションを起こすことの出来るツールです．

今回は，「アレクサに「電気つけて」と言ったら，Nature Remo で電気をつける」という作業を，
この IFTTT を使って自動化してみました．

IFTTT の使い方については，↓ のサイトが詳しいのでご参考にどうぞ．

https://chasuke.com/smarthome-ifttt/

サイトを参考に，自動化のトリガーを検出する画面まで行きます．

![](https://zalgo-official.com/img/Screenshot_20200429-180444-485x1024.png)

まず，This と書かれたところを選び，検索窓に「Alexa」と入力．
Amazon Alexa を選択します．

![](https://zalgo-official.com/img/Screenshot_20200429-180527-485x1024.png)

Say a specific phrase （特定のフレーズを言ったら）を選択します．

![](https://zalgo-official.com/img/Screenshot_20200429-180530-485x1024.png)

入力欄に，トリガーにしたい言葉（今回は「電気つけて」）を入力し，Continue を押します．

![](https://zalgo-official.com/img/Screenshot_20200429-180540-485x1024.png)

次に，That と書かれたところを選び，検索窓に「nature remo」と入力．
Nature Remo を選択します．

![](https://zalgo-official.com/img/Screenshot_20200429-180546-1-485x1024.png)

![](https://zalgo-official.com/img/Screenshot_20200429-180603-485x1024.png)

今回は電気を操作したいので，Control light（明かりを操作）を選択します．

![](https://zalgo-official.com/img/Screenshot_20200429-180609-485x1024.png)

Please select の中から，寝室の照明（ここは人によって違う） - ON を選択します．

![](https://zalgo-official.com/img/Screenshot_20200429-180617-485x1024.png)

これで IFTTT にトリガーを設定できました！

最後に Alexa アプリで定形アクションを設定し，
「アレクサ，電気つけて」で IFTTT を呼び出せるようにします．

![](https://zalgo-official.com/img/Screenshot_20200429-182500-485x1024.png)

これで「リモで」という必要がなくなりました！

## まとめ

- スマートリモコンの「Nature Remo」
- スマートスピーカーの「Alexa (Amazon Echo)」(Google Home でも可)
- 無料アプリの「[IFTTT](https://ifttt.com/)」

これらを組み合わせることで，リモコンを失くす悩みから永遠に解き放たれます．

皆さんも是非，スマートホーム化にチャレンジしてみてはいかがでしょうか？

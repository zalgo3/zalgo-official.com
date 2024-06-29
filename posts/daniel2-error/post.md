---
title: '【Premiere Pro 2020】GPUエンコードのプラグイン「Daniel2」のライセンス認証で詰まった【未解決】'
---

どうも，ざるご([@zalgo_sogo](https://www.twitter.com/zalgo_sogo))です．

先日，RTX2060 というグラフィックボードを購入しました．

30000 円台で購入可能な割にハイパワーで，これまでよりも動画編集ソフトなどがサクサク動くようになり，非常に満足しています．

せっかくなので，動画を出力する際にも，GPU を使うことで高速化ができないだろうかと考えました．

<Affiliates asin="B07N7PWNGS" query="MSI RTX2060" />

調べてみると，Premiere Pro 本体の機能で GPU エンコードを行うことはできないらしく，「_Cinegy DANIEL2 Adobe Codec Pack_」というプラグインを導入する必要があるらしいことがわかりました．

そこで，[こちら](https://fabrec.jp/2017/11/28/daniel2-install/)のブログを参考に，ソフトのインストール，ライセンス認証まで済ませました．

![](https://zalgo-official.com/img/daniel2-1024x492.png)

すると，こんな感じで，これまで H.264 を選んでいたところに新しい形式が 3 つ追加されています．

こちらを選んでいよいよ GPU エンコード！と思い，「Cinegy H.264」を選択したのですが，ここで問題発生

![](https://zalgo-official.com/img/novalidlicense.png)

にゃーんとなってライセンスを確認しましたが，きちんと認証されているはず．

![](https://zalgo-official.com/img/daniel2_license.png)

どうも，ライセンスマネージャに出ている Machine ID と，エラー発生時に出ている Machine ID が異なるようで，それがエラーの原因なのかもしれないです．

Premiere Pro CC 2019 用のプラグインだそうなので，Premiere Pro 2020 で動かすのは無理なのかな？

ただ所詮エンコードだけの問題なので，2019 にダウングレードする気も起こらず…（しても動かないかもしれないし）

だれか同様の問題にぶつかった人がいたら教えてほしいです＞＜

それでは．

**追記**

Daniel 2 がアップグレードされ，2020 対応になったようですが相変わらず無理でした．ぴえん

追記 2

Windows10 のクリーンインストールで解決しました．結局何が原因だったのか…

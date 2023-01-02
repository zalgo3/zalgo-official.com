---
title: "【Premiere Pro 2020】GPUエンコードのプラグイン「Daniel2」のライセンス認証で詰まった【未解決】"
---

どうも，ざるご([@zalgo_sogo](https://www.twitter.com/zalgo_sogo))です．

先日，RTX2060というグラフィックボードを購入しました．

30000円台で購入可能な割にハイパワーで，これまでよりも動画編集ソフトなどがサクサク動くようになり，非常に満足しています．

せっかくなので，動画を出力する際にも，GPUを使うことで高速化ができないだろうかと考えました．

[amazon asin="B07N7PWNGS" kw="MSI RTX2060"]

調べてみると，Premiere Pro本体の機能でGPUエンコードを行うことはできないらしく，「_Cinegy DANIEL2 Adobe Codec Pack_」というプラグインを導入する必要があるらしいことがわかりました．

そこで，[こちら](https://fabrec.jp/2017/11/28/daniel2-install/)のブログを参考に，ソフトのインストール，ライセンス認証まで済ませました．

<figure class="wp-block-image size-large">![](https://zalgo-official.com/img/daniel2-1024x492.png)

<figcaption>赤枠が今回インストールしたもの．「Cinegy Daniel2」「Cinegy H.264」「Cinegy HEVC (H.265)」</figcaption>

</figure>

すると，こんな感じで，これまでH.264を選んでいたところに新しい形式が3つ追加されています．

こちらを選んでいよいよGPUエンコード！と思い，「Cinegy H.264」を選択したのですが，ここで問題発生

<figure class="wp-block-image size-large">![](https://zalgo-official.com/img/novalidlicense.png)</figure>

にゃーんとなってライセンスを確認しましたが，きちんと認証されているはず．

<figure class="wp-block-image size-large">![](https://zalgo-official.com/img/daniel2_license.png)</figure>

どうも，ライセンスマネージャに出ているMachine IDと，エラー発生時に出ているMachine IDが異なるようで，それがエラーの原因なのかもしれないです．

Premiere Pro CC 2019用のプラグインだそうなので，Premiere Pro 2020で動かすのは無理なのかな？

ただ所詮エンコードだけの問題なので，2019にダウングレードする気も起こらず…（しても動かないかもしれないし）

だれか同様の問題にぶつかった人がいたら教えてほしいです＞＜

それでは．

**追記**

Daniel 2がアップグレードされ，2020対応になったようですが相変わらず無理でした．ぴえん

追記2

Windows10のクリーンインストールで解決しました．結局何が原因だったのか…
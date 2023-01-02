---
title: "ブラックホール撮影にも使える「スパースモデリング」とは？【機械学習】"
---

どうもざるご（[@zalgo3](https://twitter.com/zalgo3)）です．

世界初のブラックホール撮影の成功例が出たようです．

[ブラックホールの撮影に成功 世界初 一般相対性理論を証明 - 毎日新聞](https://mainichi.jp/articles/20190410/k00/00m/040/249000c)

今回のブラックホール撮影は，**スパースモデリング**という機械学習技術を取り入れたことによる貢献が大きいようです．

天文学に計算機科学の知識が取り入れられて，大きな成果が出たというのは，驚くべきことだと思います．

今回はそんな大成功を巻き起こした「スパースモデリング」について解説していきます．

## スパースモデリングとは

スパースモデリングとは，誤解を恐れずにざっくりいうと**解けない連立一次方程式を無理やり解くための仕組み**です．

次のような連立一次方程式を考えます．

![ Ax = y](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax%20%3D%20y)

この方程式は，![ A](https://chart.apis.google.com/chart?cht=tx&chl=%20A)が逆行列を持つときに解くことができて，

![ x = A^{-1} y](https://chart.apis.google.com/chart?cht=tx&chl=%20x%20%3D%20A%5E%7B-1%7D%20y)

となります．では，![ A](https://chart.apis.google.com/chart?cht=tx&chl=%20A)が逆行列を持たないときはどうなるでしょうか？

高校や大学1年生で習った数学では，そういう連立方程式は解けないと習ったと思います．「不能」とか「不定」とかいうやつですね．

ただ，実用上の観点からいうと，せっかく式があるのにハイ解けませんで片付けてしまうのは少々もったいないところがあるんですよね．

そこで登場するのが**スパースモデリング**です．スパースモデリングでは，以下の2つを仮定することによって解なしの連立一次方程式でも無理やり解を求めてしまいます．

1. ![ Ax = y](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax%20%3D%20y)が完全に満たされなくてもよく，![ Ax \approx y](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax%20%5Capprox%20y)と近似的に成り立てばよいものとする．
2. ![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)が**スパース（疎）**であるとする．

スパース（疎）というのは人によってはあまり馴染みのない表現かもしれません．

スパースというのは，**疎**という字からも連想されるように，**データ(0以外の要素)がまばら**であることをいいます．

ベクトル![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)がスパースであるというのは，![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)の要素のほとんどが0で，0以外の要素がちょっとだけある，つまり

![ x = (0, \dots, 0, a, 0 , \dots, 0, b, 0, \dots )^\top](https://chart.apis.google.com/chart?cht=tx&chl=%20x%20%3D%20%280%2C%20%5Cdots%2C%200%2C%20a%2C%200%20%2C%20%5Cdots%2C%200%2C%20b%2C%200%2C%20%5Cdots%20%29%5E%5Ctop)

のようなベクトルであるということです．

実世界で観測されるデータには，スパースなものが多いということが知られています．

今回の研究で扱われた**宇宙の観測データ**も，スパースなデータの1つです．

広大な宇宙は、ほとんど真っ暗な世界です。この中の限られた部分だけが天体として観測されるわけで、そうした意味でスパース性を仮定することは妥当だといえるでしょう.

では具体的にこれをどう解くか，というところを順を追って解説していきます．まず1から．

なるべく![ Ax](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax)が![ y](https://chart.apis.google.com/chart?cht=tx&chl=%20y)に近づくような![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)を手に入れたいわけです．そこで，次の関数を最小化することを考えます．

![ ||Ax - y||^2_2](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7CAx%20-%20y%7C%7C%5E2_2)

![ ||x||_2](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7Cx%7C%7C_2)という記号は見慣れない人もいるかも知れませんが，高校で習うベクトルの絶対値![ |\vec{x}|](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%5Cvec%7Bx%7D%7C)と同じです．つまり，上の問題の意味は，![ Ax - y](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax%20-%20y)の各成分の二乗和（二乗誤差）を最小化するという意味になります．

二乗和は必ず0以上となるので，この関数を最小化すれば0に近い値が得られるはずです．したがって，![ Ax \approx y](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax%20%5Capprox%20y)となるような![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)が得られるという理屈になります．

この方法を**最小二乗法 (Least Squares Method)**といいます．

しかし，これだけでは![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)がスパースになってくれるとは限りません．そこでさっきの関数の代わりに次の関数を考えます．

![ ||Ax - y||^2_2 + c ||x||_0](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7CAx%20-%20y%7C%7C%5E2_2%20%2B%20c%20%7C%7Cx%7C%7C_0)

![ c > 0](https://chart.apis.google.com/chart?cht=tx&chl=%20c%20%3E%200)は適当な正の定数を表します．

![ ||x||_0](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7Cx%7C%7C_0)

というのは，![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)の非ゼロ要素の個数を表す記号です（L0ノルムという）．たとえば![ x = (0, 2, 0)^\top](https://chart.apis.google.com/chart?cht=tx&chl=%20x%20%3D%20%280%2C%202%2C%200%29%5E%5Ctop)のとき，![ ||x||_0 = 1](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7Cx%7C%7C_0%20%3D%201)となります．

最小二乗法と違って，二乗誤差と一緒に非ゼロ要素の個数を最小化することになるので，非ゼロ要素の数が少ないスパースな解が得られます．

しかし，「非ゼロ要素の数」というのは連続的に変化せず，数学的に結構扱いづらい性質を持っています．そこでこれと似たような問題として，

![ ||Ax - y||^2_2 + c ||x||_1](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7CAx%20-%20y%7C%7C%5E2_2%20%2B%20c%20%7C%7Cx%7C%7C_1)

の最小化を考えることがあります．

![ ||x||_1](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7Cx%7C%7C_1)は，![ x](https://chart.apis.google.com/chart?cht=tx&chl=%20x)の各成分の絶対値の総和を表します（L1ノルムという）．

この問題も，解がスパースになるということがよく知られています．

さっきのL0ノルムと違って，L1ノルムは連続で扱いやすいため，こちらの問題が実用上はよく扱われます．

この問題を，**LASSO (Least Absolute Shrinkage and Selection Operator)**といいます．

さて，ここまでざっくりとしたアイデアを説明してきましたが，次は**このアイデアをブラックホール観測にどう活かしたのか？**ということについて説明していきます．

## ブラックホールとスパースモデリング

アインシュタインの相対性理論や，重力波の観測などの実験結果から，ブラックホールが存在することはほぼ確実とされています．

そこで近年では，ブラックホールが作り出す影（ブラックホールシャドウ）を撮影することで，ブラックホールの存在を立証しようという計画が進められてきました．

ブラックホール観測を成功させるための秘訣は，望遠鏡の**空間分解能をあげること**にあります．

「空間分解能」というのは，<span style="color: #20a39e;">**近接した2点をきちんと2点として認識できる能力**</span>，という意味です．

たとえば道路に家が2軒並んでいるような状況を考えましょう．

近所から見ると，「家が2軒あるな」ということはすぐにわかります．しかし，これを遠く離れた宇宙から見るとどうでしょうか？

おそらく人間の目では家が2軒あることを認識するのは不可能でしょう．では，望遠鏡で見るとどうでしょうか？

宇宙から撮影された衛星写真を見ると，家が2軒あることくらいは余裕で識別することができます．

この二つの違いを生じさせるのが**空間分解能**です．望遠鏡は，人間の目に比べて非常に高い空間分解能を持っています．

しかしそんな天体望遠鏡の空間分解能でも，ブラックホールを観測するには全く歯が立ちません．

ブラックホールとブラックホールの距離は，約1光年と言われています．一方，ブラックホールが存在する可能性のある銀河系で，地球から最も近いものでも，<span style="color: #ff4e00;">**239万光年**</span>離れていると言われています．

スケールがでかすぎてよくわかりませんが，239km先にある1cm間隔のパチンコ玉を識別できるかと聞かれれば，その無理ゲーさが理解できると思います．

しかし，この無理ゲーを解決してこそ科学者です．そこで使われた解決策が，**電波干渉計**，そして**スパースモデリング**です．

まず電波干渉計について．これは2つ以上の電波望遠鏡を連動させて，**波の干渉**を用いて空間分解能を向上させる技術です．

「波の干渉」といったら，高校物理を履修していた人は一度は聞いたことがあると思います．**ヤングの干渉実験**とかが有名なやつですね．

光は波の性質を持っているので，干渉が起こります．電波干渉計のアイデアは，2つの望遠鏡で観測された波が干渉したときの時間差を測定することで，波がどちらの方向から来たかを割り出すというところにあります．

この技術によって，空間分解能は飛躍的に上がります．

しかし，ブラックホールの観測にはこれだけじゃまだ足りないのです．ブラックホール恐るべし．

そこで近年になって注目されてきたのが，**スパースモデリング**です．

ブラックホール観測にスパースモデリングをどう用いるか，ぼくも完全に理解しているわけではないですが，ざっくりと書きます．

まず，電波干渉計で観測されたデータ![ V](https://chart.apis.google.com/chart?cht=tx&chl=%20V)というのは，実際の天体画像![ I](https://chart.apis.google.com/chart?cht=tx&chl=%20I)に，観測行列（フーリエ変換）![ F](https://chart.apis.google.com/chart?cht=tx&chl=%20F)をかけてやったものと考えられます．つまり，

![ V = FI](https://chart.apis.google.com/chart?cht=tx&chl=%20V%20%3D%20FI)

です．

目標は，天体画像![ I](https://chart.apis.google.com/chart?cht=tx&chl=%20I)を，**なるべく高解像度で**復元してやることとなります．（空間分解能をあげるため）

基本的に望遠鏡の数はそんなにたくさんは使えないので，![ F](https://chart.apis.google.com/chart?cht=tx&chl=%20F)の逆行列を求めて方程式をそのまま解くという方法は使えません．

そこで生きるのがさっきの**スパースモデリング**です．

次の関数を最小化して（LASSO），天体画像を復元してやります．

![ ||V - FI||^2_2 + c ||I||_1](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7CV%20-%20FI%7C%7C%5E2_2%20%2B%20c%20%7C%7CI%7C%7C_1)

この方法により，実際に研究チームが復元した画像がこちらです[*1](#f-91148316 "本間ら「スパースモデリング天文学 — ブラックホール撮像から時間変動減少まで」，科学研究費補助金新学術領域研究「スパースモデリングの深化と高次元データ駆動科学の創成」最終成果報告会 (2017/12/18-20) ")．

この研究からさらに様々な改良が重ねられ，今回の報道が合ったような大発見につながったようです．

## まとめ

5000文字を超える長文記事になってしまいましたが，今回の大発見のすばらしさ，そして**スパースモデリングの魅力**について少しでも伝えられていたら幸いです．

まだぼくもスパースモデリングについては勉強中の身なので，間違っている点等あったら申し訳ないです．ぜひコメントとかで教えてくださると嬉しいです．

また，この記事でスパースモデリングに興味を持った人向けに，入門の教科書のリンクをいくつか貼っておきます．一緒に勉強しよう！

#### スパース推定法による統計モデリング (統計学One Point)

スパースモデリングで用いられるモデルがざっくりと書いてある本．
細かい証明等はほとんどないが，イメージを掴むのにおすすめ．

<div class="hatena-asin-detail">[![スパース推定法による統計モデリング (統計学One Point)](https://images-fe.ssl-images-amazon.com/images/I/41V4DKzqv0L._SL160_.jpg "スパース推定法による統計モデリング (統計学One Point)")](http://www.amazon.co.jp/exec/obidos/ASIN/4320112571/galavollc-22/)

<div class="hatena-asin-detail-info">

[スパース推定法による統計モデリング (統計学One Point)](http://www.amazon.co.jp/exec/obidos/ASIN/4320112571/galavollc-22/)

* <span class="hatena-asin-detail-label">作者:</span> 川野秀一,松井秀俊,廣瀬慧
* <span class="hatena-asin-detail-label">出版社/メーカー:</span> 共立出版
* <span class="hatena-asin-detail-label">発売日:</span> 2018/03/08
* <span class="hatena-asin-detail-label">メディア:</span> 単行本
* [この商品を含むブログを見る](http://d.hatena.ne.jp/asin/4320112571/galavollc-22)

</div>

<div class="hatena-asin-detail-foot"> </div>

</div>

#### スパースモデリング- 基礎から動的システムへの応用

基礎から応用までしっかり書かれている本．
ソースコード例も載っているので，実際にプログラムを実装しながら学びたい人にはおすすめ．

<div class="hatena-asin-detail">[![スパースモデリング- 基礎から動的システムへの応用 -](https://images-fe.ssl-images-amazon.com/images/I/511HN39f6SL._SL160_.jpg "スパースモデリング- 基礎から動的システムへの応用 -")](http://www.amazon.co.jp/exec/obidos/ASIN/4339032220/galavollc-22/)

<div class="hatena-asin-detail-info">

[スパースモデリング- 基礎から動的システムへの応用 -](http://www.amazon.co.jp/exec/obidos/ASIN/4339032220/galavollc-22/)

* <span class="hatena-asin-detail-label">作者:</span> 永原正章
* <span class="hatena-asin-detail-label">出版社/メーカー:</span> コロナ社
* <span class="hatena-asin-detail-label">発売日:</span> 2017/10/06
* <span class="hatena-asin-detail-label">メディア:</span> 単行本
* [この商品を含むブログを見る](http://d.hatena.ne.jp/asin/4339032220/galavollc-22)

</div>

<div class="hatena-asin-detail-foot"> </div>

</div>

#### スパース性に基づく機械学習 (機械学習プロフェッショナルシリーズ)

数学的な背景までスパースモデリングをガッツリ知りたい人向け．
ぼくのように証明がないと発狂してしまう人類はこちらを．

<div class="hatena-asin-detail">[![スパース性に基づく機械学習 (機械学習プロフェッショナルシリーズ)](https://images-fe.ssl-images-amazon.com/images/I/51kCPyleiML._SL160_.jpg "スパース性に基づく機械学習 (機械学習プロフェッショナルシリーズ)")](http://www.amazon.co.jp/exec/obidos/ASIN/4061529102/galavollc-22/)

<div class="hatena-asin-detail-info">

[スパース性に基づく機械学習 (機械学習プロフェッショナルシリーズ)](http://www.amazon.co.jp/exec/obidos/ASIN/4061529102/galavollc-22/)

* <span class="hatena-asin-detail-label">作者:</span> 冨岡亮太
* <span class="hatena-asin-detail-label">出版社/メーカー:</span> 講談社
* <span class="hatena-asin-detail-label">発売日:</span> 2015/12/19
* <span class="hatena-asin-detail-label">メディア:</span> 単行本（ソフトカバー）
* [この商品を含むブログ (2件) を見る](http://d.hatena.ne.jp/asin/4061529102/galavollc-22)

</div>

<div class="hatena-asin-detail-foot"> </div>

</div>

## 宣伝

学術系の知識とかをおもしろおかしく解説するYouTubeチャンネルをやってます．
↓の動画は「安定マッチング」というグラフ理論の問題について解説した動画です．
まだ動画数は少ないですが，今後機械学習やスパースモデリングについても動画を出していこうと思っているのでよければチャンネル登録よろしくお願いします！

[【京大式】数学的に最も正しい彼氏彼女の作り方を解説【安定結婚問題】](https://youtube.com/watch?v=fJJSsRfn5D0)

<div class="footnote">

[*1](#fn-91148316)<span class="footnote-delimiter">:</span><span class="footnote-text">本間ら「スパースモデリング天文学 — ブラックホール撮像から時間変動減少まで」，科学研究費補助金新学術領域研究「スパースモデリングの深化と高次元データ駆動科学の創成」最終成果報告会 (2017/12/18-20)</span>

</div>
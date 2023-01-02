---
title: "スパースモデリング(1)：画像などのデータの異常検知に使える，fused lasso(連結lasso)について"
---

世の中には，次のような要求を持つ人々がいます．

* 品質管理のために，画像から傷の有無を判別したい．
* 時系列データから異常なピークを検知したい．

このような要求に応えるために，AIや機械学習の力を借りたいと思う人は多いことでしょう．

昨今のDeep Learningの躍進により，AI・機械学習というワードは馴染みの深いものとなりました．
しかし，Deep Learning等の手法を用いるには，事前の学習のために大量のデータを用意しなければならないことが知られています．
では，データがなければ，上のような要求に応えることはできないのか？というと，そうではありません．

<span style="color: #1464b3">**実は，上のような要求は，ある1つの関数を最小化するだけで達成することができるのです．**</span>

本記事では，それを行うためのアルゴリズム，Fused Lassoについて解説していきます．

* * *

# Lassoとは

Fused Lassoを解説する前に，普通のLassoについて説明しておきます．

Lasso(Least absolute shrinkage and selection operator)は，線形回帰モデルにL1正則化項を使ったもののことです．

このままでは意味がわからないという人も多いと思うので，より詳しくアイデアを説明していきます．

まず，![ m \times n](https://chart.apis.google.com/chart?cht=tx&chl=%20m%20%5Ctimes%20n)行列![ A](https://chart.apis.google.com/chart?cht=tx&chl=%20A)と，![ n](https://chart.apis.google.com/chart?cht=tx&chl=%20n)次列ベクトル![ y](https://chart.apis.google.com/chart?cht=tx&chl=%20y)がデータとして与えられているものとして，次のような連立一次方程式を考えます．

![ Ax = b](https://chart.apis.google.com/chart?cht=tx&chl=%20Ax%20%3D%20b)

Aが正則な（逆行列を持つ）場合，![ x = A^{-1}b](https://chart.apis.google.com/chart?cht=tx&chl=%20x%20%3D%20A%5E%7B-1%7Db)とすれば解けて万々歳なわけですが，データを自動で収集するような場合では，逆行列が求められないような行列も結構出てきます．
こういうときに，解はありませんよと放棄してしまうのも数学的にはアリなのですが，Aやbなどのデータは誤差を含んでいることも多くあるため，仮にxが本当は存在するデータだったとしても，ピッタリAx=bになるような解が見つからないということもあるわけです．

そこで，次のような，Axとbの差がなるべく小さくなるようなxを求めるという問題が考えられます．

![ ||Ax - b||^2_2](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7CAx%20-%20b%7C%7C%5E2_2)

で，以下の形で表されます．

![ \min ||Ax - b||^2_2 + \lambda ||x||_1](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cmin%20%7C%7CAx%20-%20b%7C%7C%5E2_2%20%2B%20%5Clambda%20%7C%7Cx%7C%7C_1)

![ ||x||_1](https://chart.apis.google.com/chart?cht=tx&chl=%20%7C%7Cx%7C%7C_1)はL1ノルムと呼ばれ，![ \sum |x_i|](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Csum%20%7Cx_i%7C)，つまり，各成分の絶対値の和を表しています．

**よければ読者登録やTwitterのフォローよろしくお願いします。**

[Follow @zalgo3](https://twitter.com/zalgo3?ref_src=twsrc%5Etfw)
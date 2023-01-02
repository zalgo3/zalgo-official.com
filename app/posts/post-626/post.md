---
title: "（近接）勾配法が一次収束する条件は？強凸関数の仮定を一般化 (論文解説：Linear Convergence of Gradient and Proximal-Gradient Methods Under the Polyak-Łojasiewicz Condition)"
---

機械学習クラスタ御用達の<span style="color: #20a39e" class="text-color">勾配法</span>は，適当な仮定のもとで一次収束という速い収束をすることが知られています．

本記事では，さまざまな勾配法が一次収束する条件をまとめました．

参考にした論文は次のページから読めます． [https://arxiv.org/abs/1608.04636](https://arxiv.org/abs/1608.04636)

## 注意

この記事は次の知識が前提として書かれています．前提知識のない方は適宜リンク先の記事等を参照してください．

* [最急（勾配）降下法](http://dsl4.eee.u-ryukyu.ac.jp/DOCS/nlp/node4.html)
* [近接勾配法](http:// http://www.msi.co.jp/nuopt/glossary/term_033927369b27551e52a309bffc1493855d5bf8df.html)
* [一次収束](http://maya.phys.kyushu-u.ac.jp/~knomura/education/numerical-physics/text1/node4.html)

## Introduction:
（近接）勾配法は目的関数が強凸のときに一次収束するが…

次のような最適化問題を考えます．

\begin{align}
\begin{aligned}
\min_x \quad &f(x) \\
\st \quad &x \in \R^d
\end{aligned}
\end{align}

このような最適化問題に対する有力な解法として，最急降下法や近接勾配法などの解法があります．（総称して，勾配法や一次法などと呼ばれる．）

勾配法に対する有名な定理として，**目的関数の強凸性のもとで手法が一次収束する**というものがあります．
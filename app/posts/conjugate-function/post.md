---
title: "共役関数の定義・例・性質をまとめてみた【数理最適化・数学】"
---

どうも，京大博士課程のざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．
この記事では，共役関数の定義や性質をまとめていきます．

## 共役関数の定義

<div class="wp-block-luxe-blocks-topic" style="margin-top:10px;margin-bottom:30px;margin-left:auto;margin-right:auto">

<div class="wp-block-luxe-blocks-topic-title" style="color:#ffffff;background-color:#20a39e;border:1px solid #20a39e;border-radius:0px 0px 0 0;padding:3px 15px;display:inline-block"><span class="wp-block-luxe-blocks-topic-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 2 24 28"><path d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z" fill="#ffffff"></path></svg></span><span>定義</span></div>

<div class="wp-block-luxe-blocks-topic-content" style="border:1px solid #20a39e;padding:0px 15px 0px 15px ">

真凸関数 \( f\colon \R^n \to ( -\infty , +\infty ] \)に対して
\[
f^\ast ( \xi ) := \sup_{x \in \R^n} \{ x^\T \xi - f(x) \}
\]
によって定義される関数 \( f^\ast \colon \R^n \to [ -\infty , +\infty ] \)を \( f \)の**共役関数**という．

</div>

</div>

## 共役関数の例

<div class="wp-block-luxe-blocks-topic" style="margin-top:10px;margin-bottom:30px;margin-left:auto;margin-right:auto">

<div class="wp-block-luxe-blocks-topic-title" style="color:#ffffff;background-color:#20a39e;border:1px solid #20a39e;border-radius:0px 0px 0 0;padding:3px 15px;display:inline-block"><span class="wp-block-luxe-blocks-topic-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 2 24 28"><path d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z" fill="#ffffff"></path></svg></span><span>例</span></div>

<div class="wp-block-luxe-blocks-topic-content" style="border:1px solid #20a39e;padding:0px 15px 0px 15px ">

* (ノルムの共役関数) \( f(x) = \| x \| \)の共役関数は，
    \[ f^\ast(\xi) = \begin{cases} 0 &\quad \| \xi \|_\ast \leq 1 \\ +\infty &\quad \| \xi \|_\ast > 1 \end{cases} \]
    である．ただし，\( \| \xi \|_\ast = \sup_{ \| x \| \leq 1} x^\T \xi \)は双対ノルムである．
    ※双対ノルムの例：
    * \( \ell_1 \)ノルム↔ \( \ell_\infty \)ノルム
    * \( \ell_p \)ノルム↔ \( \ell_q \)ノルム (ただし， \( 1/p + 1/q = 1 \))

</div>

</div>

## 共役関数の性質

よく使う性質をまとめます．他にもあれば，コメントなどで補足してくれると嬉しいです．

<div class="wp-block-luxe-blocks-topic" style="margin-top:10px;margin-bottom:30px;margin-left:auto;margin-right:auto">

<div class="wp-block-luxe-blocks-topic-title" style="color:#ffffff;background-color:#20a39e;border:1px solid #20a39e;border-radius:0px 0px 0 0;padding:3px 15px;display:inline-block"><span class="wp-block-luxe-blocks-topic-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 2 24 28"><path d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z" fill="#ffffff"></path></svg></span><span>性質</span></div>

<div class="wp-block-luxe-blocks-topic-content" style="border:1px solid #20a39e;padding:0px 15px 0px 15px ">

* (分離可能な和の共役関数) \( f(x_1, x_2) = g(x_1) + h(x_2) \)の共役関数は， \( f^\ast ( \xi_1, \xi_2 ) = g^\ast(\xi_1) + h^\ast(\xi_2) \)
* (スカラー倍の共役関数) (\( \alpha > 0 \))
    * \( f(x) = \alpha g(x) \) の共役関数は， \( f^\ast (\xi) = \alpha g^\ast (\xi / \alpha) \)
    * \( f(x) = \alpha g(x / \alpha) \) の共役関数は， \( f^\ast (\xi) = \alpha g^\ast (\xi) \)
* (アフィン関数との和の共役関数) \( f(x) = g(x) + a^\T x + b \) の共役関数は， \( f^\ast (\xi) = g^\ast (\xi - a) - b \)
* (平行移動の共役関数) \( f(x) = g(x - b) \) の共役関数は， \( f^\ast (\xi) = b^\T \xi + g^\ast (\xi) \)
* (全単射な線形変換の共役関数) \( f(x) = g(A x) \) の共役関数は， \( f^\ast (\xi) = g^\ast ( A^{- \T} \xi) \)
* (極小畳み込みの共役関数) \( f(x) = \inf_{u + v = x} \{ g(u) + h(v) \} \)の共役関数は， \( f^\ast ( \xi ) = g^\ast(\xi) + h^\ast(\xi) \)

</div>

</div>
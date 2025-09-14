---
title: "共役関数の定義・例・性質をまとめてみた【数理最適化・数学】"
---

どうも，京大博士課程のざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．
この記事では，共役関数の定義や性質をまとめていきます．

## 共役関数の定義

### 定義

真凸関数 $ f\colon \R^n \to ( -\infty , +\infty ] $に対して
$$
f^\ast ( \xi ) := \sup_{x \in \R^n} \{ x^\top \xi - f(x) \}
$$
によって定義される関数 $ f^\ast \colon \R^n \to [ -\infty , +\infty ] $を $ f $の**共役関数**という．

## 共役関数の例

### 例

* (ノルムの共役関数) $ f(x) = \| x \| $の共役関数は，
    $$ f^\ast(\xi) = \begin{cases} 0 &\quad \| \xi \|_\ast \leq 1 \\ +\infty &\quad \| \xi \|_\ast > 1 \end{cases} $$
    である．ただし，$ \| \xi \|_\ast = \sup_{ \| x \| \leq 1} x^\top \xi $は双対ノルムである．
    ※双対ノルムの例：
  * $ \ell_1 $ノルム↔ $ \ell_\infty $ノルム
  * $ \ell_p $ノルム↔ $ \ell_q $ノルム (ただし， $ 1/p + 1/q = 1 $)

## 共役関数の性質

よく使う性質をまとめます．他にもあれば，コメントなどで補足してくれると嬉しいです．

### 性質

* (分離可能な和の共役関数) $ f(x_1, x_2) = g(x_1) + h(x_2) $の共役関数は， $ f^\ast ( \xi_1, \xi_2 ) = g^\ast(\xi_1) + h^\ast(\xi_2) $
* (スカラー倍の共役関数) ($ \alpha > 0 $)
  * $ f(x) = \alpha g(x) $ の共役関数は， $ f^\ast (\xi) = \alpha g^\ast (\xi / \alpha) $
  * $ f(x) = \alpha g(x / \alpha) $ の共役関数は， $ f^\ast (\xi) = \alpha g^\ast (\xi) $
* (アフィン関数との和の共役関数) $ f(x) = g(x) + a^\top x + b $ の共役関数は， $ f^\ast (\xi) = g^\ast (\xi - a) - b $
* (平行移動の共役関数) $ f(x) = g(x - b) $ の共役関数は， $ f^\ast (\xi) = b^\top \xi + g^\ast (\xi) $
* (全単射な線形変換の共役関数) $ f(x) = g(A x) $ の共役関数は， $ f^\ast (\xi) = g^\ast ( A^{- \top} \xi) $
* (極小畳み込みの共役関数) $ f(x) = \inf_{u + v = x} \{ g(u) + h(v) \} $の共役関数は， $ f^\ast ( \xi ) = g^\ast(\xi) + h^\ast(\xi) $

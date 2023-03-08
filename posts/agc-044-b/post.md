---
title: "AGC 044 B - Joker をPythonで解いた【幅優先探索/深さ優先探索　| AtCoder Grand Contest 044】"
---

どうも，京大博士課程のざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．

コンテストの時間内に解くことはできませんでしたが，解説を読んで理解したので実装とともに簡単な理解を記しておきます．

## 問題文（引用）

引用元：[https://atcoder.jp/contests/agc044/tasks/agc044_b](https://atcoder.jp/contests/agc044/tasks/agc044_b)

映画「ジョーカー」が今夜放映されるとあり、あなたの行きつけの劇場はすでに満席です。この劇場には <var>NN</var> 席の座席からなる列が <var>N</var> 列あり、これらの席が <var>N×N</var> の正方形型に並んでいます。最前列の観客に左から <var>1,2,…,N</var>の番号を、前から <var>2</var> 列目の観客に左から <var>N+1,…,2N</var> の番号を付け、以降の観客にも同様に番号を付けます。最後列の観客の番号は、左から <var>N^2−N+1,…,N^2</var> となります。

上映が終わると、観客は決まった順に劇場を出ます。<var>i</var> 番目に劇場を出るのは、番号 <var>P</var> の観客です。番号 <var>Pi+1</var> の観客は、番号 <var>Pi</var> の観客が劇場を出るまで待ってから移動します。劇場を出るには、席から席への移動を繰り返し、席からなる正方形型のエリアの外に出なければなりません (四辺のどこからでも出ることができます)。席から席への移動では、前後左右の <var>4</var> 方向への移動が可能です。

番号 <var>x</var> の観客が、劇場を出る際に番号 <var>y</var> の別の観客が **まだ座っている** 席を通り抜けてしまうと、番号 <var>x</var> の観客は番号 <var>y</var> の観客に永遠に嫌われます。各観客は、自分を永遠に嫌う観客の数が最小となるように移動方法を選びます。

番号 <var>x</var> の観客が番号 <var>y</var> の観客に永遠に嫌われるような組 <var>(x,y)</var> の個数を求めてください。

## 解答

各席から退場する際に通り抜けないといけない人の人数を配列で持っておき，人が退場するたびにそれを更新していくことを考えます．

そのような配列は，初期状態では簡単に求まります．

次に，人が出ていくときですが，これは，出ていく人の席から深さ優先探索（または幅優先探索）をして，コストが下がるところを更新していけばよいです．

ここで，各席のコストはたかだかN回ずつしか更新されない（初期コストがたかだかNだから）ので，N^2回の探索で訪れる点の数は合計でN^3ほどになって，間に合います．

Pythonで実装したものが下記です．

<div class="hcb_wrap">

```
n = int(input()) P = list(map(int, input().split())) dist = [[min(i, j, n - i - 1, n - j - 1) for j in range(n)] for i in range(n)] is_sit = [[True for _ in range(n)] for _ in range(n)] ans = 0 for p in P: i, j = divmod(p - 1, n) is_sit[i][j] = False ans += dist[i][j] q = [(i, j, dist[i][j])] while q: i, j, cur_cost = q.pop() if i > 0 and dist[i - 1][j] > cur_cost: dist[i - 1][j] = cur_cost q.append((i - 1, j, cur_cost + is_sit[i - 1][j])) if j > 0 and dist[i][j - 1] > cur_cost: dist[i][j - 1] = cur_cost q.append((i, j - 1, cur_cost + is_sit[i][j - 1])) if i < n - 1 and dist[i + 1][j] > cur_cost: dist[i + 1][j] = cur_cost q.append((i + 1, j, cur_cost + is_sit[i + 1][j])) if j < n - 1 and dist[i][j + 1] > cur_cost: dist[i][j + 1] = cur_cost q.append((i, j + 1, cur_cost + is_sit[i][j + 1])) print(ans)
```

</div>

## 感想

まだ茶色コーダーの分際で挑むような問題じゃない気がしますが，いつかこういうのにも太刀打ちできるようになりたいですね．

考え方自体は自然だと感じたので，いつか思いつけるようになってもおかしくはない気がします．
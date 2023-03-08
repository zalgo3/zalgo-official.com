---
title: "Pythonで幅優先探索とダイクストラ法を隣接リストを用いて実装（単一始点最短経路問題）"
---

どうも，京大博士課程のざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．

## この記事を書こうと思った経緯

[AtCoder ABC 168 D - .. (Double Dots) (400 点)](https://atcoder.jp/contests/abc168/tasks/abc168_d) を解いていたときに，scipyにあるダイクストラ法のアルゴリズムを投げつけたら実行時間制限に引っかかってしまいました．

なので，scipyに頼らずPythonで単一始点最短経路問題を解く方法を備忘録的にまとめておきます．

## 幅優先探索

まず，上記の問題は，結論から言えば幅優先探索で解くことができます．

なぜかというと，重みなしグラフの最短経路問題だからです．

幅優先探索はキューを使って実装して上げる必要がありますが，
Python3で実装する際には，collectionsモジュールのdequeを使ってあげます．

queue.Queueモジュールを使ってもいいですが，シングルスレッド実行の場合はdequeのほうが速いみたいです．

ちなみに，計算量は点の数V，枝の数EとしてO(V+E)です．

<div class="hcb_wrap">

```
from collections import deque n, m = map(int, input().split()) edges = [[] for _ in range(n)] prev = [-1] * n for _ in range(m): a, b = map(int, input().split()) a -= 1 b -= 1 edges[a].append(b) edges[b].append(a) def bfs(v): q = deque() prev[v] = -99999 q.append(v) while q: v = q.popleft() for u in edges[v]: if prev[u] == -1: prev[u] = v q.append(u) bfs(0) print("Yes") for i in range(1, n): print(prev[i] + 1)
```

</div>

## ダイクストラ法

この問題に対しては必要ありませんが，重み付きグラフの単一視点最短経路問題としてみれば，ダイクストラ法を使うこともできます．

頂点の管理にheapqをつかうので，計算量はO( (E+V)logV)です．

<div class="hcb_wrap">

```
from heapq import heappush, heappop n, m = map(int, input().split()) edges = [[] for _ in range(n)] for _ in range(m): a, b = map(int, input().split()) a -= 1 b -= 1 edges[a].append( (1, b) ) edges[b].append( (1, a) ) INF = 10 ** 9 dist = [INF] * n prev = [-1] * n def dijkstra(s): q = [(0, s)] dist[s] = 0 while q: v = heappop(q)[1] for cost, to in edges[v]: if dist[v] + cost < dist[to]: dist[to] = dist[v] + cost prev[to] = v heappush(q, (dist[to], to)) dijkstra(0) print("Yes") for i in range(1, n): print(prev[i] + 1)
```

</div>

## おわりに

重みなしグラフに対しては，幅優先探索のほうが効率がいいので，頭でっかちにダイクストラ法を使わないように気をつけたいものですね．

それにしても，なぜscipyのダイクストラだと間に合わなかったんでしょうか・・・？（もしかしてヒープを使っていない？）
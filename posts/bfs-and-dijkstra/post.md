---
title: "Pythonで幅優先探索とダイクストラ法を隣接リストを用いて実装（単一始点最短経路問題）"
---

どうも，ざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．

## この記事を書こうと思った経緯

[AtCoder ABC 168 D - .. (Double Dots) (400 点)](https://atcoder.jp/contests/abc168/tasks/abc168_d) を解いていたときに，`scipy` にあるダイクストラ法のアルゴリズムを投げつけたら実行時間制限に引っかかってしまいました．

なので，`scipy` に頼らず Python で単一始点最短経路問題を解く方法を備忘録的にまとめておきます．

## 幅優先探索

まず，上記の問題は，結論から言えば幅優先探索で解くことができます．

なぜかというと，重みなしグラフの最短経路問題だからです．

幅優先探索はキューを使って実装して上げる必要がありますが，
Python 3 で実装する際には，`collections` モジュールの `deque` を使ってあげます．

`queue.Queue` モジュールを使ってもいいですが，シングルスレッド実行の場合は `deque` のほうが速いみたいです．

ちなみに，計算量は点の数 $V$，枝の数 $E$ として $O(V+E)$ です．



```python
from collections import deque


n, m = map(int, input().split())
edges = [[] for _ in range(n)]
prev = [-1] * n

for _ in range(m):
    a, b = map(int, input().split())
    a -= 1
    b -= 1
    edges[a].append(b)
    edges[b].append(a)

def bfs(v):
    q = deque()
    prev[v] = -99999
    q.append(v)
    while q:
        v = q.popleft()
        for u in edges[v]:
            if prev[u] == -1:
                prev[u] = v
                q.append(u)

bfs(0)
print("Yes")
for i in range(1, n):
    print(prev[i] + 1)
```



## ダイクストラ法

この問題に対しては必要ありませんが，重み付きグラフの単一視点最短経路問題としてみれば，ダイクストラ法を使うこともできます．

頂点の管理に `heapq` をつかうので，計算量は $O((E+V)logV)$ です．


```python
from heapq import heappush, heappop

n, m = map(int, input().split())
edges = [[] for _ in range(n)]

for _ in range(m):
    a, b = map(int, input().split())
    a -= 1
    b -= 1
    edges[a].append((1, b))
    edges[b].append((1, a))
INF = 10 ** 9
dist = [INF] * n
prev = [-1] * n

def dijkstra(s):
    q = [(0, s)]
    dist[s] = 0
    while q:
        v = heappop(q)[1]
        for cost, to in edges[v]:
            if dist[v] + cost < dist[to]:
                dist[to] = dist[v] + cost
                prev[to] = v
                heappush(q, (dist[to], to))

dijkstra(0)
print("Yes")
for i in range(1, n):
    print(prev[i] + 1)
```


## おわりに

重みなしグラフに対しては，幅優先探索のほうが効率がいいので，頭でっかちにダイクストラ法を使わないように気をつけたいものですね．

それにしても，なぜ `scipy` のダイクストラだと間に合わなかったんでしょうか・・・？（もしかしてヒープを使っていない？）

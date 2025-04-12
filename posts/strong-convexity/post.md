---
title: "強凸関数の定義・性質【数理最適化・数学】"
---

頻繁にわからなくなるのでメモ。適宜追記・修正します。

## 係数![\mu](https://chart.apis.google.com/chart?cht=tx&chl=%5Cmu)の強凸関数の定義

![ f( (1-\alpha) x + \alpha y) \leq (1 - \alpha)f(x) + \alpha f(y) - \frac12 \mu \alpha (1 - \alpha) || x - y ||^2 \quad (\alpha \in [ 0, 1])](https://chart.apis.google.com/chart?cht=tx&chl=%20f%28%20%281-%5Calpha%29%20x%20%2B%20%5Calpha%20y%29%20%5Cleq%20%281%20-%20%5Calpha%29f%28x%29%20%2B%20%5Calpha%20f%28y%29%20-%20%5Cfrac12%20%5Cmu%20%5Calpha%20%281%20-%20%5Calpha%29%20%7C%7C%20x%20-%20y%20%7C%7C%5E2%20%5Cquad%20%28%5Calpha%20%5Cin%20%5B%200%2C%201%5D%29)

## 一次近似との関係

![ f(y) - f(x) \geq \nabla f(x)^\top (y - x) + \frac12 \mu ||x - y||^2](https://chart.apis.google.com/chart?cht=tx&chl=%20f%28y%29%20-%20f%28x%29%20%5Cgeq%20%5Cnabla%20f%28x%29%5E%5Ctop%20%28y%20-%20x%29%20%2B%20%5Cfrac12%20%5Cmu%20%7C%7Cx%20-%20y%7C%7C%5E2)

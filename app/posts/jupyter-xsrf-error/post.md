---
title: Jupyter Notebookが”‘_xsrf’ argument missing from POST”エラーで動かなくなったけどカーネルを再起動したくないときの対処法
---

ただトークンの処理がうまくいってないだけなので、Notebook の中身自体は生きてる。よって、

```Shell
jupyter notebook list
```

で起動中の notebook のリストを取得し、その URL にアクセスすれば OK

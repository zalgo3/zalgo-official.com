---
title: "数式を含むLaTeX論文にGrammarlyの英文校正を精度良くかける方法"
---

ざるご([@zalgo3](https://www.twitter.com/zalgo3) )です。京大博士課程に通っています。

詳しい自己紹介は、[以前インタビューを受けた動画](https://www.youtube.com/watch?v=N-tmXqNF85Q)を見ていただければと思います。

[Grammarly](https://grammarly.go2cloud.org/aff_c?offer_id=312&aff_id=75350)は非常に強力な英文校正ツールです．

しかし，LaTeX論文を英文校正にかける場合，LaTeX特有のコマンドが邪魔で，うまくGrammarly側が認識してくれなかったりします．

以前はコマンドを含むところは無視するとか，適宜コマンドを消すとかしていたんですが，最近もっと良い方法を知りました．

## 数式を含むLaTeX論文をGrammarlyの英文校正にかける方法

やり方は簡単です．

まず，一度LaTeX文書をコンパイルして，PDFにしてしまいます．

次に，そのPDFを，右クリックメニューなどを使い，Microsoft Wordで開きます．

[Grammarly for Microsoft Word](https://www.grammarly.com/office-addin)を使って校正します．

たったこれだけです．

もちろん，純粋なテキストでなくPDFなので，完璧に全て認識できるとまではいきませんが，かなりの精度で認識・校正してくれます．

ぜひお試しを．

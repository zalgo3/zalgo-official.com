---
title: "【Vim】行中のピリオドまで一気に移動する方法"
---

どうも，京大博士課程のざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．

人類なら，Vimで英文を書くことが必ずあると思います．

ソースコード中のコメントや，LaTeXの文章などですね．

そこで，カーソルを文末まで持っていきたいということがちょこちょこあると思います．
（文末で改行を入れたいときなど）

そんなときに使えるVimの便利機能を一つご紹介します．

## 行中一文字検索

Vimには，行中一文字検索という機能があります．

これは，行中の，指定した文字の位置までカーソルを動かしてくれる機能です．

コマンドは，<span style="background-color: #d3d3d3" class="background-color">f+文字(順方向行中一文字検索)または<span style="background-color: #d3d3d3" class="background-color">F+文字（逆方向行中一文字検索）です．

これは当然ピリオドに対しても使うことができて，文章中から行末のピリオドまでカーソルを動かしたいときは，

<div class="hcb_wrap">

```
f.
```

</div>

で移動できます！

### ステップアップ

行中一文字検索と組み合わせて使うことのできる機能に，ステップアップがあります．

<figure class="wp-block-table">

| **コマンド** | **移動内容** |
| ; | 順方向に繰り返し検索 |
| , | 逆方向に繰り返し検索 |

</figure>

3つあとの行末に移動したい場合，<span style="background-color: #d3d3d3" class="background-color">f. <span style="background-color: #d3d3d3" class="background-color">; <span style="background-color: #d3d3d3" class="background-color">;

そこから1つ戻りたい場合，<span style="background-color: #d3d3d3" class="background-color">,

でカーソルを移動することができます！

<div class="blogcard"></div>
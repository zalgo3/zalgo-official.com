---
title: "GitHubでgit commit -mのコミットメッセージにIssue番号を自動で含める方法"
---

どうも，京大博士課程のざるご( [@zalgo3](https://www.twitter.com/zalgo3) )です．
この記事では，GitのコミットメッセージにIssue番号を自動で付与する方法を，Git初心者向けに解説します．

## コミットメッセージのIssue番号は忘れがち

GitHubでIssueを建てて作業しているときに，Issue番号を#1みたいな感じでコミットメッセージに含めると，Issueから関連するコミットを参照できて便利だったりします．

ですが，コミットするときにわりと忘れるんですよねこれ．
git amendで修正する羽目になることが多いです．

そこで，何も書いていなくても自動でIssue番号をコミットメッセージに含めてもらいましょう．

前提として，作業しているブランチは`issue/5/hoge`みたいな名前だとします．

## どうすればいいか

次のファイルを`commit-msg`という名前で`.git/hooks`に保存し，`chmod +x`で実行権限を与えましょう．

```bash
#!/bin/bash issue_num=`git branch --show-current | cut -d/ -f2 | tr -d "\n" | sed -e "s/\([0-9]*\).*/#\1 /g"` if [[ $issue_num =~ \#[0-9]* ]]; then mv $1 $1.tmp echo -n "$issue_num" > $1 cat $1.tmp >> $1 fi
```

## どうなるか

```bash
git commit -m "変更加えた"
```

とコミットすると，コミットメッセージが

```
"#5 変更加えた"
```

のようになる．

## コードの解説

### 2行目

```bash
issue_num=`git branch --show-current | cut -d/ -f2 | tr -d "\n" | sed -e "s/\([0-9]*\).*/#\1 /g"`
```

次の手順で，`issue_num`という変数に，`#5`などの文字列を格納しています．

1. `git branch --show-current` で現在のブランチを取得 ( ex. `issue/5/hoge` )
2. `cut -d/ -f2` で，スラッシュで区切られた2番目の要素を取得 ( ex. `5` )
3. `tr -d "\n"` で，末尾の改行を消去
4. `sed -e "s/([0-9]_)._/#\1 /g"` で，数字の前に#，後に空白をつける ( ex. `#5` )

### 4-8行目

```bash
if [[ $issue_num =~ \#[0-9]* ]]; then mv $1 $1.tmp echo -n "$issue_num" > $1 cat $1.tmp >> $1 fi
```

コミットメッセージの先頭に，先程定義した`issue_num`の値を挿入しています．

1. `if [[ $issue_num =~ #[0-9]* ]];`で，`issue_num`が`#5` などの値になっているか確認．
2. `mv $1 $1.tmp で，$1`（コミットメッセージ）の値を`$1.tmp`にコピー．
3. `echo -n "$issue_num" > $1` で，`$1`に`issue_num`の値を代入．
4. `cat $1.tmp >> $1` で，`$1`の末尾に先程コピーしておいたもとのコミットメッセージの値を戻す．

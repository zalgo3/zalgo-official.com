---
title: WordPressのメディア保存場所を変更するベストプラクティス
---

WordPress を wp というディレクトリにインストールした場合、デフォルトだと画像のアップロード先の URL が

https://www.example.com/wp/wp-content/uploads/img.png

みたいになるが、これを

https://www.example.com/assets/uploads/img.png

のようにしたいという話がよくある。

これについて、よくブログなどで解説されている手法 2 つとそれらの欠点、そして私が取ったそれらの欠点を回避する手法に付いて紹介する。

## よくある方法 1: `upload_path`, `upload_url_path`を編集する

最も数多く紹介されている手法として、https://www.example.com/wp/wp-admin/options.phpにアクセスし、upload_pathを../assets/uploadsに、upload_url_pathをhttps://www.example.com/assets/uploadsにするというものがある。

WordPress 3.5 以前では、デフォルトの管理画面からこれらのオプションが設定できたが、現在は options.php 経由でしか設定できないという予備知識とともに紹介されていることも多い。

しかし、そもそも upload_path オプションが管理画面から消えたのは、WordPress 3.5 からこのオプションは削除されたからであり、未だ使えるのはあくまで互換性のためである。

将来的にいつ使えなくなるかもわからないこの手法を WordPress のバージョンが 6 まで来ている現在においてなお薦める理由はないだろう。

## よくある方法 2: `WP_CONTENT_DIR`, `WP_CONTENT_URL`を書き換える

wp-content フォルダをリネーム＆移動した上で、wp-config.php に以下を追記するという方法

```Shell
define('WP_CONTENT_DIR',  dirname(__FILE__) . '/../' . 'assets');
define('WP_CONTENT_URL',  'https://' . $_SERVER['SERVER_NAME'] . '/assets');
```

殆どの場合これでうまくいくんだけど、一つ落とし穴がある。

それは、WP_CONTENT_DIR の中身が/path/wp/../assets のようになってしまっていること。

本来は/path/assets でよいはずなのに、一回 wp に入ってから戻るというような冗長な表記になっている。

ディレクトリトラバーサル(入力に..などの記号を入れることで、通常外部からアクセスできないファイルに不正にアクセスを試みる攻撃)の対策で、プラグインが..のような表記を受け付けないように設定されていることもある。

また、そういうプラグインを使っていなかったとしても、無意味に..を使うようなパス名を使うのは好ましくはないだろう。

## 今回のベストプラクティス

というわけで、今回提案するベストプラクティス（と思わしきもの）は以下。

よくある方法 2 で、wp-config.php に追記するコードを以下のように変える。

```Shell
define('WP_CONTENT_DIR',  dirname(__FILE__, 2) . '/' . 'assets');
define('WP_CONTENT_URL',  'https://' . $_SERVER['SERVER_NAME'] . '/assets');
```

PHP の dirname 関数は、

```Shell
dirname(string $path, int $levels = 1): string
```

のように、$levels というオプション引数を持つ。

これは、$path からいくつ階層を遡るかということを表しており、デフォルト値の 1 は親ディレクトリを指す。

親ディレクトリからさらにもう一つ階層を遡りたい場合は、単に$level=2 としてやればよい。

これで、定数 WP_CONTENT_DIR は..を含まないきれいな形になる。

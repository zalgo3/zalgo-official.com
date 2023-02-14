---
title: "Best Practices for Changing the WordPress Media Directory"
---

If you install WordPress in a directory called `wp`, the default URL for uploading images is

<pre class="wp-block-preformatted">https://www.example.com/wp/wp-content/uploads/img.png</pre>

but you may want to change it to

<pre class="wp-block-preformatted">https://www.example.com/assets/uploads/img.png</pre>

I will introduce two methods that are often explained in other blogs, their disadvantages, and my method to avoid those disadvantages.

## Common method 1: Edit upload_path and upload_url_path

One of the most common methods is to access `https://www.example.com/wp/wp-admin/options.php` and edit `upload_path` to `.``/assets/uploads` and `upload_url_path` to `https://www.example.com/assets/uploads`.

In WordPress 3.4 and earlier, these options could be set from the default admin screen, but now they are often introduced with the preliminary knowledge that they can only be set via `options.php`.

However, `upload_path` option disappeared from the admin screen because it was removed from WordPress 3.5, and the only reason it is still available is for compatibility.

There is no reason to recommend this method, which may not be available in the future, even though WordPress is up to version 6.

## Common method 2: Rewriting WP_CONTENT_DIR, WP_CONTENT_URL

Rename and move the `wp-content folder`, and add the following to `wp-config.php`

<div class="wp-block-group">

```
define('WP_CONTENT_DIR', dirname(__FILE__) . '/... /' . 'assets'); define('WP_CONTENT_URL', 'https://' . $_SERVER['SERVER_NAME'] . '/assets');
```

</div>

This works most of the time, but there is one pitfall.

It is that the contents of `WP_CONTENT_DIR` is `/path/wp/../assets`.

It should be `/path/assets`, but it is a redundant notation that goes into `wp` and then back out.

To avoid directory traversal (attack by putting symbols such as `.`.. in the input), some plugins do not accept the notation such as " `..` ".

Even if such plugins are not used, such paths may not be desirable.

## Best Practices

So, the best practices (or what seems to be the best practices) I propose this time are as follows.

Change the code to be appended to `wp-config.php` in the Common Method 2 as follows.

```
define('WP_CONTENT_DIR', dirname(__FILE__, 2) . '/' . 'assets'); define('WP_CONTENT_URL', 'https://' . $_SERVER['SERVER_NAME'] . '/assets');
```

`PHP` 's `dirname` has the following API:

```
dirname(string $path, int $levels = 1): string
```

with an optional argument named `$levels`.

This indicates how many levels you go up from `$path`, the default value of `1` refers to the parent directory.

If you want to go back one more level from the parent directory, simply set `$level=2`.

Then, the constant `WP_CONTENT_DIR` will now be neatly formatted without the "`..`".ｒ菴ソ縺」縺ヲ縺↑縺九▲縺溘→縺励※繧ゅ無意味に`..`を使うようなパス名を使うのは好ましくはないだろう。

## 今回のベストプラクティス

というわけで、今回提案するベストプラクティス（と思わしきもの）は以下。

よくある方法2で、`wp-config.php`に追記するコードを以下のように変える。

```
define('WP_CONTENT_DIR', dirname(__FILE__, 2) . '/' . 'assets'); define('WP_CONTENT_URL', 'https://' . $_SERVER['SERVER_NAME'] . '/assets');
```

`PHP`の`dirname`関数は、

```
dirname(string $path, int $levels = 1): string
```

のように、`$levels`というオプション引数を持つ。

これは、`$path`からいくつ階層を遡るかということを表しており、デフォルト値の`1`は親ディレクトリを指す。

親ディレクトリからさらにもう一つ階層を遡りたい場合は、単に`$level=2`としてやればよい。

これで、定数`WP_CONTENT_DIR`は`..`を含まないきれいな形になる。
---
title: "Resume(職務経歴書)をLaTeXで書いて、個人情報を伏せ字にしたPDFがGitHub Pagesから自動配信されるようにした(GitHub Actions使用)"
---

## GitHubリポジトリ



https://github.com/zalgo3/resume



## やったこと

### LaTeXスタイルファイルの[moderncv](https://ctan.org/pkg/moderncv)を使ってResumeを作成

ここでは詳しい使い方は解説しないが、非常に美しいResumeが直観的に作れる。

### 個人情報に関わるファイルを別ファイルに切り分け、.gitignoreに追加

住所などの個人情報がWeb上に公開されては困るので、`.personal_data.tex`というファイルを作り、`.gitignore`に追加の上、`\input`コマンドで読み込んだ。

ただし、そのまま読み込むと、`.personal_data.tex`が存在しない時にエラーになるため、`\IfFileExists`コマンドを使い、

```
\IfFileExists{.personal_data.tex}{ \input{.personal_data.tex} } {%Else \input{.personal_data_sample.tex} }
```

とし、`.personal_data_sample.tex`には、

```
\address{***DUMMY ADDRESS***}{} \mobile{***-****-****} \email{***dummy***@example.com}
```

のように、ダミーデータを入力した。

### GitHub Actionsを使い、自動コンパイル、自動デプロイを行う

`.github/workflows/gh-pages.yml`に以下のワークフローを記述。

```
name: github-pages on: push: branches: - master jobs: deploy: name: github-pages runs-on: ubuntu-latest container: zalgo3/texlive steps: - name: Checkout repository uses: actions/checkout@v2 - name: Build PDF file run: latexmk resume.tex && latexmk -c && mkdir -p pdf && cp resume.pdf ./pdf/ - name: Deploy pages uses: peaceiris/actions-gh-pages@v3 with: github_token: ${{ secrets.GITHUB_TOKEN }} publish_dir: ./pdf
```

ここで、LaTeXの環境には、Dockerコンテナ`[zalgo3/texlive](https://github.com/zalgo3/texlive)`([`arcatdmz/texlive`](https://github.com/arcatdmz/texlive)を自分用にカスタマイズしたもの)を用い、GitHub Pagesへのデプロイには、`[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)`を使った。

注意点としては、`GITHUB_TOKEN`の権限が、デフォルトではReadしかないため、リポジトリの`Settings->Actions->Workflow Permissions`から、`Read and write permissions`を選択してやる必要がある。

Actionsが正常に走れば、`gh-pages`ブランチが作られ、PDFがpushされる。

リポジトリの`Settings->Pages->Source`から、`gh-pages`ブランチを選択し、再度Actionsを実行してやると、[https://zalgo3.github.io/resume/resume.pdf](https://zalgo3.github.io/resume/resume.pdf)からPDFが配信されるはずである。

注意点として、GitHub Pagesのルートディレクトリにアクセスしても、PDFを見ることができない。

この解決策としては、`index.html`に`iframe`タグなどを用いてPDFを埋め込むことなどが考えられるが、単に直接PDFにアクセスしたほうが見やすいと思うので、ここでは特に対策は行っていない。

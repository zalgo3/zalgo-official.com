---
title: "[Memo] What to do when Jupyter Notebook stops working with "'_xsrf' argument missing from POST" error but you don't want to restart the kernel?"
---

The contents of the Notebook itself are still alive, just the token processing is not working. Therefore, get the list of running notebooks by

```
jupyter notebook list
```

and access the URL.g the LaTeX style file [moderncv](https://ctan.org/pkg/moderncv)

I won't explain the detailed usage here, but you can intuitively create a beautiful resume.

### Separate files related to personal information and add them to .gitignore

Since we do not want personal information such as addresses to be disclosed on the Web, we created a file named `.personal_data.tex`, added it to `.gitignore`, and read it in with the `input command`.

However, if the file .personal_data `.tex` does not exist, an error will occur, so the `IfFileExists`command was used, and the following was used

```
IfFileExists{.personal_data.tex}{ input{.personal_data.tex} } {%Else input{.personal_data_sample.tex} }
```

and `.personal_data_sample.tex` should contain

```
address{***DUMMY ADDRESS***}{} mobile{***-****-****} email{***dummy***@example.com}
```

Dummy data was entered, as shown in the following example.

### Use GitHub Actions to auto-compile and auto-deploy

Describe the following workflow in `.github/workflows/gh-pages.yml`.

```
name: github-pages on: push: branches: - branches: master jobs: master deploy: name: github-pages runs-on: ubuntu-latest container: zalgo3/texlive steps: checkout repository - name: Checkout repository uses: actions/checkout@v2 - name: Build PDF file run: latexmk resume.tex && latexmk -c && mkdir -p pdf && cp resume.pdf . /pdf/ - name: Deploy pages uses: peaceiris/actions-gh-pages@v3 with: github_token: ${{ secrets.GITHUB_TOKEN }} publish_dir: . /pdf
```

Here, the LaTeX environment includes a Docker container`[zalgo3/texlive](https://github.com/zalgo3/texlive)` ([`arcatdmz/texlive`](https://github.com/arcatdmz/texlive) customized for my use) was used for the LaTeX environment, and deployment to GitHub Pages, I used`[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)` I used

Note that the `GITHUB_TOKEN` permission is only Read by default, so you need to select `Read and write permissions` from `Settings->Actions->Workflow Permissions` in the repository. Actions.

If the Actions run successfully, the `gh-pages branch` will be created and the PDF will be pushed.

Select the `gh-pages branch` from the repository `Settings->Pages->Source` and run the Actions again [.](https://zalgo3.github.io/resume/resume.pdf) There you have it.

Note that even if you access the root directory of GitHub Pages, you will not be able to see the PDF.

A possible solution to this problem is to embed the PDF file in `index.html` using an `iframe tag`, but since it is easier to view the PDF file by simply accessing it directly, we have not taken any special measures here.
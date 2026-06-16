// Blog post categories.
//
// NOTE: these assignments were generated automatically from each post's title
// as a starting point and SHOULD BE REVIEWED. To recategorize a post, edit its
// entry here (single source of truth — no need to touch the post files).
// Any slug not listed falls back to DEFAULT_CATEGORY.

export const CATEGORIES = [
    '技術',
    '音楽',
    '料理',
    '買い物',
    'ゲーム',
    'コラム',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_CATEGORY: Category = 'コラム';

const postCategoryMap: Record<string, Category> = {
    '2020-best-buy': '買い物',
    '2021-best-buy': '買い物',
    'ableton-mcp': '技術',
    'admission-present': '買い物',
    'agc-044-b': '技術',
    'amazon-prime-day-2021': '買い物',
    'bfs-and-dijkstra': '技術',
    'book-reading-age': 'コラム',
    carbonara_recipe: '料理',
    chahan_parapara: '料理',
    'chainer-tutorial': '技術',
    'cheat-report': 'コラム',
    'conjugate-function': '技術',
    'covid-vaccine-3': 'コラム',
    'credit-cards-and-e-money': '買い物',
    'daigaku-kyokasho-difficult': 'コラム',
    'daniel2-error': '技術',
    'elden-ring-waygate': 'ゲーム',
    'future-in-the-era-with-internet': 'コラム',
    'git-automatically-add-issue-num': '技術',
    'git-wip': '技術',
    'github-actions-latex-pages': '技術',
    'google-quiz': 'コラム',
    'grammarly-latex': '技術',
    'how-to-make-friends': 'コラム',
    'ikehaya-burn': 'コラム',
    'iphone-to-android': '技術',
    'jupyter-xsrf-error': '技術',
    'ku-phd-course-entry': 'コラム',
    'linepay-amazon': '買い物',
    'merpay-70': '買い物',
    'mix-request-quality': '音楽',
    'mushokutomeisai-result': '音楽',
    'nature-remo': '技術',
    'necessity-of-classical-literature': 'コラム',
    neumorphism: '技術',
    'nextjs-from-wordpress': '技術',
    'ng-part-time': 'コラム',
    'nisetoro-illegal': 'コラム',
    pantsman_tantanmen_recipe: '料理',
    'part-time-for-society': 'コラム',
    'ps-plus-switch-online-otoku': '買い物',
    'psychiatry-hiddenn': 'コラム',
    ragoutsauce_recipe: '料理',
    'rakuten-202208': '買い物',
    'rakuten-202408': '買い物',
    'rakuten-giftcard-buy-report': '買い物',
    'rtx-4090-jisaku': '技術',
    'size-emulation-gaming-monitor': '技術',
    sparse_modeling_blackhole: '技術',
    'strong-convexity': '技術',
    support_nico: '音楽',
    tatekan_ku: 'コラム',
    teinousensei_doujou: 'コラム',
    teinousensei_jiken: 'コラム',
    'vim-move-to-period': '技術',
    'vocacolle-utacolle-odocolle-increase-likes': '音楽',
    'vote-return': 'コラム',
    'watanabe-mayuko': 'コラム',
    'windows-11-settings': '技術',
    windows11: '技術',
    'wordpress-change-media-directory': '技術',
    'yahoo-shopping-saikyo': '買い物',
};

export const getPostCategory = (slug: string): Category =>
    postCategoryMap[slug] ?? DEFAULT_CATEGORY;

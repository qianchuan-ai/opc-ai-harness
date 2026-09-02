#!/usr/bin/env node
// gen_rank.js — 构建时生成 rank.json（周榜数据层 · L1 数据管线补全）
// 用 GitHub API 拉取候选 repo 的 star / 更新时间，按 star 降序写 rank.json。
// 页面（index.html）优先 fetch rank.json 渲染周榜，失败才回退浏览器端实时 API。
//
// 用法:
//   GITHUB_TOKEN=xxx node gen_rank.js   # 带 token（5000 次/时）
//   node gen_rank.js                    # 匿名（60 次/时/IP，本池 ~10 个 repo 足够）
//
// 依赖: 无（node 内置 fetch，Node 18+）

const fs = require('fs');
const path = require('path');

const TOKEN = process.env.GITHUB_TOKEN || '';

// 候选池：站内评测/示例里出现过的仓库（统一为 GitHub 当前名，旧名会被 301 重定向）
// 想扩充生态热门：在此数组追加 'owner/repo' 即可，次日构建自动入榜。
const REPOS = [
  'FSMargoo/dsh-at-file',              // 旧名 omdsh-dev/dsh-at-file（已重定向）
  'liustack/modlens',
  'csyangwen/dsh-memory-evolve',
  'Anionex/dsh-turn-rewind',
  'xiehuan123/dsh-deepread',
  'zhu1090093659/dsh-web',             // 旧名 zhu1090093659/dsh-web-ui（已重定向）
  'ccch1mneyyy/dsh-TUI',
  'goodpostidea-tech/deepseek-harness-skin',
  'Han-1413141/dsh-cost-meter',
  'NanmiCoder/dsh-agent-teams',        // 站内评测过（过度设计篇）
  'Small-tailqwq/dsh-deep-whale',      // 生态热门皮肤（可选，不要就删）
];

async function fetchRepo(repo) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const r = await fetch(`https://api.github.com/repos/${repo}`, {
    headers,
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) throw new Error(`${r.status} ${repo}`);
  return r.json();
}

(async () => {
  const items = [];
  for (const repo of REPOS) {
    try {
      const d = await fetchRepo(repo);
      items.push({
        repo: d.full_name,           // 用 GitHub 返回的当前名（旧名自动纠正）
        stars: d.stargazers_count,
        url: d.html_url,
        pushedAt: d.pushed_at,
        archived: !!d.archived,
      });
      console.log('  ✓', repo, '★', d.stargazers_count);
    } catch (e) {
      console.log('  ✗', repo, e.message, '→ 跳过（不在榜单）');
    }
  }
  items.sort((a, b) => b.stars - a.stars);

  const out = {
    generatedAt: new Date().toISOString().slice(0, 10),
    source: TOKEN ? 'GitHub API (token)' : 'GitHub API (anonymous)',
    note: '由 gen_rank.js 生成；star 为快照值，页面按此渲染周榜。收录不代表推荐。',
    items,
  };
  fs.writeFileSync(path.join(__dirname, 'rank.json'), JSON.stringify(out, null, 2));
  console.log('[done] 已写 rank.json，' + items.length + ' 个仓库（top: ' + (items[0] ? items[0].repo + ' ★' + items[0].stars : '-') + '）');
})();
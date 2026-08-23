#!/usr/bin/env node
// gen_reviews.js — 构建时生成 reviews.json（L1 AI 原生数据层）
// 调 Agnes API 针对每个 dsh 插件实时生成"核心价值/场景/风险"评测。
// 没有 key 或离线时自动跳过、保留现有 reviews.json 兜底层。
//
// 用法:
//   AGNES_KEY=xxx node gen_reviews.js        # 真实时重刷
//   node gen_reviews.js                       # 无 key，仅校验现有 json
//
// 依赖: 无（用 node 内置 fetch，Node 18+）

const fs = require('fs');
const path = require('path');

const ENDPOINT = process.env.AGNES_BASE || 'https://apihub.agnes-ai.cn/v1';
const KEY = process.env.AGNES_KEY;
const MODEL = process.env.AGNES_MODEL || 'agnes-2.5-flash';

// 插件清单: key(页面 data-plugin) -> {repo, note(真测记忆)}
const PLUGINS = {
  'dsh-at-file':            { repo: 'omdsh-dev/dsh-at-file', note: '真装✅ 文件引用，把本地工作区变AI可寻址记忆' },
  'dsh-plan-execute':       { repo: 'qianchuan-ai/dsh-plan-execute', note: '真测❌劝退 rc切换延迟、规划不稳，新手别碰' },
  '@liustack/modlens':      { repo: 'liustack/modlens', note: '真装✅ OCR/截图结构化，大图偶超时' },
  'dsh-memory-evolve':      { repo: 'csyangwen/dsh-memory-evolve', note: '真装✅ 长记忆演化，一人公司知识沉淀' },
  '@anionex/dsh-turn-rewind': { repo: 'Anionex/dsh-turn-rewind', note: '真装✅ 对话回退，试错零成本' },
  'dsh-deepread':           { repo: 'xiehuan123/dsh-deepread', note: '真装✅ 长文深读，论文/报告' },
  'dsh-agent-teams':        { repo: 'qianchuan-ai/dsh-agent-teams', note: '真装✅ 多agent协作' },
  'dsh-tui':                { repo: 'ccch1mneyyy/dsh-tui', note: '真装✅ 终端UI' },
  'dsh-skin':               { repo: 'goodpostidea-tech/deepseek-harness-skin', note: '真装⚠️ 像素风皮肤' },
  'dsh-library':            { repo: 'qianchuan-ai/dsh-library', note: '真测⚠️ 失效命令需修' },
  'dsh-web-ui':             { repo: 'zhu1090093659/dsh-web-ui', note: '真装✅ 网页界面' },
  'dsh-cost-meter':         { repo: 'Han-1413141/dsh-cost-meter', note: '真装✅ API成本计量' },
  'treg':                   { repo: 'qianchuan-ai/treg', note: '真装✅ 定时/触发' },
  'srt-whiteboard-animation': { repo: 'qianchuan-ai/srt-whiteboard-animation', note: '待测 白板动画' },
  'agency-agents-zh':       { repo: 'qianchuan-ai/agency-agents-zh', note: '待测 中文agent团' },
  'yichen-x-slicer':        { repo: 'qianchuan-ai/yichen-x-slicer', note: '待测 切片' },
  '矩媒MatrixMedia':          { repo: 'qianchuan-ai/matrix-media', note: '待测 ToS灰区护栏' },
};

function loadBase() {
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf8')); }
  catch { return {}; }
}

async function fetchReadme(repo) {
  try {
    const r = await fetch(`https://raw.githubusercontent.com/${repo}/main/README.md`, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw 0;
    return await r.text();
  } catch {
    try {
      const r = await fetch(`https://raw.githubusercontent.com/${repo}/master/README.md`, { signal: AbortSignal.timeout(8000) });
      if (!r.ok) return '';
      return await r.text();
    } catch { return ''; }
  }
}

function buildPrompt(name, readme, note) {
  return `你是 dsh(DeepSeek Harness) 插件实测策展人。针对插件 "${name}" 写一段给中文小白用户的深度评测。
已知真装实测记忆: ${note}
官方 README 摘要:
${readme.slice(0, 4000)}

只输出 JSON，字段:
- summary: 核心价值(不重复简介，讲本质机制，80字内)
- yes: 使用场景(具体人群/任务，60字内)
- no: 真实风险(rc阶段坑/不适合谁，60字内)
- philosophy: 东方哲学收束句(1句，用庄子/老子/王阳明等某家某句点透该插件"判断力封装/慎用/演化"的本质，必须长在实测结论上不是贴标签；若该插件实在配不上哲学收束则给空字符串""，不要硬凑)
不要解释，直接给 JSON。`;
}

async function callAgnes(name, readme, note) {
  const body = {
    model: MODEL,
    messages: [{ role: 'user', content: buildPrompt(name, readme, note) }],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  };
  const r = await fetch(`${ENDPOINT}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  return JSON.parse(d.choices[0].message.content);
}

(async () => {
  const base = loadBase();
  if (!KEY) {
    console.log('[skip] 无 AGNES_KEY，保留现有 reviews.json 兜底层（' + Object.keys(base).length + ' 条）');
    console.log('[hint] AGNES_KEY=xxx node gen_reviews.js 可实时重刷');
    return;
  }
  const out = {};
  for (const [name, info] of Object.entries(PLUGINS)) {
    try {
      const readme = await fetchReadme(info.repo);
      const ai = await callAgnes(name, readme, info.note);
      out[name] = {
        summary: ai.summary || base[name]?.summary || '',
        yes: ai.yes || base[name]?.yes || '',
        no: ai.no || base[name]?.no || '',
        philosophy: ai.philosophy || base[name]?.philosophy || '',
        generatedAt: new Date().toISOString().slice(0, 10),
      };
      console.log('  ✓', name);
    } catch (e) {
      console.log('  ✗', name, e.message, '→ 用兜底');
      out[name] = base[name] || { summary: '', yes: '', no: '' };
    }
  }
  fs.writeFileSync(path.join(__dirname, 'reviews.json'), JSON.stringify(out, null, 2));
  console.log('[done] 已写 reviews.json，' + Object.keys(out).length + ' 条');
})();

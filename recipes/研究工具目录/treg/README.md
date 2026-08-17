# 插件：treg（研究工具目录 · ingredient）

> **谦川批注：⚠️ 存疑 —— 研究 / 开发向，非主理人日常；需免费 TREG_TOKEN，有 setup 摩擦（小p 代跑 2026-08-17）**

## 这是什么

- 源：`superdesigndev/treg`（实测 `treg-dsh@0.11.0`）
- 能力：给 Agent 的**工具目录**——按「要做的事」检索约 2600 个外部接口（SEO/SERP、外链、社交、人物与公司信息补全、广告库、抓取），看参数与单价后直接调用，凭据服务端注入
- 定位：**本仓库把它当 ingredient（素材），不是「获客方案」**。它本身不生产线索，只提供调用能力；能不能产出有效线索，取决于你怎么用（见下方批注）

## 适配版本

- dsh：`0.1.0-rc.6`；node：v22.22.2 / pnpm：v11.22.0（需额外装 pnpm）

## 真实坑（小p 代跑）

- **坑1（前置）**：缺 `pnpm`，`dsh plugin add` 直接报 `'pnpm' 不是内部或外部命令` → `npm i -g pnpm`
- **坑2（门槛，非付费）**：treg 需 `TREG_TOKEN`，官方原文 "MCP row stays disabled until TREG_TOKEN is set"。**token 免费拿**（`treg login` 走 GitHub / 邮箱验证码，新团队送 $1 额度），但「登录 + 设环境变量 + 激活 MCP 行」这套 **setup 摩擦** 是真实门槛——小白主理人搞不定，正是 companion 的价值锚点，不是付费墙
- **坑3（环境坑）**：Windows + WorkBuddy 下 `dsh plugin add` 会因 safe-delete 挂，需用 `CODEBUDDY_SESSION_ID=` 空值跑
- **坑4（顺带）**：首次 `dsh --dump-config --profile web` 超时 3.5 分钟（拉全量依赖），首用 compose 体验重

## 我怎么调通（安装层）

```bash
npm i -g pnpm
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add superdesigndev/treg
# → pnpm add treg-dsh github:superdesigndev/treg，53s Done
```

- **安装层**：✅ 已验证可装进 web profile
- **激活层**：⚠️ 待免费 `TREG_TOKEN` —— 由持有 token 的人激活 MCP 行后才能真检索

## 导入命令（亲测可装）

```bash
npm i -g pnpm
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add superdesigndev/treg
```

## 为什么只是 ingredient，不是方案

工具解决容易的 20%（已知要找什么后自动化调用）；「有效线索」来自策略 / 匹配层（人在哪、凭什么信你、什么话戳中他），工具碰不到。所以 treg 是可选引擎，不是答案。

# 插件：modlens（视觉与 OCR）

> **谦川批注：✅ 认 —— 内容创作 / 截图场景强相关；⚠️ Windows 有 bin 警告但无害（小p 代跑 2026-08-17）**

## 这是什么

- 源：`liustack/modlens`（实测版本 `@liustack/modlens@3.18.1`）
- 能力：给纯文本模型加「眼睛」——图片 / OCR / 长截图结构化解析，补齐 DeepSeek 看不了图的短板
- 对 OPC 主理人：贴设计稿、运营截图、竞品页给 agent，让它读懂画面里的文字与布局

## 适配版本

- dsh：`0.1.0-rc.6`；建议**锁版本** `@liustack/modlens@3.18.1`（作者提示未锁可能随上游变动）

## 真实坑（小p 代跑）

- **Windows 专属 WARNING（无害）**：`Failed to create bin ... dist/main.js.EXE` —— 插件 bin 字段没带 `.exe` 扩展名，pnpm 建不出 cli 软链。modlens 是 dsh 插件（由 dsh 加载，不当 CLI 调用），此警告**不影响使用**，忽略即可
- **网络抖动（良性）**：同 dsh-at-file，GitHub HEAD 重试后成功
- **环境坑**：同上，Windows + WorkBuddy 需 `CODEBUDDY_SESSION_ID=` 空值跑

## 我怎么调通

```bash
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add liustack/modlens
# → Done in 1m 37.6s（bin 警告可忽略）
```

验证：`dsh plugin --profile web list` 见 `@liustack/modlens@3.18.1` ✅

## 导入命令（亲测可装，建议锁版本）

```bash
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add liustack/modlens@3.18.1
```

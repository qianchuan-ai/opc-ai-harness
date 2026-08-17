# 插件：dsh-at-file（上下文与文件引用）

> **谦川批注：✅ 认 —— 基础生产力，OPC 主理人建议必装（小p 代跑 2026-08-17）**

## 这是什么

- 源：`omdsh-dev/dsh-at-file`（实测版本 `dsh-at-file@0.6.2`）
- 能力：在 dsh 输入框用 `@` 引用文件或目录，把内容精准注入上下文——不用复制粘贴大段文本
- 对 OPC 主理人：把笔记 / 文档 / 数据表直接丢给 agent，控制它「看」什么，省 token 也省事

## 适配版本

- dsh：`0.1.0-rc.6`（Developer Preview）
- node：v22.22.2 / pnpm：v11.22.0

## 真实坑（小p 代跑）

- **网络抖动（良性）**：GitHub HEAD 偶发 `ECONNRESET` / `ETIMEDOUT`，pnpm 自动重试成功，无需干预
- **环境坑（见仓库通用坑）**：Windows + WorkBuddy 下 `dsh plugin add` 会因 safe-delete 挂掉，需用 `CODEBUDDY_SESSION_ID=` 空值跑

## 我怎么调通

```bash
npm i -g pnpm                                                              # 前置
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add omdsh-dev/dsh-at-file
# → Done in 1m 51.4s
```

验证：`dsh plugin --profile web list` 见 `dsh-at-file@0.6.2` ✅

## 导入命令（亲测可装）

```bash
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add omdsh-dev/dsh-at-file
```

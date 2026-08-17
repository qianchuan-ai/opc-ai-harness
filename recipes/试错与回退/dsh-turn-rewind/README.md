# 插件：dsh-turn-rewind（试错与回退）

> **谦川批注：✅ 认 —— 试错保护，主理人友好（小p 代跑 2026-08-17）**

## 这是什么

- 源：`Anionex/dsh-turn-rewind`（实测版本 `@anionex/dsh-turn-rewind@0.1.1`）
- 能力：会话状态回退——改坏了一句话 / 一步配置，能退回去，降低试错成本
- 对 OPC 主理人：小白折腾 agent 时最怕「一步错全剧终」，这插件给后悔药

## 适配版本

- dsh：`0.1.0-rc.6`

## 真实坑（小p 代跑）

- **peer-deps 软警告（良性）**：`Issues with peer dependencies found. Run "pnpm peers check"` —— 不影响安装与使用，想查可跑 `pnpm peers check`
- **环境坑**：同上，Windows + WorkBuddy 需 `CODEBUDDY_SESSION_ID=` 空值跑

## 我怎么调通

```bash
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add Anionex/dsh-turn-rewind
# → Done in 8.2s（增量安装，快）
```

验证：`dsh plugin --profile web list` 见 `@anionex/dsh-turn-rewind@0.1.1` ✅

## 导入命令（亲测可装）

```bash
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add Anionex/dsh-turn-rewind
```

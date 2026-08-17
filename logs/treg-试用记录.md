# 试用记录：treg（2026-08-17 · 小p 代跑）

> 标准动作：开源下来坑在哪 → 我怎么调通 → 独家配置
> 本记录为「代跑」性质：安装层由小p真跑，激活层因缺 token 锁死，待谦川本人持 token 补。

## 环境

- 系统：Windows（git bash）
- node v22.22.2 / npm 10.9.7 / 补 pnpm 11.22.0
- dsh：`0.1.0-rc.6`（`npx -y @deepseek-ai/dsh --help` 正常）

## 开源下来坑在哪（真实）

1. **缺 pnpm**：直接 `dsh plugin --profile web add superdesigndev/treg` →
   `'pnpm' 不是内部或外部命令，也不是可运行的程序` / `dsh: pnpm failed in profile directory C:\Users\alex\.dsh\profiles\web`
   → dsh 把 plugin add 转发给 pnpm，但 Developer Preview 文档未强调先装 pnpm。
2. **需 TREG_TOKEN**：awesome/zh 字段原文 "Ships the skill plus an MCP row that stays disabled until TREG_TOKEN is set"。无 token，核心检索能力禁用。
3. **首用 compose 重**：`dsh --dump-config --profile web` 首次跑超时 3.5 分钟（拉全量 web profile 依赖）。

## 我怎么调通（真实）

```bash
npm i -g pnpm                                  # 补前置依赖
dsh plugin --profile web add github:superdesigndev/treg
# 实际执行：pnpm add treg-dsh github:superdesigndev/treg
# 结果：Packages: +1 / Progress: resolved 1, downloaded 1, added 1, done / Done in 53s
```

- 校验：pnpm 明确 `added 1, done` → treg-dsh 已进入 `C:\Users\alex\.dsh\profiles\web` 的 node_modules。
- 注：我试的 `superdesigndev/treg`（不带 github: 前缀）也能装，pnpm 默认当 github 解析；官方推荐带 `github:` 前缀。

## 独家配置（当前状态）

- 安装层：✅ 已落盘（见 `recipes/获客-有效线索/treg/README.md` 的导入命令）
- 激活层：⚠️ 待 `TREG_TOKEN` —— 小p 无此 token，无法验证「检索 2,600 接口」真实效果
- 结论：**「我配置完一定能用起来」在本配方上 = 装好（已验证）+ token 激活（待谦川）**。未持 token 前，不向 OPC 主理人承诺"能用"。

## 给谦川的下一步

1. 你是否有 treg 的 `TREG_TOKEN`？（来源应为 treg 官方服务端，非开源仓库）
2. 若有 → 设 `TREG_TOKEN` 后跑一次真实检索（如"补全某公司联系人"），把效果回填，本配方升为 ✅已验证
3. 若无 → 本配方定位改为「情报占位 + 硬门槛警示」，不进「可交付」清单；OPC 获客楔子改选**无 token 依赖**的插件（下轮筛）

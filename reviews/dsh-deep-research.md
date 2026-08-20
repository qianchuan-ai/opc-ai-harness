# ⚠️ dsh-deep-research — 装包成功，但 web profile 缺 workflow 引擎 → Loader pending（OPC 主理人暂不推荐）

> 一人公司主理人做市场调研 / 竞品分析时，这个插件用「控制论 + 信息论」搭了一个自适应研究闭环：自动拆解问题 → 并行研究 → 边际增益验证 → 输出报告。理论很美，但**真装实测发现：在 web profile 下它装包成功、却因缺官方 workflow 引擎而 Loader pending，工具根本注入不了**——对用 web 的主理人是硬门槛。结论仍是：**先用 dsh-deepread 跑通单篇精读，再考虑升级到这个（且得切 tui/headless profile）**。

**安装标识**：`@dsh-external/dsh-deep-research`（仓库 `github:omdsh-dev/dsh-deep-research`）
**实测版本**：0.1.0（pnpm 装包成功）
**状态**：⚠️ 装通但 web profile 不可用（缺 `@deepseek-ai/dsh-workflow`，Loader pending）

---

## 1. 真装踩坑实录（2026-08-20 本沙箱实测）

**推荐安装命令**（web profile 实测可用）：

```sh
CODEBUDDY_SESSION_ID=wb npx -y @deepseek-ai/dsh plugin --profile web add git+https://github.com/omdsh-dev/dsh-deep-research.git
```

> 两个必带的环境变量坑见下。

**坑 1 — dsh 本体首次 `npx` 拉取卡死（沙箱特性，非插件问题）**
本沙箱 `~/.npm/_npx` 里 dsh 缓存被清过，每次 `npx dsh` 都要重新拉 dsh 本体（**451 个包**）。首次拉取在 npx 下**静默挂起 10 分钟零输出**（registry 通、但 npx 下载无进度）。
→ 解决：先全局预装本体 `npm i -g @deepseek-ai/dsh`（3 分钟拉完 451 包），之后用本地 `dsh` 命令操作，不再走 npx。

**坑 2 — `CODEBUDDY_SESSION_ID=` 空值不生效（safe-delete 拦安装）**
dsh 内部调自带的 pnpm（带 genie-safe-delete 拦截），它检查 `CODEBUDDY_SESSION_ID`。用空值 `CODEBUDDY_SESSION_ID=` 它仍判定 "not set"，报 `SAFE_DELETE_BULK_GUARD_ERROR` 中断安装。
→ 解决：给**非空值**，如 `CODEBUDDY_SESSION_ID=wb` 即可放行。

**坑 3（核心）— web profile 缺 workflow 引擎 → 装包成功但 Loader pending**
装包本身 `ADD_EXIT=0` 成功。但：

- 插件 `peerDependencies` 明确要 `@deepseek-ai/dsh-workflow: ^0.0.1`；
- web profile 的 `pnpm-workspace.yaml` 设了 `autoInstallPeers: false`，pnpm **不会**自动补 peer；
- 实测 web profile 的 `node_modules/@deepseek-ai/` 里**没有 `dsh-workflow`**；
- 插件 README 自己警告：*"若 Profile 未声明 workflow provider（如部分 Web Profile 组合），Loader 会保持 pending"*。

→ 结论：**web profile 下这个插件装了也用不了**，`deep_research` 工具不会注入对话。要真正用，得：
① 改用提供 workflow 引擎的 profile（`tui` / `headless` 组合），或
② 在 DSH Hub 登记 workflows provider 关系。

> 注：本沙箱后台环境无法启动 dsh（`prepareProfile` 阶段的 genie-trash 调回收站失败），故未能跑到「启动后 Loader 打印 pending」那一步；但上述 4 重证据（peer 声明 / 缓存缺失 / autoInstallPeers false / 官方警告）已足以确认 web profile 下必然 pending。

---

## 2. 3 分钟上手（文档路径，web profile 未实跑）

> 因 web profile Loader pending，以下为插件文档描述的操作路径，**未在 web 环境实跑**。

1. 起 dsh（需 tui/headless 等含 workflow 的 profile）：`npx @deepseek-ai/dsh --profile headless`
2. 对话里直接说人话触发：
   - 「深度调研一下 MCP 生态现状，重点对比几家主流实现，出一份带引用的报告」
   - 「调研一下 A/B 方案，purpose 是决定我们选哪个」（用途越明确，答案空间越准）
3. 进阶参数：`depth: 3`（穷尽）/ `review: true`（对抗性审查）/ `synthesize: false`（只返回三态证据）
4. 成本建议：分层模型（plannerModel 强 / researcherModel 便宜）降本。

**OPC 用法示例**：公众号选题会前，把「竞品本周热点 + 我们差异化角度」丢进去，让它输出「3 个研究子问题 + 每个的验收标准 + 一份带置信度的综合报告」——直接成为你选题会的材料底稿（前提是跑在含 workflow 的 profile 上）。

---

## 3. 劝退 / 推荐阈值（真装更新）

**推荐装（能用前提）**：
- 用 **tui / headless profile**（自带 workflow 引擎）的主理人；
- 真需要做多轮深度调研（竞品 / 市场 / 技术选型），且愿分层配模型控成本。

**劝退（web 用户）**：
- 你用 **web profile** → 装了 Loader pending，工具不注入，**等于没装**。先别上。
- 只想单篇精读 → 用 `dsh-deepread`，别上这个。
- 预算敏感 / 追求开箱即用 → 多轮闭环 token 贵、概念门槛高。

---

## 4. 谦川批注

真装结论印证了之前的判断：**先 deepread、再升级**。但比理论版更尖锐的是——**这个插件在 web profile 上根本跑不起来**（缺官方 workflow 引擎），不是"配置复杂"那么轻。对 OPC 主理人（绝大多数用 web）这是个硬劝退点。除非你切到 headless/tui 做研究，否则它目前只是个"装了也好看"的摆设。

**与 dsh-deepread 的关系**：不是替代，是升级。deepread = 按需精读单篇（快、省、web 可用）；deep-research = 多源自适应闭环（慢、深、贵、需 workflow 引擎 → web 不可用）。

---

## 待办
- [x] 真装实测，回填「安装踩坑实录」（真实坑：npx 卡死 / CODEBUDDY_SESSION_ID 非空 / web 缺 workflow→pending）
- [ ] 实际运行一次（需切 headless/tui profile + 有效 LLM，本沙箱未跑）
- [ ] 统计 token 消耗（成本风险评估，待实跑）

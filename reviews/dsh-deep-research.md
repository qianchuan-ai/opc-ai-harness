# ⚠️ dsh-deep-research — 自适应深度研究闭环（理论扎实但实战门槛高）

> 一人公司主理人做市场调研/竞品分析时，这个插件用「控制论 + 信息论」搭了一个自适应研究闭环：自动拆解问题→并行研究→边际增益验证→输出报告。理论很美，但配置复杂、token 消耗大、需要强模型撑规划层——OPC 主理人**先用 dsh-deepread 跑通单篇精读，再考虑升级到这个**。

**安装标识**：`omdsh-dev/dsh-deep-research`
**实测版本**：未装（GitHub 源码审查）
**状态**：⚠️ 理论先进，实战门槛高

---

## 1. 安装踩坑实录

> 注：本文基于 GitHub 源码审查，**未在本沙箱真装实测**。安装命令照搬 README，坑点根据插件类型（TypeScript 零构建）和同类插件经验推断，真实踩坑待谦川补填。

**推荐安装命令**：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add git+https://github.com/omdsh-dev/dsh-deep-research.git
```

**关键坑预判**：

1. **allowBuilds 白名单**：插件声明了 `dsh.bundle.patch`（cordis.patch.yml），如果 pnpm 报 `needs to execute build scripts`，需在 `~/.dsh/profiles/web/pnpm-workspace.yaml` 加：
   ```yaml
   allowBuilds:
     @dsh-external/dsh-deep-research: true
   ```

2. **依赖官方 workflow 引擎**：插件强依赖 `@deepseek-ai/dsh-workflow-workerthread`，需确认 profile 组合包含官方 workflow 引擎与内置 web 工具。`dsh` 官方 base 组合自带，无需额外安装；peer 依赖由组合提供。

3. **编译型警告无害**：可能触发 `[WARN] Failed to create bin` 类警告（同 modlens 那批），对 dsh 插件加载无影响。

**结论**：理论上比 dsh-library 简单（零构建），但**配置复杂度更高**（需理解 scope/acceptance/review 参数）。

---

## 2. 3 分钟上手（基于 README 文档）

> 说明：本沙箱无 dsh Web 会话，以下为插件文档描述的操作路径，**精确体验待谦川真装后回填**。

1. 起 dsh：`npx @deepseek-ai/dsh web` → 浏览器开 `http://127.0.0.1:3080`。
2. 对话里直接说人话触发：
   - 「深度调研一下 MCP 生态现状，重点对比几家主流实现，出一份带引用的报告」
   - 「调研一下 A/B 方案，purpose 是决定我们选哪个」（**用途越明确，答案空间越准**）
   - 「按这份问题清单做研究：1. ... 2. ...」（已有清单 → 跳过自动拆解，直接并行研究）
3. 进阶参数（可选）：
   - `depth: 3` → 精度/容差（1=初步 2=深入默认 3=穷尽）
   - `review: true` → 对抗性审查（引用抽查 + 覆盖度审计 + 矛盾标注）
   - `synthesize: false` → 只返回三态证据（confirmed/uncertain/gaps），不出最终报告
4. **成本建议**：插件支持分层模型配置（`plannerModel`/`researcherModel`/`synthesizerModel`/`reviewerModel`），规划/综合用强模型、研究用便宜模型，可显著降本。

**OPC 用法示例**：公众号选题会前，把「竞品本周热点 + 我们差异化角度」丢进去，让它输出「3 个研究子问题 + 每个的验收标准 + 一份带置信度的综合报告」——直接成为你选题会的材料底稿。

---

## 3. 劝退 / 推荐阈值

**推荐装**：
- 需要做**多轮深度调研**的主理人（竞品分析、市场调研、技术选型评估）。
- 愿意**分层配置模型**控成本（规划用强模型、研究用便宜模型）。
- 已经跑通 `dsh-deepread`（单篇精读），想升级到**多源自适应研究**的。

**劝退**：
- 只想**单篇精读**就够了 → 用 `dsh-deepread`，别上这个（杀鸡用牛刀）。
- **预算敏感** → 多轮研究闭环 token 消耗大，没分层配置意识的话容易烧钱。
- 追求**开箱即用** → 这个插件的「自适应闭环」哲学意味着你得先理解 scope/acceptance/review 这些概念才能用好，不是纯黑盒。
- 简单任务一次性搞定 → 它擅长复杂主题自动扩展，简单主题一轮收敛，但**配置成本不低**。

---

## 4. 谦川批注

**理论扎实，实战门槛高**。控制论 + 信息论的设计思路（边际增益验证、对抗性审查、自适应再规划）在插件领域少见，说明作者有真思考。但：

1. **配置复杂度**：需要理解 scope/acceptance/review 这些概念，不是纯新手友好。
2. **成本风险**：多轮研究闭环 token 消耗大，没分层配置意识容易烧钱。
3. **定位建议**：**先用 dsh-deepread 跑通单篇精读，再考虑升级**。这条插件是给「已知道自己要什么研究、且预算允许」的主理人用的进阶工具，不是给迷茫者的拐杖。

**与 dsh-deepread 的关系**：不是替代，是升级。deepread = 按需精读单篇（快、省）；deep-research = 多源自适应闭环（慢、深、贵）。OPC 主理人建议先吃透 deepread，等有复杂研究需求再上这个。

---

## 待谦川补填

- [ ] 真装实测，回填「安装踩坑实录」段（真实输出 + 真实坑）
- [ ] 实际运行一次，回填「3 分钟上手」段（真实体验）
- [ ] 统计 token 消耗（成本风险评估）

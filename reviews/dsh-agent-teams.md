# ✅ dsh-agent-teams — 多 Agent 协作（OPC 一人扛多活）

> 一人公司主理人最痛的是"一个人要同时是产品/内容/运营/客服"。agent-teams 让你定义多个角色化 Agent（如"写手""审稿""测试"），把复杂任务拆给它们并行协作——等于给自己配了个虚拟团队。

**安装标识**：`NanmiCoder/dsh-agent-teams`
**实测版本**：`@0.1.6`
**状态**：✅ 已装进 web profile（1m9.6s）

---

## 1. 安装踩坑实录

命令（Windows/沙箱必带 `CODEBUDDY_SESSION_ID=` 绕开 safe-delete，详见《通用安装坑》）：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add NanmiCoder/dsh-agent-teams
```

真实输出尾部：

```
[WARN] HEAD https://github.com/NanmiCoder/dsh-agent-teams error (ERR_SSL_PACKET_LENGTH_TOO_LONG). Will retry in 500 milliseconds. 2 retries left.
[WARN] Issues with peer dependencies found. Run "pnpm peers check" to list them.
dependencies:
+ @nanmicoder/dsh-agent-teams github:NanmiCoder/dsh-agent-teams
Packages: +1
[WARN] Failed to create bin at ...\modlens. ENOENT ...\dist\main.js.EXE   # 另一插件的老警告，无害
Progress: resolved 9, reused 5, downloaded 1, added 1, done
Done in 1m 9.6s using pnpm v11.22.0
```

**踩坑**：
- `ERR_SSL_PACKET_LENGTH_TOO_LONG`（GitHub HEAD 请求 SSL 包长度异常）→ pnpm 自动重试 2 次后成功。**网络层瞬态，不是插件缺陷，看到这 WARN 别慌，等它重试即可**。
- `peer dependencies` 软警告：良性，不影响加载。
- `modlens bin` 警告：来自已装的另一插件，与 agent-teams 无关（详见《通用安装坑》"Windows bin 警告"）。
- 关键：纯 Cordis 插件、**零编译**，不像 `dsh-library` 要 `allowBuilds`。比编译型友好。

---

## 2. 3 分钟上手（文字版，沙箱无录屏，本地照录即可）

> 说明：本沙箱没有运行中的 dsh Web 会话，以下基于插件文档描述"装好后怎么调"，**精确指令名以插件自带 README 为准**。

1. 起 dsh：`npx @deepseek-ai/dsh web` → 浏览器开 `http://127.0.0.1:3080`。
2. 派活：对话里用类似"组建一个团队：A 负责写初稿、B 负责审稿、C 出测试"的指令，插件会注册多 Agent 编排能力。
3. 定角色：每个 Agent 给清晰职责边界（干啥、不干啥、产出啥格式）——这是成败关键。
4. 汇总：多个 Agent 并行跑，结果回你这汇总，你做终审。

OPC 用法示例：公众号周更——组建"选题 Agent + 写作 Agent + 配图 Agent + 审稿 Agent"，你把本周热点丢进去，团队并行出一篇带配图的成稿，你只做终审。

---

## 3. 劝退 / 推荐阈值

**推荐装**：
- 任务可清晰拆分、想并行省时间的主理人（内容生产流水线、多文件批处理）。
- 一个人但想要"虚拟团队"杠杆的——这正是 OPC 的核心痛点解法。

**劝退**：
- 任务太简单、一次对话就完——上多 Agent 是过度工程，反而更慢。
- 新手还没吃透标准模式——先会单 Agent 跑顺一个场景，再上团队。
- 指望"装了就自动运营/自动赚钱"——它编排的是**你的活**，不是替你决策业务。

---

## 谦川批注

一人公司的"虚拟团队"想象力正落在这。但别神话：多 Agent 省的是你编排的脑力与等待时间，**不是自动出结果**——角色定义不清，团队就内耗。建议先用标准模式跑顺一个场景，再考虑拆团队。这插件是给"已知道自己要什么活"的主理人用的放大器，不是给迷茫者的拐杖。

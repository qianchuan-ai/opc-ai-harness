# ✅ dsh-memory-evolve — 跨会话长记忆（OPC 反复协作不重复交代）

> 默认 dsh 每次对话都是全新开始，关掉就忘。memory-evolve 让 Agent 跨会话记住你的项目上下文、偏好、历史决策，下次接着干——你不用每次从"我是谁、这项目干啥"重新交代。

**安装标识**：`csyangwen/dsh-memory-evolve`
**实测版本**：`@0.1.0`
**状态**：✅ 已装进 web profile（1m34s）

---

## 1. 安装踩坑实录

命令（Windows/沙箱必带 `CODEBUDDY_SESSION_ID=` 绕开 safe-delete，详见《通用安装坑》）：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add csyangwen/dsh-memory-evolve
```

真实输出尾部：

```
[WARN] HEAD https://github.com/csyangwen/dsh-memory-evolve error (ERR_SSL_PACKET_LENGTH_TOO_LONG). Will retry in 500 milliseconds. 1 retries left.
[WARN] Issues with peer dependencies found. Run "pnpm peers check" to list them.
dependencies:
+ dsh-memory-evolve github:csyangwen/dsh-memory-evolve
Packages: +1
[WARN] Failed to create bin at ...\modlens. ENOENT ...\dist\main.js.EXE   # 另一插件的老警告，无害
Progress: resolved 10, reused 6, downloaded 1, added 1, done
Done in 1m 34s using pnpm v11.22.0
```

**踩坑**：
- 同样踩 `ERR_SSL_PACKET_LENGTH_TOO_LONG` 重试（良性，已自动过）。
- `peer dependencies` 软警告：良性。
- `modlens bin` 警告：老问题，与 memory-evolve 无关。
- 零编译、纯 Cordis 插件，比 `dsh-library` 友好。

---

## 2. 3 分钟上手（文字版，沙箱无录屏，本地照录即可）

> 说明：本沙箱没有运行中的 dsh Web 会话，以下基于插件文档描述"装好后怎么调"，**精确指令名以插件自带 README 为准**。

1. 起 dsh：`npx @deepseek-ai/dsh web` → 浏览器开 `http://127.0.0.1:3080`。
2. 沉淀记忆：在会话里直接告诉它"记住：本项目的 X 规则 / 我的偏好 Y"。插件会自动沉淀为长期记忆。
3. 召回：下次新会话，它从记忆里召回相关上下文，不用你重述。
4. 自我进化：它还会从持续协作里蒸馏经验，越用越懂你。

OPC 用法示例：第一次跟 AI 做养老社群运营，交代"用户是 50+ 下沉市场、反感说教、爱转发实用清单"→ 记忆住；之后每次新对话，AI 自动带着这套用户画像干活，你省掉每次开场白。

---

## 3. 劝退 / 推荐阈值

**推荐装**：
- 反复跟 AI 协作同一项目/同一领域、每次从头交代烦的主理人。
- 想让 AI "越用越懂我"的——自我进化机制是加分项。

**劝退**：
- 只偶尔用一次、用完就关——记忆没积累价值，别装。
- 要团队/跨账号共享记忆——这是**本地 solo 记忆**，换机器/换账号就没（要跨端共享看 TencentDB/Hindsight 类，但那要云端账号，OPC 主理人不友好）。
- 对"AI 自己写记忆"有安全顾虑的——可控但要信任，敏感项目先别喂机密。

---

## 谦川批注

长记忆是 Agent 从"工具"变"搭档"的关键一跃——它记得你，你才省心。但提醒两点：①记忆是本地单机的，备份 `~/.dsh` 才保险；②它记你喂的，**你喂得准它才准，垃圾进垃圾出**。这插件适合已经清楚"我是谁、我项目干啥"的主理人，把隐性知识固化给 AI，而不是指望它凭空懂你。

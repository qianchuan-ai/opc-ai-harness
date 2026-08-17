# ❌ dsh-plan-execute — 规划/执行双模型路由（装失败 + 其实不需要）

> 设想价值：把"规划"交给便宜模型、"执行"交给强模型，同一任务双模型跑、省 API 钱。对 OPC 主理人控成本有意义。

**安装标识**：`dsh-external/dsh-plan-execute`（仓库版）
**状态**：❌ 本沙箱装失败；更重要的是——**这个能力 dsh 原生就有，根本不必装它**。

---

## 1. 安装踩坑实录

第一次（简写）：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add dsh-external/dsh-plan-execute
```

报错：

```
[ERR_PNPM_GIT_RESOLVE_FAILED] Failed to resolve git dependency "dsh-external/dsh-plan-execute":
git ls-remote failed: fatal: could not read Username for 'https://github.com':
terminal prompts disabled
```

第二次（官方 `github:owner/repo#ref` 格式，强制走 tarball）：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add "github:dsh-external/dsh-plan-execute#main"
```

仍失败——这次撞到本沙箱 npm 缓存锁（EPERM，环境特性，与插件无关，见《通用安装坑》）。但**第一次的 git-auth 错误已经说明问题**：这个仓库在匿名环境下 `git ls-remote` 拿不到身份，疑似私有仓库或需鉴权，**普通主理人直接 `add` 装不上**。

---

## 2. 真正的答案：用 dsh 原生模型切换（零插件）

双模型/多模型路由**不是非得靠这个插件**。dsh 原生就支持自定义模型源：

1. dsh Web → Settings → Models。
2. 加一个自定义 Provider：
   - Provider ID：小写随意，如 `glm`
   - Base URL：你的 OpenAI 兼容接口（如智谱 GLM、OrcaRouter 等）
   - 协议：OpenAI 兼容
   - 模型 ID：填具体模型名
3. 保存后，模型下拉框立刻出现新选项，**切换即时生效、不用重启**。

效果：日常机械活走便宜模型（如 GLM-4-Flash / DeepSeek V4 Flash），硬推理切回 Pro——和 plan-execute 想做的事一模一样，但**零安装、零编译、不被私有仓库卡**。

> 来源佐证：OrcaRouter 实测文 + 中文社区"DSH 7 个技巧"都指出，DSH 不锁模型，接任意 OpenAI 兼容端点即可；Provider ID 创建后不能改名，要改只能删了重建。

---

## 3. 劝退 / 推荐阈值

**劝退（绝大多数人）**：
- 你只是想"省 API 钱、双模型跑" → **别装这个仓库版**，用上面原生切换，稳且快。
- 你装插件图省事 → 这玩意儿匿名装不上，反而添堵。

**仅当你确实要**：
- 把 plan（规划）和 execute（执行）**显式拆成两个不同模型、在同一个 agent 循环里分别调用**做对比实验 → 才值得去搞这个插件（且需先解决私有仓库鉴权）。

---

## 谦川批注

这是"敢写劝退"的样板案例：**不是所有'刚需'都要用插件解决**。用户以为"模型切换"是个要装的插件，其实 dsh 原生就给。
把它写进 reviews 不是为了黑它，是为了省下主理人"照着装结果装不上"的 20 分钟——**这 20 分钟就是信任**。
本批实测里它虽"失败"，价值却最高：它逼出了"原生模型切换"这条更稳的路。

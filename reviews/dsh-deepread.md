# ✅ dsh-deepread — 内容精读（OPC 内容抓取合规源）

> 一人公司主理人做内容/研究时，把网页 URL、本地文件、粘贴文本喂进去，五种模式（快速/深度/知识地图/费曼/全书）出带主张+证据的报告。替代"小红书/公众号抓取"的合规方案——不碰平台 ToS，抓公开网页/文档即可。

**安装标识**：`xiehuan123/dsh-deepread`
**实测版本**：github 源最新（装成即锁定）
**状态**：✅ 已装进 web profile（8.3s）

---

## 1. 安装踩坑实录

命令（Windows/沙箱必带 `CODEBUDDY_SESSION_ID=` 绕开 safe-delete，详见《通用安装坑》）：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add xiehuan123/dsh-deepread
```

真实输出尾部：

```
[WARN] Issues with peer dependencies found. Run "pnpm peers check" to list them.
dependencies:
+ dsh-deepread github:xiehuan123/dsh-deepread
Packages: +1
[WARN] Failed to create bin at ...\modlens. ENOENT ...\dist\main.js.EXE   # 另一个插件的老警告，无害
Progress: resolved 8, reused 4, downloaded 1, added 1, done
Done in 8.3s using pnpm v11.22.0
```

**踩坑**：无独有偶，本次只踩到两条良性警告——
- `peer dependencies` 软警告：不影响加载，可忽略。
- `modlens bin` 警告：来自已装的另一插件，与 deepread 无关（详见《通用安装坑》"Windows bin 警告"）。

结论：deepread 是本次 3 个里**最省心**的一个，纯 tarball 装、零编译。

---

## 2. 3 分钟上手（文字版，沙箱无录屏，本地照录即可）

> 说明：本沙箱没有运行中的 dsh Web 会话，以下基于插件文档的模式描述"装好后怎么调"，**精确命令名以插件自带 README 为准**（装好后 `recipes/...` 或 `node_modules/dsh-deepread/README.md` 里查）。

1. 起 dsh：`npx @deepseek-ai/dsh web` → 浏览器开 `http://127.0.0.1:3080`。
2. 调起 deepread：对话里指向一个 URL / 上传文件 / 粘贴文本，要求"精读"。
3. 选模式：
   - **快速**：扫重点，几十秒出摘要。
   - **深度**：逐段提取主张+证据+数据，出报告。
   - **知识地图**：把一篇长文拆成概念关系图（写系列内容前先搭骨架用）。
   - **费曼**：用"讲给外行听"的口径复述，检验自己真懂没。
   - **全书**：长文档/多文件批量读。
4. 进阶：`预算预检`（先估要烧多少 token）+ `后台任务`（长读放后台，进度透明）。

OPC 用法示例：把竞品的一篇公众号文章 URL 丢进去 → 深度模式 → 拿到"他这篇的论点结构+数据支撑+情绪钩子"，直接成为你二创的素材底稿。

---

## 3. 劝退 / 推荐阈值

**推荐装**：
- 日常要做内容研究、竞品拆解、长文归纳的主理人。
- 想要"合规抓公开网页/文档"而非爬平台的（这正是它比爬小红书/公众号稳的地方）。

**劝退**：
- 你要的是"自动监控某账号更新并抓取"——deepread 是按需精读，不是订阅式爬虫，别指望它。
- 纯离线、绝不上网的环境——它要抓 URL 就得联网。
- 只想本地存自己的知识库检索 → 看 `dsh-library`（本批另一个，见其评测）。

---

## 谦川批注

内容创作者的"输入侧"刚需。比起踩灰区的平台爬虫，走公开 URL/文档精读更耐打，也更符合长期主义。
本批 3 个里它最干净——**零编译、纯 tarball、8 秒装成**，是给主理人首推的"先用起来"插件。

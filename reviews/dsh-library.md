# ⚠️ dsh-library — 本地优先文档知识库（坑已定位，待干净环境装成）

> 一人公司主理人把产品文档 / 公众号文章 / 客户问答丢进去，会话时自动语义+关键词混合检索并引用感知注入。SQLite 索引、本地 embedding、**零模型下载**——对不想把知识传云端的 OPC 是刚需。

**安装标识**：`PerryLink/dsh-library`
**状态**：⚠️ 坑已定位未最终装成。两个拦路点：① 编译型插件需 `allowBuilds`（已修）；② 本沙箱 npm 缓存锁（环境特性，干净机器无此问题）。

---

## 1. 安装踩坑实录

第一次：

```sh
CODEBUDDY_SESSION_ID= npx -y @deepseek-ai/dsh plugin --profile web add PerryLink/dsh-library
```

报错：

```
[ERR_PNPM_GIT_DEP_PREPARE_NOT_ALLOWED] Failed to prepare git-hosted package .../dsh-library@0.1.0:
needs to execute build scripts but is not in the "allowBuilds" allowlist.
Add the package to "allowBuilds" in your project's pnpm-workspace.yaml. For example:
allowBuilds:
  dsh-library@https://codeload.github.com/PerryLink/dsh-library/tar.gz/<sha>: true
```

**修复（已在 web profile 的 `pnpm-workspace.yaml` 加上）**：

```yaml
allowBuilds:
  dsh-library@https://codeload.github.com/PerryLink/dsh-library/tar.gz/73584d9d4e670a469cdad35620692314cf698d3d: true
```

加完重试 → 又撞本沙箱 npm 缓存 EPERM 锁（见《通用安装坑》"npm 缓存锁"），属环境特性，**干净 Windows/Mac 上 `allowBuilds` 一步即可装成**。

> 经验：凡是"git 托管 + 需要编译(prepare/build)"的 dsh 插件，装之前先去 profile 的 `pnpm-workspace.yaml` 加 `allowBuilds`，否则必报 `PREPARE_NOT_ALLOWED`。这是 dsh 插件生态的通用坑，不是 dsh-library 独有。

---

## 2. 3 分钟上手（装成后，文字版）

1. 起 dsh Web，确认 dsh-library 在已装列表。
2. 入库：`library_add` 一个文件夹 / 文件（产品手册 PDF、公众号文章导出 md、客户问答 txt）。
3. 检索：`library_search "<问题>"` → 返回语义+关键词混合结果，带多样性重排、相关性过滤、lost-in-the-middle 规避。
4. 注入：开启引用感知，dsh 回答时自动带 `library_cite_check`，可用 `library_diagnose` 自查索引健康。

OPC 用法：把"你这行的常见客户疑问 + 你的标准回答"全丢进 library，以后每次会话 dsh 自动引用你的口径作答——**一致性拉满，不跑偏**。

---

## 3. 劝退 / 推荐阈值

**推荐装（干净环境）**：
- 想搞本地知识库、数据不想出本机的主理人。
- 已经接受"要碰一下 pnpm-workspace.yaml"的技术门槛。

**劝退**：
- 完全不想碰配置文件的非技术用户 → 等官方出预编译版，或先看 **`dsh-kb-sieve`**（Markdown/TXT/DOCX/PDF 建可审计 KB，用 SQLite FTS5，**不需要编译**，踩坑更少）。
- 要云端协作 / 多人共享知识 → 看 `deepDDW`（Docker 部署、LAN 可达、~20 人团队级），不是单机 dsh-library。

---

## 谦川批注

本地知识库是 OPC 的"记忆层"刚需，dsh-library 的"零模型下载"对没显卡、怕配置的主理人最友好。
它教会我们一条通用规律：**编译型插件先确认 allowBuilds**——这条写进《通用安装坑》能救很多人。
本沙箱没装成是环境锁，不是插件烂；干净机器上它是我推荐的本地 KB 首选。

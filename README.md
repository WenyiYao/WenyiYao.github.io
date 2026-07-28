# WenyiYao.github.io

个人学术主页（基于 [al-folio](https://github.com/alshedivat/al-folio) 主题搭建）。

- **线上地址**：`https://wenyiyao.github.io`

## 常用内容入口

- **About（首页）**：`_pages/about.md`
- **CV**：`_pages/cv.md`（页面设置），`_data/cv.yml`（简历内容，RenderCV 格式）
- **Publications**：`_pages/publications.md` + `_bibliography/papers.bib`
- **News（首页 News 列表数据）**：`_news/*.md`
- **社交链接（邮箱 / LinkedIn 等）**：`_data/socials.yml`

## 本地预览

本仓库是 Jekyll 站点。推荐使用 Docker（最省环境折腾），或使用本机 Ruby。

### Docker（推荐）

```bash
docker compose pull
docker compose up
```

默认在 `http://localhost:8080`。

### 本机 Ruby（可选）

```bash
bundle install
bundle exec jekyll serve
```

## 常见问题

- **GitHub Actions / CI 提示 `cv.yml` YAML 不合法**：优先检查缩进（列表 `-` 是否在正确层级）、冒号后是否有空格、含特殊字符的字符串是否需要加引号。
- **BibTeX 报错（例如解析 `selected` 字段失败）**：多数是字段之间漏了逗号（如 `doi={...},`）。

## 主题与文档

更多主题配置与功能说明见：

- `CUSTOMIZE.md`
- `INSTALL.md`

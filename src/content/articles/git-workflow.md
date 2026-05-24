---
title: 我的个人主页建站命令记录
date: 2026-05-24
tag: 建站
summary: 记录这次从本地创建网页、上传 GitHub、部署 Vercel，到使用分支开发日志页的过程，也顺便解释常用命令的作用。
feishuUrl:
---

# 我的个人主页建站命令记录

这次我从零开始搭建了一个个人主页项目。整个流程大概可以分成几个阶段：本地创建项目、运行开发服务器、提交到 GitHub、部署到 Vercel，以及使用分支开发新功能。

## 1. 创建项目

最开始使用下面的命令创建一个 Vite + React 项目：

```cmd
npm create vite@latest personal-homepage
```

其中：

- `npm` 是 Node.js 自带的包管理工具；
- `create vite@latest` 表示使用最新版 Vite 创建项目；
- `personal-homepage` 是项目文件夹名字。

创建完成后进入项目：

```cmd
cd personal-homepage
npm install
npm run dev
```

`npm install` 用来安装依赖，`npm run dev` 用来启动本地开发服务器。

## 2. 本地预览

启动成功后，终端会显示类似：

```text
Local: http://localhost:5173/
```

这里的 `localhost` 表示自己的电脑，所以这个地址只能在本机访问。

## 3. 打包项目

部署前需要确认项目可以正常打包：

```cmd
npm run build
```

如果成功，项目会生成一个 `dist` 文件夹。这个文件夹就是最终可以部署到 Vercel、服务器或其他静态网站平台上的内容。

## 4. Git 本地提交

初始化 Git 仓库：

```cmd
git init
git add .
git commit -m "init personal homepage"
```

这些命令的作用分别是：

- `git init`：在当前项目里创建本地 Git 仓库；
- `git add .`：把所有修改加入暂存区；
- `git commit -m "xxx"`：把暂存区内容保存成一次提交。

第一次提交时，需要配置 Git 用户名和邮箱：

```cmd
git config --global user.name "weisi li"
git config --global user.email "a2806008739@gmail.com"
```

## 5. 绑定 GitHub 仓库

创建 GitHub 仓库后，把本地项目和远程仓库绑定：

```cmd
git remote add origin https://github.com/liweisi2019/web.git
git branch -M main
git push -u origin main
```

其中：

- `git remote add origin`：绑定远程仓库地址；
- `git branch -M main`：把当前分支命名为 `main`；
- `git push -u origin main`：把本地 `main` 分支推送到 GitHub。

## 6. Vercel 自动部署

Vercel 连接 GitHub 仓库后，会自动执行：

```cmd
npm install
npm run build
```

然后把 `dist` 目录部署成网页。

以后只要执行：

```cmd
git add .
git commit -m "update homepage"
git push
```

Vercel 就会自动重新部署。

## 7. 分支开发

为了不影响正式网站，可以新建分支开发新功能：

```cmd
git checkout -b notes
git push -u origin notes
```

这里：

- `main` 分支代表正式网站；
- `notes` 分支代表日志功能的开发版本。

Vercel 会给分支生成预览地址，但不会影响正式域名。

## 8. 合并到正式网站

确认功能没问题后，可以把 `notes` 分支合并到 `main`：

```cmd
git checkout main
git merge notes
git push
```

这样正式网站才会更新。

## 总结

这次建站让我理解了一个完整流程：

```text
本地开发
→ Git 管理
→ GitHub 托管
→ Vercel 部署
→ 分支预览
→ 合并上线
```

以后继续加功能时，可以先在新分支里测试，确认没问题后再合并到 `main`。这样既安全，也方便管理。
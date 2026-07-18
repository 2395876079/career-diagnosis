# 终将上岸导航 V1.0

AI未来发展诊断系统 - 帮助大学生找到最适合的发展方向

## 🎯 项目简介

"终将上岸导航"是一个基于AI的未来发展诊断系统，专为大学生、准研究生和研究生设计。通过科学的测评体系，帮助用户判断更适合的发展路线，包括考研、考公、国企、大厂就业、读博、创业、自由职业等。

## ✨ 核心功能

### 1. 智能测评系统
- 30道精心设计的测评题目
- 8个核心维度评估
- 3-5分钟快速完成

### 2. 七种人格类型
- 🎯 长期主义者
- 🏠 稳定筑基者
- 🚀 成长突围者
- 💰 商业探索者
- 🎨 自由创造者
- 🌍 世界行者
- ⚙️ 技术匠人

### 3. 精准路径匹配
- 考研匹配度
- 考公匹配度
- 就业匹配度
- 创业匹配度
- 读博匹配度

### 4. 完整报告输出
- 路径匹配度分析
- 人格解析
- 优势分析
- 风险分析
- 未来五年行动建议
- 专属成长金句

## 🛠️ 技术栈

- **前端框架**: Next.js 14
- **开发语言**: TypeScript
- **样式系统**: TailwindCSS
- **动画库**: Framer Motion
- **数据库**: Supabase
- **部署平台**: Vercel

## 📦 项目结构

```
career-diagnosis/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── layout.tsx         # 布局文件
│   │   ├── globals.css        # 全局样式
│   │   ├── userinfo/          # 用户信息收集
│   │   ├── test/              # 测评页面
│   │   ├── result/            # 结果展示
│   │   └── report/            # 完整报告
│   ├── components/            # 组件
│   ├── data/                  # 数据文件
│   │   ├── questions.ts       # 测评题目
│   │   ├── personality.ts     # 人格类型
│   │   └── index.ts           # 数据导出
│   └── lib/                   # 工具函数
│       ├── supabase.ts        # Supabase配置
│       └── calculator.ts      # 计算逻辑
├── public/                    # 静态资源
├── supabase-schema.sql        # 数据库表结构
├── DEPLOYMENT.md              # 部署教程
└── package.json               # 项目配置
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd career-diagnosis
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local`，并填入你的Supabase配置:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看效果

## 📖 部署指南

详细的部署步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署到Vercel

1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 点击Deploy

## 🎨 设计风格

- 苹果官网风格
- 极简高级设计
- 大量留白
- 磨砂玻璃效果
- 高级渐变色
- 响应式设计
- 移动端优先

## 📊 测评维度

1. **风险偏好**: 对风险的接受程度
2. **学习能力**: 学习新知识的能力
3. **长期投入能力**: 坚持长期目标的能力
4. **稳定需求**: 对稳定性的需求程度
5. **创业倾向**: 创业的意愿和能力
6. **社交偏好**: 社交和团队协作偏好
7. **城市发展偏好**: 对城市发展水平的需求
8. **竞争倾向**: 面对竞争的态度

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📧 联系方式

- 项目链接: https://github.com/your-username/career-diagnosis
- 网站地址: https://your-domain.com

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

**终将上岸导航** - 为你的未来保驾护航 🚀

# 终将上岸导航 V1.0 部署教程

## 一、环境准备

### 1.1 安装必要工具

1. **Node.js** (v18或更高版本)
   - 下载地址: https://nodejs.org/
   - 安装后验证: `node -v` 和 `npm -v`

2. **Git**
   - 下载地址: https://git-scm.com/

3. **VS Code** (推荐)
   - 下载地址: https://code.visualstudio.com/

### 1.2 注册账号

1. **GitHub账号**: https://github.com/
2. **Vercel账号**: https://vercel.com/ (可用GitHub登录)
3. **Supabase账号**: https://supabase.com/ (可用GitHub登录)

---

## 二、Supabase数据库配置

### 2.1 创建Supabase项目

1. 登录 Supabase: https://supabase.com/
2. 点击 "New Project"
3. 填写项目信息:
   - Name: `career-diagnosis`
   - Database Password: 设置一个强密码
   - Region: 选择离你最近的区域
4. 点击 "Create new project"
5. 等待项目创建完成（约2分钟）

### 2.2 获取API密钥

1. 进入项目后，点击左侧菜单 "Settings" → "API"
2. 复制以下信息:
   - **Project URL**: `https://xxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.3 创建数据库表

1. 点击左侧菜单 "SQL Editor"
2. 点击 "New query"
3. 将以下SQL粘贴进去并执行:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade VARCHAR(20) NOT NULL,
  major VARCHAR(100) NOT NULL,
  school_level VARCHAR(50) NOT NULL,
  preparing_postgrad BOOLEAN DEFAULT FALSE,
  preparing_civil BOOLEAN DEFAULT FALSE,
  family_support BOOLEAN DEFAULT FALSE,
  ideal_city VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Results Table
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  scores JSONB NOT NULL,
  path_scores JSONB NOT NULL,
  personality_type VARCHAR(50) NOT NULL,
  personality_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_created_at ON test_results(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for MVP)
CREATE POLICY "Allow public insert on user_profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on user_profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on test_results" ON test_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on test_results" ON test_results
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for statistics
CREATE VIEW test_statistics AS
SELECT
  COUNT(DISTINCT up.id) as total_users,
  COUNT(tr.id) as total_tests,
  COUNT(CASE WHEN tr.personality_type = 'long-term' THEN 1 END) as long_term_count,
  COUNT(CASE WHEN tr.personality_type = 'stable' THEN 1 END) as stable_count,
  COUNT(CASE WHEN tr.personality_type = 'growth' THEN 1 END) as growth_count,
  COUNT(CASE WHEN tr.personality_type = 'business' THEN 1 END) as business_count,
  COUNT(CASE WHEN tr.personality_type = 'free' THEN 1 END) as free_count,
  COUNT(CASE WHEN tr.personality_type = 'global' THEN 1 END) as global_count,
  COUNT(CASE WHEN tr.personality_type = 'tech' THEN 1 END) as tech_count
FROM user_profiles up
LEFT JOIN test_results tr ON up.id = tr.user_id;
```

4. 点击 "Run" 执行SQL

---

## 三、项目配置

### 3.1 克隆项目

```bash
# 进入你的工作目录
cd your-workspace

# 克隆项目（如果使用Git）
git clone <your-repo-url>
cd career-diagnosis

# 或者直接使用现有项目目录
```

### 3.2 安装依赖

```bash
npm install
```

### 3.3 配置环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容:

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase anon key
```

示例:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghij.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWoiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQ1Njc4OSwiZXhwIjoxOTM5MDMyNzg5fQ.xxxxxxxxxxx
```

### 3.4 本地测试

```bash
npm run dev
```

访问 http://localhost:3000 测试网站功能

---

## 四、Vercel部署

### 4.1 推送代码到GitHub

1. 在GitHub创建新仓库
2. 推送代码:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 4.2 在Vercel部署

1. 登录 Vercel: https://vercel.com/
2. 点击 "Add New..." → "Project"
3. 导入你的GitHub仓库
4. 配置项目:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (如果项目在根目录)
   - **Build Settings**: 保持默认
5. 添加环境变量:
   - `NEXT_PUBLIC_SUPABASE_URL`: 你的Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的Supabase anon key
6. 点击 "Deploy"

### 4.3 等待部署完成

- 部署通常需要2-5分钟
- 部署完成后会自动分配一个域名，如: `your-project.vercel.app`

### 4.4 自定义域名（可选）

1. 在Vercel项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置DNS记录

---

## 五、功能测试清单

### 5.1 首页测试
- [ ] 页面正常加载
- [ ] 动画效果正常
- [ ] "立即开始测试"按钮可点击

### 5.2 用户信息收集测试
- [ ] 年级选择正常
- [ ] 专业输入正常
- [ ] 学校层次选择正常
- [ ] 复选框功能正常
- [ ] 城市选择正常
- [ ] 步骤导航正常

### 5.3 测评系统测试
- [ ] 题目正常加载
- [ ] 选项选择正常
- [ ] 进度条正常更新
- [ ] 上一题/下一题功能正常
- [ ] 完成后跳转正常

### 5.4 结果展示测试
- [ ] 人格类型显示正常
- [ ] 路径匹配度显示正常
- [ ] 发展建议显示正常
- [ ] 查看完整报告功能正常

### 5.5 完整报告测试
- [ ] 所有板块显示正常
- [ ] 保存报告功能正常
- [ ] 重新测试功能正常

---

## 六、常见问题解决

### 6.1 环境变量错误

**问题**: 页面显示 "supabaseUrl is required"

**解决**:
1. 检查 `.env.local` 文件是否存在
2. 确认变量名正确: `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 重启开发服务器: `npm run dev`

### 6.2 数据库连接失败

**问题**: 无法连接到Supabase

**解决**:
1. 检查Supabase项目是否正常运行
2. 确认URL和anon key是否正确
3. 检查网络连接

### 6.3 部署失败

**问题**: Vercel部署失败

**解决**:
1. 检查构建日志中的错误信息
2. 确保所有依赖都已安装: `npm install`
3. 确保环境变量已在Vercel中配置

### 6.4 页面空白

**问题**: 部署后页面空白

**解决**:
1. 检查浏览器控制台错误
2. 确认环境变量已正确配置
3. 清除浏览器缓存

---

## 七、后续优化建议

### 7.1 功能优化
- 添加用户登录系统（Supabase Auth）
- 实现历史报告保存和查看
- 添加后台管理面板
- 优化移动端体验

### 7.2 性能优化
- 添加图片懒加载
- 实现代码分割
- 配置CDN加速
- 添加缓存策略

### 7.3 SEO优化
- 添加meta标签
- 生成sitemap
- 优化页面加载速度

### 7.4 数据分析
- 集成Google Analytics
- 添加用户行为追踪
- 生成数据报告

---

## 八、技术支持

如有问题，请通过以下方式联系:

1. **GitHub Issues**: 在项目仓库中提交issue
2. **邮件支持**: your-email@example.com

---

## 九、版权声明

© 2024 终将上岸导航 - AI未来发展诊断

本项目仅供学习参考使用。

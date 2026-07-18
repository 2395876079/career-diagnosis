export interface Personality {
  id: string
  name: string
  description: string
  traits: string[]
  color: string
  icon: string
}

export const personalities: Personality[] = [
  {
    id: 'long-term',
    name: '长期主义者',
    description: '你是一个有远见的人，能够为了长远目标而忍受短期的困难。你善于规划，愿意投入时间精力去追求真正有价值的事情。',
    traits: ['耐心', '远见', '坚持', '规划能力强'],
    color: 'from-blue-500 to-purple-600',
    icon: '🎯'
  },
  {
    id: 'stable',
    name: '稳定筑基者',
    description: '你追求稳定和安全感，善于在确定性中寻找发展机会。你踏实可靠，能够在稳定的环境中持续成长。',
    traits: ['踏实', '可靠', '稳健', '注重安全'],
    color: 'from-green-500 to-teal-600',
    icon: '🏠'
  },
  {
    id: 'growth',
    name: '成长突围者',
    description: '你渴望成长和突破，不甘于现状。你善于在挑战中学习，愿意为了成长而承担一定的风险。',
    traits: ['进取', '好学', '适应力强', '勇于挑战'],
    color: 'from-orange-500 to-red-600',
    icon: '🚀'
  },
  {
    id: 'business',
    name: '商业探索者',
    description: '你有敏锐的商业嗅觉，善于发现机会并创造价值。你敢于冒险，有很强的执行力和领导力。',
    traits: ['敏锐', '果断', '创新', '领导力'],
    color: 'from-yellow-500 to-orange-600',
    icon: '💰'
  },
  {
    id: 'free',
    name: '自由创造者',
    description: '你追求自由和创造力，不喜欢被束缚。你有很强的自我驱动力，善于在自由的环境中发挥才能。',
    traits: ['自由', '创造', '独立', '自我驱动'],
    color: 'from-pink-500 to-purple-600',
    icon: '🎨'
  },
  {
    id: 'global',
    name: '世界行者',
    description: '你有开阔的视野，喜欢探索不同的文化和环境。你适应力强，善于在多元化的环境中工作和生活。',
    traits: ['开放', '适应力强', '国际视野', '多元文化'],
    color: 'from-cyan-500 to-blue-600',
    icon: '🌍'
  },
  {
    id: 'tech',
    name: '技术匠人',
    description: '你热爱技术，追求专业精深。你善于钻研，能够在技术领域深耕细作，成为领域专家。',
    traits: ['专注', '钻研', '专业', '精益求精'],
    color: 'from-indigo-500 to-purple-600',
    icon: '⚙️'
  }
]

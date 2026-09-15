import { Task } from '@/types/task';

// Format Date to YYYY-MM-DD helper
export const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getInitialTasks = (): Task[] => {
  const now = new Date();
  const todayStr = formatDateKey(now);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDateKey(tomorrow);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateKey(yesterday);

  return [
    {
      id: 'task-1',
      title: 'Complete portfolio project documentation',
      description: 'Write comprehensive README with setup instructions, screenshots, and architectural diagrams.',
      priority: 'High',
      dueDate: todayStr,
      completed: false,
      createdAt: yesterdayStr,
    },
    {
      id: 'task-2',
      title: 'Review pull requests from team members',
      description: 'Check component modularity, responsiveness, and state handling in the dashboard module.',
      priority: 'Medium',
      dueDate: todayStr,
      completed: true,
      createdAt: yesterdayStr,
    },
    {
      id: 'task-3',
      title: 'Prepare presentation slides for product demo',
      description: 'Outline key highlights, user flow walkthrough, and responsive design preview.',
      priority: 'High',
      dueDate: tomorrowStr,
      completed: false,
      createdAt: todayStr,
    },
    {
      id: 'task-4',
      title: 'Schedule weekly sync with project mentor',
      description: 'Send calendar invite and prepare list of discussion points for next sprint.',
      priority: 'Low',
      dueDate: todayStr,
      completed: false,
      createdAt: todayStr,
    },
    {
      id: 'task-5',
      title: 'Organize digital workspace and clean desktop',
      description: 'Archive finished sprint assets and backup design files to cloud storage.',
      priority: 'Low',
      dueDate: todayStr,
      completed: true,
      createdAt: yesterdayStr,
    },
  ];
};

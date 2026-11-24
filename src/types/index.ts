export type ModuleId =
  | 'mod-1'
  | 'mod-2'
  | 'mod-3'
  | 'mod-4'
  | 'mod-5'
  | 'mod-6';

export type NavSection =
  | 'home'
  | ModuleId
  | 'sim-color'
  | 'sim-barber'
  | 'exams'
  | 'certificate';

export interface Question {
  id: string;
  moduleId: ModuleId | 'final';
  type: 'single' | 'multiple';
  prompt: string;
  options: {
    id: string;
    label: string;
  }[];
  correctOptionIds: string[];
  explanation: string;
}

export interface ExamResult {
  examId: string; // ModuleId | 'final'
  scorePercent: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  completedAt: string;
}

export interface UserProgress {
  completedModules: ModuleId[];
  examResults: Record<string, ExamResult>;
  studentName: string;
}

export interface ModuleSectionCard {
  title: string;
  badge?: string;
  summary: string;
  points: {
    label: string;
    detail: string;
    highlight?: 'gold' | 'emerald' | 'rose' | 'sky' | 'amber';
  }[];
}

export interface ModuleContent {
  id: ModuleId;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  imageUrl: string;
  imageCaption: string;
  objectives: string[];
  cards: ModuleSectionCard[];
  tableTitle?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

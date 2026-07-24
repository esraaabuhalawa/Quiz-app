export interface Quiz {
  _id: string;
  title: string;
  code?: string;
  description?: string;
  status?: 'closed' | 'open' | string;
  instructor?: string;
  group?: string | GroupInfo;
  questions_number?: number;
  questions?: string[];
  schadule?: string;
  duration?: number;
  score_per_question?: number;
  type?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  createdAt?: string;
  updatedAt?: string;
  enrolledStudents?: number;
}

export interface GroupInfo {
  _id: string;
  name: string;
}
export type UpcomingQuiz = Quiz;
export type CompletedQuiz = Quiz;

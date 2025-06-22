import { User } from './user.model';
import { Question } from './question.model';


export interface Poll {
  id: number;
  title: string;
  description?: string;
  active: boolean;
  onlyLoggedUsersCanVote: boolean;
  createdAt: Date;
  questions: Question[];
}
import { Option } from "./option.model";
import { Poll } from "./poll.model";

export interface Question {
  id: number;
  text: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  options: Option[];
  poll?: { id: number };
}
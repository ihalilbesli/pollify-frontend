export interface Option {
  id: number;
  text: string;
  voteCount: number;
  question?: { id: number };

}
export interface VoteRequest {
  pollId: number;
  questionId: number;
  optionId: number;
  userId?: number;      // Opsiyonel, giriş yapan kullanıcı için
  ipAddress?: string;   // Opsiyonel, anonim kullanıcı için
}
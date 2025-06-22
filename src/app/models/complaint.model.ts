import { User } from './user.model';

export type ComplaintStatus = 'BEKLEMEDE' | 'ISLEMDE' | 'COZULDU';

export interface Complaint {
  id?: number;
  subject: string;             // Konu (örneğin: "Anket Sorunu")
  description: string;         // Şikayet metni
  adminNote?: string;          // Admin notu (isteğe bağlı)
  status?: ComplaintStatus;    // Varsayılan: "BEKLEMEDE"
  createdAt?: Date;            // Oluşturulma tarihi
  user?: User;                 // Şikayet sahibi (backend'den gelir)
}

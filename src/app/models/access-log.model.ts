export interface AccessLog {
  id: number;
  timestamp: string;
  userEmail: string;
  role: string;
  endpoint: string;
  method: string;
  entity: string;
  actionType: string;
  status: string;
  errorMessage: string;
}

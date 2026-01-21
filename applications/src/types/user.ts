export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  is_blocked: boolean;
  created_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  is_blocked: boolean;
  created_at: string;
}

export interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

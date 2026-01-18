export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  errors?: { path: string[]; message: string }[];
}
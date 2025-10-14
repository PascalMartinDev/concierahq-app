export interface WebexFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  group: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

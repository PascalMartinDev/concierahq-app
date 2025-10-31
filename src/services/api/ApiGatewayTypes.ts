export interface WebexFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  group: string;
}

export interface CreditCardUpdateData {
  email: string;
}

export interface CustomerNoteUpdateData {
  email: string;
  note: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface RequestInformation {
  pathway: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: object;
}
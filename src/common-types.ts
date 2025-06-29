export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface User {
  name: string | null;
  email: string | null;
}

export interface RejectValue {
  message: string;
}

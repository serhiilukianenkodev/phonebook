export interface ContactType {
  id: string;
  name: string;
  email: string;
  number: string;
}

export interface User {
  name: string | null;
  email: string | null;
}

export interface RejectValue {
  message: string;
}

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

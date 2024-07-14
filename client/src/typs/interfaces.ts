export interface Email {
  id: number;
  from: string | null;
  subject: string | null;
  text: string;
}

export interface IEmail {
  id: number;
  sender: string | null;
  subject: string | null;
  content: string | null;
}

export function unStringfy(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

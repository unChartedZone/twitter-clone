export interface Message {
  id: string;
  body: string;
  createdAt: Date;
  user: {
    id: string;
  };
}

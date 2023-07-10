export interface IUser {
  user_id: string;
  name: string;
  surname: string;
  email: string;
  user_status: boolean;
  password: string;
  created_at: Date;
  updated_at: Date;
}

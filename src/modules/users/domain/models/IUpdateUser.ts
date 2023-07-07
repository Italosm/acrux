export interface IUpdateUser {
  user_id: string;
  name: string;
  surname: string;
  user_status: boolean;
  email: string;
  password?: string;
  old_password?: string;
}

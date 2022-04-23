export type TUser = {
  fullName: string;
  role: string;
  skills: string[];
  birthday: string;
  email: string;
  agreed: boolean;
};

export interface IForm {
  className?: string;
}

import { IGroup } from "../../../../../../shared/interfaces/general.interface";

export interface IStudents {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: IGroup;
}


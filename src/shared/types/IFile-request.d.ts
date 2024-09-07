import { Request } from "express";

interface IRequestUser extends Request {
  file?: Express.Multer.File;
  user?: {
    id: string;
    email: string;
    userType: string[];
  };
  data?: object;
  refreshToken?: string;
  files?: Express.Multer.File[];
}

export { IRequestUser };

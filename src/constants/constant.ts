import { cryptoPassWord } from './constants.crypto';

export enum ErolesUser {
  SUPPER_ADMIN = 'SUPPER_ADMIN',
  USER = 'USER',
}

export const expiresInJwt = '7d';

export enum EgenderUser {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const initAdminInfo = {
  email: 'vodinhnghia85@gmail.com',
  password: cryptoPassWord('admin123@'),
  mobile: '0365572875',
  middleName: '',
  firstName: 'Admin',
  lastName: 'Super',
  address: 'Binh Hiep - Binh Son - Quang Ngai',
};

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
  role: ErolesUser.SUPPER_ADMIN,
  mobile: '0365572875',
  middleName: '',
  firstName: 'Admin',
  lastName: 'Super',
  address: 'Binh Hiep - Binh Son - Quang Ngai',
};

export enum EpaymentTypes {
  CASH = 'CASH',
}

export enum EstatusOrder {
  WAITTING = 'WAITTING',
  DELIVERED = 'DELIVERD',
  CANCLE = 'CANCLE',
}

export enum Emimetype {
  IMAGE = 'image/jpeg',
}

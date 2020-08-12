enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
enum UserNetworkTypeEnum {
  QMOBILTY = "QMOBILTY",
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  LINKEDIN = "LINKEDIN",
}
export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  username?: string;
  role: UserRoleEnum;
  active: boolean;
  recoveryPasswordToken?: string;
  networkType: UserNetworkTypeEnum;
}

export const REGEX = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&"[\];',./{}|":?><`~°¬¡¿´]{8,}$/,
};

export const ERRORS = {
  INVALID_EMAIL: "Invalid email address",
  INVALID_PASSWORD:
    "Must contain 8 characters, one number and one special character",
  WRONG_PASSWORD: "Wrong password",
  USER_NOT_FOUND: "User not found",
  REQUIRED: "Mandatory field",
  LOGIN_FAILED: "Login failed",
  EMPTY_EMAIL: "Please enter your email",
  EMPTY_PASSWORD: "Please enter your password",
  BAD_PIN: "Incorrect PIN",
};

export const AUTH_REDUCER_TYPES = {
  RESTORE_TOKEN: "RESTORE_TOKEN",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

export const ASYNC_STORAGE_ITEMS = {
  USER_TOKEN: "USER_TOKEN",
  HAS_ACCEPTED_TCS: "HAS_ACCEPTED_TCS",
};

export const LOADING_STACK_SCREENS_NAMES = {
  Loading: "Loading",
};

export const AUTH_STACK_SCREENS_NAMES = {
  Onboarding: "Onboarding",
  TCs: "Terms and conditions",
  Access: "Access",
  Login: "Login",
  SignUp: "SignUp",
  LoginSignUp: "LoginSignUp",
  EmailConfirm: "EmailConfirm",
};

export const APP_STACK_SCREENS_NAMES = {
  CreateProfile: "CreateProfile",
  MyCars: "MyCars",
  ProfileScroll: "ProfileScroll",
  CheckCar: "CheckCar",
  Main: "Main",
  SearchRouter: "SearchRouter",
  EditProfile: "EditProfile",
  Profile: "Profile",
  MyRoutes: "MyRoutes",
  Details: "Details",
  DetailsICE: "DetailsICE",
  MapSearchDone: "MapSearchDone",
};

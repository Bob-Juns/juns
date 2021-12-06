type LoginInputs = {
  userEmail: string;
  userPassword: string;
};

interface LoginMessages extends LoginInputs {
  common: string;
}

interface RegisterInputs extends LoginInputs {
  confirmationCode: string;
  userName: string;
  userPasswordRecheck: string;
}

interface RegisterMessages extends RegisterInputs {
  common: string;
}

type EmailState = {
  isLoading: boolean;
  isSent: boolean;
  isConfirmed: boolean;
};

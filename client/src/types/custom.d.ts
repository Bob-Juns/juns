// common action type
type Action = {
  type: string;
};

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

type ChannelInput = {
  category: string;
  channelId: string;
  channelTitle: string;
  channelCover: string;
  channelProducer: string;
  channelCast: string;
  playlistTitle: string;
  playlistId: string;
};

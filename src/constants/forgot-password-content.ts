export type ForgotPasswordContentType = {
  key: string;
  name: 'email_address' | 'code' | 'password';
  title: string;
  description: string;
  label: string;
  image: string;
};

export const forgotPasswordContent: ForgotPasswordContentType[] = [
  {
    key: '8475482',
    name: 'email_address',
    title: "What's your email address?",
    description: 'Please enter the email address associated with your account.',
    label: 'Email address',
    image: require('/assets/welcome/pregnancy.png'),
  },
  {
    key: '8471293',
    name: 'code',
    title: '6-digit code',
    description:
      'Please enter the 6-digit password reset code which we have sent to your email address.',
    label: 'Verification code',
    image: require('/assets/welcome/pregnancy.png'),
  },
  {
    key: '8471935',
    name: 'password',
    title: 'Create a new password',
    description:
      'Your password must be at least 8 characters and contain one lowercase letter, one uppercase letter, one number, and one special character.',
    label: 'Password',
    image: require('/assets/welcome/pregnancy.png'),
  },
];

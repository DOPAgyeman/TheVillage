export type SignUpContent = {
  key: string;
  name:
    | 'id'
    | 'first_name'
    | 'last_name'
    | 'full_name'
    | 'date_of_birth'
    | 'email'
    | 'external_accounts'
    | 'image_url'
    | 'password'
    | 'code';
  title: string;
  description: string;
  label: string;
  image: string;
};

export const content: SignUpContent[] = [
  {
    key: '8476382',
    name: 'first_name',
    title: "What's your first name?",
    description:
      'Welcome to the Village! Please start by entering your first name',
    label: 'First name',
    image: require('/assets/welcome/gardening.png'),
  },
  {
    key: '8473249',
    name: 'last_name',
    title: "What's your last name?",
    description:
      'Please enter your last name so that we can easily identify you.',
    label: 'Last name',
    image: require('/assets/welcome/gardening.png'),
  },
  {
    key: '8476264',
    name: 'date_of_birth',
    title: "What's your date of birth?",
    description:
      'Please enter your date of birth. You must be at least 18 years old to use this app.',
    label: 'Date of birth',
    image: require('/assets/welcome/pregnancy.png'),
  },
  {
    key: '8475482',
    name: 'email',
    title: "What's your email address?",
    description:
      'Please enter the email address at which you can be contacted.',
    label: 'Email address',
    image: require('/assets/welcome/pregnancy.png'),
  },
  {
    key: '8471935',
    name: 'password',
    title: 'Create a password',
    description:
      'Your password must be at least 8 characters and contain a combination of letters, numbers and special characters',
    label: 'Password',
    image: require('/assets/welcome/pregnancy.png'),
  },
  {
    key: '8471293',
    name: 'code',
    title: '6-digit code',
    description:
      'Please enter the 6-digit verification code which we have sent to your email address.',
    label: 'Verification code',
    image: require('/assets/welcome/pregnancy.png'),
  },
];

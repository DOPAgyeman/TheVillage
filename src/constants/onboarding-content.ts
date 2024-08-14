import Colors from '@/constants/colors';

export type OnboardingContent = {
  key: string;
  title: string;
  description: string;
  image: string;
  textColor: string;
  backgroundColor: string;
};

export const content: OnboardingContent[] = [
  {
    key: '3571572',
    title: 'It takes a village',
    description:
      "Make it easy to respond to your loved ones' needs by accepting requests for practical help.",
    image: require('/assets/welcome/gardening.png'),
    textColor: Colors.cream,
    backgroundColor: Colors.primary,
  },
  {
    key: '3571747',
    title: 'Show love intentionally',
    description:
      'Create your own village, and make it a place where you can show love in an intentional way.',
    image: require('/assets/welcome/recycling.png'),
    textColor: Colors.primary,
    backgroundColor: Colors.cream,
  },
  {
    key: '3571680',
    title: 'Help your loved ones',
    description:
      'Make is one less thing to worry about in your greatest time of need and watch your loved ones thrive.',
    image: require('/assets/welcome/pregnancy.png'),
    textColor: Colors.black,
    backgroundColor: Colors.pink,
  },
];

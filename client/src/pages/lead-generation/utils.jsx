import { IconBalanceTransfer, IconHomeLoan, IconLoanAgainstProperty } from '../../assets/icons';

export const loanTypeOptions = [
  {
    label: 'Home Loan',
    value: 'home-loan',
    icon: <IconHomeLoan />,
  },
  {
    label: 'Loan against Property',
    value: 'loan-against-property',
    icon: <IconLoanAgainstProperty />,
  },
  {
    label: 'Balance Transfer',
    value: 'balance-transfer',
    icon: <IconBalanceTransfer />,
  },
];

// export const professionFlow = {
//   'home-loan': {},
//   'loan-against-property': {},
//   'balance-transfer': {},
// };

export const professionFlow = {
  'home-loan': ['property-identification', 'purpose-of-loan', 'property-type'],
  'loan-against-property': [
    'property-type',
    'property-identification',
    'purpose-of-loan',
    'propery-type',
  ],
  'balance-transfer': [
    'banker-type',
    'loan-tenure',
    'loan-amount',
    'purpose-of-loan',
    'property-type',
  ],
};

import {
  IconBalanceTransfer,
  IconCommercial,
  IconHomeLoan,
  IconLoanAgainstProperty,
  IconPropertyIdentified,
  IconPropertyUnIdentified,
  IconResidential,
} from '../../assets/icons';
import PersonalDetails from './PersonalDetails';
import ProfessionalDetails from './ProfessionalDetails';
import PropertyDetails from './property-details'
import BalanceTransferFields from './property-details/BalanceTransferFields';
import HomeLoanFields from './property-details/HomeLoanFields';
import LoanAgainstPropertyFields from './property-details/LoanAgainstPropertyFields';

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

export const propertyIdentificationOptions = [
  {
    label: 'Done!',
    value: 'done',
    icon: <IconPropertyIdentified />,
  },
  {
    label: 'Not yet...',
    value: 'not-yet',
    icon: <IconPropertyUnIdentified />,
  },
];

export const propertyCategoryOptions = [
  {
    label: 'Residential',
    value: 'residential',
    icon: <IconResidential />,
  },
  {
    label: 'Commerical',
    value: 'commerical',
    icon: <IconCommercial />,
  },
];

export const propertyDetailsMap = {
  'home-loan': {
    fields: <HomeLoanFields />,
    loanPurposeOptions: [
      { label: 'Purchase', value: 'purchase' },
      { label: 'Construction', value: 'construction' },
      { label: 'Renovation/Extension', value: 'renovation-extension' },
    ],
    propertyTypeOptions: {
      purchase: [
        { label: 'Residential House', value: 'residential-house' },
        { label: 'Plot + Construction', value: 'plot-construction' },
        { label: 'Ready Built Flat', value: 'ready-build-flat' },
      ],
      construction: [
        { label: 'Owned Plot', value: 'owned-plot' },
        { label: 'Under Construction Property', value: 'under-construction-property' },
      ],
      'renovation-extension': [{ label: 'Residential House', value: 'residential-house' }],
    },
  },
  'loan-against-property': {
    fields: <LoanAgainstPropertyFields />,
    loanPurposeOptions: [
      { label: 'Business', value: 'business' },
      { label: 'Personal Usage', value: 'personal-usage' },
    ],
    propertyTypeOptions: {
      business: [
        { label: 'Residential House', value: 'residential-house' },
        { label: 'Ready Built Flat', value: 'ready-built-flat' },
        { label: 'Commercial Shop/Unit', value: 'commercial-shop-unit' },
        { label: 'Commercial Building', value: 'commercial-building' },
      ],
      'personal-usage': [
        { label: 'Residential House', value: 'residential-house' },
        { label: 'Ready Built Flat', value: 'ready-built-flat' },
        { label: 'Commercial Shop/Unit', value: 'commercial-shop-unit' },
        { label: 'Commercial Building', value: 'commercial-building' },
      ],
    },
  },
  'balance-transfer': {
    fields: <BalanceTransferFields />,
    loanPurposeOptions: [
      { label: 'Home Loan', value: 'home-loan' },
      { label: 'LAP', value: 'lap' },
    ],
    propertyTypeOptions: {
      'home-loan': [
        { label: 'Residential House', value: 'residential-house' },
        { label: 'Plot + Construction', value: 'plot-construction' },
        { label: 'Ready Built Flat', value: 'ready-built-flat' },
        { label: 'Owned Plot', value: 'owned-plot' },
        { label: 'Under Construction Property', value: 'under-construction-property' },
      ],
      lap: [
        { label: 'Residential House', value: 'residential-house' },
        { label: 'Ready Built Flat', value: 'ready-built-flat' },
        { label: 'Commercial Shop/Unit', value: 'commercial-shop-unit' },
        { label: 'Commercial Building', value: 'commercial-building' },
      ],
    },
  },
};

export const loanTenureOptions = [
  { label: 'Months', value: 'months' },
  { label: 'Years', value: 'years' },
];

export const steps = [
  {
    label: 'Personal Details',
    Component: PersonalDetails,
  },
  {
    label: 'Professional Details',
    Component: ProfessionalDetails,
  },
  {
    label: 'Property Details',
    Component: PropertyDetails,
  },
];

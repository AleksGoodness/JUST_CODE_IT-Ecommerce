import '@mui/material/styles';

declare module '@mui/material/typography' {
  interface TypographyPropsVariantOverrides {
    mainTitle: true;
    sectionTitle: true;
    cardTitle: true;
    listTitle: true;
    secondTitle: true;
    navLink: true;
  }
}
declare module '@mui/material/button' {
  interface ButtonPropsVariantOverrides {
    pagination: true;
  }
}

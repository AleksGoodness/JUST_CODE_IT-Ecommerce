import { styled, Typography, TypographyProps } from '@mui/material';

type CustomVariant = 'main' | 'section' | 'subheader' | 'caption';

const customStyles = {
  main: {
    fontSize: '2.5rem',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  section: {
    fontSize: '1.8rem',
    fontWeight: 600,
  },
  subheader: {
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  caption: {
    fontSize: '0.9rem',
    fontWeight: 400,
    letterSpacing: '0.5px',
  },
} satisfies Record<CustomVariant, TypographyProps>;

interface TitleProps extends Omit<TypographyProps, 'variant'> {
  variant?: CustomVariant;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Title = styled(({ variant, ...props }: TitleProps) => (
  <Typography {...props} />
))(({ theme, variant }) => ({
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.2,
  ...(variant ? customStyles[variant] : {}),
}));

export default Title;

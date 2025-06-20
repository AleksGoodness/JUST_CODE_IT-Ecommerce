import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import { Card, Grid } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { ComponentType } from 'react';

import { Attribute } from '@/interfaces/productDetails.interface';

interface AttributesBox {
  name: string;
  value: string | number;
  icon?: ComponentType<SvgIconProps>;
}

const attributeNames = [
  'soil type',
  'optimal temperature °C',
  ' native climate',
  'light',
  'average height (cm)',
  'watering frequency',
];
const iconsArray = [
  CompostOutlinedIcon,
  DeviceThermostatOutlinedIcon,
  EmojiNatureOutlinedIcon,
  LightModeOutlinedIcon,
  HeightOutlinedIcon,
  WaterDropOutlinedIcon,
];

const AttributeBox = ({ attributes }: { attributes: Attribute[] }) => {
  const filteredAttributes: AttributesBox[] = attributes
    .filter(
      attribute =>
        typeof attribute.value === 'string' ||
        typeof attribute.value === 'number',
    )
    .map(attribute => ({
      name: attribute.name,
      value:
        typeof attribute.value === 'number'
          ? attribute.value
          : String(attribute.value),
    }));

  const updatedAttributes = filteredAttributes.map((attribute, index) => ({
    ...attribute,
    name: attributeNames[index] || attribute.name,
    icon: iconsArray[index] || undefined,
  }));

  return (
    <Grid
      component={Card}
      container
      direction={'column'}
      elevation={5}
      p={{ xs: 1, md: 2 }}
      spacing={1}
      sx={{
        border: '3px solid',
        borderColor: 'primary.main',
        borderRadius: '8px',
        '@media (max-width: 900px)': {
          justifyContent: 'center',
          maxWidth: '500px',
          widtn: '100%',
          margin: '0 auto',
          marginBottom: '15px',
        },
      }}
    >
      {updatedAttributes.map(item => (
        <Grid alignItems={'center'} container key={item.name}>
          <item.icon color="primary" />

          <Typography
            fontSize={{ xs: '0.8rem', sm: '1rem' }}
            sx={{
              fontWeight: '500',
              lineHeight: '1',
              color: 'primary',
            }}
          >
            {item.name}:
          </Typography>
          <Typography
            sx={{
              flexGrow: 1,
              borderBottom: '2px dotted',
              borderColor: 'primary.main',
              alignSelf: 'end',
              mb: '0.4rem',
              letterSpacing: '10px',
            }}
          />
          <Typography
            fontSize={{ xs: '0.8rem', md: '1rem' }}
            sx={{
              fontWeight: '500',
              lineHeight: '1',
              color: 'primary',
            }}
          >
            {item.value}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default AttributeBox;

import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import Box from '@mui/material/Box';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { ComponentType } from 'react';

import { Attribute } from '../../pages/details/clearObject';

interface AttributesBox {
  name: string;
  value: string | number;
  icon?: ComponentType<SvgIconProps>;
}

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

  const updatedAttributes = filteredAttributes.map((attribute, index) => ({
    ...attribute,
    name: attributeNames[index] || attribute.name,
    icon: iconsArray[index] || undefined,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 15px',
        border: '4px solid #46A358',
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
        <Box
          key={item.name}
          sx={{
            display: 'flex',
            maxWidth: '600px',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <span>
              <item.icon
                sx={{
                  fontSize: '1.4rem',
                  marginTop: '5px',
                  color: '#46A358',
                }}
              />
            </span>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: '500',
                lineHeight: '1',
                color: 'black',
              }}
            >
              {item.name}:
            </Typography>
          </Box>
          <Typography
            sx={{
              flexGrow: 1,
              borderBottom: '2px dotted black',
              mx: '10px',
              marginTop: '8px',
            }}
          />
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: '500',
              lineHeight: '1',
              color: 'black',
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AttributeBox;

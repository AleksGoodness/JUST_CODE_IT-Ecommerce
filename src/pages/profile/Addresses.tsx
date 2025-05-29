import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import { Address } from '../../interfaces';
import { getCountryNameByCode } from '../../utils/getCountryNameByCode';

interface IProps {
  addresses: Address[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  isEditMode: boolean;
}

const Addresses = ({
  addresses,
  defaultBillingAddressId,
  defaultShippingAddressId,
  isEditMode,
}: IProps) => {
  return (
    <List>
      <ListItem sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        <ListItemText primary="Street" sx={{ flex: 1 }} />
        <ListItemText primary="City" sx={{ flex: 1 }} />
        <ListItemText primary="Country" sx={{ flex: 1 }} />
        <ListItemText primary="details" sx={{ flex: 1 }} />
      </ListItem>

      <Divider />

      {addresses.map(({ id, streetName, city, country, postalCode }) => {
        const isDefaultShippingAddress = defaultShippingAddressId == id;
        const isDefaultBillingAddress = defaultBillingAddressId === id;

        return (
          <Accordion
            key={id}
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Typography sx={{ flex: 1 }}>{streetName}</Typography>
                <Typography sx={{ flex: 1 }}>
                  {getCountryNameByCode(city)}
                </Typography>
                <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }}>
                  {country}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Country:
                  </Typography>
                  <Typography>{country}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Postcode:
                  </Typography>
                  <Typography>{postalCode}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    disabled={!isEditMode}
                    sx={{
                      bgcolor: isDefaultShippingAddress
                        ? 'primary.main'
                        : 'disabled',
                    }}
                    variant={
                      isEditMode
                        ? isDefaultShippingAddress
                          ? 'contained'
                          : 'outlined'
                        : 'outlined'
                    }
                  >
                    {isDefaultShippingAddress
                      ? 'default shipping address'
                      : 'make it as default shipping address'}
                  </Button>
                  <Button
                    disabled={!isEditMode}
                    sx={{
                      bgcolor: isDefaultBillingAddress
                        ? 'warning.main'
                        : 'disabled',
                    }}
                    variant={
                      isEditMode
                        ? isDefaultBillingAddress
                          ? 'contained'
                          : 'outlined'
                        : 'outlined'
                    }
                  >
                    {isDefaultBillingAddress
                      ? 'default billing address'
                      : 'make it as default billing address'}
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Divider />
    </List>
  );
};

export default Addresses;

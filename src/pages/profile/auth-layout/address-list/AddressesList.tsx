import CabinIcon from '@mui/icons-material/Cabin';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  List,
  Typography,
} from '@mui/material';

import Title from '@/components/title/Title';
import { Address } from '@/interfaces/customerDeteils.interface';
import { getCountryNameByCode } from '@/utils/getCountryNameByCode';

import ExistedAddress from '../address-form/existed-address/ExistedAddress';

interface IProps {
  addresses: Address[];
  version: number;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  isEditMode: boolean;
}

const AddressList = ({
  addresses,
  defaultBillingAddressId,
  defaultShippingAddressId,
  isEditMode,

  version,
}: IProps) => {
  return (
    <Grid>
      <Title p={2} textAlign={'center'} variant="section">
        Addresses
      </Title>
      <Divider />

      <List>
        {addresses.map(({ id, streetName, city, country, postalCode }) => {
          const isDefaultShipping = defaultShippingAddressId == id;
          const isDefaultBilling = defaultBillingAddressId === id;

          return (
            <Accordion
              key={id}
              sx={{
                boxShadow: 'none',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Typography sx={{ flex: 1 }}>{streetName}</Typography>
                  <Typography sx={{ flex: 1 }}>{city}</Typography>
                  <Typography sx={{ flex: 1 }}>{country}</Typography>
                  <Typography sx={{ flex: 1 }}>{postalCode}</Typography>
                  <Typography sx={{ flex: 1, display: 'flex', gap: 2 }}>
                    {isDefaultShipping ? <LocalShippingIcon /> : null}
                    {isDefaultBilling ? <CabinIcon /> : null}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container gap={2} gridAutoColumns={4}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Street:
                    </Typography>
                    <Typography>{streetName}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      City:
                    </Typography>
                    <Typography>{city}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Country:
                    </Typography>
                    <Typography>{getCountryNameByCode(country)}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Postcode:
                    </Typography>
                    <Typography>{postalCode}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Billing address:
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>
                      {isDefaultBilling ? <CabinIcon color="warning" /> : 'No'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Shipping address:
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>
                      {isDefaultShipping ? (
                        <LocalShippingIcon color="warning" />
                      ) : (
                        'No'
                      )}
                    </Typography>
                  </Box>
                </Grid>
                {isEditMode ? (
                  <ExistedAddress
                    addressToEdit={{
                      country,
                      streetName,
                      city,
                      postalCode,
                      id,
                      isDefaultShipping,
                      isDefaultBilling,
                    }}
                    version={version}
                  />
                ) : null}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </Grid>
  );
};

export default AddressList;

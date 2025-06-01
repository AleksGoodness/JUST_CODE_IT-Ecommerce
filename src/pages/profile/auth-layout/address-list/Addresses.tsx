import CabinIcon from '@mui/icons-material/Cabin';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import { Title } from '../../../../components';
import { Address } from '../../../../interfaces';
import { getCountryNameByCode } from '../../../../utils/getCountryNameByCode';
import { InputProps } from '../address-form/AddressForm';

interface IProps {
  addresses: Address[];
  setEditAddress: (addressToEdit: InputProps) => void;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  isEditMode: boolean;
  handleDeleteAddress: (id: string) => void;
}

const Addresses = ({
  addresses,
  defaultBillingAddressId,
  defaultShippingAddressId,
  isEditMode,
  setEditAddress,
  handleDeleteAddress,
}: IProps) => {
  return (
    <>
      <Divider />
      <Title p={2} textAlign={'center'} variant="section">
        Addresses
      </Title>
      <Divider />

      <List sx={{ width: '100%' }}>
        <ListItem
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          <ListItemText primary="Street" sx={{ flex: 1 }} />
          <ListItemText primary="City" sx={{ flex: 1 }} />
          <ListItemText primary="Details" sx={{ flex: 1 }} />
        </ListItem>

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
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography sx={{ flex: 1 }}>{streetName}</Typography>
                  <Typography sx={{ flex: 1 }}>{city}</Typography>
                  <Typography sx={{ flex: 1 }}>{country}</Typography>
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
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton
                      disabled={!isEditMode}
                      sx={{
                        bgcolor: isDefaultShippingAddress
                          ? 'primary.main'
                          : 'disabled',

                        ':disabled': {
                          bgcolor: isDefaultShippingAddress
                            ? 'primary.main'
                            : 'disabled',
                        },
                      }}
                    >
                      <LocalShippingIcon />
                    </IconButton>
                    <IconButton
                      disabled={!isEditMode}
                      sx={{
                        bgcolor: isDefaultBillingAddress
                          ? 'warning.main'
                          : 'disabled',
                        ':disabled': {
                          bgcolor: isDefaultBillingAddress
                            ? 'warning.main'
                            : 'disabled',
                        },
                      }}
                    >
                      <CabinIcon />
                    </IconButton>
                    <IconButton
                      disabled={!isEditMode}
                      onClick={() => handleDeleteAddress(id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      disabled={!isEditMode}
                      onClick={() => {
                        setEditAddress({
                          id,
                          streetName,
                          city,
                          country,
                          postalCode,
                        });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </>
  );
};

export default Addresses;

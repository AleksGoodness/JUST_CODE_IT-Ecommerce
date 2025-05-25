import HomeIcon from '@mui/icons-material/Home';
import PostCodeIcon from '@mui/icons-material/LocalPostOffice';
import CityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { isPrimaryPointer } from 'motion/react';

import Title from '../../components/title/Title';
import { Address } from '../../interfaces';

interface IProps {
  addresses: Address[];
}

const Addresses = ({ addresses }: IProps) => {
  return (
    <>
      <Title variant="section">Addresses</Title>
      <List>
        <ListItem sx={{ fontWeight: 'bold', color: 'text.' }}>
          <ListItemText primary="Street" sx={{ flex: 1 }} />
          <ListItemText primary="City" sx={{ flex: 1 }} />
          <ListItemText primary="Country" sx={{ flex: 1 }} />
          <ListItemText primary="Postcode" sx={{ flex: 1 }} />
        </ListItem>

        <Divider />

        {/* Данные */}
        {addresses.map(address => (
          <ListItem key={address.id}>
            <ListItemText primary={address.streetName} sx={{ flex: 1 }} />
            <ListItemText primary={address.city} sx={{ flex: 1 }} />
            <ListItemText primary={address.country} sx={{ flex: 1 }} />
            <ListItemText primary={address.postalCode} sx={{ flex: 1 }} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ color: 'secondary.main' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        pariatur, necessitatibus, eos officiis facilis blanditiis, corporis
        atque dignissimos exercitationem ipsum eligendi. Animi eos expedita
        quam. Culpa dolore nesciunt quisquam provident.
      </Box>
    </>
  );
};

export default Addresses;

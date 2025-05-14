import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { NavLink } from 'react-router';

const navLinks = ['home', 'shop', 'preview'];

const defaultPage = 'home';

interface INavProps {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}
export const Navbar = ({ currentPage, setCurrentPage }: INavProps) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setCurrentPage(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        maxWidth: '500px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tabs
        aria-label="responsive tabs"
        component="nav"
        indicatorColor="primary"
        onChange={handleChange}
        sx={{
          // width: '100%',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: 'auto',
          height: '45px',
          gap: '20px',
        }}
        textColor="primary"
        value={currentPage}
      >
        {navLinks.map(label => (
          <Tab
            component={NavLink}
            key={label}
            label={label}
            sx={{
              minWidth: 0,
              flexShrink: 1,
              textTransform: 'capitalize',
              px: { xs: 0.5, sm: 1, md: 3, lg: 4 },
              padding: '0',
              minHeight: 'auto',
              whiteSpace: 'nowrap',
            }}
            to={label === defaultPage ? '/' : label}
            value={label}
          />
        ))}
      </Tabs>
    </Box>
  );
};

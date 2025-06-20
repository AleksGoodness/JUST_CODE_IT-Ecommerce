import { ListItem } from '@mui/material';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router';

interface Props {
  slug: string;
  name: string;
  toggleDrawer: (value: boolean) => void;
  onClick: () => void;
}

const CategoryItem = ({ slug, name, toggleDrawer, onClick }: Props) => {
  const handleClick = () => {
    onClick();
    toggleDrawer(false);
  };

  return (
    <ListItem sx={{ cursor: 'pointer' }}>
      <Link
        component={NavLink}
        onClick={handleClick}
        sx={{
          maxWidth: '100%',
          width: '100%',
        }}
        to={slug}
        variant="categoryLink"
      >
        {name}
      </Link>
    </ListItem>
  );
};
export default CategoryItem;

// components/PageTransition.jsx

import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

import Loading from '../loading/Loading';

interface IProps extends PropsWithChildren {
  isLoading: boolean;
}

const PageTransition = ({ children, isLoading }: IProps) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key={useLocation().pathname}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? <Loading /> : children}
    </motion.div>
  );
};

export default PageTransition;

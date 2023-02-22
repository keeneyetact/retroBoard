import React from 'react';
import PropTypes from 'prop-types';
import NavbarStyle from './navbar.style';

type NavbarProps = {
  children: React.ReactNode;
  className?: string;
  navbarStyle?: any;
};

const Navbar = ({
  className,
  children,
  navbarStyle,
  ...props
}: NavbarProps) => {
  const addAllClasses = ['reusecore__navbar'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <NavbarStyle className={addAllClasses.join(' ')}>{children}</NavbarStyle>
  );
};

export default Navbar;

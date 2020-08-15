import React from 'react';
import LogoImage from 'assets/img/logo.png';
import LogoImageDark from 'assets/img/logo-dark.png';

const Logo = ({ logoClass }) => {
  let image = LogoImage;

  if (localStorage.preferredTheme === 'dark') {
    image = LogoImageDark;
  }
  return <img src={image} className={logoClass} alt='Revision Check logo' />;
};

export default Logo;

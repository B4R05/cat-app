import { useEffect, useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';

type NavType = '/' | '/upload' ;

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<NavType | string>('/');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (activeItem !== location.pathname) {
      setActiveItem(location.pathname);
    }
  });

  const handleItemClick = (navItem: NavType): void => {
    setActiveItem(navItem);
    history.push(navItem);
  }; 

  return (
    <Container>
      <Menu tabular style={{ marginBottom: 10, marginTop: 10 }} >
        <Menu.Item name="/" active={activeItem === '/'} onClick={() => handleItemClick('/')}>
         Home
        </Menu.Item>
        <Menu.Item name="/upload" active={activeItem === '/upload'} onClick={() => handleItemClick('/upload')}>
          Upload
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Navbar;
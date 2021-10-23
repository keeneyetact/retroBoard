import { useCallback, useState, useRef, useContext } from 'react';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AccountIcon from '@mui/icons-material/AccountCircle';
import useUser from './useUser';
import LoginModal from './modal/LoginModal';
import useTranslation from '../translations/useTranslations';
import { logout } from '../api';
import UserContext from './Context';
import Avatar from '../components/Avatar';
import { useHistory } from 'react-router-dom';
import { Logout, Star } from '@mui/icons-material';
import { colors, Divider, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AccountMenu = () => {
  const translations = useTranslation();
  const { setUser } = useContext(UserContext);
  const [modalOpened, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchor = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const handleModalOpen = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      evt.stopPropagation();
      setModalOpen(true);
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
  }, [setUser]);

  const handleAccount = useCallback(() => {
    history.push('/account');
    setMenuOpen(false);
  }, [history]);

  const handleSubscribe = useCallback(() => {
    history.push('/subscribe');
    setMenuOpen(false);
  }, [history]);

  const user = useUser();
  if (user) {
    return (
      <div style={{ position: 'relative' }}>
        <AvatarContainer onClick={openMenu} ref={menuAnchor}>
          <Avatar user={user} />
          <DisplayName>{user.name}</DisplayName>
        </AvatarContainer>
        {menuAnchor.current ? (
          <Menu
            anchorEl={menuAnchor.current}
            open={menuOpen}
            onClose={closeMenu}
          >
            {user && !user.pro && user.accountType !== 'anonymous' ? (
              <MenuItem onClick={handleSubscribe}>
                <ListItemIcon>
                  <Star
                    style={{
                      color: colors.yellow[700],
                      position: 'relative',
                      top: -1,
                    }}
                  />
                </ListItemIcon>
                <ListItemText>Go Pro!</ListItemText>
              </MenuItem>
            ) : null}
            {user && user.accountType !== 'anonymous' ? (
              <MenuItem onClick={handleAccount}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText>{translations.Header.account}</ListItemText>
              </MenuItem>
            ) : null}
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>{translations.Header.logout}</ListItemText>
            </MenuItem>
          </Menu>
        ) : null}
      </div>
    );
  }
  return (
    <>
      <Button
        onClick={handleModalOpen}
        variant="contained"
        color="secondary"
        startIcon={<AccountIcon />}
      >
        {translations.AnonymousLogin.header}
      </Button>
      {modalOpened && <LoginModal onClose={handleModalClose} />}
    </>
  );
};

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  > *:first-child {
    margin-right: 10px;
  }
`;

const DisplayName = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default AccountMenu;

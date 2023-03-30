import { useCallback, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AccountIcon from '@mui/icons-material/AccountCircle';
import useUser from '../state/user/useUser';
import LoginModal from './modal/LoginModal';
import { logout } from '../api';
import Avatar from '../components/Avatar';
import { useMatch, useNavigate } from 'react-router-dom';
import { Key, Logout, Star } from '@mui/icons-material';
import {
  Chip,
  colors,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useIsAdmin from './useIsAdmin';
import { useTranslation } from 'react-i18next';
import { useSetUser } from 'state/user/useSetUser';

const AccountMenu = () => {
  const { t } = useTranslation();
  const setUser = useSetUser();
  const [modalOpened, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchor = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const user = useUser();
  const isAdmin = useIsAdmin();
  const isOnRoot = useMatch('/');
  const isNotAnon = user && user.accountType !== 'anonymous';

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
    setMenuOpen(false);
    navigate('/');
  }, [setUser, navigate]);

  const handleAccount = useCallback(() => {
    navigate('/account');
    setMenuOpen(false);
  }, [navigate]);

  const handleAdmin = useCallback(() => {
    navigate('/admin');
    setMenuOpen(false);
  }, [navigate]);

  const handleSubscribe = useCallback(() => {
    navigate('/subscribe');
    setMenuOpen(false);
  }, [navigate]);

  if (user) {
    return (
      <div style={{ position: 'relative' }}>
        <AvatarContainer
          onClick={openMenu}
          ref={menuAnchor}
          data-cy="account-menu"
        >
          <DisplayName>{user.name}</DisplayName>
          <ChipContainer>
            {user.accountType === 'anonymous' ? (
              <Chip color="secondary" label={t('Header.anonymous')} />
            ) : null}
          </ChipContainer>
          <Avatar user={user} />
        </AvatarContainer>
        {menuAnchor.current ? (
          <Menu
            anchorEl={menuAnchor.current}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            open={menuOpen}
            onClose={closeMenu}
          >
            {user && !user.pro && user.accountType !== 'anonymous' ? (
              <MenuItem onClick={handleSubscribe} data-cy="account-menu-go-pro">
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
            <MenuItem onClick={handleAccount} data-cy="account-menu-account">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText>{t('Header.account')}</ListItemText>
            </MenuItem>
            {isAdmin ? (
              <MenuItem onClick={handleAdmin} data-cy="account-menu-admin">
                <ListItemIcon>
                  <Key />
                </ListItemIcon>
                <ListItemText>{t('Header.adminPanel')}</ListItemText>
              </MenuItem>
            ) : null}
            {isAdmin || isNotAnon ? <Divider /> : null}
            <MenuItem onClick={handleLogout} data-cy="account-menu-logout">
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>{t('Header.logout')}</ListItemText>
            </MenuItem>
          </Menu>
        ) : null}
      </div>
    );
  }

  if (isOnRoot) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleModalOpen}
        variant="contained"
        color="secondary"
        data-cy="login-button"
        startIcon={<AccountIcon />}
      >
        {t('AnonymousLogin.header')}
      </Button>
      {modalOpened && <LoginModal onClose={handleModalClose} large />}
    </>
  );
};

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 15px;
`;

const DisplayName = styled.div`
  @media screen and (max-width: 800px) {
    display: none;
  }
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ChipContainer = styled.div`
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default AccountMenu;

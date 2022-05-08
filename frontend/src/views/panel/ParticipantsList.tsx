import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '../../components/Avatar';
import { useTranslation } from 'react-i18next';
import { colors } from '@mui/material';
import useParticipants from '../game/useParticipants';

function ParticipantsList() {
  const { t } = useTranslation();
  const { participants } = useParticipants();

  return (
    <>
      <List
        component="section"
        subheader={<ListSubheader>{t('Clients.header')}</ListSubheader>}
      >
        {participants.map((player, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar user={player} online={player.online} />
            </ListItemAvatar>
            <ListItemText
              primary={player.name}
              style={{
                color: player.online ? colors.grey[900] : colors.grey[500],
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ParticipantsList;

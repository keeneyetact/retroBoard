import React, { PropTypes } from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import Clients from './Clients';
import LanguagePicker from '../components/LanguagePicker';
import SummaryModeSwitch from '../components/drawer/SummaryModeSwitch';
import LeaveButton from '../components/drawer/LeaveButton';
import LogoutButton from '../components/drawer/LogoutButton';
import ForkMe from '../components/drawer/ForkMe';


const NavDrawer = ({ open, onChange }) => (
    <Drawer active={open}
      type="right"
      onOverlayClick={() => onChange(false)}
    >
        <div style={{ margin: '0 10px' }}>
            <LanguagePicker />
            <SummaryModeSwitch />
        </div>

        <Clients />
        <br />
        <br />
        <LeaveButton />
        <LogoutButton />
        <ForkMe />
    </Drawer>
);

NavDrawer.propTypes = {
    open: PropTypes.bool,
    onChange: PropTypes.func
};

export default NavDrawer;

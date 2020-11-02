import React from 'react';
import usePortalUrl from './usePortalUrl';
import { Button } from '@material-ui/core';

function AccountPage() {
  const url = usePortalUrl();
  return (
    <div>
      Hello
      {url ? <Button href={url}>Manage my subscription</Button> : null}
    </div>
  );
}

export default AccountPage;

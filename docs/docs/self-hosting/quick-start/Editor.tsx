import React, { useEffect, useState } from 'react';
import ComposeView from './ComposeView';
import Field from './Field';
import styles from './Editor.module.css';
import randomWords from 'random-words';
import queryString from 'query-string';
import RunDetails from './RunDetails';
import useIsBrowser from '@docusaurus/useIsBrowser';

function getRandomPassword() {
  return randomWords(4).join('-');
}

export default function Editor() {
  const isBrowser = useIsBrowser();
  const [dbPassword, setDbPassword] = useState(getRandomPassword());
  const [pgPassword, setPgPassword] = useState(getRandomPassword());
  const [sessionSecret, setSessionSecret] = useState(getRandomPassword());
  const [licence, setLicence] = useState('demo');
  const [email, setEmail] = useState('your@email.com');
  const [port, setPort] = useState('1800');
  const [pgPort, setPgPort] = useState('1801');

  useEffect(() => {
    if (isBrowser) {
      const qs = queryString.parse(window.location.search);
      if (qs.email) {
        setEmail(qs.email as string);
      }
      if (qs.licence) {
        setLicence(qs.licence as string);
      }
    }
  }, [isBrowser]);

  return (
    <span>
      <div className={styles.settings}>
        <Field
          label="Email"
          description="Your email. It will be used as the admin account for both PGAdmin and Retrospected."
          value={email}
          onChange={setEmail}
        />
        <Field
          label="Licence Key"
          description="The licence key you received by email after purchase. If you want to try Retrospected, leave the default value"
          value={licence}
          onChange={setLicence}
        />
        <Field
          label="Retrospected UI Port"
          description="Defines on which port the UI is going to run."
          value={port}
          number
          onChange={setPort}
        />
        <Field
          label="PGAdmin UI Port"
          description="Defines on which port PGAdmin is going to run."
          value={pgPort}
          number
          onChange={setPgPort}
        />
        <Field
          label="Database Password"
          description="Postgres database password"
          value={dbPassword}
          onChange={setDbPassword}
        />
        <Field
          label="Session Secret"
          description="Web server session secret. This can be anything."
          value={sessionSecret}
          onChange={setSessionSecret}
        />
        <Field
          label="PGAdmin Password"
          description="PGAdmin administrator password, to be used with the email set above."
          value={pgPassword}
          onChange={setPgPassword}
        />
      </div>
      <ComposeView
        dbPassword={dbPassword}
        pgPassword={pgPassword}
        sessionSecret={sessionSecret}
        licence={licence}
        email={email}
        port={port}
        pgPort={pgPort}
      />
      <h1>2 - Run Docker</h1>
      <ul>
        <li>
          On your machine, create a dedicated directory:{' '}
          <code>mkdir retrospected</code> and <code>cd retrospected</code>.
        </li>
        <li>
          Copy the content of the docker-compose file above into a file named{' '}
          <code>docker-compose.yml</code>, in the directory above
        </li>
        <li>
          Run: <code>docker-compose up -d</code>
        </li>
      </ul>
      <h1>3 - Profit</h1>
      <p>You can now access Retrospected and PGAdmin:</p>
      <RunDetails
        email={email}
        port={port}
        pgPassword={pgPassword}
        pgPort={pgPort}
      />
    </span>
  );
}

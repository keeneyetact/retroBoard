import React, { useEffect } from 'react';
import ComposeView from './ComposeView';
import { InputField } from './Field';
import styles from './Editor.module.css';
import randomWords from 'random-words';
import queryString from 'query-string';
import RunDetails from './RunDetails';
import useIsBrowser from '@docusaurus/useIsBrowser';
import usePersistedState from './usePersistedState';
import { FieldToggle } from './Toggle';
import { Accordion } from './Accordion';

function getRandomPassword() {
  return randomWords(4).join('-');
}

export default function Editor() {
  const isBrowser = useIsBrowser();
  const [dbPassword, setDbPassword] = usePersistedState(
    'db-password',
    getRandomPassword()
  );
  const [pgPassword, setPgPassword] = usePersistedState(
    'pg-password',
    getRandomPassword()
  );
  const [sessionSecret, setSessionSecret] = usePersistedState(
    'session-secret',
    getRandomPassword()
  );
  const [licence, setLicence] = usePersistedState('licence-key', 'demo');
  const [email, setEmail] = usePersistedState('email', 'your@email.com');
  const [port, setPort] = usePersistedState('port', '80');
  const [pgPort, setPgPort] = usePersistedState('pg-port', '81');
  const [isArm, setIsArm] = usePersistedState('is-arm', false);
  const [disableAnon, setDisableAnon] = usePersistedState(
    'disable-anon',
    false
  );
  const [disablePassword, setDisablePasswordAccounts] = usePersistedState(
    'disable-password-accounts',
    false
  );
  const [disableRegistration, setDisablePasswordRegistration] =
    usePersistedState('disable-password-reg', false);
  const [useSendgrid, setUseSendgrid] = usePersistedState(
    'use-sendgrid',
    false
  );
  const [useSmtp, setUseSmtp] = usePersistedState('use-smtp', false);
  const [sendgridKey, setSendgridKey] = usePersistedState('sendgrid-key', '');
  const [sendgridSender, setSendgridSender] = usePersistedState(
    'sendgrid-sender',
    'your@email.com'
  );
  const [smtpHost, setSmtpHost] = usePersistedState('smtp-host', '');
  const [smtpPort, setSmtpPort] = usePersistedState('smtp-port', '465');
  const [smtpSecure, setSmtpSecure] = usePersistedState('smtp-secure', true);
  const [smtpUser, setSmtpUser] = usePersistedState('smtp-user', '');
  const [smtpPassword, setSmtpPassword] = usePersistedState(
    'smtp-password',
    ''
  );
  const [smtpSender, setSmtpSender] = usePersistedState('smtp-sender', '');

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
      <h3>Settings</h3>

      <div className={styles.settings}>
        <InputField
          label="Email"
          description="Your email. It will be used as the admin account for both PGAdmin and Retrospected."
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Licence Key"
          description="The licence key you received by email after purchase. If you want to try Retrospected, leave the default value"
          value={licence}
          onChange={setLicence}
        />
        <InputField
          label="Retrospected UI Port"
          description="Defines on which port the UI is going to run."
          value={port}
          number
          onChange={setPort}
        />
        <InputField
          label="PGAdmin UI Port"
          description="Defines on which port PGAdmin is going to run."
          value={pgPort}
          number
          onChange={setPgPort}
        />
        <InputField
          label="Database Password"
          description="Postgres database password"
          value={dbPassword}
          onChange={setDbPassword}
        />
        <InputField
          label="PGAdmin Password"
          description="PGAdmin administrator password, to be used with the email set above."
          value={pgPassword}
          onChange={setPgPassword}
        />
      </div>
      <Accordion title="Advanced settings">
        <div className={styles.settings}>
          <InputField
            label="Session Secret"
            description="Web server session secret. This can be anything."
            value={sessionSecret}
            onChange={setSessionSecret}
          />
          <FieldToggle
            id="arm-toggle"
            label="Deploying on ARM?"
            description="Only check this if you are deploying on an ARM-based server."
            toggleLabel="ARM server"
            value={isArm}
            onChange={setIsArm}
          />
          <FieldToggle
            id="disable-anon-toggle"
            label="Disable Anonymous accounts?"
            description="Users won't be able to use anonymous accounts if checked"
            toggleLabel="Disable Anonymous Accounts"
            value={disableAnon}
            onChange={setDisableAnon}
          />
          <FieldToggle
            id="disable-pass-accounts"
            label="Disable Password / Email accounts?"
            description="Users won't be able to use email / password accounts if checked"
            toggleLabel="Disable Password Accounts"
            value={disablePassword}
            onChange={setDisablePasswordAccounts}
          />
          <FieldToggle
            id="disable-pass-reg"
            label="Disable Password / Email registration?"
            description="Users won't be able to register a new email/password account, but will be able to login."
            toggleLabel="Disable Password Registration"
            value={disableRegistration || disablePassword}
            onChange={setDisablePasswordRegistration}
          />
        </div>
      </Accordion>
      <Accordion title="Email settings">
        <div className={styles.settings}>
          <FieldToggle
            id="enable-sendgrid"
            label="Enable Sendgrid"
            description="Use SendGrid for sending emails."
            toggleLabel="Use SendGrid"
            value={useSendgrid}
            onChange={setUseSendgrid}
          />
          {useSendgrid ? (
            <>
              <InputField
                label="SendGrid Key"
                description="Your private SendGrid API Key"
                value={sendgridKey}
                onChange={setSendgridKey}
              />
              <InputField
                label="SendGrid Sender email"
                description="The email the emails will be sent on behalf of."
                value={sendgridSender}
                onChange={setSendgridSender}
              />
            </>
          ) : null}
        </div>
        <div className={styles.settings}>
          <FieldToggle
            id="enable-smtp"
            label="Enable SMTP"
            description="Use SMTP for sending emails. Cannot be used in conjunction with SendGrid."
            toggleLabel="Use SMTP"
            value={useSmtp && !useSendgrid}
            onChange={setUseSmtp}
          />
          {useSmtp && !useSendgrid ? (
            <>
              <InputField
                label="SMTP Host"
                description="The URL to your SMTP host"
                value={smtpHost}
                onChange={setSmtpHost}
              />
              <InputField
                label="SMTP Port"
                description="The port, usually 465 for secure SMTP."
                number
                value={smtpPort}
                onChange={setSmtpPort}
              />
              <FieldToggle
                id="smtp-port"
                label="Enable Secure SMTP"
                description="Usually enabled, especially if the port is 465."
                toggleLabel="Enable Secure SMTP"
                value={smtpSecure}
                onChange={setSmtpSecure}
              />
              <InputField
                label="SMTP User"
                description="The username for SMTP authentication."
                value={smtpUser}
                onChange={setSmtpUser}
              />
              <InputField
                label="SMTP Password"
                description="The password to the SMTP account above."
                value={smtpPassword}
                onChange={setSmtpPassword}
              />
              <InputField
                label="SMTP Sender email"
                description="The email the emails will be sent on behalf of."
                value={smtpSender}
                onChange={setSmtpSender}
              />
            </>
          ) : null}
        </div>
      </Accordion>
      <h3>Your customised docker-compose file:</h3>

      <ComposeView
        settings={{
          dbPassword,
          pgPassword,
          sessionSecret,
          licence,
          email,
          port,
          pgPort,
          arm: isArm,
          disableAnon,
          disablePassword,
          disableRegistration,
          useSendgrid,
          useSmtp,
          sendgridKey,
          sendgridSender,
          smtpHost,
          smtpPort,
          smtpSecure,
          smtpUser,
          smtpPassword,
          smtpSender,
        }}
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

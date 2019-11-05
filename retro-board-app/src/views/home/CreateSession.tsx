import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MaxVoteSlider from './components/MaxVoteSlider';
import Slider from './components/Slider';
import BooleanOption from './components/BooleanOption';
import { SessionOptions, ColumnDefinition } from 'retro-board-common';
import OptionItem from './components/OptionItem';
import SettingCategory from './components/SettingCategory';
import ColumnEditor from './components/ColumnEditor';
import TemplatePicker from './components/TemplatePicker';
import { buildDefaults, merge } from '../../state/columns';
import { ColumnSettings, Template } from '../../state/types';
import { getTemplate } from '../../state/templates';
import useTranslations from '../../translations';

interface CreateSessionModalProps {
  open: boolean;
  onClose: () => void;
  onLaunch: (options: SessionOptions, columns: ColumnDefinition[]) => void;
}

const CreateSessionModal = ({
  open,
  onClose,
  onLaunch,
}: CreateSessionModalProps) => {
  const translations = useTranslations();
  const { Customize } = translations;
  const fullScreen = useMediaQuery('(max-width:600px)');
  const [maxUpVotes, setMaxUpVotes] = useState<number | null>(null);
  const [maxDownVotes, setMaxDownVotes] = useState<number | null>(null);
  const [allowActions, setAllowActions] = useState<boolean>(true);
  const [allowSelfVoting, setAllowSelfVoting] = useState<boolean>(false);
  const [allowMultipleVotes, setAllowMultipleVotes] = useState<boolean>(false);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(3);
  const [defaultDefinitions, setDefaultDefinitions] = useState(
    buildDefaults('default', translations)
  );
  const [definitions, setDefinitions] = useState<ColumnSettings[]>(
    buildDefaults('default', translations).map(
      d =>
        ({ type: d.type, color: '', icon: null, label: '' } as ColumnSettings)
    )
  );
  useEffect(() => {
    setDefaultDefinitions(buildDefaults('default', translations));
  }, [translations]);
  const handleColumnChange = useCallback(
    (value: ColumnSettings, index: number) => {
      setDefinitions(cols => Object.assign([], cols, { [index]: value }));
    },
    []
  );
  const handleTemplateChange = useCallback(
    (templateType: Template) => {
      const template = buildDefaults(templateType, translations);
      setNumberOfColumns(getTemplate(templateType, translations).length);
      setDefaultDefinitions(template);
    },
    [translations]
  );
  const handleLaunch = useCallback(() => {
    onLaunch(
      {
        allowActions,
        allowMultipleVotes,
        allowSelfVoting,
        maxDownVotes,
        maxUpVotes,
      },
      merge(definitions, defaultDefinitions, numberOfColumns)
    );
  }, [
    onLaunch,
    allowActions,
    allowMultipleVotes,
    allowSelfVoting,
    maxDownVotes,
    maxUpVotes,
    definitions,
    defaultDefinitions,
    numberOfColumns,
  ]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen}
      keepMounted={false}
    >
      <DialogTitle>{Customize.title}</DialogTitle>
      <DialogContent>
        <SettingCategory
          title={Customize.customTemplateCategory!}
          subtitle={Customize.customTemplateCategorySub!}
        >
          <OptionItem
            label={Customize.template!}
            help={Customize.templateHelp!}
          >
            <TemplatePicker onSelect={handleTemplateChange} />
          </OptionItem>
          <OptionItem
            label={Customize.numberOfColumns!}
            help={Customize.numberOfColumnsHelp!}
          >
            <Slider
              value={numberOfColumns}
              onChange={setNumberOfColumns}
              from={1}
              to={5}
            />
          </OptionItem>
          <>
            {definitions.slice(0, numberOfColumns).map((def, index) => (
              <ColumnEditor
                key={index}
                value={def}
                defaults={defaultDefinitions[index]}
                onChange={value => handleColumnChange(value, index)}
              />
            ))}
          </>
        </SettingCategory>
        <SettingCategory
          title={Customize.votingCategory!}
          subtitle={Customize.votingCategorySub!}
        >
          <OptionItem
            label={Customize.maxUpVotes!}
            help={Customize.maxUpVotesHelp!}
          >
            <MaxVoteSlider value={maxUpVotes} onChange={setMaxUpVotes} />
          </OptionItem>
          <OptionItem
            label={Customize.maxDownVotes!}
            help={Customize.maxDownVotesHelp!}
          >
            <MaxVoteSlider value={maxDownVotes} onChange={setMaxDownVotes} />
          </OptionItem>
          <OptionItem
            label={Customize.allowSelfVoting!}
            help={Customize.allowSelfVotingHelp!}
          >
            <BooleanOption
              value={allowSelfVoting}
              onChange={setAllowSelfVoting}
            />
          </OptionItem>
          <OptionItem
            label={Customize.allowMultipleVotes!}
            help={Customize.allowMultipleVotesHelp!}
          >
            <BooleanOption
              value={allowMultipleVotes}
              onChange={setAllowMultipleVotes}
            />
          </OptionItem>
        </SettingCategory>
        <SettingCategory
          title={Customize.postCategory!}
          subtitle={Customize.postCategorySub!}
        >
          <OptionItem
            label={Customize.allowActions!}
            help={Customize.allowActionsHelp!}
          >
            <BooleanOption value={allowActions} onChange={setAllowActions} />
          </OptionItem>
        </SettingCategory>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLaunch} color="primary" variant="contained">
          {Customize.startButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSessionModal;

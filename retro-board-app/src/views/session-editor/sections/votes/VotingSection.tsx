import React, { useCallback } from 'react';
import { SessionOptions } from 'retro-board-common';
import SettingCategory from '../SettingCategory';
import OptionItem from '../OptionItem';
import useTranslations from '../../../../translations';
import BooleanOption from '../BooleanOption';
import MaxVoteSlider from './MaxVoteSlider';

interface VotingSectionProps {
  options: SessionOptions;
  onChange: (options: SessionOptions) => void;
}

function VotingSection({ options, onChange }: VotingSectionProps) {
  const translations = useTranslations();
  const { Customize } = translations;
  const handleChange = useCallback(
    (prop: keyof SessionOptions) =>
      function <T>(value: T) {
        onChange({
          ...options,
          [prop]: value,
        });
      },
    [onChange, options]
  );

  const setAllowSelfVoting = useCallback(handleChange('allowSelfVoting'), [
    handleChange,
  ]);
  const setAllowMultipleVotes = useCallback(
    handleChange('allowMultipleVotes'),
    [handleChange]
  );
  const setMaxUpVotes = useCallback(handleChange('maxUpVotes'), [handleChange]);
  const setMaxDownVotes = useCallback(handleChange('maxDownVotes'), [
    handleChange,
  ]);
  return (
    <SettingCategory
      title={Customize.votingCategory!}
      subtitle={Customize.votingCategorySub!}
    >
      <OptionItem
        label={Customize.maxUpVotes!}
        help={Customize.maxUpVotesHelp!}
        wide
      >
        <MaxVoteSlider value={options.maxUpVotes} onChange={setMaxUpVotes} />
      </OptionItem>
      <OptionItem
        label={Customize.maxDownVotes!}
        help={Customize.maxDownVotesHelp!}
        wide
      >
        <MaxVoteSlider
          value={options.maxDownVotes}
          onChange={setMaxDownVotes}
        />
      </OptionItem>
      <OptionItem
        label={Customize.allowSelfVoting!}
        help={Customize.allowSelfVotingHelp!}
      >
        <BooleanOption
          value={options.allowSelfVoting}
          onChange={setAllowSelfVoting}
        />
      </OptionItem>
      <OptionItem
        label={Customize.allowMultipleVotes!}
        help={Customize.allowMultipleVotesHelp!}
      >
        <BooleanOption
          value={options.allowMultipleVotes}
          onChange={setAllowMultipleVotes}
        />
      </OptionItem>
    </SettingCategory>
  );
}

export default VotingSection;

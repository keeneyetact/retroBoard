import React, { useCallback } from 'react';
import { SessionOptions } from 'retro-board-common';
import SettingCategory from '../SettingCategory';
import OptionItem from '../OptionItem';
import useTranslations from '../../../../translations';
import BooleanOption from '../BooleanOption';

interface PostsSectionProps {
  options: SessionOptions;
  onChange: (options: SessionOptions) => void;
}

function PostsSection({ options, onChange }: PostsSectionProps) {
  const translations = useTranslations();
  const { Customize } = translations;
  const handleChange = useCallback((prop: keyof SessionOptions) => (value: boolean) => {
    onChange({
      ...options,
      [prop]: value,
    });
  }, [onChange, options]);

  const setAllowAction = useCallback(handleChange('allowActions'), [handleChange]);
  const setAllowAuthorVisible = useCallback(handleChange('allowAuthorVisible'), [handleChange]);
  const setAllowReordering = useCallback(handleChange('allowReordering'), [handleChange]);
  const setAllowGrouping = useCallback(handleChange('allowGrouping'), [handleChange]);
  const setAllowGiphy = useCallback(handleChange('allowGiphy'), [handleChange]);
  const setBlurCards = useCallback(handleChange('blurCards'), [handleChange]);
  return (
    <SettingCategory
          title={Customize.postCategory!}
          subtitle={Customize.postCategorySub!}
        >
          <OptionItem
            label={Customize.allowActions!}
            help={Customize.allowActionsHelp!}
          >
            <BooleanOption value={options.allowActions} onChange={setAllowAction} />
          </OptionItem>
          <OptionItem
            label={Customize.allowAuthorVisible!}
            help={Customize.allowAuthorVisibleHelp!}
          >
            <BooleanOption
              value={options.allowAuthorVisible}
              onChange={setAllowAuthorVisible}
            />
          </OptionItem>
          <OptionItem
            label={Customize.allowReordering!}
            help={Customize.allowReorderingHelp!}
          >
            <BooleanOption
              value={options.allowReordering}
              onChange={setAllowReordering}
            />
          </OptionItem>
          <OptionItem
            label={Customize.allowGrouping!}
            help={Customize.allowGroupingHelp!}
          >
            <BooleanOption value={options.allowGrouping} onChange={setAllowGrouping} />
          </OptionItem>
          <OptionItem
            label={Customize.allowGiphy!}
            help={Customize.allowGiphyHelp!}
          >
            <BooleanOption value={options.allowGiphy} onChange={setAllowGiphy} />
          </OptionItem>
          <OptionItem
            label={Customize.blurCards!}
            help={Customize.blurCardsHelp!}
          >
            <BooleanOption value={options.blurCards} onChange={setBlurCards} />
          </OptionItem>
        </SettingCategory>
  )
}

export default PostsSection;
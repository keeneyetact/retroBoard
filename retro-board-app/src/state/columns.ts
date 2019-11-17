import {
  ColumnDefinition,
  IconName,
  ColumnDefinitionType,
} from 'retro-board-common';
import { Translation } from '../translations';
import { v4 } from 'uuid';
import { keyBy } from 'lodash';
import { ColumnSettings, Template } from './types';
import { getTemplate } from './templates';

const MAX_NUMBER_OF_COLUMNS = 5;

export function buildDefaults(
  template: Template,
  translations: Translation
): ColumnSettings[] {
  const base = getTemplate(template, translations);
  const custom = getTemplateColumnByType(translations)('custom');
  if (base.length < MAX_NUMBER_OF_COLUMNS) {
    for (let i = 0; i <= MAX_NUMBER_OF_COLUMNS - base.length; i++) {
      base.push({ ...custom });
    }
  }
  return base;
}

export function merge(
  colDef: ColumnSettings[],
  defaultDef: ColumnSettings[],
  numberOfColumns: number
): ColumnDefinition[] {
  return colDef.slice(0, numberOfColumns).map(
    (def, index) =>
      ({
        color: def.color,
        icon: def.icon,
        label: def.label,
        id: v4(),
        index,
        type: defaultDef[index].type,
      } as ColumnDefinition)
  );
}

export function extrapolate(
  colDef: ColumnDefinition,
  translations: Translation
): ColumnSettings {
  const defaults = getTemplateColumnByType(translations);
  const defaultDef = defaults(colDef.type);
  return {
    color: colDef.color || defaultDef.color,
    label: colDef.label || defaultDef.label,
    icon: (colDef.icon as IconName | null) || defaultDef.icon,
    type: colDef.type,
  };
}

export const getTemplateColumnByType = (translations: Translation) => (
  type: ColumnDefinitionType
) => {
  const dic = keyBy(
    [
      {
        color: '#D1C4E9',
        icon: 'help',
        label: translations.PostBoard.customQuestion,
        type: 'custom',
      },
      {
        color: '#E8F5E9',
        icon: 'satisfied',
        label: translations.PostBoard.wellQuestion,
        type: 'well',
      },
      {
        color: '#FFEBEE',
        icon: 'disatisfied',
        label: translations.PostBoard.notWellQuestion,
        type: 'notWell',
      },
      {
        color: '#FFFDE7',
        icon: 'sunny',
        label: translations.PostBoard.ideasQuestion,
        type: 'ideas',
      },
      {
        color: '#E8F5E9',
        icon: 'play',
        label: translations.PostBoard.startQuestion,
        type: 'start',
      },
      {
        color: '#FFEBEE',
        icon: 'pause',
        label: translations.PostBoard.stopQuestion,
        type: 'stop',
      },
      {
        color: '#BBDEFB',
        icon: 'fast-forward',
        label: translations.PostBoard.continueQuestion,
        type: 'continue',
      },
      {
        color: '#E8F5E9',
        icon: 'liked',
        label: translations.PostBoard.likedQuestion,
        type: 'liked',
      },
      {
        color: '#FFEBEE',
        icon: 'disatisfied',
        label: translations.PostBoard.learnedQuestion,
        type: 'learned',
      },
      {
        color: '#BBDEFB',
        icon: 'help',
        label: translations.PostBoard.lackedQuestion,
        type: 'lacked',
      },
      {
        color: '#E1BEE7',
        icon: 'cocktail',
        label: translations.PostBoard.longedForQuestion,
        type: 'longedFor',
      },

      {
        color: '#E8F5E9',
        icon: 'link',
        label: translations.PostBoard.anchorQuestion,
        type: 'anchor',
      },
      {
        color: '#FFEBEE',
        icon: 'boat',
        label: translations.PostBoard.boatQuestion,
        type: 'cargo',
      },
      {
        color: '#BBDEFB',
        icon: 'cocktail',
        label: translations.PostBoard.islandQuestion,
        type: 'island',
      },
      {
        color: '#E1BEE7',
        icon: 'gesture',
        label: translations.PostBoard.windQuestion,
        type: 'wind',
      },
      {
        color: '#FFE0B2',
        icon: 'fitness',
        label: translations.PostBoard.rockQuestion,
        type: 'rock',
      },
    ] as ColumnSettings[],
    x => x.type
  );
  return dic[type];
};

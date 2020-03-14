import { Column } from 'typeorm';
import {
  SessionOptions as JsonSessionOptions,
  defaultOptions,
} from 'retro-board-common';

export default class SessionOptions {
  @Column({ nullable: true, type: 'numeric' })
  public maxUpVotes: number | null;
  @Column({ nullable: true, type: 'numeric' })
  public maxDownVotes: number | null;
  @Column({ default: true })
  public allowActions: boolean;
  @Column({ default: false })
  public allowSelfVoting: boolean;
  @Column({ default: false })
  public allowMultipleVotes: boolean;
  @Column({ default: false })
  public allowAuthorVisible: boolean;

  constructor(options: Partial<JsonSessionOptions>) {
    const optionsWithDefault = getDefaultOptions(options);
    this.maxUpVotes = optionsWithDefault.maxUpVotes;
    this.maxDownVotes = optionsWithDefault.maxDownVotes;
    this.allowAuthorVisible = optionsWithDefault.allowAuthorVisible;
    this.allowActions = optionsWithDefault.allowActions;
    this.allowSelfVoting = optionsWithDefault.allowSelfVoting;
    this.allowMultipleVotes = optionsWithDefault.allowMultipleVotes;
  }
}

function getDefaultOptions(
  options: Partial<JsonSessionOptions>
): JsonSessionOptions {
  return {
    ...defaultOptions,
    ...options,
  };
}

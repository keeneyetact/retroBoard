import { Translation } from './types';
export default {
  Header: {
    subtitle: 'Ein schöner Weg auf eine agile Art zu meckern',
    logout: 'Abmelden',
    leave: 'Verlassen',
    summaryMode: 'Zusammenfassungsmodus',
  },
  LanguagePicker: {
    header: 'Sprache auswählen',
  },
  Main: {
    hint:
      'Du kannst Andere zu dieser Session einladen indem Du ihnen die URL schickst',
  },
  Post: {
    vote: 'Stimme',
    votes: 'Stimmen',
    deleteButton: 'Löschen',
    noContent: '(Dieser Post hat keinen Inhalt)',
    by: 'von',
    upVote: 'up-vote',
    downVote: 'down-vote',
    voteRemainingMultiple: (count: number, type: string) =>
      `Du hast ${count} ${type}s verbleibend.`,
    voteRemainingOne: (type: string) =>
      `Du hast nur noch einen ${type} verbleibend, verteile ihn gut!`,
    voteRemainingNone: (type: string) => `Du hast keine ${type}s verbleibend.`,
  },
  Customize: {
    title: 'Personalisiere Dein Spiel',
    votingCategory: 'Abstimmung',
    votingCategorySub: 'Setze die Abstimmregeln',
    postCategory: 'Beitragseinstellungen',
    postCategorySub: 'Stelle ein, wie Nutzer mit Beitragen interagieren können',
    customTemplateCategory: 'Spaltenkonfiguration',
    customTemplateCategorySub:
      'Setze die Anzahl an Spalten und deren Eigenschaften',
    startButton: 'Spiel starten!',
    maxUpVotes: 'Max Up-Votes',
    maxUpVotesHelp: `Maximale Anzahl an 'up-votes', die ein Nutzer geben kann`,
    maxDownVotes: 'Max Down-Votes',
    maxDownVotesHelp: `Maximale Anzahl an 'down-votes', die ein Nutzer geben kann`,
    allowSelfVoting: 'Eigene Posts bewerten',
    allowSelfVotingHelp:
      'Soll es Nutzern möglich sein eigene Beiträge zu bewerten?',
    allowMultipleVotes: 'Mehrfachabstimmung',
    allowMultipleVotesHelp:
      'Soll es Nutzern möglich sein mehrfach zu bewerten?',
    allowActions: 'Erlaube Maßnahmen',
    allowActionsHelp: `Bestimmt ob Maßnahmen hinzugefügt werden können`,
    allowAuthorVisible: 'Zeige Author',
    allowAuthorVisibleHelp: 'Zeigt den Author eines Posts an.',
    template: 'Vorlage',
    templateHelp: 'Nutze ein vordefiniertes Spaltenset',
    numberOfColumns: 'Anzahl an Spalten',
    numberOfColumnsHelp: 'Setze die Anzahl an Spalten',
  },
  PostBoard: {
    customQuestion: 'Eigene Spalte',
    notWellQuestion: 'Was können wir verbessern?',
    wellQuestion: 'Was lief gut?',
    ideasQuestion: 'Geniale Einfälle?',
    startQuestion: 'Start',
    stopQuestion: 'Stop',
    continueQuestion: 'Weiter',
    likedQuestion: 'Liked',
    lackedQuestion: 'Lacked',
    learnedQuestion: 'Learned',
    longedForQuestion: 'Longed For',
    anchorQuestion: 'Anker',
    boatQuestion: 'Boot',
    islandQuestion: 'Insel',
    windQuestion: 'Wind',
    rockQuestion: 'Fels',
  },
  GameMenu: {
    board: undefined,
    summary: undefined,
  },
  Template: {
    default: 'Default',
    wellNotWell: 'Gut / Nicht Gut',
    startStopContinue: 'Start / Stop / Weiter',
    fourLs: 'Vier Ls',
    sailboat: 'Segelboot',
  },
  Clients: {
    header: 'Mit dabei sind:',
  },
  Join: {
    welcome: 'Willkommen zu Retrospected',
    standardTab: {
      header: 'Erstellen',
      text: 'Klicke unten und starte deine Retrospektive:',
      button: 'Erstelle eine neue Session',
      customizeButton: 'Personalisieren',
    },
    optionsTab: {
      header: 'Optionen',
      input: 'Name',
      button: 'Erstelle eine personalisierte Session',
    },
    previousTab: {
      header: 'Letzte',
      rejoinButton: 'Erneut beitreten',
    },
  },
  Login: {
    namePlaceholder: 'Wer genau bist Du? Gib hier Deinen Namen ein',
    buttonLabel: 'Auf gehts!',
    header: 'Anmelden',
  },
  SummaryBoard: {
    noPosts: 'Es gibt keine Beiträge',
    copyAsMarkdown: undefined,
    copyAsRichText: undefined,
    copySuccessful: undefined,
  },
  SessionName: {
    defaultSessionName: 'Meine Retrospektive',
  },
  Invite: {
    inviteButton: 'Einladen',
    dialog: {
      title: 'Lade Andere in deine Retrospektive ein',
      text:
        'Um Andere in deine Retrospektive einzuladen schicke ihnen einfach ' +
        'die folgende URL',
      copyButton: 'URL in die Zwischenablage kopieren',
    },
  },
  Generic: {
    ok: 'OK',
    cancel: 'Abbrechen',
  },
  Actions: {
    tooltip: 'Erstelle hierzu eine Maßnahme',
    label: 'Öffne das Aktionspanel',
    summaryTitle: 'Deine Maßnahmen',
    title: 'Maßnahme',
  },
} as Translation;

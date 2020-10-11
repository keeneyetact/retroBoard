import { Translation } from './types';
export default {
  Header: {
    subtitle: 'Een goede manier om in een gestructureerde manier te tieren',
    logout: 'Afmelden',
    leave: 'Verlaten',
    summaryMode: 'Samenvatting',
  },
  LanguagePicker: {
    header: 'Kies een taal',
  },
  Main: {
    hint:
      'Je kan anderen uitnodigen voor deze sessie door de URL te kopiëren en te plakken',
  },
  Home: {
    welcome: (userName: string) => `Welkom, ${userName}`,
  },
  PreviousGame: {
    createdBy: 'Aangemaakt door',
    posts: 'retropunten',
    participants: 'deelnemers',
    votes: 'stemmen',
    actions: 'acties',
  },
  Column: {
    createGroupTooltip: 'Creeër een groep om retropunten te bundelen',
  },
  Group: {
    emptyGroupTitle: 'Dit is een lege groep',
    emptyGroupContent:
      'Verplaats een retropunt hierheen om deze groep te vullen',
  },
  Post: {
    openExtra: 'Extra features',
    closeExtra: 'Sluiten',
    vote: 'Stem',
    votes: 'Stemmen',
    deleteButton: 'Verwijderen',
    setActionButton: 'Instellen actie',
    setGiphyButton: 'Kies een Giphy afbeelding',
    noContent: '(Dit retropunt heeft geen inhoud)',
    by: 'door',
    upVote: 'up-vote',
    downVote: 'down-vote',
    voteRemainingMultiple: (count: number, type: string) =>
      `Je hebt ${count} ${type}s over.`,
    voteRemainingOne: (type: string) =>
      `Je hebt nog maar ${type} over, zorg dat hij telt!`,
    voteRemainingNone: (type: string) => `Je hebt geen ${type} over.`,
    toggleGiphyButton: 'Aan- en uitschakelen Giphy afbeelding',
  },
  Customize: {
    title: 'Sessie aanpassen',
    votingCategory: 'Stemmen',
    votingCategorySub: 'Instellen regels voor stemmen',
    postCategory: 'Retropunten instellingen',
    postCategorySub:
      'Instellen regels wat een gebruiker kan doen wanneer hij reageert op een retropunt',
    customTemplateCategory: 'Kolommen template',
    customTemplateCategorySub: 'Instellen aantal kolommen en hun specificaties',
    startButton: 'Start de sessie',
    maxUpVotes: 'Maximum up-votes',
    maxUpVotesHelp: `Maximum aantal 'likes' die een gebruiker mag uitbrengen`,
    maxDownVotes: 'Maximum down-votes',
    maxDownVotesHelp: `Maximum aantal 'dislikes' die een gebruiker mag uitbrengen`,
    allowSelfVoting: 'Zelf-stemmen toestaan',
    allowSelfVotingHelp:
      'Of een gebruiker op zijn eigen retropunten mag stemmen',
    allowMultipleVotes: 'Meerdere stemmen toestaan',
    allowMultipleVotesHelp:
      'Of een gebruiker meerdere stemmen op hetzelfde retropunt kan uitbrengen',
    allowActions: 'Acties toestaan',
    allowActionsHelp: `Toestaan van 'Acties' veld (follow-up) op elk retropunt`,
    allowAuthorVisible: 'Toon auteur',
    allowAuthorVisibleHelp: 'Tonen van auteur op het retropunt.',
    allowGiphy: 'Giphy toestaan',
    allowGiphyHelp:
      'Gebruikers toestaan een Giphy afbeelding bij een retropunt te plaatsen',
    allowGrouping: 'Groeperen toestaan',
    allowGroupingHelp: 'Aanmaken van groepen van retropunten toestaan.',
    allowReordering: 'Herordenen toestaan',
    allowReorderingHelp:
      'Toestaan om retropunten mbv drag-en-drop te herordenen',
    blurCards: undefined,
    blurCardsHelp: undefined,
    template: 'Template',
    templateHelp: 'Gebruik een vooringestelde set kolommen',
    numberOfColumns: 'Aantal kolommen',
    numberOfColumnsHelp: 'Stel het aantal kolommen in',
    makeDefaultTemplate: 'Stel in als mijn standaard template',
  },
  PostBoard: {
    customQuestion: 'Aangepast kolom',
    notWellQuestion: 'Wat kan er beter?',
    wellQuestion: 'Wat ging goed?',
    ideasQuestion: 'Een geweldig idee om te delen?',
    startQuestion: 'Start',
    editButton: undefined,
    stopQuestion: 'Stop',
    continueQuestion: 'Blijven doen',
    likedQuestion: 'Liked (Leuk)',
    lackedQuestion: 'Lacked (Ontbrak)',
    learnedQuestion: 'Learned (Geleerd)',
    longedForQuestion: 'Longed for (Gewild)',
    anchorQuestion: 'Anker',
    boatQuestion: 'Boot',
    islandQuestion: 'Eiland',
    windQuestion: 'Wind',
    rockQuestion: 'Steen',
    disconnected: 'Je huidige sessie is verbroken',
    reconnect: 'Opnieuw verbinden',
    notLoggedIn:
      'Je bent niet ingelogd. Je kan de sessie bekijken als toeschouwer maar moet inloggen om deel te nemen.',
  },
  GameMenu: {
    board: 'Bord',
    summary: 'Samenvatting',
  },
  Template: {
    default: 'Standaard',
    wellNotWell: 'Goed / Niet goed',
    startStopContinue: 'Start / Stop / Blijven doen',
    fourLs: `De 4 L'en`,
    sailboat: 'Zeilboot',
  },
  Clients: {
    header: 'Deelnemers:',
  },
  Join: {
    welcome: 'Welkom bij Retrospected',
    standardTab: {
      header: 'Starten',
      text: 'Klik hieronder en begin je retrospective:',
      button: 'Start een nieuwe sessie',
      customizeButton: 'Aanpassen',
    },
    optionsTab: {
      header: 'Opties',
      input: 'Naam',
      button: 'Start een aangepaste sessie',
    },
    previousTab: {
      header: 'Vorige sessies',
      rejoinButton: 'Opnieuw deelnemen',
    },
  },
  Login: {
    namePlaceholder: 'Laat weten wie je bent met je naam',
    buttonLabel: 'Laten we beginnen',
    header: 'Login',
    socialMediaAuthHeader: 'Social Media authenticatie',
    socialMediaAuthDescription:
      'Dit gebruikt je social media account en slaat de sessies op onder je account. Er is geen wachtwoord nodig.',
    anonymousAuthHeader: 'Aanmelden zonder account',
    anonymousAuthDescription:
      'Hiermee maak je aan anonieme account aan. Hiermee kan geen sessies opslaan en terughalen.',
    authenticatingWith: 'Authenticeer met',
    or: 'of',
  },
  SummaryBoard: {
    noPosts: 'Er zijn geen retropunten om te tonen',
    copyAsMarkdown: 'Kopieer de samenvatting als Markdown',
    copyAsRichText: 'Kopieer de samenvatting als rich-text',
    copySuccessful:
      'Je hebt de samenvatting succesvol naar het klembord gekopieerd',
  },
  SessionName: {
    defaultSessionName: 'Mijn Retrospective',
  },
  Invite: {
    inviteButton: 'Uitnodigen',
    dialog: {
      title: 'Nodig mensen uit voor jouw retrospective',
      text:
        'Stuur de mensen die je wil uitnodigen voor jouw retrospective ' +
        'sessie de volgende url',
      copyButton: 'Kopieer URL naar klembord',
    },
  },
  Generic: {
    ok: 'OK',
    cancel: 'Annuleren',
  },
  Actions: {
    tooltip: 'Maak een actie op de achterkant van dit item',
    label: 'Open het actiepaneel',
    summaryTitle: 'Jouw acties',
    title: 'Actie',
  },
  DeleteSession: {
    header: undefined,
    firstLine: undefined,
    secondLine: undefined,
    yesImSure: undefined,
    cancel: undefined,
  },
  RevealCards: {
    buttonLabel: undefined,
    dialogTitle: undefined,
    dialogContent: undefined,
    confirmButton: undefined,
    cancelButton: undefined,
  },
} as Translation;

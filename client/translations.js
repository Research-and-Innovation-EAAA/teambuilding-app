angular.module('leukemiapp').config(config);

function config($translateProvider) {
   $translateProvider.translations('en_EN', {
      JANUARY: 'January',
      FEBRUARY: 'February',
      MARCH: 'March',
      APRIL: 'April',
      MAI: 'May',
      JUNE: 'June',
      JULY: 'July',
      AUGUST: 'August',
      SEPTEMBER: 'September',
      OCTOBER: 'October',
      NOVEMBER: 'November',
      DECEMBER: 'December',

      SUNDAY: 'Sunday',
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday',
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thurday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday'
   });
   $translateProvider.translations('da_DA', {
      JANUARY: 'Januar',
      FEBRUARY: 'Februar',
      MARCH: 'Marts',
      APRIL: 'April',
      MAI: 'Maj',
      JUNE: 'Juni',
      JULY: 'Juli',
      AUGUST: 'August',
      SEPTEMBER: 'September',
      OCTOBER: 'Oktober',
      NOVEMBER: 'November',
      DECEMBER: 'December',

      SUNDAY: 'Søndag',
      MONDAY: 'Mandag',
      TUESDAY: 'Tirsdag',
      WEDNESDAY: 'Onsdag',
      THURSDAY: 'Torsdag',
      FRIDAY: 'Fredag',
      SATURDAY: 'Lørdag',

      //Data overview Mucositis
      pain: 'Smerte',
      ulcers: 'Mundsår',
      food: 'Fødeindtag',
      nauseaScore: 'Kvalme',

      //Data overview Pain
      painType: 'Placering',
      painScore: 'Intensitet',
      morphine: 'Morfin',
      morphineType: 'Morfintype',
      morphineDose: 'Dosis',
      morphineMeasureUnit: 'Måleenhed',

      //Data overview Medicin
      sixmp: '6 MP',
      mtx: 'MTX',

      //Data overview Blood samples
      leucocytes: 'Leukocytter',
      neutrofile: 'Neutrofile',
      hemoglobin: 'Hæmoglobin',
      alat: 'Alat',
      crp: 'CRP',

      //Modules
      Medicine: 'Medicin',
      Bloodsample: 'Blodprøver',
      Mucositis: 'Mucositis',
      Pain: 'Smerte',

      //Data overview
      graphDataDisclaimer: 'Viser de nyeste 5 registreringer for det tidsrum.',

      //Notes
      notesPlaceholderLoggedIn: 'Tryk for at indtaste tekst',
      notesPlaceholderLoggedOut: 'Logge ind for at oprette noter',

      //Wizard
      saveRegistrationLoggedOut: 'Log ind for at spare registrering'
   });
   $translateProvider.preferredLanguage('da_DA');
   $translateProvider.useSanitizeValueStrategy('escape');
}
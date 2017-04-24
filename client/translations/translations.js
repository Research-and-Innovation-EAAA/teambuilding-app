angular.module('leukemiapp').config(config);

function config($translateProvider) {

    $translateProvider.translations('en', {
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
        monthsList: 'January_February_March_April_May_June_July_August_September_October_November_December',

        SUNDAY: 'Sunday',
        MONDAY: 'Monday',
        TUESDAY: 'Tuesday',
        WEDNESDAY: 'Wednesday',
        THURSDAY: 'Thurday',
        FRIDAY: 'Friday',
        SATURDAY: 'Saturday',
        weekdaysList: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday',
        weekdaysShortList: 'Su_Mo_Tu_We_Th_Fr_Sa',

        events: 'Events',
        login: 'Log in',
        logout: 'Log out',
        eventCode: 'Event code',
        enter: 'Enter',
        email: 'E-mail',
        password: 'Password',
        error: 'Error!',
        errorLoginPwd: 'This email is already in the system, but the password does not match.',
        errorLoginNewUser: 'Cannot create a user. Check internet connection and try again later.',
        errorLoginAllFields: 'Please fill in all the fields.',
        errorNoEventFound: 'No event found!',
        errorEventCode: 'Incorrect event code. Please try again.',

        date: 'Date',
        meetingPoint: 'Meeting point',
        program: 'Program',
        bring: 'Please bring',
        moreInfo: 'More information',
        startQuestionnaire: 'Start questionnaire',
        thanksAll: 'Thank you for all your feedback!',
        thanksToday: 'Thank you! We hope you have enjoyed as much as we did :-)',
        seeYouLaterAt: 'See you later after {{time}}!',
        refresherText: 'Pull to refresh...',


        wizard: {
            cancel: 'Cancel',
            previous: 'Previous',
            next: 'Next',
            update: 'Update',
            save: 'Save',
            time: 'Time',

            invalidInputTitle: 'Error',
            invalidInput: 'One or more fields are not filled in properly!',
            saved: 'Registration saved!',
            savedThanks: "Thank you! Your answers have been saved.",
            failed: 'Failed to save registration, please try again.',
            saveRegistrationLoggedOut: 'Log in to save the registration',
        }

    });

    $translateProvider.translations('da_DK', {
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
        monthsList: 'Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December',

        SUNDAY: 'Søndag',
        MONDAY: 'Mandag',
        TUESDAY: 'Tirsdag',
        WEDNESDAY: 'Onsdag',
        THURSDAY: 'Torsdag',
        FRIDAY: 'Fredag',
        SATURDAY: 'Lørdag',
        weekdaysList: 'Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag',
        weekdaysShortList: 'Sø_Ma_Ti_On_To_Fr_Lø',


        events: 'Events',
        login: 'Log ind',
        logout: 'Log ud',
        eventCode: 'Event kode',
        enter: 'Gå ind', //TODO !!!!!!!!!!
        email: 'E-mail',
        password: 'Kodeord',
        error: 'Fejl!',
        errorLoginPwd: 'Denne e-mailaddrese er allerede i brug, men kodeordet passer ikke.', //TODO check!!!!
        errorLoginNewUser: 'Kunne ikke oprette en ny bruger. Tjek internetforbindelsen og prøv venligst igen.',
        errorLoginAllFields: 'Udfyld venligst begge felter.',
        errorNoEventFound: 'Ingen event fundet!',
        errorEventCode: 'Ukorrekt event kode. Prøv venligst igen.',

        date: 'Dato',
        meetingPoint: 'Mødested',
        program: 'Program',
        bring: 'Medbring',
        moreInfo: 'Flere oplysninger',
        startQuestionnaire: 'Start spørgeskema',
        thanksAll: 'Tak for al din feedback!',
        thanksToday: 'Tak for i dag! Håber det har været en dejlig dag :-)',
        seeYouLaterAt: 'Vi ses senere efter kl. {{time}}!',
        refresherText: 'Træk for at opdatere...',


        wizard: {
            cancel: 'Fortryd',
            previous: 'Forrige',
            next: 'Næste',
            update: 'Opdater',
            save: 'Gem',
            time: 'Tid',

            existingRecordTitle: 'Opdater registrering',
            existingRecord: 'Der findes allerede en registrering på dette tidspunkt! Vil du rette den?',
            invalidInputTitle: 'Fejl',
            invalidInput: 'Et eller flere felter er enten ikke udfyldt, eller ikke udfyldt korrekt!',
            saved: 'Registrering gemt!',
            savedThanks: "Mange tak! Dine svar er blevet gemt.",
            failed: 'Kunne ikke gemme registreringen',
            saveRegistrationLoggedOut: 'Log ind for at spare registrering',

        }



    });

    //$translateProvider.determinePreferredLanguage(); // select lang using device settings
    $translateProvider.preferredLanguage('da_DK');
    $translateProvider.useSanitizeValueStrategy('escape'); // security setting
    $translateProvider.fallbackLanguage(['en']);

}
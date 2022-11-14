import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import {I18nManager} from "react-native"

// Set the key-value pairs for the different languages you want to support.
const getString = new I18n({
    en: {
        you_have_an_appointment: 'you have an appointment',
        find_us: 'Find Us',
        book: 'Book',
        our_staff: 'Our Staff',
        about_us: 'About Us',
        about_us_details: 'Our story begins with a small barber shop located in Baqa elgarbia , We began with a small customer base and through time we got big',
        login: 'Login',
        lets_start: 'Let\'s Start' ,
        the_login_process:'The Login Process',
        create_account:'create an account',
        dont_have_an_account:'don\'t have an account?',
        didnt_receive_code:'didn\'nt receive a code?',
        send_again: 'send again'
    },
    he: {
        you_have_an_appointment: 'יש לך תור',
        find_us: 'מצא אותנו',
        book: 'הזמן תור',
        our_staff: 'הצוות שלנו',
        about_us: 'קצת עלינו',
        about_us_details: 'הסיפור שלנו מתחיל בחדר קטן בבאקה אלגרביה , התחלנו עם מספר מצומצם של לקחות ולאט לאט גדלנו',
        login: 'כנס',
        lets_start: 'בוא נתיחל',
        the_login_process:'תהליך הכניסה למערכת',
        create_account:'צור חשבון',
        dont_have_an_account:'אין לך חשבון?',
        didnt_receive_code:'לא קיבלת קוד?',
        send_again: 'שלח שוב'

    },
});

// Set the locale once at the beginning of your app.
getString.locale = Localization.locale;

getString.enableFallback = true;

export default getString
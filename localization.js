import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { I18nManager } from "react-native"

// Set the key-value pairs for the different languages you want to support.
const getString = new I18n({
    en: {
        you_have_an_appointment: 'you have an appointment',
        you_dont_have_appointment: 'You don\'t have an appointment , Maybe its time for a new hair cut',
        find_us: 'Find Us',
        book: 'Book',
        our_staff: 'Our Staff',
        about_us: 'About Us',
        about_us_details: 'Our story begins with a small barber shop located in Baqa elgarbia , We began with a small customer base and through time we got big',
        login: 'Login',
        lets_start: 'Let\'s Start',
        the_login_process: 'The Login Process',
        create_account: 'create an account',
        dont_have_an_account: 'don\'t have an account?',
        didnt_receive_code: 'didn\'nt receive a code?',
        send_again: 'send again',
        phone: 'phone',
        signup: 'Signup',
        at: 'at',
        hello_there_login_first: 'Hello there, Lets login first',
        login_or_signup: 'Login or Signup',
        birth_date: 'Birth Date',
        next: 'Next',
        first_name: 'First Name',
        last_name: 'Last Name',
        check_phone: 'Check Phone',
        cant_be_less_than: 'can\'t be less than',
        cant_be_longer_than: 'can\'t be longer than',
        letters: 'letters',
        cant_be_blank: 'can\'t be blank',
        must_contain_letters_numbers_only: 'must contain letters and spaces only',
        is_not_valid: 'is not valid',
        something_went_wrong: 'something went wrong',
        user_with_this_number_exists: 'User with this number already exists',
        error: 'Error',
        you_have_too_many_tries: 'you have too many login tries , try again after some time',
        welcome: 'Welcome',
        to_our_barbershop: 'To Our Barbershop',
        we_are_ready: 'We Are Ready',
        done: 'Done',
        you_are_not_authorized: 'you are not authorized',
        user_with_this_phone_was_not_found: 'user with this phone number was not found',
        code_not_match: 'Code not matched',
        code_expired_try_again: 'Code expired, Try again',
        code_expired: 'Code expired',
        go_back: 'Go Back',
        profile: 'Profile',
        home: 'Home',
        appointments: 'Appointments',
        worker_page: 'Worker Page',
        logout: 'Logout',
        customers: 'Customers',
        are_you_sure_logout: 'Are you sure you want to logout?',
        edit_profile: 'Edit Profile',
        customers: 'Customers',
        users: 'Users',
        update: 'Update',
        phone_number: 'Phone Number'



    },
    he: {
        you_have_an_appointment: 'יש לך תור',
        you_dont_have_appointment: 'אין לך תור ,  אולי זה הזמן לתספורת',
        find_us: 'מצא אותנו',
        book: 'הזמן תור',
        our_staff: 'הצוות שלנו',
        about_us: 'קצת עלינו',
        about_us_details: 'הסיפור שלנו מתחיל בחדר קטן בבאקה אלגרביה , התחלנו עם מספר מצומצם של לקחות ולאט לאט גדלנו',
        login: 'כניסה',
        lets_start: 'בוא נתיחל',
        the_login_process: 'תהליך הכניסה למערכת',
        create_account: 'צור חשבון',
        dont_have_an_account: 'אין לך חשבון?',
        didnt_receive_code: 'לא קיבלת קוד?',
        send_again: 'שלח שוב',
        phone: 'מספר טלפון',
        signup: 'הרשמה',
        at: 'ב',
        hello_there_login_first: 'שלום אורח , כנס למערכת תחילה',
        login_or_signup: 'כנס או הרשם',
        birth_date: 'תאריך לידה',
        next: 'הבא',
        first_name: 'שם פרטי',
        last_name: 'שם משפחה',
        check_phone: 'בדוק מספר',
        cant_be_less_than: 'לא יכול להיות פחות מ',
        letters: 'אותיות',
        cant_be_blank: 'לא יכול להיות ריק',
        cant_be_longer_than: 'לא יכול להיות יותר מ',
        must_contain_letters_numbers_only: 'חייב להכיל אותיות ורווחים בלבד',
        is_not_valid: 'לא תקין',
        something_went_wrong: 'משהו השתבש',
        user_with_this_number_exists: 'משתמש עם מספר זה כבר קיים',
        error: 'שגיאה',
        you_have_too_many_tries: 'יש לך המון נסיונות , נסה שוב אחרי כמה זמן',
        welcome: 'ברוכים הבאים',
        to_our_barbershop: 'למספרה שלנו',
        we_are_ready: 'אנחנו מוכנים',
        done: 'סיים',
        you_are_not_authorized: 'אין לך הרשאה',
        user_with_this_phone_was_not_found: 'לא נמצא משתמש עם מספר זה',
        code_not_match: 'קוד לא נכון',
        code_expired_try_again: 'הקוד פג תוקף, נסה שוב',
        code_expired: 'הקוד פג תוקף',
        go_back: 'חזור',
        profile: 'פרטי',
        home: 'הבית',
        appointments: 'תורים',
        worker_page: 'דף עובד',
        logout: 'התנתק',
        customers: 'לקוחות”',
        are_you_sure_logout: 'אתה בטוח לצאת מהמערכת?',
        edit_profile: 'עדכן פרטים',
        customers: 'לקוחות',
        users: 'משתמשים',
        update: 'עדכן',
        phone_number: 'מספר טלפון'









    },
});

// Set the locale once at the beginning of your app.
getString.locale = Localization.locale;

getString.enableFallback = true;

export default getString
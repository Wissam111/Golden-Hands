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
        are_you_sure_logout: 'Are you sure you want to logout?',
        edit_profile: 'Edit Profile',
        customers: 'Customers',
        customer: 'Customer',
        users: 'Users',
        update: 'Update',
        phone_number: 'Phone Number',
        lets_get_haircut: 'let\'s get a hair cut',
        'in-progress': 'in progress',
        canceled: 'Canceled',
        cancel: 'Cancel',
        users: 'Users',
        lets_add_profile_image: 'Let\'s add a profile image',
        upload_image: 'Upload Image',
        upload: 'Upload',
        preferred_workers: 'Preferred Workers',
        rating: 'Rating',
        barber: 'Barber',
        general: 'General',
        mark_as_barber: 'Mark as barber',
        call: 'Call',
        block: 'Block',
        unblock: 'Unblock',
        mark_as_customer: 'Mark as customer',
        actions: 'Actions',
        rate_us: 'rate us',
        book_appointment: 'Book Appointment',
        select_day: 'Select Day',
        select_worker: 'Select Worker',
        select_service: 'Select Service',
        select_hour: 'Select Hour',
        appointment_info: 'Appointment Info',
        confirm_and_book: 'Confirm and Book',
        wax: 'Wax',
        'hair cut': 'Hair Cut',
        massage: 'Massage',
        'face cut': 'Face Cut',
        all: 'All',
        no_appointment_at_this_day: 'No appointments at this day',
        search: 'Search',
        free_appointment: 'Free Appointment',
        create: 'Create',
        create_appointment: 'Create Appointment',
        start_time: 'Start Time',
        end_time: 'End Time',
        manage_your_services: 'Manage Your Services',
        price: 'Price',
        add_service: 'Add Service',
        add: 'Add',
        change_status: 'Change Status',
        cancel_appointment: 'Cancel Appointment',
        cancel_appointment_info: 'After canceling your appointment, other users may be able to book it',
        end_reached: 'End Reached',
        recent: 'Recent',
        yes: 'Yes',
        no: 'No',
        service:'Service',
        message:'Message',
        free: 'Free' ,
        hold: 'Hold' , 
        'didnt_come': 'Did\'nt come' , 
        delete: 'Delete' , 
        hold_by_worker: 'Hold by worker',
        today: 'Today',
        tomorrow:'Tomorrow',
        with:'With',
        for:'For',
        duration_min: 'Duration In Minutes',
        duration: 'Duration',
        filling_this_duration: 'Filling this input will create multipule appointments between start and end dates with the specified duration',
        current:'Current',
        you_dont_have_any_appointment: 'you dont have any appointment'






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
        are_you_sure_logout: 'אתה בטוח לצאת מהמערכת?',
        edit_profile: 'עדכן פרטים',
        customers: 'לקוחות',
        customer: 'לקוח',
        users: 'משתמשים',
        update: 'עדכן',
        phone_number: 'מספר טלפון',
        lets_get_haircut: 'בוא נסתפר',
        'in-progress': 'בטיפול',
        canceled: 'בוטל',
        cancel: 'בטל',
        users: 'משתמשים',
        lets_add_profile_image: 'בוא נוסיף תמונת פרופיל',
        image_uploaded_successfuly: 'התמונה עלתה בהצלחה',
        upload_image: 'העלה תמונה',
        upload: 'העלה',
        preferred_workers: 'עובדים מועדפים',
        rating: 'דירוג',
        barber: 'ספר',
        general: 'כללי',
        mark_as_barber: 'סמן כספר',
        call: 'התקשר',
        block: 'חסום',
        unblock: 'בטל חסימה',
        mark_as_customer: 'סמן כלקוח',
        actions: 'פעולות',
        rate_us: 'דרג אותנו',
        book_appointment: 'הזמן תור',
        select_day: 'בחר יום',
        select_worker: 'בחר עובד',
        select_service: 'בחר שירות',
        select_hour: 'בחר שעה',
        appointment_info: 'פרטי תור',
        confirm_and_book: 'אשר והזמן',
        wax: 'ואקס',
        'hair cut': 'תספורת',
        massage: 'מסאג׳',
        'face cut': 'זקן',
        all: 'הכל',
        no_appointment_at_this_day: 'אין תורים ביום זה',
        search: 'חיפוש',
        free_appointment: 'תור פנוי',
        create: 'יצירה',
        create_appointment: 'יצירת תור',
        start_time: 'זמן התחלה',
        end_time: 'זמן סיום',
        manage_your_services: 'נהל השירותים שלך',
        price: 'מחיר',
        add_service: 'הוסף שירות',
        add: 'הוסף',
        change_status: 'עדכון מצב',
        cancel_appointment: 'ביטול תור',
        cancel_appointment_info: 'שים לב, אחרי ביטול התור משתמשים אחרים יוכלו להזמין אותו',
        end_reached: 'הגעת לסוף',
        recent: 'לאחרונה',
        yes: 'כן',
        no: 'לא',
        service:'שירות',
        message:'הודעה' , 
        free: 'פנוי' ,
        hold: 'שמור' , 
        'didnt-come': 'לא הגיע' , 
        delete: 'מחק' , 
        hold_by_worker: 'נשמר ע״י העובד',
        today: 'היום',
        tomorrow:'מחר',
        with:'עם',
        for:'עבור',
        duration_min: 'משך זמן בדקות',
        duration: 'משך זמן',
        filling_this_duration: 'מליאת שדה זה יגרור הוספת מספר תורים מזמן ההתחלה עד הסיום עם משך זמן שצוין',
        current:'הנוכחי',
        you_dont_have_any_appointment: 'אין לך תורים'








    },
});

// Set the locale once at the beginning of your app.
getString.locale = Localization.locale;

getString.enableFallback = true;

export default getString
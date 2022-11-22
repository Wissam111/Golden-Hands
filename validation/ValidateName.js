import getString from "../localization"

const MAX_LENGTH = 16
const MIN_LENGTH = 2

const validateName = (fieldName, name) => {
    if (!name || name.length == 0)
        return { successful: false, errorMessage: `${fieldName} ${getString.t('cant_be_blank')}` }

    if (name.length > MAX_LENGTH) {
        return { successful: false, errorMessage: `${fieldName} can't be longer than ${MAX_LENGTH} ${getString.t('letters')}` }
    }

    if (name.length < MIN_LENGTH) {
        return { successful: false, errorMessage: `${fieldName} ${getString.t('cant_be_less_than')} ${MIN_LENGTH} ${getString.t('letters')}` }
    }

    if (!name.match("^[a-zA-Z\\u0590-\\u05fe\\u0621-\\u064A]+( [a-zA-Z\\u0590-\\u05fe\\u0621-\\u064A]+)*[ ]*\$")) {
        return { successful: false, errorMessage: `${fieldName} ${getString.t('must_contain_letters_numbers_only')}` }
    }

    return { successful: true }
}


const required = (fieldName, value) => {
    if (!value || value.length == 0)
        return { successful: false, errorMessage: `${fieldName} ${getString.t('cant_be_blank')}` }
    return { successful: true }
}


const validatePhone = (phone) => {
    if (!phone || phone.length == 0)
        return { successful: false, errorMessage: `${getString.t('phone')} ${getString.t('cant_be_blank')}` }


    if (!phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im))
        return { successful: false, errorMessage: `${getString.t('phone')} ${getString.t('is_not_valid')}` }

    return { successful: true }
}

export const validate = (key, value) => {
    switch (key) {
        case 'firstName':
            return validateName(getString.t('first_name'), value)

        case 'lastName':
            return validateName(getString.t('last_name'), value)

        case 'birthDate':
            return required(getString.t('birth_date'), value)

        case 'phone':
            return validatePhone(value)
    }

    return { successful: true }
}
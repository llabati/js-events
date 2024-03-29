export default function validateRegistrationForm(formValues){
    const result = {
        username: validateUserName(formValues.username),
        email: validateEmail(formValues.email),
        phone: validatePhone(formValues.phone),
        age: validateAge(formValues.age),
        profession: validateProfession(formValues.profession),
        experience: validateExperience(formValues.experience),
        };
    let isValid = true
    for(let field in result){
        isValid = isValid && result[field]
    }
    return { isValid, result }
}

function validateUserName(name){
    return name.length > 3
}
function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email);
}
function validatePhone(phone) {
    const phoneRegex = /^([0-9 \s]{2}){5}$/;
    return phoneRegex.test(phone);
}
function validateAge(age) {
    return age >= 16 && age <= 60;
}
function validateProfession(profession) {
    const acceptedValues = ['school','college','trainee','employee'];
    return acceptedValues.indexOf(profession) > -1;
}
function validateExperience(experience) {
    return experience > 0 && experience < 4;
}
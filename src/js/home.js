import './general';
import validateRegistrationForm from './services/formValidation/validateRegistrationForm'
import apiCall from './services/api/apiCall';
import toastr from 'toastr';
import '../../node_modules/toastr/toastr.less';
class Home {
    constructor() {
        this.$form = document.querySelector('#registrationForm');
        this.$username = document.querySelector('#username');
        this.$email = document.querySelector('#email');
        this.$phone = document.querySelector('#phone');
        this.$age = document.querySelector('#age');
        this.$profession = document.querySelector('#profession');
        this.$experience = document.querySelector('#experience');
        this.$comment = document.querySelector('#comment');
        this.$submit = document.querySelector('#submit');
        this.$loadingIndicator = document.querySelector('#loadingIndicator');

        this.$form.addEventListener('submit', event => {
            this.onFormSubmit(event);
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        const formValues = this.getFormValues()
        const formStatus = validateRegistrationForm(formValues)
        if(formStatus.isValid) {
            this.clearErrors();
            console.log('SUCCESS')
            this.submitForm(formValues);
        } else {
        this.clearErrors();
        this.highlightErrors(formStatus.result);
        console.log('ERRORS', formStatus.isValid)
        }
        }

    getFormValues() {
        return {
        username: this.$username.value,
        email: this.$email.value,
        phone: this.$phone.value,
        age: this.$age.value,
        profession: this.$profession.value,
        experience:
        parseInt(document.querySelector('input[name="experience"]:checked').value),
        comment: this.$comment.value,
        };
    }

    clearErrors() {
        this.$username.parentElement.classList.remove('has-error');
        this.$phone.parentElement.classList.remove('has-error');
        this.$email.parentElement.classList.remove('has-error');
        this.$age.parentElement.classList.remove('has-error');
        this.$profession.parentElement.classList.remove('has-error');
        this.$experience.parentElement.classList.remove('has-error');
    }
    
    highlightErrors(result) {
        if(!result.username) {
        this.$username.parentElement.classList.add('has-error');
        }
        if(!result.phone) {
        this.$phone.parentElement.classList.add('has-error');
        }
        if(!result.email) {
        this.$email.parentElement.classList.add('has-error');
        }
        if(!result.age) {
        this.$age.parentElement.classList.add('has-error');
        }
        if(!result.profession) {
        this.$profession.parentElement.classList.add('has-error');
        }
        if(!result.experience) {
        this.$experience.parentElement.classList.add('has-error');
        }
    }
    submitForm(formValues){
        apiCall('registration', formValues, 'POST')
            .then(response => {
            this.$submit.classList.remove('hidden');
            this.$loadingIndicator.classList.add('hidden');
            toastr.success(response.message);
            this.resetForm(); // For clearing the form
            })
            .catch(() => {
            this.$submit.classList.remove('hidden');
            this.$loadingIndicator.classList.add('hidden');
            toastr.error('Error!');
            });
    }
    resetForm() {
        this.$username.value = '';
        this.$email.value = '';
        this.$phone.value = '';
        this.$age.value = '';
        this.$profession.value = 'school';
        this.$experience.checked = true;
        this.$comment.value = '';
    }
                
    
}
window.addEventListener("load", () => {
    new Home();
    })
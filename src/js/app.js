import { setInputStatus } from './libs/imask/inputsHandlers';
import { emailMask, telephoneMask, nameMask } from './libs/imask/maskHandler';
var contactForm = document.querySelector('.course-form');

document.addEventListener('DOMContentLoaded', async () => {
	try {
		initFormValidationHandlers();
		initFormHandler();
	} catch (error) {
		throw new Error(error);
	}
});

function initFormHandler() {
	if (!contactForm) return;
	var contactButton = contactForm.querySelector('.course-form__main-button');

	contactButton.addEventListener('click', async (event) => {
		await formChecker(contactForm);
	});
}

async function formChecker(contactForm) {
	var formValidationResults = getInputsData(contactForm);
	var formValidationResultsArray = Object.values(formValidationResults);
	var formValidationResultsStatus = formValidationResultsArray.every(
		(input) => input.validStatus === true,
	);
	if (formValidationResultsStatus) {
		await sendRequest();
	} else {
		var unvalidInputs = formValidationResultsArray.filter(
			(input) => input.validStatus === false || !input.validStatus,
		);
		unvalidInputs.forEach((iter) => setInputStatus(iter, false));
	}
}
async function sendRequest() {
	try {
		var contactFormUrl = contactForm.getAttribute('data-request-link');
		var { telephoneInput, emailInput, nameInput } = getInputsData(contactForm);
		var requestData = {
			telephone: formatPhoneNumber(telephoneInput.value),
			email: emailInput.value,
			userData: nameInput.value,
			timeStamp: JSON.stringify(new Date()),
			userAgent: window.navigator.userAgent,
		};
		var result = await fetch(contactFormUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
		});
		if (result.ok) {
			resetFormValues(contactForm);
		} else {
			setInputStatusWrapper(contactForm, false);
			throw new Error('Request is not sent');
		}
	} catch (error) {
		setInputStatusWrapper(contactForm, false);
	}
}
function resetFormValues(contactForm) {
	var { telephoneInput, emailInput, nameInput } = getInputsData(contactForm);
	telephoneInput.value = '';
	emailInput.value = '';
	nameInput.value = '';
	setInputStatusWrapper(contactForm, null);
}
function setInputStatusWrapper(contactForm, status) {
	var changedInputs = Object.values(getInputsData(contactForm)).forEach((input) => {
		setInputStatus(input, status);
	});
	return changedInputs;
}
function formatPhoneNumber(phoneNumber) {
	phoneNumber = phoneNumber.replace(/[\s-]/g, '');
	return phoneNumber;
}

async function initFormValidationHandlers() {
	var { telephoneInput, emailInput, nameInput } = getInputsData(contactForm);
	var telephoneInputResult = telephoneMask(telephoneInput);
	var emailInputResult = emailMask(emailInput);
	var nameInputResult = nameMask(nameInput);
}

function getInputsData(contactForm) {
	var telephoneInput = contactForm.querySelector('input[data-validation-type="telephone"]');
	var emailInput = contactForm.querySelector('input[data-validation-type="email"]');
	var nameInput = contactForm.querySelector('input[data-validation-type="name"]');
	return { telephoneInput, emailInput, nameInput };
}

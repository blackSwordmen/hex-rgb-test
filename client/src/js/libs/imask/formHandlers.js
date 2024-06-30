export function updateFormStatus(contactForm, status) {
	var formStatusElem = contactForm.querySelector('.course-form__main-status');
	if (status === null) {
		formStatusElem.classList.remove('success');
		formStatusElem.classList.remove('error');
		return;
	} else if (status) {
		formStatusElem.classList.add('success');
		formStatusElem.classList.remove('error');
	} else {
		formStatusElem.classList.add('error');
		formStatusElem.classList.remove('success');
	}
}

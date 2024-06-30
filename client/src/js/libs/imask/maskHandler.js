import { updateFormStatus } from './formHandlers';
import { setInputStatus } from './inputsHandlers';
import { maskList } from './maskList';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const NAME_PATTERN = /^[^\s\d]([А-Яа-яЁёA-Za-zІіЇїЄєҐґ]+(\s[А-Яа-яЁёA-Za-zІіЇїЄєҐґ]+)*)?[^\s\d]$/;

export const telephoneMask = (input, parentSelector) => {
	function setMask() {
		updateFormStatus(parentSelector, null);
		let matrix = '+###############';
		let valid = false;
		maskList.forEach((item) => {
			let code = item.code.replace(/[\s#]/g, ''),
				phone = this.value.replace(/[\s#-)(]/g, '');

			if (phone.includes(code)) {
				matrix = item.code;
			}
		});
		let i = 0,
			val = this.value.replace(/\D/g, '');
		this.value = matrix.replace(/(?!\+)./g, function (a) {
			return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});
		maskList.forEach((item) => {
			const regexStr = item.code.replace(/\+/g, '\\+').replace(/#/g, '\\d').replace(/\s/g, '\\s?');
			const regex = new RegExp(`^${regexStr}$`);
			if (regex.test(this.value)) {
				valid = true;
			}
		});

		if (this.value === '+') {
			setInputStatus(this, null);
			this.value = '';
		} else if (valid) setInputStatus(this, true);
		else setInputStatus(this, false);
		return valid;
	}

	if (!input.value && !input.placeholder) input.value = '+';
	input.addEventListener('input', () => setMask.call(input));
	input.addEventListener('focus', () => setMask.call(input));
	input.addEventListener('blur', () => setMask.call(input));
};

export var emailMask = (input, parentSelector) => {
	function setMask() {
		updateFormStatus(parentSelector, null);
		if (input.value.trim().length < 1) return setInputStatus(this, null);
		if (!EMAIL_PATTERN.test(this.value)) {
			setInputStatus(this, false);
			return false;
		} else {
			setInputStatus(this, true);
			return true;
		}
	}
	input.addEventListener('input', setMask);
	input.addEventListener('focus', setMask);
	input.addEventListener('blur', setMask);
};

export var nameMask = (input, parentSelector) => {
	if (!input) return;
	updateFormStatus(parentSelector, null);
	function setMask() {
		if (this.value.trim().length < 1) return setInputStatus(this, null);
		if (!NAME_PATTERN.test(this.value)) {
			setInputStatus(this, false);
			return false;
		} else {
			setInputStatus(this, true);
			return true;
		}
	}
	input.addEventListener('input', setMask);
	input.addEventListener('focus', setMask);
	input.addEventListener('blur', setMask);
};

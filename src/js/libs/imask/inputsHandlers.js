export var setInputStatus = (input, status) => {
	if (status === null) {
		input.classList.remove('error');
		input.classList.remove('success');
		input.validStatus = null;
		return;
	} else if (status) {
		input.classList.add('success');
		input.classList.remove('error');
		input.validStatus = true;
		return;
	} else {
		input.classList.add('error');
		input.classList.remove('success');
		input.validStatus = false;
	}
};

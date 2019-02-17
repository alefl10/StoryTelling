import moment from 'moment';

module.exports = {
	truncate(str, length) {
		if (str.length > length && str.length > 0) {
			let newStr = `${str} `;
			newStr = newStr.substr(0, length);
			newStr = newStr.substr(0, newStr.lastIndexOf(' '));
			newStr = (newStr.length > 0) ? newStr : newStr.substr(0, length);
			return `${newStr}...`;
		}
		return str;
	},

	stripTags(input) {
		return input.replace(/<(?:.|\n)*?>/gm, '');
	},

	formatDate(date, format) {
		return moment(date).format(format);
	},

	select(selected, options) {
		return options.fn(this).replace(new RegExp(` value=\"${selected}\"`), '$& selected="selected"').replace(new RegExp(`>${selected}</option>`), ' selected="selected"$&');
	},
};

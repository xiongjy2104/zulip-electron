'use strict';
const electron = require('electron');

const CRASH_REPORT_URL = 'https://electron-crash-reporter.appspot.com/5749903439429632/create/';

function appCrashReporter() {
	electron.crashReporter.start({
		companyName: 'zulip',
		productName: 'zulip-electron',
		submitURL: CRASH_REPORT_URL,
		autoSubmit: true
	});
}

exports = module.exports = {
	appCrashReporter
};

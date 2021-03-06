'use strict';

const {ipcRenderer} = require('electron');

const BaseComponent = require(__dirname + '/../../components/base.js');
const ConfigUtil = require(__dirname + '/../../utils/config-util.js');

class GeneralSection extends BaseComponent {
	constructor(props) {
		super();
		this.props = props;
	}

	template() {
		return `
            <div class="settings-pane" id="server-settings-pane">
                <div class="title">Tray Options</div>
                <div id="tray-option-settings" class="settings-card">
					<div class="setting-row">
						<div class="setting-description">Show app icon in system tray</div>
						<div class="setting-control"></div>
					</div>
				</div>
            </div>
		`;
	}

	trayOptionTemplate(trayOption) {
		if (trayOption) {
			return `
				<div class="action green">
					<span>On</span>
				</div>
			`;
		} else {
			return `
				<div class="action red">
					<span>Off</span>
				</div>
			`;
		}
	}

	init() {
		this.props.$root.innerHTML = this.template();
		this.initTrayOption();
	}

	initTrayOption() {
		this.$trayOptionSettings = document.querySelector('#tray-option-settings .setting-control');
		this.$trayOptionSettings.innerHTML = '';

		const trayOption = ConfigUtil.getConfigItem('trayIcon', true);
		const $trayOption = this.generateNodeFromTemplate(this.trayOptionTemplate(trayOption));
		this.$trayOptionSettings.appendChild($trayOption);

		$trayOption.addEventListener('click', () => {
			const newValue = !ConfigUtil.getConfigItem('trayIcon');
			ConfigUtil.setConfigItem('trayIcon', newValue);
			ipcRenderer.send('forward', 'toggletray');
			this.initTrayOption();
		});
	}

	handleServerInfoChange() {
		ipcRenderer.send('reload-main');
	}
}

module.exports = GeneralSection;

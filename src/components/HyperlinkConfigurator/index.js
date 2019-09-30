import React, { Component } from 'react';

const defaultOptions = {
	home: {
		type: 'link',
		value: '',
	},
	entertainment: {
		type: 'link',
		value: 'https://www.bbc.co.uk/news/entertainment_and_arts',
	},
	sports: {
		type: 'link',
		value: 'https://www.bbc.co.uk/sport',
	},
	travel: {
		type: 'link',
		value: 'https://www.google.com/travel',
	},
	shopping: {
		type: 'link',
		value: 'https://amazon.co.uk/',
	},
	games: {
		type: 'link',
		value: 'https://www.coolmathgames.com/',
	},
	finance: {
		type: 'link',
		value: 'https://www.bbc.co.uk/news/business',
	},
	email: {
		type: 'link',
		value: 'mailto:',
	},
	buddies: {
		type: 'link',
		value: 'https://discordapp.com/invite/wHgdmf4',
	},
	calendar: {
		type: 'link',
		value: 'https://calendar.google.com/',
	},
	addons: {
		type: 'link',
		value: 'https://www.opendesktop.org/',
	},
	help: {
		type: 'link',
		value: 'https://github.com/7coil/bonzibuddy'
	}
}

const availableButtons = Object.keys(defaultOptions)

const setupDefaults = () => {
	if (typeof window === 'undefined') return;

	const data = localStorage.getItem('hyperlinks');

	if (!data) {
		localStorage.setItem('hyperlinks', JSON.stringify(defaultOptions))
	} else {
		localStorage.setItem('hyperlinks', JSON.stringify(Object.assign(
			{},
			defaultOptions,
			JSON.parse(data)
		)))
	}

	return;
}

class HyperlinkConfigurator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		}
		this.form = React.createRef();
		this.setDefaults = this.setDefaults.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		setupDefaults();
		this.setState({
			data: JSON.parse(localStorage.getItem('hyperlinks'))
		})
	}
	setDefaults() {
		localStorage.setItem('hyperlinks', JSON.stringify(defaultOptions));
		this.form.current.reset();
	}
	handleChange(e) {
		const data = JSON.parse(localStorage.getItem('hyperlinks'));
		data[e.target.dataset.option][e.target.dataset.key] = e.target.value
		this.setState({
			data
		})
		localStorage.setItem('hyperlinks', JSON.stringify(data));
	}
	render() {
		const data = this.state.data
		return (
			<div>
				<h2>Hyperlinks</h2>
				<p>BonziBuddy needs to be refreshed or restarted for changes to apply. Run `CTRL+R` on windows to reload.</p>
				<h3>Bonzi Recommended Defaults</h3>
				<p>To reset all links to default, click here:</p>
				<button onClick={this.setDefaults}>Reset</button>
				<h3>Link Configurator</h3>
				<form ref={this.form}>
					{
						availableButtons
							.filter(option => data[option])
							.map(option => (
								<div key={option}>
									<span style={{display: 'inline-block', width: '130px'}}>{option}</span>
									{/* <select defaultValue={data[option].type}>
										<option value="link">Link</option>
										<option value="command">Command</option>
									</select> */}
									<input defaultValue={data[option].value} onChange={this.handleChange} data-option={option} data-key="value"></input>
								</div>
							))
					}
				</form>
			</div>
		)
	}
}

export default HyperlinkConfigurator;
export {
	availableButtons,
	setupDefaults
}

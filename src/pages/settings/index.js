import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import packageJson from '../../../package.json';

import styles from './index.module.scss';
import microsoftAgent from './img/agent.png';
import CombineStyles from '../../helpers/CombineStyles.js';
import HyperlinkConfigurator from '../../components/HyperlinkConfigurator/index.js';

class SettingsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'salutation'
		}
		this.setMenu = this.setMenu.bind(this);
	}
	setMenu(menu) {
		return () => this.setState({
			menu
		})
	}
	render() {
		return <div className={styles.grid}>
			<Helmet>
				<title>Bonzi's Options and Settings - {packageJson.version}</title>
			</Helmet>
			<div className={styles.header}>
				<h1>Settings Page</h1>
				<p>
					<i>BonziBuddy {packageJson.version}</i>
				</p>
				<hr />
			</div>
			<div className={styles.navigation}>
				<p className={CombineStyles(styles.navigationButton, this.state.menu === 'salutation' && styles.navigationSelected)} onClick={this.setMenu('salutation')}>Salutation</p>
				<p className={CombineStyles(styles.navigationButton, this.state.menu === 'hyperlinks' && styles.navigationSelected)} onClick={this.setMenu('hyperlinks')}>Hyperlinks</p>
				<p className={CombineStyles(styles.navigationButton, this.state.menu === 'copyright' && styles.navigationSelected)} onClick={this.setMenu('copyright')}>Copyright</p>
			</div>
			{
				this.state.menu === 'salutation' &&
				<div className={styles.content}>
					<p>Enter your name or a name that you would like to be called and press OK.</p>
					<input></input>
				</div>
			}
			{
				this.state.menu === 'hyperlinks' &&
				<div className={styles.content}>
					<HyperlinkConfigurator />
				</div>
			}
			{
				this.state.menu === 'copyright' &&
				<div className={styles.content}>
					<h2>Copyright</h2>
					<h3>BonziBuddy</h3>
					<p>
						Copyright (c) 1995-2000 BONZI.COM Software
					</p>
					<p>
						BonziBUDDY and BONZI are trademarks of BONZI.COM Software.
						All rights and liabilities with respect to BonziBUDDY belong solely to BONZI.COM Software.
						BonziBUDDY uses Microsoft Agent Technology.
					</p>
					<h3>pi0/Clippy.JS</h3>
					<p>
						Copyright (c) 2012 Fireplace, Inc<br />
						Copyright (c) 2017 Pooya Parsa
					</p>
					<p>
						Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
						to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
						and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
					</p>
					<p>
						The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
					</p>
					<p>
						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
						FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
						WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
					</p>
					<p>
						THE ABOVE LICENSE IS FOR THE CODE (JAVASCRIPT AND CSS) IN CLIPPY.JS ONLY.
						All Microsoft agents, including agent names, the Clippy brand and all resources are the property of Microsoft and their respective owners.
					</p>
					<h3>Electron</h3>
					<p>
						Copyright (c) 2013-2019 GitHub Inc.
					</p>
					<p>
						Permission is hereby granted, free of charge, to any person obtaining
						a copy of this software and associated documentation files (the
						"Software"), to deal in the Software without restriction, including
						without limitation the rights to use, copy, modify, merge, publish,
						distribute, sublicense, and/or sell copies of the Software, and to
						permit persons to whom the Software is furnished to do so, subject to
						the following conditions:
					</p>
					<p>
						The above copyright notice and this permission notice shall be
						included in all copies or substantial portions of the Software.
					</p>
					<p>
						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
						EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
						MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
						NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
						LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
						OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
						WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
					</p>
					<h3>Microsoft Agent</h3>
					<img alt="The Microsoft Agent Logo" src={microsoftAgent} className={styles.microsoftAgent} />
					<p>
						Copyright (c) 1996-1998 Microsoft Corp.
					</p>
					<p>
						Warning: This computer program is protected by copyright law and international treaties.
						Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties,
						and will be prosecuted to the maximum extent possible under the law.
					</p>
				</div>
			}
		</div>
	}
}

export default SettingsPage;

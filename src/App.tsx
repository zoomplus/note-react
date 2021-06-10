//modules
import React from 'react';
import { Layout } from 'antd';

//custom components
import ListItem from '@frontend/components/ListItem';
import Workspace from '@frontend/components/Workspace';
import SearchBox from '@frontend/components/SearchBox';
import Sidebar from '@frontend/components/Sidebar';

//ctx
import { Provider } from './context/ctx';

//style
import 'antd/dist/antd.css';
import './App.css';

function App() {
	const { Content } = Layout;

	return (
		<div className="App">
			<Layout>
				<Provider>
					<Sidebar className="customSidebar">
						<ListItem className="listItem" />
					</Sidebar>
					<Content style={{ padding: '50px' }}>
						<SearchBox className="searchBox" />
						<Workspace className="workspace" />
					</Content>
				</Provider>
			</Layout>
		</div>
	);
}

export default App;

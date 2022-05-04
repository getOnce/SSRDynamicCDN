import { lazy } from 'react';

import './App.css';
const Bar = lazy(() => import('./lazyload/Bar'));
const Logo = lazy(() => import('./lazyload/Logo'));
function App() {
    return (
        <div className="App">
            <div className="testImgBg"></div>
            <Logo />
            <Bar />
        </div>
    );
}

export default App;

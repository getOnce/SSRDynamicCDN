import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/server';
import Html from './HTML';
import App from './App';
interface Params {
    title: string;
    jsEntry: string;
    cssEntry: string;
    staticUrl: string;
    options: ReactDOM.RenderToPipeableStreamOptions;
}
const Render = function ({
    options,
    title,
    staticUrl,
    cssEntry,
    jsEntry,
}: Params) {
    __webpack_public_path__ = `${staticUrl}/`;
    return ReactDOM.renderToPipeableStream(
        <React.StrictMode>
            <Html title={title} cssEntry={cssEntry}>
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </Html>
        </React.StrictMode>,
        {
            ...(options || {}),
        },
    );
};
export default Render;

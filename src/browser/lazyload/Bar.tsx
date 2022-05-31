import './bar.css';
import test from '../large.png';
export default function Bar() {
    return (
        <div className="bar">
            <div>This is a lazyload bar ...</div>
            <img src={test} />
        </div>
    );
}

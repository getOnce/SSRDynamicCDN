import './bar.css';
import test from '../test.jpg';
export default function Bar() {
    return (
        <div className="bar">
            This is bar ...
            <img src={test} />
        </div>
    );
}

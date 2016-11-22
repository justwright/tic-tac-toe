import React from 'react';
import '../styles/Square.css';

// class Square extends Component {
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }
function Square(props) {
    return (
        <button className='square' onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

export default Square;

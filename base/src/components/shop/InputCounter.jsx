import styles from './Shop.module.css';
import PropTypes from 'prop-types';

function InputCounter({value, setValue}) {
    // function to increment the value of the counter
    const increment = () => {
        setValue(value + 1);
    };

    // Function to decrement the value of the counter (cant be lower than 0)
    const decrement = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    };

    return (
        <div className={styles.counter_container}>
            <button className={styles.counterButton} onClick={decrement}>
                -
            </button>
            <span className={styles.counter_value}>{value}</span>
            <button className={styles.counterButton} onClick={increment}>
                +
            </button>
        </div>
    );
}

InputCounter.PropTypes = {
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func,
}

export default InputCounter;
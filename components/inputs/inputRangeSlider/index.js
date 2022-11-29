import Slider from '@mui/material/Slider';
import { useState } from 'react';
import styles from './inputrangeslider.module.css'

function valuetext(value) {
  return `${value}°C`;
}

export default function InputRangeSlider(props) {
  const { range, titulo } = props
  
  const [value, setValue] = useState([1980, 2022]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <span className={styles.titulo}>{titulo}</span>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <div className={styles.containerValues}>
        <span className={styles.value}>De:</span>
        <span className={styles.value}>Até:</span>
      </div>
    </div>
  );
}
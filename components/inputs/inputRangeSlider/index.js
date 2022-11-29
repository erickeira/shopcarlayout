import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { formatadorValor } from '../../../utils';
import styles from './inputrangeslider.module.css'


export default function InputRangeSlider(props) {
  const { range, titulo, callbackchange, min, max, tipo} = props
  
  const [value, setValue] = useState([min || 1980, max || 2022]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(callbackchange)callbackchange({min: value[0], max: value[1]})
  };

  const labelFormat = (valor) => {
    if(tipo == 'moeda') return formatadorValor(valor)
    if(tipo == 'km') return (valor.toString() + ' km')
    return valor
  }

  return (
    <div className={styles.container}>
      <span className={styles.titulo}>{titulo}</span>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        min={min || 1980}
        max={max || 2022}
        onChange={handleChange}
        sx={{
          color: '#800'
        }}
        // color={`#800`}
        disableSwap
      />
      <div className={styles.containerValues}>
        <span className={styles.value}>De: {labelFormat(value[0])}</span>
        <span className={styles.value}>Até: {labelFormat(value[1])}</span>
      </div>
    </div>
  );
}
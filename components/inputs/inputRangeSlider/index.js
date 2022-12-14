import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { formatadorValor } from '../../../utils';
import styles from './inputrangeslider.module.css'


export default function InputRangeSlider(props) {
  const { range, titulo, callbackchange, min, max, tipo, selecionado, step} = props
  
  const [value, setValue] = useState(selecionado|| [0,1]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(callbackchange)callbackchange({min: value[0], max: value[1]})
  };

  const labelFormat = (valor) => {
    if(tipo == 'moeda') return formatadorValor(valor)
    if(tipo == 'km') return (valor.toLocaleString('pt-BR') + ' km')
    return valor
  }

  return (
    <div className={styles.container}>
      <span className={styles.titulo}>{titulo}</span>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        min={min || 0}
        max={max || 1000}
        onChange={handleChange}
        step={step}
        sx={{
          color: '#800'
        }}
        // color={`#800`}
        disableSwap
      />
      <div className={styles.containerValues}>
        <span className={styles.value}>{labelFormat(value[0])}</span>
        <span className={styles.value}>{labelFormat(value[1])}</span>
      </div>
    </div>
  );
}
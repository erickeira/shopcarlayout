import Select from 'react-select'
import	styles from './inputselect.module.css'

export default function InputSelect(props){
    const { options, titulo } = props
    return(
        <div  className={styles.container}>
            <span className={styles.titulo}>{titulo}</span>
            <Select 
                options={[{value: 'Selecione', label: 'Selecione'}, ...options]}
            />
        </div>
    )
}
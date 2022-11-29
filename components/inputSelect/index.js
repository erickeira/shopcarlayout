import Select from 'react-select'
import	styles from './inputselect.module.css'

export default function InputSelect(props){
    const { options, titulo, callbackchange, selecionado} = props
    return(
        <div  className={styles.container}>
            <div className={styles.containerTitulo}>
                <span className={styles.titulo}>{titulo}</span>
            </div>
            <Select 
                options={options}
                onChange={(value) => callbackchange(value)}
                styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                    //   borderColor: state.isFocused ? 'grey' : 'red',
                        width: 200
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        // width: 200
                    })
                  }}
                value={selecionado}
            />
        </div>
    )
}
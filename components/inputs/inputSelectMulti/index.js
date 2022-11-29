import Select from 'react-select'
import	styles from './InputSelectMulti.module.css'

export default function InputSelectMulti(props){
    const { options, titulo, callbackchange, selecionado} = props
    return(
        <div  className={styles.container}>
            <div className={styles.containerTitulo}>
                <span className={styles.titulo}>{titulo}</span>
            </div>
            <Select 
                options={options}
                onChange={(value) => callbackchange(value)}
                isMulti={true}
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
                value={options.find(item => item.value === selecionado)}
            />
        </div>
    )
}
import styles from './inputselect.module.css'
import { MdKeyboardArrowDown } from "react-icons/md";


export default function InputSelect(props) {
    const { titulo, selecionado } = props
  return (
    <>
      <div className={styles.containerTitulo}>
      <span className={styles.titulo}>{titulo || ''}</span>
      </div>
      <div className={styles.container}>
        <select className={styles.select}>
          <option className={styles.option}>Selecione</option>
        </select>
      </div>
    </>
  )
}
import styles from './botaobusca.module.css'
import { MdKeyboardArrowDown } from "react-icons/md";


export default function BotaoBusca(props) {
    const { titulo, selecionado } = props
  return (
    <div className={styles.container}>
        <span className={styles.titulo}>{titulo || ''}</span>
    </div>
  )
}
import styles from './menulateral.module.css'

export default function MenuLateral({children}){
    return(
        <div className={styles.container}> 
            {children}
        </div>
    )
}
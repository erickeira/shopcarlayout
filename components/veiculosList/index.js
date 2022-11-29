import CardVeiculo from '../cards/cardVeiculo';
import styles from './veiculoslist.module.css';

export default function VeiculosList(props) {
    const { veiculos, pagina, totalPaginas, totalResultados, callbackmudarpagina, grade} = props
    
    return(
      <div className={styles.container}>
        <div className={styles.containerTotal}>
          <span>{totalResultados} veículos em destaque</span>
        </div>
        <div className={grade ? styles.containerGrade : styles.containerList}>
            {
              veiculos.map((veiculo , index) => {
                return(
                  <CardVeiculo
                    data={veiculo}
                    key={index}
                    grade={grade}
                  />
                )
              })
            }
        </div>
      </div>

    )
}

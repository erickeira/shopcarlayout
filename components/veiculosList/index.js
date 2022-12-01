import CardVeiculo from '../cards/cardVeiculo';
import styles from './veiculoslist.module.css';
import {MdKeyboardArrowRight} from 'react-icons/md'
import PageSelector from '../pageSelector';

export default function VeiculosList(props) {
    const { 
      veiculos, 
      pagina, 
      totalPaginas,
      totalResultados,
      callbackmudarpagina, 
      grade, 
      vermais, 
      labelTitulo,
      labelTotal,
      labelUmResultado,
      paginacao
    } = props
    
    return(
      <div className={styles.container}>
        <div className={styles.containerTotal}>
          {
            labelTitulo ? 
            <span>{labelTitulo}</span>
            :
            ( 
              totalResultados < 2 ?
              <span>{totalResultados == 1 ? totalResultados : 'Nenhum'} {labelUmResultado || 'resultado'}</span>
              :
              <span>{totalResultados} {labelTotal || 'resultados'}</span>
            )

          }
        </div>
        <div className={grade ? styles.containerGrade : styles.containerList}>
            {
              veiculos.length ? veiculos.map((veiculo , index) => {
                return(
                  <CardVeiculo
                    data={veiculo}
                    key={index}
                    grade={grade}
                  />
                )
              })
              : null
            }
        </div>
        {
          paginacao ? 
          <PageSelector 
            pagina={pagina}
            totalPaginas={totalPaginas}
            callbackchange={(e) => callbackmudarpagina(e)}
          />
          : null
        }

        {
          vermais  ?
          <div className={styles.containerVerMais}>
            <span className={styles.vermais}>Ver mais</span>
            <MdKeyboardArrowRight color={'#800'}/>
          </div>
          : null
        }
      </div>

    )
}


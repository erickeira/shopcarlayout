import { useContext, useEffect, useState } from 'react'
import styles from './buscalateral.module.css'
import { apiUrl } from '../../utils'
import InputSelect from '../inputs/inputSelect';
import Link from 'next/link';
import { useRouter } from "next/router"
import { AuthContext } from '../../context';
import InputRangeSlider from '../inputs/inputRangeSlider';
import InputSelectMulti from '../inputs/inputSelectMulti';
import {MdAdd, MdRemove} from 'react-icons/md'
import BasicSelect from '../inputs/inputTeste';

export default function BuscaLateral(props){
    const {
        avancada,
        setAvancada,
        loadingContext,
        tipos,
        marcas,
        modelos,
        versoes,
        cores,
        combustiveis,
        cidades,
        opcionais,
        categorias,
        estadosUso,
        dadosBusca,
        mudarDadosBusca,
        clearDados,
        handleBuscar
    } = useContext(AuthContext)
    const anoAtual = new Date().getFullYear()
    
    const BotaoBusca = () => {
        if(!dadosBusca.tipo && !dadosBusca.marca){
            return(
                <div className={styles.containerBotaoBuscaDesativado}>
                    <span>Buscar</span>
                </div>
            )
        }
        return(
            // <Link href={`/busca`}>?
                <div onClick={() =>  handleBuscar()} className={styles.containerBotaoBusca}>
                    <span>Buscar</span>
                </div>
            // </Link>
        )

    }

    return(
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <span className={styles.buscaLabel}>Busca</span>
                {
                    avancada ?
                    <MdRemove onClick={() => setAvancada(!avancada)} size={20} className={styles.addRemove}/>
                    :
                    <MdAdd onClick={() => setAvancada(!avancada)} size={20} className={styles.addRemove}/>
                }

            </div>
            <InputSelect
                titulo={'Tipo'}
                options={tipos.map(tipo => {return {value: tipo.nome, label: tipo.nome}}) }
                callbackchange={(e) => clearDados(e.value)}
                selecionado={dadosBusca.tipo}
            />
            <InputSelect
                titulo={'Marca'}
                options={marcas?.map(marca => {return {value: marca.nome, label: marca.nome}}) }
                callbackchange={(e) => mudarDadosBusca({marca : e.value})}
                selecionado={dadosBusca.marca}
            />
            {
                avancada ?
                <>
                    <InputRangeSlider
                        titulo={`Ano`}
                        min={1950}
                        max={anoAtual}
                        selecionado={[dadosBusca.anode || 1950, dadosBusca.anoate || anoAtual]}
                        callbackchange={(e) => {mudarDadosBusca({anode : e.min,anoate : e.max});}}
                    />
                    <InputSelectMulti
                        titulo={'Cor'}
                        options={cores.map(cor => {return {value: cor.nome, label: cor.nome}}) }
                        callbackchange={(e) => mudarDadosBusca({cor : e.value})}
                        selecionado={dadosBusca.marca}
                    />
                    <InputRangeSlider
                        titulo={`Valor`}
                        min={0}
                        max={`300000`}
                        tipo={`moeda`}
                        selecionado={[dadosBusca.valorde || 0, dadosBusca.valorate || `300000`]}
                        callbackchange={(e) => {mudarDadosBusca({valorde : e.min,valorate : e.max});}}
                    />
                    <InputRangeSlider
                        titulo={`Quilometragem (Km)`}
                        min={0}
                        max={100000}
                        step={500}
                        tipo={`km`}
                        selecionado={[dadosBusca.kmde || 0, dadosBusca.kmate || 100000]}
                        callbackchange={(e) => {mudarDadosBusca({kmde : e.min,kmate : e.max});}}
                    />
                    <InputSelectMulti
                        titulo={'Opcionais'}
                        options={opcionais.map(opcao => {return {value: opcao.nome, label: opcao.nome}}) }
                        callbackchange={(e) => mudarDadosBusca({opcionais : e.map(item => { return item.value })})}
                        selecionado={dadosBusca.opcionais}
                    />
                </>
                : null
            }
           
            <BotaoBusca/>
        </div>
    )
}


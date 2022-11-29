import Head from 'next/head'
import Image from 'next/image'
import styles from './header.module.css'
import {MdKeyboardArrowDown} from 'react-icons/md'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../context'
export default function Header(){
    const { pageTitle } = useContext(AuthContext)
    return(
        <>
            <Head>
                <title>{pageTitle || `SHOPCAR - Sua Referência em Veículos - Carros usados e novos`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="shortcut icon" href="https://cdn.shopcar.com.br/favicon.ico"/>
            </Head>
            <header className={styles.containerHeader}>


                <nav className={styles.nav}>
                    <Link href={`/`}>
                        <div className={styles.nav__title}>
                            <Image
                                src="https://cdn-dev.shopcar.com.br/images/logo.png"
                                alt={`Logo - SHOPCAR`}
                                width={250}
                                height={69}
                            />
                        </div>
                    </Link>
                    <ul className={styles.nav__list}>
                        <li className={styles.nav__item}>
                            <div className={styles.nav__itemContainer}>
                                COMPRE SEU VEÍCULO
                                <MdKeyboardArrowDown size={25}/>
                            </div>
                        </li>
                        <li className={styles.nav__item}>
                            <div className={styles.nav__itemContainer}>
                                VENDA SEU VEÍCULO
                                <MdKeyboardArrowDown size={25}/>
                            </div>
                        </li>
                        <li className={styles.nav__item}>SERVIÇOS</li>
                        <li className={styles.nav__item}>NOTÍCIAS</li>
                        <li className={styles.nav__item}>IMÓVEIS</li>
                        <li className={styles.nav__item}>NÁUTICOS</li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
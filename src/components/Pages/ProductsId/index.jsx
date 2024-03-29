import { useState, useEffect } from 'react'

import {BASE_URL_API} from '../../../Api'
import { Link, useParams } from 'react-router-dom'
import { ContainerProduct, CardProduct, ImgProduct, PriceProduct, ButtonGoBack } from './styles'


import loadingGif from '../../../assets/loading.gif'

const ProductsId = () => {
  const [loaded, setLoaded] = useState(false)
  const [itemId, setItemId] = useState([])
  const { id } = useParams()

  const getItemId = async () => {
    setLoaded(true)
    const res = await fetch(`${BASE_URL_API}/products/${id}`)
    const response = await res.json()
    setLoaded(false)
    setItemId(response)
  }

  useEffect(() => {
    getItemId()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ContainerProduct>
    {loaded && <img src={loadingGif} alt='gif de carregamento' />}
    {!loaded && (
          <>
            <ButtonGoBack><Link style={{color: '#222', fontSize: '16px', fontWeight: '600' }} to={'/'}>Voltar</Link></ButtonGoBack>
            <CardProduct>
              <ImgProduct src={itemId.image} alt="imagem do produto" />
              <h2>{itemId.title}</h2>
              <PriceProduct>R$: ${itemId.price}</PriceProduct>
              <p>{itemId.description}</p>
              <h3>{itemId.category}</h3>
            </CardProduct>
        </>
      )}
    </ContainerProduct>
  )
}

export default ProductsId
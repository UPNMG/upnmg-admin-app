/* eslint-disable  */
import React from 'react'
import { useHistory } from 'react-router-dom'

function ProductCard({product}) {
    const history = useHistory()

    console.log('product', product)
  return (
    <div className='productCard'>
    <div className='items'>
        <div className='image'>
            <img src='/images/dev/del.png' alt='product'/>
        </div>
        <div className='product-name'>
            {product?.product_name}
        </div>
        <div className='price'>{product?.new_price}</div>
        <div className='ordered_date'>{product?.quantity > 0 ? 'Available in stock' : 'Out of stock'}</div>
        <button onClick={() => history.push('/mart/order-detailed')}>
         view detail
        </button>
    </div>
</div>
  )
}

export default ProductCard
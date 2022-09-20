import React from 'react'
import { useHistory } from 'react-router-dom'

function ProductCard({image, name, price,}) {
    const history = useHistory()
  return (
    <div className='productCard'>
    <div className='items'>
        <div className='image'>
            <img src='/images/dev/del.png' alt='product'/>
        </div>
        <div className='product-name'>
            Product name here
        </div>
        <div className='price'>$454</div>
        <div className='ordered_date'>Available in stock</div>
        <button onClick={() => history.push('/hirepurchase/order-detailed')}>
         view detail
        </button>
    </div>
</div>
  )
}

export default ProductCard
import React from 'react'
import RenderHirePurchasePage from '../RenderHirePurchasePage'
import '../css/hirepurchase.css'
import { GrProjects } from 'react-icons/gr'
import { useHistory } from 'react-router-dom'
function Orders() {
    const history = useHistory()
  return (
    <div className='Orders'>
        <RenderHirePurchasePage title={'Orders'}>
            <div className='orderContainer'>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <span><GrProjects size={'14px'} color=""/></span>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <span><GrProjects size={'14px'} color=""/></span>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <span><GrProjects size={'14px'} color=""/></span>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <span><GrProjects size={'14px'} color=""/></span>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <span><GrProjects size={'14px'} color=""/></span>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <span><GrProjects size={'14px'} color=""/></span>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
                <div className='orderCard'>
                    <div className='items'>
                        <div className='image'>
                            <img src='/images/dev/del.png' alt='product'/>
                        </div>
                        <div className='product-name'>
                            Product name here
                        </div>
                        <div className='price'>$454</div>
                        <div className='ordered_date'>Ordered on: <span>22 jan 2021</span></div>
                        <button onClick={() => history.push('/mart/order-detailed')}>
                            <spa>Icon</spa>
                            <span>Process</span>
                        </button>
                    </div>
                </div>
            </div>
        </RenderHirePurchasePage>
    </div>
  )
}

export default Orders
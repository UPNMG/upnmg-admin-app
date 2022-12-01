/* eslint-disable  */
import React, { useEffect } from 'react'
import { GrProjects } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { productActionCreators } from '../../services/Actions'
import '../css/hirepurchase.css'
import RenderHirePurchasePage from '../RenderHirePurchasePage'
import * as moment from 'moment'
function Orders() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {GetOrders} = bindActionCreators(productActionCreators, dispatch)

    const product = useSelector(state => state.product)
    const {orders, isLoading, paginate} = product

    console.log('order', product)

    useEffect(() => {
        GetOrders(true, 1, 15, 'submitted', null)
    }, [])

  return (
    <div className='Orders'>
        <RenderHirePurchasePage title={'Orders'}>
        
        {orders?.length > 0 ? (<>
            <div className='orderContainer'>
                {orders?.map((order, idx) => {
                    console.log('order', order)
                    return (
                        <div className='orderCard' key={idx}>
                        <div className='items'>
                            <div className='image'>
                                {/* <img src='/images/dev/del.png' alt='product'/> */}
                                <img src={order?.user_id?.profile_image} alt='product'/>
                            </div>
                            <div className='product-name'>
                            {order?.user_id?.name}
                            </div>
                            <div className='price'>Aff: {order?.affordability}</div>
                            <div className='ordered_date'>Ordered on: <span>{moment(order?.created_at).format("MMM Do YY")}</span></div>
                            <button onClick={() => history.push({pathname: '/mart/order-detailed', state: order})}>
                                {/* <span><GrProjects size={'14px'} color=""/></span> */}
                                <span>Process</span>
                            </button>
                        </div>
                    </div>
                    )
                })}
                </div>

        </>) : (<>Not found</>)}
       

                {/* <div className='orderCard'>
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

            </div> */}
        </RenderHirePurchasePage>
    </div>
  )
}

export default Orders
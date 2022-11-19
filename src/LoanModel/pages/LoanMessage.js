/* eslint-disable  */
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import axiosInstance from '../../services/Axios/axios'
// import axiosInstance from '../../../service/axios/axios'
import './LoanMessage.css'
function LoanMessage({mesgs,own, sender_id, date, auth}) {
    const [otherUser, setOtherUser] = useState(null)
    // console.log('mesgs', mesgs)
    useEffect(() => {
       
        const getUser = async () => {
            try {
              const res =  await axiosInstance.get(`/users/user?user_id=${sender_id}`)
              setOtherUser(res.data)
            } catch (error) {
                console.log('error', error)
            }
        }
        getUser()

    },[
        sender_id
    ])
    // console.log('otherUser', otherUser)
  return (
    <div className={`message ${own ? 'own' : ''}`}>
        <div className='messageTop'>
            {own ? (
                <img className='messageImage' src={auth?.user?.profile_image ? auth?.user?.profile_image: '/images/dev/user.png'} alt="officer" />
                ): (
                <img className='messageImage' src={otherUser?.profile_image ? otherUser?.profile_image : '/images/dev/user.png'} alt="officer" />

            )}
        <div className='messageText'>{mesgs}</div>
            
        </div>
        <div className='messageBottom'>{format(date)} </div>
    </div>
  )
}

export default LoanMessage
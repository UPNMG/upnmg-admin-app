/* eslint-disable  */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GetMessages } from '../../services/Actions/MessagesAction'
import axiosInstance from '../../services/Axios/axios'


function Conversation({conversation}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector(state => state?.auth)
    const messageRed = useSelector(state => state?.message)
    const {message, isLoading, response} = messageRed

    const [user, setUser] = useState(null)

    console.log('message', message)
    console.log('conversation', conversation)
    

    useEffect(() => {
        
        const getUser = async () => {
            try {
                const otherUser = await conversation?.members?.find(user => user !== auth?.user?._id)
              const res =  await axiosInstance.get(`/users/user?user_id=${otherUser}`)
              setUser(res?.data)
            } catch (error) {
                console.log('error', error)
            }
        }
        getUser()

    },[auth?.user, conversation])
    console.log('user', user)
    console.log('conversation', conversation)

    useEffect(() => {
        dispatch(GetMessages(conversation?._id))
    },[conversation])

  return (
    <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex item-center">
                <span className='unread'></span>
                                  <div className="flex-shrink-0 w-10 h-10">
                                    {user?.profile_image ? (
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={user?.profile_image}
                                        alt=""
                                      />
                                    ) : (
                                      <>
                                        {user?.name?.split(" ")[0] ===
                                        "Mr." ? (
                                          <img
                                            className="w-full h-full rounded-full"
                                            src="/images/dev/avarta2.jpeg"
                                            alt=""
                                          />
                                        ) : (
                                          <img
                                            className="w-full h-full rounded-full"
                                            src="/images/dev/woman-avarta.jpeg"
                                            alt=""
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {user?.name}
                                    </p>
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {user?.staff_id}
                                    </p>
                                  </div>
                                </div>
                </th>
                {/* <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <span className='unread'></span>  {user?.name} <div>{user?.staff_id}</div>
                </th> */}
                <td className="py-4 px-6">
                    {/* {message?.chat[0]?.message} */}
                </td>
                {/* <td className="py-4 px-6">
                    Laptop
                </td> */}
                <td className="py-4 px-6">
                    {/* {format(message?.chat[0]?.data)} */}
                </td>
                <td className="py-4 px-6">
                    <div onClick={() => history.push({pathname: '/loans/messages-detailed', state: {message: message, conversation: conversation}})} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</div>
                </td>
            </tr>
       
        </tbody>
  )
}

export default Conversation
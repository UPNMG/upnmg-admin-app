import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { messageActionCreators } from '../../services/Actions'
import RenderLoanPage from '../RenderLoanPage'
import Conversation from './Conversation'
import './Loan.css'
import './LoansMessages.css'
function LoansMessages() {
    const dispatch = useDispatch()
    const {GetConversations} = bindActionCreators(messageActionCreators, dispatch)
    const message = useSelector(state => state?.message)
    const {isLoading, conversations, response} = message


    console.log('conversations', conversations)

    useEffect(() => {
        GetConversations()
    }, [])



  return (
    <RenderLoanPage>
      <div className='LoansMessages'>
      <div>List of messages</div>


<div className="overflow-x-auto relative shadow-md sm:rounded-lg pt-3">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Member
                </th>
                <th scope="col" className="py-3 px-6">
                Message
                </th>
                {/* <th scope="col" className="py-3 px-6">
                    Message
                </th> */}
                <th scope="col" className="py-3 px-6">
                    date
                </th>
                <th scope="col" className="py-3 px-6">
                    Chat
                </th>
            </tr>
        </thead>
       


    {conversations?.map((conversation, index) => {
        console.log('conversation', conversation)
         return <Conversation key={index} conversation={conversation}/>  
    })}


    </table>
</div>

      </div>
  
    </RenderLoanPage>
  )
}

export default LoansMessages
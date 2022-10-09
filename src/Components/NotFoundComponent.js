import React from 'react'

function NotFoundComponent({title}) {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        // height: '100vh',
        textAlign: 'center'
       
    }}>
       <div style={{width: '', margin: '0 auto'}}>
       <img src={`/not-found.png`} style={{width: '240px'}}/>
        <p style={{fontSize: '1.4rem', textAlign: 'center', color: 'var(--primaryColor)'}}>{title}</p>
       </div>
    </div>
  )
}

export default NotFoundComponent
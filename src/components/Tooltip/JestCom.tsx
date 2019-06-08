import React,{Fragment,SFC} from 'react'

interface Iprop{
  handleOne:()=>void
}

const JestCom: SFC<Iprop>=(props)=>{
  return (
    <div>
      {/* <div> */}
        I am jest cmp
      {/* </div> */}
    </div>
  )
}
export default JestCom
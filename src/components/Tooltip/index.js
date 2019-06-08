import React, { Fragment, SFC } from 'react'
import style from './jestCom'

// interface Iprop {
//   handleOne: () => void
// }

const JestCom /* : SFC<Iprop> */ = (props) => (
	<Fragment>
		<div className="className1">I am jest cmp</div>
		<div className={style.aa}> i am aa</div>
	</Fragment>
)
export default JestCom

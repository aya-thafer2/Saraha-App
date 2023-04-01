import React from 'react'
import style from './Loader.module.css'

function Loader() {
  return (
    <div className={style["loaderContainer"]}>
      <div className={style["spinner"]}>
      <div className={style["cube1"]} />
      <div className={style["cube2"]} />
    </div>
    </div>
  )
}

export default Loader
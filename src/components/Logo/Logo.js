import React from 'react'
import bugerLogo from '../../asset/images/original.png'
import classes from './Logo.module.css'

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={bugerLogo} alt="My burger" />
  </div>
)

export default Logo

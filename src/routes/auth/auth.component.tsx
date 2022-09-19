import React from 'react'
import { AuthPageContainer } from './auth.styles'
import SignIn from '../../components/sign-in/sign-in.component'

const Auth:React.FC = () => {
  return (
    <AuthPageContainer>
      <SignIn />
    </AuthPageContainer>
  )
}

export default Auth
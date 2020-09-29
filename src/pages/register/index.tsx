import React from 'react';

import { Link } from "react-router-dom";

import { useForm } from 'react-hook-form'
import RegisterIcon from '../../media/icons/register-icon.svg'
import * as Styled from './styles'





const Register: React.FC = () => {
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = (data: object): void => {
    console.log(data)
  }
  return (
    <>
      <Styled.Container>
        {/* <Link to="/">
          <h3 style={{ marginLeft: "30px" }}> Voltar </h3>
        </Link> */}
        <Styled.BoxContent>

          <Styled.LogoContainer>
            <img src={RegisterIcon} />
          </Styled.LogoContainer>

          <Styled.FormContainer>
            <h1>Cadastrar-se</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Styled.FieldWrapper>
                <label>E-mail</label>
                <input
                  name="email"
                  placeholder="Digite seu e-mail"
                  ref={register({
                    required: "E-mail é obrigatório"
                  })}
                />

                {errors.email && <p>{errors.email.message}</p>}
              </Styled.FieldWrapper>
              <Styled.FieldWrapper>
                <label>Senha</label>
                <input
                  name="password"
                  placeholder="Digite sua senha"
                  ref={register({
                    required: 'A senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'A senha precisa ter no minímo 6 caracteres'
                    },
                    pattern: {
                      value: /[+#?!@$%^&*-]{1,}/,
                      message: 'A senha precisa ter ao menos um caracter especial'
                    }
                  })}
                />

                {errors.password && errors.password.message}
              </Styled.FieldWrapper>

              <div>
                <Styled.Button type="submit">Cadastrar!</Styled.Button>
                <Styled.LinkWrapper>
                  <Link to="/login">
                    <h3> Já possui conta? Entrar! </h3>
                  </Link>
                </Styled.LinkWrapper>
              </div>
            </form>
          </Styled.FormContainer>
        </Styled.BoxContent>
      </Styled.Container>
    </>
  );
}

export default Register;
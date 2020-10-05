import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import FormContainer from '../../components/form-container';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/actions/session';

import * as Styled from './styles';
import axios from 'axios';

const Register: React.FC = () => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (data: object): void => {
    console.log(data);
    axios
      .post(' https://capstone-q2.herokuapp.com/register', data)
      .then((res) => {
        setErrorMessage('');
        dispatch(login(res.data.accessToken));
        localStorage.setItem('token', res.data.accessToken);
        history.push('/');
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 400) {
          setErrorMessage('Email já cadastrado');
        }
      });
  };

  return (
    <>
      <FormContainer
        props={
          <>
            <h1>Cadastrar-se</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Styled.FieldWrapper>
                <label>E-mail</label>
                <input
                  onChange={() => {
                    setErrorMessage('');
                  }}
                  name="email"
                  placeholder="Digite seu e-mail"
                  ref={register({
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Isso não se parece com um e-mail!',
                    },
                  })}
                />

                {errors.email && <Styled.Error>{errors.email.message}</Styled.Error>}
              </Styled.FieldWrapper>
              <Styled.FieldWrapper>
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Digite sua senha"
                  ref={register({
                    required: 'A senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'A senha precisa ter no minímo 6 caracteres',
                    },
                    pattern: {
                      value: /[+#?!@$%^&*-]{1,}/,
                      message: 'A senha precisa ter ao menos um caracter especial',
                    },
                  })}
                />

                {errors.password && <Styled.Error>{errors.password.message}</Styled.Error>}
              </Styled.FieldWrapper>
              {errorMessage && <Styled.Error>{errorMessage}</Styled.Error>}

              <div>
                <Styled.Button type="submit">Cadastrar!</Styled.Button>
                <Styled.LinkWrapper>
                  <a
                    onClick={() => {
                      history.push('/login');
                    }}>
                    <h3> Já possui conta? Entrar! </h3>
                  </a>
                </Styled.LinkWrapper>
              </div>
            </form>
          </>
        }
      />
    </>
  );
};

export default Register;

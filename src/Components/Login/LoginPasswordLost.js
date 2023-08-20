import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const {data,load,error,request} = useFetch();

  function handleSubmit(event) {
    event.preventDefault();
    if(login.validate()) {
      const {url,options} = PASSWORD_LOST({login:login.value,url:'http://localhost:3000/login/perdeu'});
      request(url,options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha?"/>
      <h1 className="title">Perdeu a senha?</h1>
        {data ? 
            <p style={{color: '#4c1'}}>{data}</p>
          :
          <React.Fragment>
          <form onSubmit={handleSubmit}>
            <Input label="Email / Usuário" type="text" name="email" {...login} />
            {load ?
              <Button disabled>Enviando...</Button>
              :
              <Button>Enviar</Button>}
          </form>
          <Error error={error} />
        </React.Fragment>
        }
    </section>
  )
}

export default LoginPasswordLost;
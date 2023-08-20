import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const [login,setLogin] = React.useState('');
  const [key,setKey] = React.useState('');
  const password = useForm();
  const {error,load,request} = useFetch();
  const navigate = useNavigate();

  React.useState(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if(key) setKey(key);
    if(login) setLogin(login);
  },[]);

  async function handleSubmit(event) {
    event.preventDefault();
    const {url,options} = PASSWORD_RESET({
      login,
      key,
      password: password.value(),
    });

    const {response} = await request(url,options);
    if(response.ok) navigate('/login');
  }

  return (
    <section className="animeLeft">
      <Head title="Resete a senha"/>
      <h1 className='title'>Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha" type="password" name="password"/>
        {load ?
            <Button disabled>Resetando...</Button>
            :
            <Button>Resetar</Button>
        }
      </form>
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordReset;
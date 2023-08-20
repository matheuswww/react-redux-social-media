import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import stylesButton from '../Forms/Button.module.css';
import Head from '../Helper/Head';
import { useSelector,useDispatch } from 'react-redux';
import { userLogin } from '../../store/user';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();
  
  const { token,user } = useSelector(state => state);
  const loading = token.loading || user.loading;
  const error = token.error || user.error;

  async function handleSubmit(event) {
    event.preventDefault();

    if(username.validate() && password.validate()) {
      dispatch(userLogin({username:username.value,password:password.value}));
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Login"/>
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username}/>
        <Input label="senha" type="password" name="password" {...password}/>
        {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
        {<Error error={error && 'Dados incorretos.'} />}
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">Perdeu a senha?</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      </div>
      <Link className={stylesButton.Button} to="/login/criar">Cadastro</Link>
    </section>
  )
}

export default LoginForm;
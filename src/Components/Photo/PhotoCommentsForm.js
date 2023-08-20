import React from 'react';
import { COMMENT_POST } from '../../api';
import {ReactComponent as Enviar} from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({id,setComments,single}) => {
  const {request,error} = useFetch();
  const [comment,setComment] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const {url,options} = COMMENT_POST(id,{comment});
    const {response,json} = await request(url,options);
    setComment('');
    response.ok && setComments((comments) => [...comments,json]);
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea 
      className={styles.textarea}
      placeholder="Comente..."
      id="comment"
       name="comment" 
       value={comment} 
       onChange={({target}) => {setComment(target.value)}}>
      </textarea>
      <Error error={error}/>
      <button className={styles.button}><Enviar /></button>
    </form>
  )
}

export default PhotoCommentsForm;
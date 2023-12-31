import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoDelete.module.css';
const PhotoDelete = ({id}) => {
    const {load,request} = useFetch();

    async function handleClick(event) {
        const confirm = window.confirm('Tem certeza que deseja deletar?');
        if(confirm) {
            const {url, options} = PHOTO_DELETE(id);
            const {response} = await request(url,options);
            if(response.ok) window.location.reload();
        }
    }

  return (
    <div>
        {load ?
            <button className={styles.delete} onClick={handleClick} disabled>Deletando...</button>   
            :
            <button className={styles.delete} onClick={handleClick}>Deletar</button>
        }
    </div>
  )
}

export default PhotoDelete;
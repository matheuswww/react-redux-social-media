import React from 'react';
import Error from '../Helper/Error';
import Load from '../Helper/Load';
import styles from './FeedModal.module.css';
import PhotoContent from '../Photo/PhotoContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/ui';

const FeedModal = () => {
  const { modal } = useSelector(state => state.ui);
  const { loading,error,data } = useSelector(state => state.photo);
  const dispatch = useDispatch();


  function handleOutsideClick(event) {
    if(event.target === event.currentTarget) dispatch(closeModal());
  }

  React.useEffect(() => {
    dispatch(closeModal());
  },[dispatch]);

  if(!modal) return null;

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Load />}
      {data && <PhotoContent />}
    </div>
  )
}

export default FeedModal;
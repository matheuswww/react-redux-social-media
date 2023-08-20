import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPhoto } from '../../store/photo';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Load from '../Helper/Load';
import PhotoContent from './PhotoContent';

const Photo = () => {
  const {id} = useParams();
  const { loading,error,data } = useSelector(state => state.photo);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(fetchPhoto(id));
  },[dispatch,id]);

  if(error) return <Error error={error}/>
  if(loading) return <Load />
  if(data)
  return (
    <section className="container mainContainer">
      <Head title={data.photo.title} />
      <PhotoContent single={true} />
    </section>
  )
  else return null;
}

export default Photo;
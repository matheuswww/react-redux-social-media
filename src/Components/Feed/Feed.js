import React from 'react';
import FeedModal from '../Feed/FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos, resetFeedState } from '../../store/feed';
import Load from '../Helper/Load';
import Error from '../Helper/Error';

const Feed = ({ user }) => {
  const { infinite,loading,list,error } = useSelector(state => state.feed);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetFeedState({user,total:6}))
    dispatch(loadNewPhotos({user,total:6}));
  },[dispatch,user])

  React.useEffect(() => {
      let wait = false;
      function infiniteScroll() {
        if (infinite){
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if(scroll > height * .75 && !wait) {
          dispatch(loadNewPhotos({user,total:6}));
          wait = true;
          setTimeout(() => {
            wait = false;
        }, 500);
      }
    }
  }

    window.addEventListener('wheel',infiniteScroll);
    window.addEventListener('scroll',infiniteScroll);
    return () => {
      window.removeEventListener('wheel',infiniteScroll);
      window.removeEventListener('scroll',infiniteScroll);
    }
  },[dispatch,user,infinite])

  return (
    <div>
      <FeedModal />
      {list && list.length > 0 && <FeedPhotos />}
      {loading && <Load />}
      {error && <Error />}
    </div>
  )
};

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired,PropTypes.number.isRequired]),
}

export default Feed;
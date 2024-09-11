import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import GptSearch from './GptSearch';
import { useDispatch, useSelector } from 'react-redux';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import VideoPopover from './VideoPopover';
import { resetTrailerVideo, toggleModal } from '../utils/modalSlice';
import Footer from './Footer';

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGptSearch);
  // const dispatch = useDispatch();
  // const modalState = useSelector((store) => store.modal.isModalOpen);
  // const closeModal = () => {
  //   dispatch(toggleModal());
  // };

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow'>
        {showGPTSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </div>
      <Footer />
      <ModalWrapper />
    </div>
  );
};

const ModalWrapper = () => {
  const modalState = useSelector((store) => store.modal.isModalOpen);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleModal());
    dispatch(resetTrailerVideo());
  };

  return modalState ? (
    <VideoPopover isOpen={modalState} onClose={closeModal} />
  ) : null;
};

export default Browse;

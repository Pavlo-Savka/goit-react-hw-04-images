import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from './Modal/Modal';
import css from "./App.module.css";
const API_key = "34328101-794589af804430f41127b6154";

function App() {
  const [request, setRequest] = useState("");
  const [pictures, setPictures] = useState([]);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  const toggleModal = (largeImageURL) => {
    setShowModal(showModal => !showModal);
    setLargeImageURL(largeImageURL);
  };

  const api = (request, page) => {
    fetch(`https://pixabay.com/api/?q=${request}&page=${page}&key=${API_key}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error("There is no Pictures for your request!"));
      })
      .then(pictures => {
        setPictures(prevPictures => [...prevPictures, ...pictures.hits]);
        setStatus('resolved');
        setLoadMore(page < Math.ceil(pictures.totalHits / 12));
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }

   useEffect(() => {
     if (request === "") {
       setStatus('idle');
       return 
    }
    api(request, page);
     setStatus('pending');
   }, [request, page]);

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const formSubmitHandler = searchQuery => {
    if (searchQuery === request) {
      return toast.error(`You are already viewing ${request} images!`);
    }
    setRequest(searchQuery);
    setPictures([]);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <Searchbar
        onSubmit={formSubmitHandler}
     />
      {status === 'idle' && <p>Type search query!</p>}
      {status === 'pending' && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={visible}
        />
      )}
      {status === 'rejected' && toast.error("There is no images for your request!")}
      {showModal && <Modal onClose={toggleModal} selectedImage={largeImageURL} />}
      {status === 'resolved' && (
        <ImageGallery
          request={request}
          pictures={pictures}
          onOpen={toggleModal}
        />
      )}
      {loadMore && <Button onLoadMore={onLoadMore} />}
      <ToastContainer />
    </div>
  );
};

export default App;
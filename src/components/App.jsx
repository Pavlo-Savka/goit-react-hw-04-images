import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallrey from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from './Modal/Modal';
import css from "./App.module.css";
const API_key = "34328101-794589af804430f41127b6154";

class App extends Component {
  state = {
    request: "",
    pictures: [],
    visible: true,
    error: null,
    status: "idle",
    page: 1,
    showModal: false,
    largeImageURL: null,
    loadMore: false,
  };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }))
  };

  api = (request, page) => {
    fetch(`https://pixabay.com/api/?q=${request}&page=${page}&key=${API_key}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) { return response.json() }
        return Promise.reject(new Error("There is no Pictures for your request!"))
      })
      .then(pictures => this.setState( prevState => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        status: 'resolved',
        loadMore: this.state.page < Math.ceil(pictures.totalHits / 12),
      })
      ))
      .catch(error => this.setState({ error, status: 'rejected' }))
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.request !== this.state.request ||
      prevState.page !== this.state.page)
    {
      this.api(this.state.request, this.state.page);
      this.setState({ status: 'pending' })
    }
    return
  };

  onloadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }
    )
    );
  };

  formSubmitHandler = request => {
    if (this.state.request === request) {
      return toast.error(`You are already viewing ${request} images!`);
    }

    this.setState({ request, pictures: [], page: 1 })
  };
  render() {

    return (
      <div className={css.app}>
        <Searchbar
          onSubmit={this.formSubmitHandler}
        />
        {(this.state.status === 'idle') &&
          (<p>Type search query!</p>)
        }
        {(this.state.status === 'pending') &&
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={this.state.visible}
          />
        }
        {(this.state.status === 'rejected') &&
          toast.error("There is no images for your request!")} 

        {this.state.showModal &&
          <Modal
            onClose={this.toggleModal}
            selectedImage={this.state.largeImageURL}
          />}

        {(this.state.status === 'resolved') &&
          <ImageGallrey
            request={this.state.request}
            pictures={this.state.pictures}
            onOpen={this.toggleModal}
          />}
        {this.state.loadMore && <Button onLoadMore={this.onloadMore} />}
        <ToastContainer />
      </div>
    );
  };
};
export default App;
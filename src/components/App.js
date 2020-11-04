import React from 'react';
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const App = () => {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState([]);
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const promise = isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id);
        promise
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    };

    const handleCardDelete = (card) => {
        setIsLoading(true)
        api.deleteCard(card._id)
            .then(() => {
                const deleteCards = cards.filter((c) => c._id !== card._id);
                setCards(deleteCards);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const getUserAndCards = async () => {
        try {
            const [userInfo, cards] = await Promise.all([api.getUserInfo(), api.getCards()]);
            setCards(cards);
            setCurrentUser(userInfo);
        } catch (err) {
            console.log(`${err}`);
        }
    };

    React.useEffect(() => {
        getUserAndCards();
    }, [])

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };

    const handleDeletePopupOpenClick = (card) => {
        setDeletePopupOpen(true);
        setSelectedCard(card);
    };

    const handleCardClick = (card) => {
        setImagePopupOpen(true);
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeletePopupOpen(false);
        setSelectedCard(false);
        setImagePopupOpen(false);
    };

    const handleUpdateUser = (userInfo) => {
        setIsLoading(true)
        api.setUserInfo(userInfo)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            })

    };

    const handleUpdateAvatar = (inputValue) => {
        setIsLoading(true)
        api.setAvatar(inputValue)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const handleAddPlaceSubmit = (inputValue) => {
        setIsLoading(true)
        api.createCard(inputValue)
            .then((newCard) => {
                setCards([...cards, newCard]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <div className="page">
            <div className="page__cover">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header/>
                    <Login isLoading={isLoading}/>
                    <Register isLoading={isLoading}/>
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeletePopupOpenClick}
                        cards={cards}
                    />
                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>

                    <DeleteConfirmPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups}
                                        card={selectedCard} onCardDelete={handleCardDelete} isLoading={isLoading}/>

                    <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}

export default App;
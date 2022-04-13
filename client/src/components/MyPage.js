import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../store';
import MyPageList from './MyPageList';
import SignOut from './SignOut';
import PatchUser from './PatchUser';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function MyPage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newModalIsOpen, setNewIsOpen] = useState(false);
  const context = useContext(stateContext);
  const navigate = useNavigate();
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function newOpenModal() {
    setNewIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setNewIsOpen(false);
  }

  const signoutHandler = () => {
    axios
      .delete('https://www.remembertrip.tk/withdrawal', {
        headers: {
          authorization: `Bearer ${context.state.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        navigate('/');
      });
  };

  // axios
  //   .get('https://www.remembertrip.tk/mypage/trip', {
  //     headers: {
  //       Authorization: `Bearer ${context.state.accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(data => {
  //     console.log(data.data.trips);
  //     list.push(...data.data.trips);
  //   });

  return (
    <div>
      {context.state.isLogIn
        ? context.state.tripList.map(el => (
            <MyPageList
              key={el.id}
              country={el.country}
              totalCost={el.totalPrice}
              start_date={el.start_date}
              end_date={el.end_date}
            />
          ))
        : '로그인 하세요'}
      <button type="submit" onClick={context.funcs.logoutHandler}>
        로그아웃
      </button>
      <button type="button" onClick={openModal}>
        회원탈퇴
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById('root') || undefined}
      >
        <SignOut
          closeModal={closeModal}
          signoutHandler={signoutHandler}
        ></SignOut>
      </Modal>
      <button type="button" onClick={newOpenModal}>
        정보수정
      </button>
      <Modal
        isOpen={newModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById('root') || undefined}
      >
        <PatchUser></PatchUser>
      </Modal>
    </div>
  );
}

export default MyPage;

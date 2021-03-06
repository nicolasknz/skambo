import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Icon, Modal, Header } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import { requestUserInfo } from '../../redux/actions/session';
import { RootState } from '../../redux/reducers';
import OfferExchange from '../offer-exchange';
import * as Styled from '../offer-exchange/styles';
import { Loading } from './loading';
import {
  ProductCard,
  CardImg,
  CardThumb,
  ProductThumb,
  CardProduct,
  ProductShow,
  CardInfo,
  ProductInfoValue,
  ProductInfoName,
  ProductInfoDesc,
  ProductInfoIntr,
  FavButton,
  SharePoint,
} from './styles';

const Product: React.FC = () => {
  const history = useHistory();
  const [products, setProducts] = useState({
    id: '',
    name: '',
    description: '',
    usability: '',
    value: '',
    thumbnail: '',
    images: [],
    interests: [],
    owner: '',
  });

  const token = useSelector(({ session }: any) => session.token);
  const { id }: any = useParams();

  const [openModal, setOpenModal] = useState(false);
  const user = useSelector(({ session }: RootState) => session.currentUser);
  const userFavorites = useSelector(({ session }: RootState) => session.currentUser.favorites);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `https://capstone-q2.herokuapp.com/products/${id}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const product = res.data;
        setProducts(product);
        setLoading(false);
        setImage(product.thumbnail);
      })
      .catch((err) => console.log(err));
  }, []);

  const favoritesJSON: any =
    userFavorites !== undefined ? [...userFavorites, products] : [products];

  const actualUrl = window.location.href;

  const handleFavorite = () => {
    const url = `https://capstone-q2.herokuapp.com/users/${user.id}`;

    if (userFavorites === undefined) {
      axios
        .patch(
          url,
          { favorites: favoritesJSON },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Produto adicionado aos favoritos!',
            showConfirmButton: false,
            timer: 1300,
          });
          dispatch(requestUserInfo(token));
        })
        .catch((err) => console.log(err));
    } else {
      const alreadyAdd = Object.values(userFavorites).some(
        (favorite: any) => favorite.id === products.id
      );

      if (alreadyAdd) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Produto já adicionado aos favoritos!',
          showConfirmButton: false,
          timer: 1300,
        });
      } else {
        axios
          .patch(
            url,
            { favorites: favoritesJSON },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Produto adicionado aos favoritos!',
              showConfirmButton: false,
              timer: 1300,
            });
            dispatch(requestUserInfo(token));
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ProductCard>
          <CardImg>
            <CardThumb>
              <ProductThumb
                src={products.thumbnail}
                alt="thumb"
                onMouseOver={() => setImage(products.thumbnail)}
              />
              {products.images.map((image, index) => {
                return (
                  <ProductThumb
                    key={index}
                    src={image}
                    alt="thumbnail"
                    onMouseOver={() => setImage(products.images[index])}
                  />
                );
              })}
            </CardThumb>
            <CardProduct>
              <ProductShow src={image} alt="destak" />
            </CardProduct>
          </CardImg>
          <CardInfo>
            <ProductInfoName>{products.name}</ProductInfoName>
            <ProductInfoValue>R$ {products.value}</ProductInfoValue>
            <ProductInfoDesc>{products.description}</ProductInfoDesc>
            <ProductInfoDesc>
              <b> SKAMBISTA: </b>
              {products.owner}
            </ProductInfoDesc>

            <ProductInfoDesc>
              <b>CONDIÇÃO: </b>
              {products.usability}
            </ProductInfoDesc>
            <ProductInfoIntr>
              Interesses:
              {products.interests.map((interest, index) => {
                return <li key={index}>{interest}</li>;
              })}
            </ProductInfoIntr>
            <OfferExchange />
            {localStorage.length === 0 ? (
              <Modal
                trigger={
                  <FavButton>
                    <Icon name="heart" />
                    Adicionar aos favoritos
                  </FavButton>
                }
                open={openModal}
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}>
                <Header as="h2" textAlign="center">
                  Você não está logado
                </Header>
                <Styled.ButtonConfirm
                  onClick={() => {
                    setOpenModal(false);
                    history.push('/login');
                  }}>
                  Entrar
                </Styled.ButtonConfirm>
                <Styled.ButtonCancel onClick={() => setOpenModal(false)}>
                  Cancelar
                </Styled.ButtonCancel>
              </Modal>
            ) : (
              <FavButton onClick={handleFavorite}>
                <Icon name="heart" />
                Adicionar aos favoritos
              </FavButton>
            )}

            <SharePoint>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${actualUrl}`}
                target="_blank"
                rel="noopener noreferrer">
                <FaFacebook />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${actualUrl}&text=${products.name}`}
                target="_blank"
                rel="noopener noreferrer">
                <FaTwitter />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${products.name}-${actualUrl}`}
                target="_blank"
                rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </SharePoint>
          </CardInfo>
        </ProductCard>
      )}
    </>
  );
};

export default Product;

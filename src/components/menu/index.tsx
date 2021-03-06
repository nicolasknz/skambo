import React, { useState } from 'react';
import {
  StyledMenu,
  StyledMenuLeft,
  StyledMenuCenter,
  StyledMenuRight,
  StyledLogo,
  StyledSearch,
  StyledButton,
  StyledReverseButton,
  StyledIcons,
  StyledUser,
} from './styles';
import { Dropdown, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Logo from '../../media/img/logotipo.png';
import UserDefault from '../../media/img/userDefault.png';
import { AiOutlineHeart, AiOutlineMail } from 'react-icons/ai';
import Swal from 'sweetalert2';
import MobileCategories from '../mobile/categories';
import { useSelector } from 'react-redux';

const TopBar: React.FC = () => {
  const [value, setValue] = useState('');
  const history = useHistory();
  const session = useSelector((state: any) => state.session)
  const token = session.token
  const userImage = session.currentUser.userImage
  const user = session.currentUser.name
  const trigger = <StyledUser src={userImage !== undefined ? userImage : UserDefault} alt="user" />;

  const handleSubmit = () => {
    history.push(`/user-search/${value}`);
  };

  return (
    <>
      <MobileCategories />
      <StyledMenu>
        <StyledMenuLeft>
          <StyledLogo src={Logo} alt="logo" onClick={() => history.push('/')} />
        </StyledMenuLeft>

        <StyledMenuCenter>
          <Form onSubmit={handleSubmit}>
            <StyledSearch
              icon="search"
              iconPosition="left"
              placeholder="Buscar produtos para troca"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
            />
          </Form>
        </StyledMenuCenter>

        {token !== '' ? (
          <StyledMenuRight>
            <StyledButton className="web" onClick={() => history.push('/new-product')}>
              Anunciar
            </StyledButton>

            <StyledIcons>
              <Dropdown trigger={trigger} icon={null} className="dropdown-desktop">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="user"
                    text="Meu Perfil"
                    onClick={() => history.push('/my-sales')}
                  />
                  <Dropdown.Item
                    icon="sign-out"
                    text="Sair"
                    onClick={() => {
                      Swal.fire({
                        title: `Volte logo ${user}!`,
                        confirmButtonText: `Sair`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          document.location.reload();
                          window.localStorage.clear();
                        }
                      });
                      history.push('/');
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown trigger={trigger} icon={null} direction="left" className="dropdown-mobile">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="user"
                    text="Meu Perfil"
                    onClick={() => history.push('/my-sales')}
                  />
                  <Dropdown.Item
                    icon="sign-out"
                    text="Sair"
                    onClick={() => {
                      Swal.fire({
                        title: `Volte logo ${user}!`,
                        confirmButtonText: `Sair`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          document.location.reload();
                          window.localStorage.clear();
                        }
                      });
                      history.push('/');
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>

              <AiOutlineHeart className="favorite" onClick={() => history.push('/favorites')} />

              <AiOutlineMail className="web message" onClick={() => history.push('/')} />
            </StyledIcons>
          </StyledMenuRight>
        ) : (
          <StyledMenuRight>
            <StyledButton onClick={() => history.push('/login')}>Entrar</StyledButton>
            <StyledReverseButton onClick={() => history.push('/register')}>
              Registrar-se
            </StyledReverseButton>
          </StyledMenuRight>
        )}
      </StyledMenu>
    </>
  );
};

export default TopBar;

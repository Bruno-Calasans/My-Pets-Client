

import { Route, Routes } from "react-router";

import Header from "./layout/Header/Header";
import Main from "./layout/Main/Main";
import Footer from "./layout/Footer/Footer";

// Auth Pages
import Login from "./pages/Auth/Login/Login";
import Register from './pages/Auth/Register/Register';

// User Pages
import UserProfile from "./pages/User/Profile/Profile";
import MyPets from "./pages/User/MyPets/MyPets";
import MyAdoptions from "./pages/User/MyAdoptions/MyAdoptions";

// Pet Pages
import PetEdit from './pages/Pet/Edit/Edit'
import Pets from "./pages/Pet/Pets/Pets";
import PetRegister from './pages/Pet/Register/Register'
import PetInfo from "./pages/Pet/Info/Info";

import CheckAuth from "./components/CheckAuth/CheckAuth";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import Title from "./components/Title/Title";

function App() {
  return (
    <>
      <Header logoSrc='/imgs/logo.png' />
      <Main>
        <Routes>
          <Route
            index
            element={
              <Title name="home">
                <Pets />
              </Title>
            }
          />

          <Route path="/auth/login" element={
          <Title name="login">
            <Login />
          </Title>
          } />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/user/profile"
            element={
              <Title name="perfil">
              <CheckAuth>
                <UserProfile />
              </CheckAuth>
              </Title>
            }
          />
          <Route
            path="/user/mypets"
            element={
              <Title name="meus pets">
              <CheckAuth>
                <MyPets />
              </CheckAuth>
              </Title>
            }
          />
          <Route
            path="/user/myadoptions"
            element={
              <Title name="adoções">
              <CheckAuth>
                <MyAdoptions />
              </CheckAuth>
              </Title>
            }
          />
          <Route path="/pet/info/:id" element={<PetInfo />} />
          <Route
            path="/pet/edit/:id"
            element={
              <Title name="edição de pet">
              <CheckAuth>
                <PetEdit />
              </CheckAuth>
              </Title>
            }
          />
          <Route
            path="/pet/register"
            element={
              <Title name="registro de pet">
              <CheckAuth>
                <PetRegister />
              </CheckAuth>
              </Title>
            }
          />
          <Route path="*" element={
            <Title name="not found">
              <PageNotFound />
            </Title>
          } />
        </Routes>
      </Main>
      <Footer
        pageName="My Pets"
        author="Bruno Calasans"
        authorUrl="https://github.com/Bruno-Calasans"
      />
    </>
  );
}

export default App

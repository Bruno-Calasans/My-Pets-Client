

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

import logo from '../assets/logo.png'

function App() {
  return (
    <>
      <Header logoSrc={logo}/>
      <Main>
        <Routes>
          <Route index element={<Pets />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/user/profile"
            element={
              <CheckAuth>
                <UserProfile />
              </CheckAuth>
            }
          />
          <Route
            path="/user/mypets"
            element={
              <CheckAuth>
                <MyPets />
              </CheckAuth>
            }
          />
          <Route
            path="/user/myadoptions"
            element={
              <CheckAuth>
                <MyAdoptions />
              </CheckAuth>
            }
          />
          <Route path="/pet/info/:id" element={<PetInfo />} />
          <Route
            path="/pet/edit/:id"
            element={
              <CheckAuth>
                <PetEdit />
              </CheckAuth>
            }
          />
          <Route
            path="/pet/register"
            element={
              <CheckAuth>
                <PetRegister />
              </CheckAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
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

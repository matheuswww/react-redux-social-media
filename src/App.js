import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes,Route } from 'react-router-dom'; 
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound';
import Photo from './Components/Photo/Photo';
import User from './Components/user/User';
import UserProfile from './Components/user/UserProfile';
import { autoLogin } from './store/user';

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(autoLogin());
  },[dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <main className="appBody">
          <Routes>

            <Route path="/" element={<Home />}/>
    
            <Route path="/login/*" element={<Login />}/>

            <Route path={"/conta/*"} element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }/>

            <Route path="foto/:id" element={<Photo />}/>

            <Route path="profile/:user" element={<UserProfile />}/>



            <Route path="*" element={<NotFound />}/>
          </Routes>
          </main>
          <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App;
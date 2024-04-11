import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import Navbar from 'react-bootstrap/Navbar';
//import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
//import EventBus from "./common/EventBus";
//import Navbar from './components/Navbar';
//import Navbar1 from './components/Navbar1';

import AddressList from './pages/AddressList';
import AddressPost from './pages/addresses/AddressPost';
import AddressDetail from './pages/addresses/AddressDetail';
import AddressUpdate from './pages/addresses/AddressUpdate';

import ArticleList from './pages/ArticleList';
import ArticlePost from './pages/articles/ArticlePost';
import ArticleDetail from './pages/articles/ArticleDetail';
import ArticleUpdate from './pages/articles/ArticleUpdate';

import ArtistList from './pages/ArtistList';
import ArtistPost from './pages/artists/ArtistPost';
import ArtistDetail from './pages/artists/ArtistDetail';
import ArtistUpdate from './pages/artists/ArtistUpdate';

import BroadcastList from './pages/BroadcastList';
import BroadcastPost from './pages/broadcasts/BroadcastPost';
import BroadcastDetail from './pages/broadcasts/BroadcastDetail';
import BroadcastUpdate from './pages/broadcasts/BroadcastUpdate';

import ChoreoList from './pages/ChoreoList';
import ChoreoPost from './pages/choreographic/ChoreoPost';
import ChoreoDetail from './pages/choreographic/ChoreoDetail';
import ChoreoUpdate from './pages/choreographic/ChoreoUpdate';

import CompetitionList from './pages/CompetitionList';
import CompetitionPost from './pages/competitions/CompetitionPost';
import CompetitionDetail from './pages/competitions/CompetitionDetail';
import CompetitionUpdate from './pages/competitions/CompetitionUpdate';

import ComposerList from './pages/ComposerList';
import ComposerPost from './pages/composers/ComposerPost';
import ComposerDetail from './pages/composers/ComposerDetail';
import ComposerUpdate from './pages/composers/ComposerUpdate';

import ImageList from './pages/ImageList';
import ImagePost from './pages/images/ImagePost';
import ImageDetail from './pages/images/ImageDetail';

import MusicList from './pages/MusicList';
import MusicPost from './pages/musics/MusicPost';
import MusicDetail from './pages/musics/MusicDetail';
import MusicUpdate from './pages/musics/MusicUpdate';

import NationalTeamList from './pages/NationalTeamList';
import NationalTeamDetail from './pages/nationalTeams/NationalTeamDetail';
import NationalTeamPost from './pages/nationalTeams/NationalTeamPost';
import NationalTeamUpdate from './pages/nationalTeams/NationalTeamUpdate';

import NationList from './pages/NationList';
import NationPost from './pages/nations/NationPost';
import NationDetail from './pages/nations/NationDetail';
import NationUpdate from './pages/nations/NationUpdate';

import PersonList from './pages/PersonList';
import PersonPost from './pages/people/PersonPost';
import PersonDetail from './pages/people/PersonDetail';
import PersonUpdate from './pages/people/PersonUpdate';

import RoutineList from './pages/RoutineList';
import RoutinePost from './pages/routines/RoutinePost';
import RoutineDetail from './pages/routines/RoutineDetail'; 
import RoutineUpdate from './pages/routines/RoutineUpdate';

import SoundtrackList from './pages/SoundtrackList';
import SoundtrackPost from './pages/soundtracks/SoundtrackPost';
import SoundtrackDetail from './pages/soundtracks/SoundtrackDetail';
import SoundtrackUpdate from './pages/soundtracks/SoundtrackUpdate';

import SwimsuitList from './pages/SwimsuitList';
import SwimsuitPost from './pages/swimsuits/SwimsuitPost';
import SwimsuitDetail from './pages/swimsuits/SwimsuitDetail';
import SwimsuitUpdate from './pages/swimsuits/SwimsuitUpdate';

import SwimsuitDetailList from './pages/SwimsuitDetailList';
import SwimsuitDetailPost from './pages/swimsuitDetails/SwimsuitDetailPost';
import SwimsuitDetailDetail from './pages/swimsuitDetails/SwimsuitDetailDetail';
import SwimsuitDetailUpdate from './pages/swimsuitDetails/SwimsuitDetailUpdate';

import TagList from './pages/TagList';
import TagPost from './pages/tags/TagPost';
import TagDetail from './pages/tags/TagDetail';
import TagUpdate from './pages/tags/TagUpdate';

import OccupationList from './pages/OccupationList';
import OccupationPost from './pages/occupations/OccupationPost';
import OccupationDetail from './pages/occupations/OccupationDetail';
import OccupationUpdate from './pages/occupations/OccupationUpdate';

import MainPage from './pages/MainPage';

function App() {
  
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container style={{backgroundColor:"#7df4ff", padding:"2em", fontSize:"1.2em"}}>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

      <Nav defaultActiveKey="/">
            <Nav.Link href="/nationalTeams">Teams</Nav.Link>
            <Nav.Link href="/nations">Nations</Nav.Link>
            
            <NavDropdown title="Competitions" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/competitions">Competitions</NavDropdown.Item>
              <NavDropdown.Item href="/routines">
                Routines
              </NavDropdown.Item>
            </NavDropdown>

            
            <NavDropdown title="People" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/people">People</NavDropdown.Item>
              <NavDropdown.Item href="/occupations">
                Occupations
              </NavDropdown.Item>
            </NavDropdown>
          

            <NavDropdown title="Media" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/articles">Articles</NavDropdown.Item>
              <NavDropdown.Item href="/broadcasts">
                Broadcasts
              </NavDropdown.Item>
              <NavDropdown.Item href="/images">Images</NavDropdown.Item>
              <NavDropdown.Item href="/addresses">
                Addresses
              </NavDropdown.Item>
              <NavDropdown.Item href="/swimsuitDetails">
                SwimsuitDetails
              </NavDropdown.Item>
           
              <NavDropdown.Item href="/choreos">
                Choreographic
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Music" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/soundtracks">Soundtracks</NavDropdown.Item>
              <NavDropdown.Item href="/musics">
                Musics
              </NavDropdown.Item>
              <NavDropdown.Item href="/artists">
                Artists
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/tags">Tags</Nav.Link>

            {showModeratorBoard && (
              <Nav.Link href={"/mod"}>
                Moderator Board
              </Nav.Link>
            )}

            {showAdminBoard && (
              <Nav.Link href={"/admin"}>
                Admin Board
              </Nav.Link>
            )}

          {currentUser && (
              <Nav.Link href={"/user"}>
                User
              </Nav.Link>
          )}

        {currentUser ? (
            <>
              <Nav.Link href={"/profile"}>
                {currentUser.username}
              </Nav.Link>  
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </>
        ) : (
            <>
              <Nav.Link href={"/login"}>
                Login
              </Nav.Link>
              <Nav.Link href={"/register"}>
                Sign Up
              </Nav.Link>
            </>
        )}
       
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />

          <Route path="/articles" element={<ArticleList/>}/>
          
          {currentUser ? (
          <Route exact path="/articles/create" element={<ArticlePost/>}/>
            ) : (
            <></>
          )}
          <Route currentUser={currentUser} exact path="/articles/:id" element={<ArticleDetail/>}/>
          <Route exact path="/articles/:id/update" element={<ArticleUpdate/>}/>

          <Route path="/artists" element={<ArtistList/>}/>
          <Route exact path="/artists/create" element={<ArtistPost/>}/>
          <Route currentUser={currentUser} exact path="/artists/:id" element={<ArtistDetail/>}/>
          <Route exact path="/artists/:id/update" element={<ArtistUpdate/>}/>

          <Route path="/addresses" element={<AddressList/>}/>
          <Route exact path="/addresses/create" element={<AddressPost/>}/>
          <Route exact path="/addresses/:id" element={<AddressDetail/>}/>
          <Route exact path="/addresses/:id/update" element={<AddressUpdate/>}/>

          <Route path="/broadcasts" element={<BroadcastList/>}/>
          <Route exact path="/broadcasts/create" element={<BroadcastPost/>}/>
          <Route exact path="/broadcasts/:id" element={<BroadcastDetail/>}/>
          <Route exact path="/broadcasts/:id/update" element={<BroadcastUpdate/>}/>

          <Route path="/choreos" element={<ChoreoList/>}/>
          <Route exact path="/choreos/create" element={<ChoreoPost/>}/>
          <Route exact path="/choreos/:id" element={<ChoreoDetail/>}/>
          <Route exact path="/choreos/:id/update" element={<ChoreoUpdate/>}/>

          <Route path="/competitions" element={<CompetitionList/>}/>
          <Route exact path="/competitions/create" element={<CompetitionPost/>}/>
          <Route exact path="/competitions/:id" element={<CompetitionDetail/>}/>
          <Route exact path="/competitions/:id/update" element={<CompetitionUpdate/>}/>

          <Route path="/composers" element={<ComposerList/>}/>
          <Route exact path="/composers/create" element={<ComposerPost/>}/>
          <Route exact path="/composers/:id" element={<ComposerDetail/>}/>
          <Route exact path="/composers/:id/update" element={<ComposerUpdate/>}/>

          <Route path="/images" element={<ImageList/>}/>
          <Route exact path="/images/create" element={<ImagePost/>}/>
          <Route currentUser={currentUser} exact path="/images/:id" element={<ImageDetail/>}/>

          <Route path="/musics" element={<MusicList/>}/>  
          <Route exact path="/musics/create" element={<MusicPost/>}/>
          <Route exact path="/musics/:id" element={<MusicDetail/>}/>
          <Route exact path="/musics/:id/update" element={<MusicUpdate/>}/>

          <Route path="/nations" element={<NationList/>}/>
          <Route exact path="/nations/create" element={<NationPost/>}/>
          <Route exact path="/nations/:id" element={<NationDetail/>}/>
          <Route exact path="/nations/:id/update" element={<NationUpdate/>}/>

          <Route path="/nationalTeams" element={<NationalTeamList/>}/>
          <Route exact path="/nationalTeams/create" element={<NationalTeamPost/>}/>
          <Route exact path="/nationalTeams/:id" element={<NationalTeamDetail/>}/>
          <Route exact path="/nationalTeams/:id/update" element={<NationalTeamUpdate/>}/>

          <Route path="/people" element={<PersonList/>}/>
          <Route exact path="/people/create" element={<PersonPost/>}/>
          <Route exact path="/people/:id" element={<PersonDetail/>}/>
          <Route exact path="/people/:id/update" element={<PersonUpdate/>}/>

          <Route path="/occupations" element={<OccupationList/>}/>
          <Route exact path="/occupations/create" element={<OccupationPost/>}/>
          <Route exact path="/occupations/:id" element={<OccupationDetail/>}/>
          <Route exact path="/occupations/:id/update" element={<OccupationUpdate/>}/>

          <Route path="/routines" element={<RoutineList/>}/>
          <Route exact path="/routines/create" element={<RoutinePost/>}/>
          <Route exact path="/routines/:id" element={<RoutineDetail/>}/>
          <Route exact path="/routines/:id/update" element={<RoutineUpdate/>}/>

          <Route path="/soundtracks" element={<SoundtrackList/>}/>
          <Route exact path="/soundtracks/create" element={<SoundtrackPost/>}/>
          <Route exact path="/soundtracks/:id" element={<SoundtrackDetail/>}/>
          <Route exact path="/soundtracks/:id/update" element={<SoundtrackUpdate/>}/>

          
          <Route path="/swimsuits" element={<SwimsuitList/>}/>
          <Route exact path="/swimsuits/create" element={<SwimsuitPost/>}/>
          <Route exact path="/swimsuits/:id" element={<SwimsuitDetail/>}/>
          <Route exact path="/swimsuits/:id/update" element={<SwimsuitUpdate/>}/>

          <Route path="/swimsuitDetails" element={<SwimsuitDetailList/>}/>
          <Route exact path="/swimsuitDetails/create" element={<SwimsuitDetailPost/>}/>
          <Route exact path="/swimsuitDetails/:id" element={<SwimsuitDetailDetail/>}/>
          <Route exact path="/swimsuitDetails/:id/update" element={<SwimsuitDetailUpdate/>}/>

          <Route path="/tags" element={<TagList/>}/>
          <Route exact path="/tags/create" element={<TagPost/>}/>
          <Route exact path="/tags/:id" element={<TagDetail/>}/>
          <Route exact path="/tags/:id/update" element={<TagUpdate/>}/>
        
        </Routes>
      </div>
    </div>
  );
}

export default App;

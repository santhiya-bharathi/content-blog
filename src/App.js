import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import { Switch, Route} from "react-router-dom";
import { Home } from './Home';
import { Blogs } from './Blogs';
import { BlogMoreDetails } from './BlogMoreDetails';
import { AddBlogs } from './AddBlogs';
import { EditBlog } from './EditBlog';
import { Resources } from './Resources';
import { NotFound } from './NotFound';
import { LoginSuccess, LoginFailed, LoginPage } from './LoginPage';
import { SignupSuccess, SignupFailed, SignupPage } from './SignupPage';


export const API_URL = "https://capstone-project-node.herokuapp.com";



function App() {

const [links, setLinks] = useState([]);
const [content, setContent] = useState([]);
  const history = useHistory();
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});
console.log(content);
useEffect(()=>{
  fetch(`${API_URL}/bloglist`, {method:"GET"})
  .then((data)=>data.json())
  .then((blg)=>setContent(blg));
}, []);
console.log(links);
useEffect(()=>{
  fetch(`${API_URL}/links`, {method:"GET"})
  .then((data)=>data.json())
  .then((lnk)=>setLinks(lnk));
}, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={1} style={{borderRadius:"0px",minHeight:"100vh", margin:"0px"}}>
    <div className="App">
    
     <AppBar position="static">
       <Toolbar>
       <Button varient="text" color="success" ><ParkOutlinedIcon/> NATURE</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/")}>Home</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/bloglist")}>Blogs</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/addblogs")}>Add blog</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/resources")}>Resources</Button>
       <div style={{marginLeft:"auto"}}>
       {/* <Button varient="text" color="inherit" style={{marginLeft:"auto"}} onClick={()=>history.push("/login")}>log in</Button>
       <Button varient="text" color="inherit" style={{marginRight:"0px"}} onClick={()=>history.push("/signup")}>sign up</Button> */}
       <Button varient="text" color="inherit" style={{marginLeft:"auto"}} onClick={()=>setMode(mode==="light"? "dark":"light")}> {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
     
       </div>
         </Toolbar>
       </AppBar>

       <Switch>
      
      <Route exact path="/">
      < Home/>
        </Route>
       
        <Route path="/addblogs">
          <AddBlogs />
        </Route>
        <Route path="/resources">
          <Resources />
        </Route>

        <Route path="/bloglist/edit/:id">
        <EditBlog />
        </Route>

        <Route path="/bloglist/:id">
        <BlogMoreDetails />
        </Route>

        <Route path="/bloglist">
        <Blogs />
        </Route>

        <Route path="/signupsuccess">
          <SignupSuccess />
        </Route>

        <Route path="/signupfailed">
          <SignupFailed />
        </Route>

        <Route path="/loginsuccess">
          <LoginSuccess />
        </Route>

        <Route path="/loginfailed">
          <LoginFailed />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>
        
          <Route path="/signup">
          <SignupPage />
        </Route>

        <Route path="**">
          <NotFound/>
        </Route>

      </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}
export default App;

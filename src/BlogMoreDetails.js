import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { API_URL } from './App';
import { Footer } from "./Footer";

export function BlogMoreDetails() {
  const history = useHistory();
  const { id } = useParams();
  // const blogdet = content[id]; 
  const [blogdet, setBlogdet] = useState({});
  console.log(blogdet);
  useEffect(() => {
    fetch(`${API_URL}/bloglist/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((blg) => setBlogdet(blg));
  }, [id]);

  return (
    <div className="details">
      <img className="blog-pic-moredet" src={blogdet.picture} alt={blogdet.heading} />
      <h2 className='blog-heading'>{blogdet.heading}</h2>
      <div className='blog-moredetails-flex'>
        <h4 className='blog-moredetails'>{blogdet.moredetails}</h4>
        <Button onClick={() => history.push("/bloglist")} variant="outlined"><KeyboardBackspaceIcon />Back</Button>
      </div>

      <Footer />
    </div>
  );
}
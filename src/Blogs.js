import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from './App';
import { Footer } from "./Footer";
import { Like } from "./Like";

export function Blogs() {

  const [content, setContent] = useState([]);

  const getBlog = () => {
    fetch(`${API_URL}/bloglist`, { method: "GET" })
      .then((data) => data.json())
      .then((blg) => setContent(blg));
  };


  useEffect(getBlog, []);
  const history = useHistory();
  return (
    <div>
      <h1 className='blog-title'>Blogs</h1>
      {content.map(({ picture, heading, summary, _id }) => (<Bdetails
        key={_id}
        picture={picture}
        heading={heading}
        summary={summary}
        id={_id}


        editButton={<IconButton
          style={{ marginLeft: "auto" }}
          aria-label="edit" color="success"
          onClick={() => history.push("/bloglist/edit/" + _id)}>
          <EditIcon />
        </IconButton>} />
      ))}

      <Footer />
    </div>
  );
}

function Bdetails({ picture, heading, summary, id, editButton }) {
  const history = useHistory();
  return (
    <div className='blog-display'>
      <div className='blog-flex'>
        <img className="blog-pic" src={picture} alt={heading} />
        <div className='blog-like-icon'>
          <p className='blog-folder-icon'><FolderOpenIcon /> Blog</p>
          <div className='blog-folder-icon'><Like />{editButton}</div>

        </div>
        <h2 className='blog-heading'>{heading}</h2>
        <p className='blog-summary'>{summary}</p>
        <Button onClick={() => {
          console.log(id);
          history.push("/bloglist/" + id);
        }} color="info" aria-label="more-info">
          read more
        </Button>
      </div>
    </div>
  );
}
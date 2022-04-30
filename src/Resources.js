import { useState, useEffect } from "react";
import { API_URL } from './App';
import { Footer } from "./Footer";

export function Resources() {
  const [links, setLinks] = useState([]);

  const getLinks = () => {
    fetch(`${API_URL}/links`, { method: "GET" })
      .then((data) => data.json())
      .then((lnk) => setLinks(lnk));
  };


  useEffect(getLinks, []);
  return (
    <div>
      <h2 className='reso-head'>Resources</h2>
      <h1 className='reso-link'>Links</h1>
      {links.map(({ link }) => (<ResourcesDet link={link} />))}
      <Footer />
    </div>
  );
}
function ResourcesDet({ link }) {
  return (
    <div className='link-design'>
      <a className='link-color' rel="noreferrer" target="_blank" href={link}>{link}</a>
    </div>
  );
}
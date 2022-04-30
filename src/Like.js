import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


export function Like() {
  const [like, setLike] = useState(true);
  return (
    <div>
      <IconButton onClick={() => setLike(!like)} color="secondary" aria-label="description">{like ? <FavoriteBorderIcon /> : <FavoriteIcon />}</IconButton>
    </div>
  );
}
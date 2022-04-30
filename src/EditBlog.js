import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from './App';

export function EditBlog() {

  const { id } = useParams();
  const [blogdet, setBlogdet] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/bloglist/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((mv) => setBlogdet(mv));
  }, [id]);

  return blogdet ? <UpdateBlog blogdet={blogdet} /> : "";
}
function UpdateBlog({ blogdet }) {

  const history = useHistory();

  const formvalidationschema = yup.object({
    picture: yup.string().required("why not fill this picture?").min(4),
    heading: yup.string().required("why not fill this blog heading?").min(1),
    summary: yup.string().required("why not fill this summary?").min(5),
    moredetails: yup.string().required("why not fill this more details?").min(5),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { heading: blogdet.heading, picture: blogdet.picture, summary: blogdet.summary, moredetails: blogdet.moredetails },

    validationSchema: formvalidationschema,

    onSubmit: (updatedBlog) => {
      console.log("onsubmit", updatedBlog);
      editBlog(updatedBlog);
    }
  });

  const editBlog = (updatedBlog) => {

    console.log(updatedBlog);
    // const copyBlogList =[...content];
    // copyBlogList[id] = updatedBlog;
    // setContent(copyBlogList);
    // history.push("/bloglist");
    fetch(`${API_URL}/bloglist/${blogdet._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBlog),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => history.push("/bloglist"));
  };

  return (
    <form onSubmit={handleSubmit} className="add-blogs">

      <TextField id="picture"
        name="picture"
        value={values.picture}
        onChange={handleChange}
        onBlur={handleBlur}
        label="enter movie url"
        error={errors.picture && touched.picture}
        helperText={errors.picture && touched.picture && errors.picture}
        variant="filled" />


      <TextField id="heading"
        name="heading"
        value={values.heading}
        onChange={handleChange}
        onBlur={handleBlur}
        label="enter movie name"
        error={errors.heading && touched.heading}
        helperText={errors.heading && touched.heading && errors.heading}
        variant="filled" />


      <TextField id="summary"
        name="summary"
        value={values.summary}
        onChange={handleChange}
        onBlur={handleBlur} label="enter movie summary"
        error={errors.summary && touched.summary}
        helperText={errors.summary && touched.summary && errors.summary}
        variant="filled" />

      <TextField id="moredetails"
        name="moredetails"
        value={values.moredetails}
        onChange={handleChange}
        onBlur={handleBlur} label="enter movie trailer"
        error={errors.moredetails && touched.moredetails}
        helperText={errors.moredetails && touched.moredetails && errors.moredetails}
        variant="filled" />

      <Button type="submit" variant="contained">Edit Blogs</Button>
    </form>

  );
}
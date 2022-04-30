import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from './App';

export function AddBlogs() {
  const history = useHistory();

  const formvalidationschema = yup.object({
    picture: yup.string().required("why not fill this picture?").min(4),
    heading: yup.string().required("why not fill this blog heading?").min(1),
    summary: yup.string().required("why not fill this summary?").min(5),
    moredetails: yup.string().required("why not fill this more details?").min(5),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { heading: "", picture: "", summary: "", moredetails: "" },

    validationSchema: formvalidationschema,

    onSubmit: (newBlogs) => {
      console.log("onsubmit", newBlogs);
      addBlogs(newBlogs);
    }
  });

  const addBlogs = (newBlogs) => {

    console.log(newBlogs);
    fetch(`${API_URL}/bloglist`, {
      method: "POST",
      body: JSON.stringify(newBlogs),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => history.push("/bloglist"));

  };
  // const addBlogs =()=>{
  //   const newBlogs= {picture, heading, summary, moredetails};//shorthand
  //   setContent([...content,newBlogs]);
  //   history.push("/bloglist");
  // };
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
        onBlur={handleBlur} label="enter movie moredetails"
        error={errors.moredetails && touched.moredetails}
        helperText={errors.moredetails && touched.moredetails && errors.moredetails}
        variant="filled" />

      <Button type="submit" variant="contained">Add Blogs</Button>
    </form>
  );
}
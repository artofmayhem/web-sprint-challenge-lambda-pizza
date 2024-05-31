//React dependencies
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  // Link,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
// import * as yup from "yup";

// Style Imports
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

//Resource Imports

import hoakaleiLogo from "./resources/hoakaleiLogoTrans.png";
import sandwichImage from "./resources/Sandwich.jpg";
import clubSkyView from "./resources/clubSkyView.jpg";
//import apiUrl from "./apiUrl.js";
import schema from "./schema.js";
// import Home from "./Home.js";
// import wingsNThings from "./wingsNThings.js";
// import desserts from "./desserts.js";
import initialFormValues from "./initialFormValues.js";
import initialFormErrors from "./initialFormErrors.js";

/* Pizza Form Below */
/*******************************************************************/

function Pizza() {
  const history = useHistory();
  const isDisabled = false;
  const [pizza, setPizza] = useState({}); // empty object pizza
  const [formValues, setFormValues] = useState(initialFormValues); // inputs
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(isDisabled);

  console.log(pizza, disabled, history);

  //Pizza Poster
  const postNew = (newPizza) => {
    axios
      .post("https://reqres.in/api/pizza", newPizza)
      .then((res) => {
        setPizza(res.data);
        console.log("API USAGE SUCCESSFUL ", res.data);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log("Error: ", err);
        debugger;
      });
  };
  //Form Validator
  // const validation = (name, value) => {
  //   yup
  //     .reach(schema, name)
  //     .validate(value)
  //     .then(() => setFormErrors({ ...formErrors, [name]: "" }))
  //     .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));

  //   console.log(
  //     "FORM PASSED VALIDATION... PLEASE AWAIT BIO-SCANNER... PREPARE DNA SAMPLE"
  //   );
  // };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   console.log("name", name, "value", value, "type", type, "checked", checked);
  //   const inputValue = type === "checkbox" ? checked : value;
  //   validation(name, inputValue);
  //   setFormValues((prevFormValues) => ({
  //     ...prevFormValues,
  //     [name]: inputValue,
  //   }));

  //   setFormErrors((prevFormErrors) => ({
  //     ...prevFormErrors,
  //     [name]: value ? false : true,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["name", "sauceChoice", "size"];
    const requiredFieldsValues = requiredFields
      .map((rf) => {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [rf]: formValues[rf] ? false : true,
        }));
        return formValues[rf];
      })
      .filter(Boolean);

    if (requiredFields.length !== requiredFieldsValues.length) {
      return;
    }

    const newPizza = {
      name: formValues.name,
      size: formValues.size,
      sauceChoice: formValues.sauceChoice,
      pepperoni: formValues.pepperoni,
      smokedSausage: formValues.smokedSausage,
      prosciutto: formValues.prosciutto,
      chicken: formValues.chicken,
      pulledPork: formValues.pulledPork,
      bacon: formValues.bacon,
      onions: formValues.onions,
      pineapple: formValues.pineapple,
      jalapenos: formValues.jalapenos,
      babySpinach: formValues.babySpinach,
      mushrooms: formValues.mushrooms,
      kabochaSquash: formValues.kabochaSquash,
      specialInstructions: formValues.specialInstructions,
    };

    postNew(newPizza);
    // alert(
    //   "Thank you for placing your order with Lambda Pizza. Our Kitchen is preparing your pizza right now. Your driver will be there shortly. In the meantime, have a wonderful day and thank you again for choosing Lambda Pizza"
    // );
    setFormValues(initialFormValues);
    history.push("/");
  };

  // useEffect to change disabled status as the form value changes
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  useEffect(() => {
    console.table("Error: ", formErrors);
  }, [formErrors]);

  return (
    <div
      className="d-flex container justify-content-center flex-column"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <div>
        <h1 style={{ marginBottom: "5rem" }}>
          Fresh sandwiches made now, delivered straight to you while!{" "}
        </h1>
      </div>
      <div style={{ backgroundColor: "#bbb" }}>
        <h2
          style={{ color: "#0C499", marginTop: "2rem", marginBottom: "3rem" }}
          htmlFor="nameInput"
        >
          Call (808)979-6207 <br></br>to start your order!{" "}
        </h2>
        <h4 style={{ marginTop: "2rem", marginBottom: "3rem" }}>
          Please Make Your Selections Below{" "}
        </h4>
      </div>
      <div>
        <img src={sandwichImage} className="sizer" alt="pizza" />
      </div>

      {/* Pizza Form Start */}
      <div>
        <form onSubmit={handleSubmit}>
          <div
            className="d-flex container justify-content-center flex-column"
            style={{ backgroundColor: "#0C499C" }}
          >
            <h3
              style={{ marginBottom: "2rem", color: "white", marginTop: "5%" }}
            >
              Build your sandwich:{" "}
            </h3>

            {/*  Radio Buttons For Sauce Choices*/}
            <div
              className="d-flex flex-column justify-content-center choices"
              style={{ margin: "3rem auto" }}
            >
              <h5 style={{ textAlign: "center" }}>Choose your meats: </h5>
              <label htmlFor="pepperoni">
                Smoked Turkey $12
                {/* <input
                    className="col"
                    type="checkbox"
                    name="pepperoni"
                    id="pepperoni"
                    onChange={handleChange}
                  /> */}
              </label>
              <label htmlFor="smokedSausage">
                Honey Baked Ham $12
                {/* <input
                    className="col"
                    type="checkbox"
                    name="smokedSausage"
                    id="smokedSausage"
                    onChange={handleChange}
                  /> */}
              </label>
              <label htmlFor="prosciutto">
                Tuna Salad $12
                {/* <input
                    className="col"
                    type="checkbox"
                    name="prosciutto"
                    id="prosciutto"
                    onChange={handleChange}
                  /> */}
              </label>
              <label htmlFor="chicken">
                Egg Salad $10
                {/* <input
                    className="col"
                    type="checkbox"
                    name="chicken"
                    id="chicken"
                    onChange={handleChange}
                  /> */}
              </label>
              <label htmlFor="pulledPork">
                Pastrami $13
                {/* <input
                    className="col"
                    type="checkbox"
                    name="pulledPork"
                    id="pulledPork"
                    onChange={handleChange}
                  /> */}
              </label>
              <label htmlFor="bacon">
                Bacon $11
                {/* <input
                    className="col"
                    type="checkbox"
                    name="bacon"
                    id="bacon"
                    onChange={handleChange}
                  /> */}
              </label>
            </div>

            {/* Topping Choice Checkboxes Start Here */}
            <div
              className="container d-flex flex-column justify-content-center choices"
              style={{ marginBottom: "3rem", boxShadow: "none" }}
            >
              <div className="d-flex justify-content-center align-items-center flex-column choices">
                <h5>Choose your sauce</h5>
                <label htmlFor="crushedTomato">Mayonnaise</label>
                {/* <input
                className="row"
                type="radio"
                name="sauceChoice"
                id="crushedTomato"
                value="Crushed Tomato"
                onChange={handleChange}
              /> */}

                <label htmlFor="roastedTomatoes">Dijon Mustard </label>
                {/* <input
                className="col"
                type="radio"
                name="sauceChoice"
                id="roastedTomatoes"
                value="Roasted Tomato"
                onChange={handleChange}
              /> */}

                <label htmlFor="truffleCream">Spicy Aioli</label>
                {/* <input
                className="col"
                type="radio"
                name="sauceChoice"
                id="truffleCream"
                value="Truffle Cream"
                onChange={handleChange}
              /> */}

                <label htmlFor="confitGarlic">Roasted Garlic Aioli</label>
                {/* <input
                className="col"
                type="radio"
                name="sauceChoice"
                id="confitGarlic"
                value="Confit Garlic"
                onChange={handleChange}
              /> */}
              </div>

              {/* Cheese Selections */}
              <div className="d-flex justify-content-center align-items-center flex-column choices">
                {/* {formErrors.sauceChoice && (
                <span className="error">Sauce is required</span>
              )} */}
                <h5>Choose your cheese</h5>
                <label htmlFor="crushedTomato">Cheddar </label>
                {/* <input
                className="row"
                type="radio"
                name="sauceChoice"
                id="crushedTomato"
                value="Crushed Tomato"
                onChange={handleChange}
              /> */}

                <label htmlFor="roastedTomatoes">Swiss </label>
                {/* <input
                className="col"
                type="radio"
                name="sauceChoice"
                id="roastedTomatoes"
                value="Roasted Tomato"
                onChange={handleChange}
              /> */}

                <label htmlFor="truffleCream">Provolone </label>
                {/* <input
                className="col"
                type="radio"
                name="sauceChoice"
                id="truffleCream"
                value="Truffle Cream"
                onChange={handleChange}
              /> */}

                <label htmlFor="confitGarlic">Jalapeno Jack </label>
                {/* <input
                className="col"
                type="radio"
                name="sauceChoice"
                id="confitGarlic"
                value="Confit Garlic"
                onChange={handleChange}
              /> */}
                {formErrors.sauceChoice && (
                  <span className="error">Sauce is required</span>
                )}
              </div>

              {/* Vegetable selection */}
              <div className="d-flex justify-content-center align-items-center flex-column choices">
                <h5 style={{ textAlign: "center" }}>Choose your veggies: </h5>
                <label htmlFor="onions">
                  Manoa Lettuce
                  {/* <input
                    className="col"
                    type="checkbox"
                    name="onions"
                    id="onions"
                    onChange={handleChange}
                  /> */}
                </label>
                <label htmlFor="pineapple">
                  Ho Farm Tomato
                  {/* <input
                    className="col"
                    type="checkbox"
                    name="pineapple"
                    id="pineapple"
                    onChange={handleChange}
                  /> */}
                </label>
                <label htmlFor="jalapenos">
                  Onion
                  {/* <input
                    className="col"
                    type="checkbox"
                    name="jalapenos"
                    id="jalapenos"
                    onChange={handleChange}
                  /> */}
                </label>
                <label htmlFor="babySpinach">
                  Baby Spinach
                  {/* <input
                    className="col"
                    type="checkbox"
                    name="babySpinach"
                    id="babySpinach"
                    onChange={handleChange}
                  /> */}
                </label>
                <label htmlFor="mushrooms">
                  Aloun Farms Cucumber
                  {/* <input
                    className="col"
                    type="checkbox"
                    name="mushrooms"
                    id="mushrooms"
                    onChange={handleChange}
                  /> */}
                </label>
                <label htmlFor="kabochaSquash">
                  Avocado
                  {/* <input
                    className="col"
                    type="checkbox"
                    name="kabochaSquash"
                    id="kabochaSquash"
                    onChange={handleChange}
                  /> */}
                </label>
              </div>
            </div>

            {/* Special Instructions Text Area Starts Here  */}
            {/* <label htmlFor="specialInstructions: ">
              Please Add Any Special Instructions
            </label> */}
            {/* <textarea
              type="text"
              name="specialInstructions"
              id="specialInstructions"
              placeholder="i.e. dog at the gate call when here"
              style={{ marginBottom: "3rem" }}
              onChange={handleChange}
              value={formValues.specialInstructions}
            />
            <div
              className="d-flex justify-content-center"
              style={{ marginBottom: "3rem" }}
            >
              <button
                className="btn glow-on-hover"
                id="submit-btn"
                disabled={isDisabled}
              >
                Place Your Order
              </button>
            </div> */}
            <div>
              {/* <input
             type="text"
             name="name"
             id="nameInput"
             minLength="2"
             placeholder="Last Name, First Name"
             onChange={handleChange}
             value={formValues.name}
           /> */}
              {formErrors.name && (
                <span className="error">Name is required</span>
              )}
            </div>

            {/* Drop Down Menu For Size */}
            {/* <label style={{ color: "white"}} htmlFor="pizzaSize">
           Choose your bread: <br /> <em>(required)</em>
         </label> */}
            {/* <select
           id="pizzaSize"
           name="size"
           style={{ margin: "1.5rem" }}
           onChange={handleChange}
         >
           <option value="">--</option>
           <option value="Small">Japanese White</option>
           <option value="Medium">Whole Wheat</option>
           <option value="Large">Cracked Wheat</option>
           <option value="X-large">Sourdough</option>
           <option value="Super Bowl">Gluten Free</option>
         </select>
         {formErrors.size && <span className="error">Size is required</span>} */}
            <div
              className="d-flex flex-column justify-content-center choices"
              style={{ margin: "1rem auto" }}
            >
              <h5>Choose your Bread</h5>
              <label htmlFor="crushedTomato">Japanese White</label>
              {/* <input
             className="row"
             type="radio"
             name="sauceChoice"
             id="crushedTomato"
             value="Crushed Tomato"
             onChange={handleChange}
           /> */}

              <label htmlFor="roastedTomatoes">Cracked Wheat </label>
              {/* <input
             className="col"
             type="radio"
             name="sauceChoice"
             id="roastedTomatoes"
             value="Roasted Tomato"
             onChange={handleChange}
           /> */}

              <label htmlFor="truffleCream">Sourdough </label>
              {/* <input
             className="col"
             type="radio"
             name="sauceChoice"
             id="truffleCream"
             value="Truffle Cream"
             onChange={handleChange}
           /> */}

              <label htmlFor="confitGarlic">Gluten Free </label>
              {/* <input
             className="col"
             type="radio"
             name="sauceChoice"
             id="confitGarlic"
             value="Confit Garlic"
             onChange={handleChange}
           /> */}
              {formErrors.sauceChoice && (
                <span className="error">Sauce is required</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main App Function Containing Router

export default function App() {
  return (
    <div className="container d-flex flex-column justify-content-center outer-container">
      <div className="container">
        <div className="head d-flex flex-column align-items-center justify-content-around">
          <h1
            className="display-4"
            style={{ textAlign: "center", paddingTop: "2rem" }}
          >
            Hoakalei Eats
          </h1>
          <img
            src={hoakaleiLogo}
            className="image-sizer"
            alt="hoakalei logo"
          ></img>
        </div>
        <div>
          <img
            src={clubSkyView}
            className="d-flex flex-column justify-content-center sizer"
            alt="picturesque ariel view of the golf course"
          />
        </div>
      </div>

      <BrowserRouter>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ marginTop: "2rem", marginBottom: "3rem" }}
        >
          {/* <Link
            to="/"
            className=" btn glow-on-hover"
            style={{ color: "#666", margin: "1rem auto" }}
          >
            Home
          </Link> */}
          {/* <Link
            to="pizza"
            className="btn glow-on-hover"
            style={{ color: "#666", margin: "1rem auto" }}
          >
            Pizzas
          </Link>
          <Link
            to="wings-n-things"
            className="btn glow-on-hover"
            style={{ color: "#666", margin: "1rem auto" }}
          >
            Appetizers
          </Link>
          <Link
            to="desserts"
            className="btn glow-on-hover"
            style={{ color: "#666", margin: "1rem auto" }}
          >
            Desserts
          </Link> */}
        </div>

        <Switch>
          <Route exact path="/" component={Pizza} />
          {/* <Route path="/pizza" component={Pizza} />
          <Route path="/wings-n-things" component={wingsNThings} />
          <Route path="/desserts" component={desserts} /> */}
        </Switch>
      </BrowserRouter>

      {/*Why would we want code outside of browser router */}
      <div className="container d-flex flex-column justify-content-center">
        <h2 style={{ textAlign: "center", marginTop: "5rem" }}>
          Thank you for choosing Hoakalei Eats! <br></br>
          <img
            src={hoakaleiLogo}
            className="image-sizer2"
            alt="hoakalei logo"
          ></img>
        </h2>
      </div>
      <footer>
        <h5 style={{ fontSize: "12px" }}>copyright 2024 Sankara Hawaii</h5>
        <h5 style={{ fontSize: "10px" }}>Website by Tony Miller</h5>
      </footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}

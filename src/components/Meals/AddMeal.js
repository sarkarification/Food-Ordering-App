import useInput from "../../hooks/use-input";
import Modal from "../UI/Modal";
import './AddMeal.css' 

const AddMeal = (props) => {

//  const sendDatatoDb = (data) ={

//  }

 async function addDataHandler (mealData) {
    const response = await fetch('https://react-http-4bf51-default-rtdb.firebaseio.com/meals.json', {
      method: 'POST', 
      body: JSON.stringify(mealData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json;
    console.log(data);
  }


 const {value: enteredName,
        isValid: nameIsValid,
        hasError: namehasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: namereset}=useInput(value => value.trim() !== '');

 const {value: enteredDesc,
       isValid: descIsValid,
       hasError: deschasError,
       valueChangeHandler: descChangeHandler,
       inputBlurHandler: descBlurHandler,
       reset: descreset}=useInput(value => value.trim() !== '');

 const {value: enteredPrice,
       isValid: priceIsValid,
       hasError: pricehasError,
       valueChangeHandler: priceChangeHandler,
       inputBlurHandler: priceBlurHandler,
       reset: pricereset}=useInput((value) => value > 1);

  let formIsValid = false;

  if(nameIsValid && descIsValid && priceIsValid)
    {
      formIsValid = true
    }


const submitFormHandler = (e) => {
    e.preventDefault()
    if(!nameIsValid && !descIsValid && !priceIsValid)
    {return;}
    console.log('form submitted')
    const dataToSend = {name: enteredName, description:enteredDesc , price: enteredPrice};
    // console.log(dataToSend)
    addDataHandler(dataToSend)
    namereset(); descreset(); pricereset();
    
}

const nameClass = namehasError ? 'form-control invalid': 'form-control';
const descClass = deschasError ? 'form-control invalid': 'form-control';
const priceClass = pricehasError ? 'form-control invalid': 'form-control';

  return(
    <Modal onClose={props.onClose}>
            <form className='form-control' onSubmit={submitFormHandler}>
                <div className='control-group'>
                    <div className={nameClass}>
                        <label>Name</label>
                        <input 
                            type='text' 
                            id='name' 
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            value={enteredName}
                            />
                        {namehasError && <p className='error-text'>Please enter valid name.</p>}
                    </div>
                    <div className={descClass}>
                        <label>Description</label>
                        <input 
                            type='text' 
                            id='desc' 
                            onChange={descChangeHandler}
                            onBlur={descBlurHandler}
                            value={enteredDesc}
                            />
                        {deschasError && <p className='error-text'>Please enter valid Description.</p>}
                    </div>
                    <div className={priceClass}>
                        <label>Price</label>
                        <input 
                            type='number' 
                            id='price' 
                            onChange={priceChangeHandler}
                            onBlur={priceBlurHandler}
                            value={enteredPrice}
                            />
                        {pricehasError && <p className='error-text'>Please enter valid name.</p>}
                    </div>
                </div>
                <div className='form-actions'>
                    <button className={'button'} type='submit' disabled={!formIsValid}>Submit</button> 
                    <button className={'button'} type='button' onClick={props.onClose}>Close</button> 
                </div>
            </form>
        
    </Modal>    
  );
};


export default AddMeal;
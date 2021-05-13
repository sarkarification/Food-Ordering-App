import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css'

const Checkout = (props) =>{

    const {value: enteredName,
            isValid: nameIsValid,
            hasError: namehasError,
            valueChangeHandler: nameChangeHandler,
            inputBlurHandler: nameBlurHandler,
            reset: namereset}=useInput(value => value.trim() !== '');
    
    const {value: enteredStreet,
            isValid: streetIsValid,
            hasError: streethasError,
            valueChangeHandler: streetChangeHandler,
            inputBlurHandler: streetBlurHandler,
            reset: streetreset}=useInput(value => value.trim() !== ''); 

    const {value: enteredPostal,
            isValid: postalIsValid,
            hasError: postalhasError,
            valueChangeHandler: postalChangeHandler,
            inputBlurHandler: postalBlurHandler,
            reset: postalreset}=useInput(value => value.trim() !== '');

    const {value: enteredCity,
            isValid: cityIsValid,
            hasError: cityhasError,
            valueChangeHandler: cityChangeHandler,
            inputBlurHandler: cityBlurHandler,
            reset: cityreset}=useInput(value => value.trim() !== '');

    const {value: enteredPhone,
            isValid: phoneIsValid,
            hasError: phonehasError,
            valueChangeHandler: phoneChangeHandler,
            inputBlurHandler: phoneBlurHandler,
            reset: phonereset}=useInput(value => value.trim() !== '');

    let formIsValid = false;

    if(nameIsValid && streetIsValid && postalIsValid && cityIsValid && phoneIsValid)
      {
        formIsValid = true
      }
    
    
    const confirmSubmitHandler = (e) => {
        e.preventDefault();
        if(!nameIsValid || !streetIsValid || !postalIsValid || !cityIsValid || !phoneIsValid)
            {return;}
        const dataToSend = {name: enteredName, street:enteredStreet, postal:enteredPostal,city:enteredCity,phone:enteredPhone};
        props.onConfirm(dataToSend)
        streetreset(); namereset(); postalreset(); cityreset(); phonereset();
        // props.onCancel();
    };

    
    return (
        <form className={classes.form} onSubmit={confirmSubmitHandler}> 
            <div className={classes.control}>
                <label htmlFor='name'> Your Name </label>
                <input 
                    type='text' 
                    id='name' 
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                    />
                {namehasError && <p className='error-text'>Please enter valid name.</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'> Street</label>
                <input 
                    type='text' 
                    id='street' 
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                    value={enteredStreet}
                    />
                {streethasError && <p className='error-text'>Please enter valid street.</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    type='text' 
                    id='postal' 
                    onChange={postalChangeHandler}
                    onBlur={postalBlurHandler}
                    value={enteredPostal}
                    />
                {postalhasError && <p className='error-text'>Please enter valid street.</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input 
                    type='text' 
                    id='city' 
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                    value={enteredCity}
                    />
                {cityhasError && <p className='error-text'>Please enter valid street.</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='number'>Phone Number</label>
                <input 
                    type='number' 
                    id='phone' 
                    onChange={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                    value={enteredPhone}
                    />
                {phonehasError && <p className='error-text'>Please enter valid street.</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                {formIsValid && <button className={classes.submit} type='submit' >Confirm</button>}
            </div>
        </form>
    );

};

export default Checkout;
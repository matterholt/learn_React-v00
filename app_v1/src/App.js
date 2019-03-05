import React, { useState } from 'react';
import './App.css';

const App = ()=> { 
  const [name, setName] = useLocalStorage('name', 'bob')
  return(
    <div>
      <h3>Add Name</h3>
      <input
        type ="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
    />
    </div>
  );
}

// HOOK
function useLocalStorage(key, intitialValue){
  //State to store our value
  // Pass initial state function to use State so logic is only executed once
  const [storedValue, setStoredValue] = useState(()=>{
    try{
      //get from local storage by key
      const item = window.localStorage.getItem(key);
      //parse stored json or if none return initialValue
      return item ? JSON.parse(item) : intitialValue;
    }catch (error){
      //if error also return intitialValue
      console.log(error);
      return intitialValue
    }
  });
  const setValue = value => {
    try {
      const valueToStore =  value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }catch (error) {
      console.log(error)
    }
  }
  return[storedValue,setValue];

}

export default App;

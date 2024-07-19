import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://noshback.onrender.com/api/getdish')
      .then(response => {
        // console.log(response.data._id);
        setDishes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleTogglePublished = (dishId, isPublished) => {
    axios.put(`https://noshback.onrender.com/api/toggle/${dishId}`, { isPublished: !isPublished })
      .then(response => {
        const updatedDishes = dishes.map(dish => {
          // console.log(dish._id)
          if (dish._id === dishId) {
            dish.isPublished = !isPublished;
          }
          return dish;
        });
        setDishes(updatedDishes);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='bg-black text-black text-xl font-bold  '>
      <h1 className='text-2xl text-orange-300 pt-2 mb-3 flex justify-center'>Dish Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='flex flex-col justify-center items-center w-full max-w-md mx-auto'>
          {dishes.map(dish => (
            <li key={dish._id} className='flex flex-col justify-center items-center mb-4 p-4 bg-pink-300 rounded-2xl shadow-2xl'>
              <h2 className='m-2 '>{dish.dishname}</h2>
              <img src={dish.imageurl} className='w-1/2 mb-4 rounded-2xl'></img>
              
              <p className='mb-2'> {dish.isPublished ? 'Published' : 'NotPublished'}</p>
              <button className='bg-purple-800 p-2 text-gray-100  rounded-xl'onClick={() => handleTogglePublished(dish._id, dish.isPublished)}>
                Toggle-Published
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 

export default App; 


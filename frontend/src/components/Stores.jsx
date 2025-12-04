import React, { useState } from 'react'

function Stores({ stores, setsidebarinfo, admin, userdata }) {

  const [showModal, setShowModal] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const [rating, setRating] = useState(0)

  async function getRatings(storeid) {
    const response = await fetch('http://localhost:2200/getratings?storeid=' + storeid, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
      }
    });

    const data = await response.json();
    setsidebarinfo(data.result);
  }

  function openRatingModal(storeid) {
    setSelectedStore(storeid);
    setRating(0);
    setShowModal(true);
  }

  async function submitRating() {
    if (rating === 0) return alert("Select a rating");

    await rate(userdata.userid, selectedStore, rating);
    setShowModal(false);
  }

  async function rate(userid, storeid, rating) {
 
    const response = await fetch("http://localhost:2200/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`
      },
      body: JSON.stringify({ userid, storeid, rating })
    });

    const data = await response.json();
    console.log(data);
    
    if (data.success) {
      alert("Rating submitted");
    }
    else{
      alert("An error occurred")
    }
  }

  async function getmyratings(storeid) {
    const response = await fetch('http://localhost:2200/getratings?storeid=' + storeid, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
      }
    });

    const data = await response.json();

    console.log(data.result);
    console.log(userdata.userid);
  
    setsidebarinfo(data.result.filter((rating)=>rating.userid === userdata.userid));
  }

  return (
    <div className="storecontainer">
      <h1>Stores</h1>

      {stores && stores.map((store) => (
        <div className="card" key={store.storeid}>
          <h3>{store.name} <span className='light'>{store.email}</span></h3>
          <p>from {store.address}</p>
         {admin && <i>Average Rating : {store.average}</i>}

          {admin && (
            <button className='storebutton' onClick={() => getRatings(store.storeid)}>See ratings</button>
          )}

          {!admin && (
            <button className='storebutton' onClick={() => openRatingModal(store.storeid)}>Rate</button>
          )}

          {!admin && (
            <button className='storebutton' onClick={() => getmyratings(store.storeid)}>View My Ratings</button>
          )}
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Rate this Store</h2>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={num <= rating ? "star selected" : "star"}
                  onClick={() => setRating(num)}
                >
                  ★
                </span>
              ))}
            </div>

            <button className="submit-rating" onClick={submitRating}>Submit Rating</button>
            <button className="cancel-rating" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stores;

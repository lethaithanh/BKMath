import React from 'react';
import axios from 'axios';

function User() {
  axios.get(`http://localhost:5050/api/users`).then((res) => {
    const users = res.data;
    console.log(users);
  });

  return (
    <>
      <h1>This is the User Page</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
        dolor mollitia fuga molestias. Exercitationem dolores consectetur
        officiis magnam dolore maiores corrupti debitis quis dicta soluta. Sequi
        cum aut atque! Asperiores.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
        enim et voluptas labore deserunt, modi iste repudiandae asperiores
        reprehenderit praesentium, rem in vero eaque ex? Harum rem iste
        asperiores nulla.
      </p>
    </>
  );
}

export default User;

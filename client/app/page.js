const { useState, useEffect } = require("react")

const getData = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/users", {
      cache: "no-cache",
    })
    const data = await response.json()
    
    return data
  } catch (err) {
    console.error(err)
  }
}

const Home = async () => {
  const data = await getData()

  if (!data) {
    return null
  }

  return (
    <div>
      {data.map((user) => (
        <div key={user._id}>{user.email}</div>
      ))}
    </div>
  )
}

export default Home

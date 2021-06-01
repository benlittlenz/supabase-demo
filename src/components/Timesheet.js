// import React, { useState, useEffect } from 'react';
// import { supabase } from "../lib/api";

// import Table from './Table';

// export default function Table() {
//   const [posts, setPosts] = useState([]);


//   useEffect(() => {
//     fetchPosts()
//   }, []);


//   const fetchPosts = async () => {
//     const startIndex = (currentPage * perPage) - perPage
//     const endIndex = (currentPage * perPage) - 1
//     let { data, error } = await supabase
//       .from("posts")
//       .select(`
//             id, added, content,
//             users (name)
//       `)
//       .range(startIndex, endIndex)
//       .order('id', { ascending: true })
//     setPosts(data)
//     if (error) console.log("error", error);
//   };
//   return (
//     <div>

//     </div>
//   )
// }


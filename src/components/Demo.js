// import React, { useState, useEffect } from 'react';
// import { supabase } from "../lib/api";

// import Pagination from './Pagination'
// export default function Table() {
//   const [posts, setPosts] = useState([]);
//   const [count, setCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(25);

//   useEffect(() => {
//     fetchCount().then(() => fetchPosts())
//   }, [currentPage]);

//   const fetchCount = async () => {
//     const { count } = await supabase
//       .from('posts')
//       .select('*', { count: 'exact' })
//     setCount(count)
//   }

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
//     <div className="flex flex-col h-screen">
//       <div className="-my-2 h-2/3 overflow-auto sm:-mx-6 lg:-mx-8">
//         <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//           <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                 <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     ID
//                 </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Created
//                 </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Content
//                 </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Created By
//                 </th>
//                   <th scope="col" className="relative px-6 py-3">
//                     <span className="sr-only">Edit</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {posts.map(post => (
//                   <tr key={post.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="ml-4">
//                           <div className="text-sm text-gray-900">{post.id}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="ml-4">
//                           <div className="text-sm text-gray-900">{post.added}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{post.content}</div>
//                     </td>

//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{post.users.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                         Edit
//                     </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Pagination
//         count={count}
//         perPage={perPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//       />
//     </div>
//   )
// }
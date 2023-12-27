// export default async function getAllUsers() {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users").then(
//       (res) => res.json()
//     );
//     return res;
//   } catch (error) {
//     throw new Error("Error in fetching the users");
//   }
// }


export default async function getAllUsers(){
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) throw new Error("Failed to fetch all the users");
  
  return res.json()
}

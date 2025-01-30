import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL= "https://private-universal-cylinder.glitch.me/";


const Books= () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] =  useState(true);
    const[ sort, setSort]= useState("");
    const [category, setCategory]= useState("");
    const [page, setPage]= useState(1);
    const [totalPages, setTotalPages]= useState(1);
    const [showModal, setShowModal]= useState(false);
    const [formData, setFormData]= useState({ name: "", category: "", price: "" });
    const [editId, setEditId]= useState(null);

    useEffect(() => {
        fetchBooks();
    }, [sort, category, page]);

    const fetchBooks= async() => {
        setLoading(true);
        try{
            const response =await axios.get(`${API_BASE_URL}/books`, {
                params:{sort, category, page, limit:5},
            });

            setBooks(response.data.books);

            setTotalPages(Math.ceil(response.data.total/5));
            setLoading(false);
        }
        catch(error){
            console.error("Error Fetching Books", error);
            
        }
    }

}


// const Books= () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading]= useState(true);

//     useEffect(() => {
//         axios.get("https://private-universal-cylinder.glitch.me/books")
//         .then((response) => {
//             setBooks(response.data);
//             setLoading(false);
//         })
//         .catch((error) => {
//             console.error("Error fetching books", error);
//             setLoading(false);
//         });
//     }, []);

//     if(loading) return <p> Loading...</p>;
//     return(
//         <div>
//             <h2>Book List</h2>
//             {books.map((book) => (
//                 <div key={book.id}>
//                     <Link to="/books/${book.id}">
//                     <h3>{book.name}</h3>
//                      </Link>
//                      <p>Category:{book.category}</p>
//                      </div>
//             ))}
//         </div>
//     );
// };

export default Books;

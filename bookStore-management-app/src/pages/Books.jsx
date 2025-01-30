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
            setLoading(false);


        }
    };

    //Handle form inputs

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
       
    };

    //Open Modal for Adding a new book
    const handleAdd =() => {
        setFormData({ name: "", category: "", price: ""});
        setEditId(null);
        setShowModal(true);

    };
    

    //Open Modal  for  Editing a book

    const handleEdit = (book) => {
        setFormData({ name: book.name, category: book.category, price: book.price});
        setEditId(book.id);
        setShowModal(true);

    };
    

    //Submit form (add or edit)
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if ( editId) {
                await axios.put(`${API_BASE_URL}/books/${editId}`, formData);
                alert("Book Updated!");
            }
            else{
                await axios.post(`${API_BASE_URL}/books`, formData);
                alert("Book Added!");
            }
             setShowModal(false);
             fetchBooks();

        }
        catch(error){
            console.error("Error saving book", error);

        }
    };

    //Delete a Book

    const handleDelete = async(id) => {
        if (window.confirm("Are you sure you want to delete this book?")){
            try{
                await axios.delete(`${API_BASE_URL}/books/${id}`);
                alert("Book Deleted");
                fetchBooks();

            }
            catch(error){
                console.error("Error Deleting the Book", error);

            }
        }
    };

    return(
        <div className="container">
            <h2 className="mt-4">Book List</h2>

            {/* SOrting*/}
            <div className="mb-3">
                <label className="me-2">Sort By: </label>
                <select className="form-select d-inline w-auto" onChange={(e) => setSort(e.target.value)}>
                    <option value=""> None </option>
                    <option value="name_asc"> A-Z</option>
                    <option value="price_asc">Price Low to High </option>
                    <option value="price_desc">Price High to Low </option>
                 </select>
                </div> 

                {/*Filtering*/}

                

        </div>
    )

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

const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

// const BookModel=require('../models/book-model');
// const UserModel=require('../models/user-model');
// const {route} = require("./users");
const router = express.Router();

const { UserModel, BookModel } = require("../models/index");

  
// Route:/
// Method:GET
// Description:Getting all books
// Access:Public
// Parameter:None

router.get("/",getAllBooks);
// router.get("/",(req,res)=>{
//     res.status(200).json({
//         sucess:true,
//         message:"Got all the books",
//         data:books
//     })
// })

// Route:/:id
// Method:GET
// Description:Getting books by their id
// Access:Public
// Parameter:None
router.get("/:id", getSingleBookById);
// router.get("/:id",(req,res)=>{
//      const { id } = req.params;
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book Not Found",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Found the book by their id",
//     data: book,
//   });
// });

// Route:/books/issued
// Method:GET
// Description:Get all issued books
// Access:Public
// Parameter:None
router.get("/issued/by-user", getAllIssuedBooks);
// router.get("/issued/by-user",(req,res)=>{
//  const usersWithTheIssuedBook=users.filter((each)=>{
//     if(each.issuedBook) return each;
//  })
//  const issuedBook=[];
//  usersWithTheIssuedBook.forEach((each)=>{
//     const book=books.find((book)=>(
//         book.id===each.issuedBook
//     ))
//     book.issuedBy=each.name;
//     book.issuedDate=each.issuedDate;
//     book.returnDate=each.returnDate;

//     issuedBook.push(book);
//  })
//  if(issuedBook.length===0){
//     return res.status(404).json({
//         success:false,
//         message:"No book have been issued yet..."

//     })

//  }
//  return res.status(200).json({
//     success:true,
//     message:"Users With th issued books...",
//     data:issuedBook,
//  })
// })

// Route:/
// Method:POST
// Description:Adding a new book
// Access:Public
// Parameter:None
//Data:id,name,author,genre,price,publisher
router.post("/", addNewBook);
// router.post("/",(req,res)=>{
//   const { data } = req.body;
//   if (!data) {
//     return res.status(404).json({
//       success: false,
//       message: "No Data to add a book",
//     });
//   }
//   const book = books.find((each) => each.id === data.id);
//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "ID already exists...",
//     });
//   }
//   const allBooks = { ...books, data }; //...book -> to show the books which are already present
//   return res.status(201).json({
//     success: true,
//     message: "Added book succesfully",
//     data: allBooks,
//   });
// })

// Route:/:id
// Method:PUT
// Description:Upadting a book by their id
// Access:Public
// Parameter:ID
router.put("/:id", updateBookById);
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book not found for this ID",
//     });
//   }
//   const updateBookData = books.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: " Book Updated by their ID !!",
//     data: updateBookData,
//   });
// });


module.exports=router;
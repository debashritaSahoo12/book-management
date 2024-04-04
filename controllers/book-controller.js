const { UserModel, BookModel } = require("../models/index");
const issuedBook=require("../dtos/book-dto")
// const getAllBooks=()=>{};
exports.getAllBooks=async(req,res)=>{
    const books=await BookModel.find();
    if(books.length===0){
        return res.status(404).json({
         success:false,
         messase:"No book found"
        })
    }
    res.status(200).json({
        success:true,
        data:books,
    })
};


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
exports.getSingleBookById=async(req,res)=>{
     const { id } = req.params;
     const book= await BookModel.findById(id);
     if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found the book by their id",
    data: book,
  });
};


// router.get("/issued/by-user", (req, res) => {
//   const usersWithTheIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });
//   const issuedBook = [];
//   usersWithTheIssuedBook.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);
//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBook.push(book);
//   });
//   if (issuedBook.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No book have been issued yet...",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Users With th issued books...",
//     data: issuedBook,
//   });
// });
exports.getAllIssuedBooks=async(req,res)=>{
     const users=await UserModel.find({
        issuedBook:{$exists:true}
     }).populate("issuedBook");

     const issuedBooks=users.map((each)=>new IssuedBook(each))

if (issuedBooks.length === 0) {
  return res.status(404).json({
    success: false,
    message: "No book have been issued yet...",
  });
}
return res.status(200).json({
  success: true,
  message: "Users With th issued books...",
  data: issuedBooks,
});
};


// router.post("/", (req, res) => {
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
// });
exports.addNewBook=async(req,res)=>{
  const { data } = req.body;
 
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No Data to add a book",
    });
  }
 await BookModel.create(data);
 const allBooks=await BookModel.find();

     return res.status(201).json({
    success: true,
    message: "Added book succesfully",
    data: allBooks,
  });
     
};


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
  // return res.status(200).json({
  //   success: true,
  //   message: " Book Updated by their ID !!",
  //   data: updateBookData,
  // });
// });
exports.updateBookById=async(req,res)=>{
  const { id } = req.params;
  const { data } = req.body;


  const updatedBook=await BookModel.findOneAndUpdate({
    _id:id,
  },data,{
    new:true
  });  //new for update data because some times the db not refreshed in a certain click
  return res.status(200).json({
    success: true,
    message: " Book Updated by their ID !!",
    data: updatedBook,
  });
}



// module.exports={getAllBooks,getSingleBookById}
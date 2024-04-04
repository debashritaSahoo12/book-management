//data transfer object-book
class IssuedBook{
    _id; //_id=auto generated id
    name;
    genre;
    price;
    publisher;
    issuedby;
    issuedDate;
    returnDate;

//whenever we create  obj, the constructor gets invoked=parametersised constructor
constructor(user){
this._id=user.issuedbook._id;
this.name = user.issuedbook.name;
this.genre = user.issuedbook.genre;
this.price = user.issuedbook.price;
this.publisher = user.issuedbook.publisher;
this.issuedby = user.issuedby;
this.issuedDate = user.issuedDate;
this.returnDate = user.returnDate;
}
}
module.exports=IssuedBook;
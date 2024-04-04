const express=require("express");
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateuserById,
  createNewUser,
} = require("../controllers/user-controller");
const {users}=require("../data/users.json");

const { UserModel, BookModel } = require("../models");

const router=express.Router();
// Route:/
// Method:GET
// Description:Get all users
// Access:Public
// Parameter:None

//localhost:8081/users
 router.get("/", getAllUsers);
//  router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });

//http://localhost:8081/users/4
// Route:/:id
// Method:GET
// Description:Get single user by their id
// Access:Public
// Parameter:Id
router.get("/:id", getSingleUserById);
// router.get("/:id", (req, res) => {
//   //const id =req.params.id;
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist!",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "User found",
//     data: user,
//   });
// });

// Route:/
// Method:POST
// Description:Creating a new user
// Access:Public
// Parameter:None
router.post("/", createNewUser);
// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;
//   const user = users.find((each) => each.id === id);
//   if (user) {
//     return res.status(404).json({
//       success: false,
//       message: "user with The ID Exists",
//     });
//   }
//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });
//   return res.status(201).json({
//     success: true,
//     message: "Users Added Successfully",
//     data: users,
//   });
// });

// Route:/:id
// Method:PUT
// Description:Upadting a user by their id
// Access:Public
// Parameter:ID
router.put("/:id", updateuserById);
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist!",
//     });
//   }
//   const updateUserData = users.map((each) => {
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
//     message: "User Upadated !!",
//     data: updateUserData,
//   });
// });

// Route:/:id
// Method:DELETE
// Description:Deleting a user by their id
// Access:Public
// Parameter:ID
router.delete("/:id",deleteUser );
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist!",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);
//   return res.status(200).json({
//     success: true,
//     message: "Deleted User..",
//     data: users,
//   });
// });

// Route:/users/subscription-details/:id
// Method:GET
// Description:Get alii users subscription details
// Access:Public
// Parameter:ID
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);
  if (!user)
    return res
      .status(404)
      .json({
        success: false,
        message: "User With The Given Id Doesn't Exist",
      });

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      // current Date
      date = new Date();
    } else {
      // getting date on a basis of data variable
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if( (user.subscriptionType === "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType === "Standard")) {
      date = date + 180; 
    } else if ((user.subscriptionType ===  "Premium")) {
      date = date + 365;
    }
    return date;
  };

  let returndateDays = getDateInDays(user.returnDate);
  let currentDate=getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

   const data = {
     ...user,
     isSubscriptionExpired: subscriptionExpiration <= currentDate,
     daysLeftForExpiration:
       subscriptionExpiration <= currentDate
         ? 0
         : subscriptionExpiration - currentDate,
     fine:
       returndateDays < currentDate
         ? subscriptionExpiration <= currentDate
           ? 100
           : 50
         : 0,
   };
 
  return res.status(200).json({
    success:true,
    message:"Subscription details for use is:",
    data,
  })
});



// default export
module.exports = router;

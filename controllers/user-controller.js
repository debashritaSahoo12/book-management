const { UserModel, BookModel } = require("../models");
const bookModel = require("../models/book-model");
const userModel = require("../models/user-model");

//  router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found in the DB",
    });
  }
  res.status(200).json({
    success: true,
    message: "these are the user info",
    data: users,
  });
};

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
exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
};

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
exports.createNewUser = async (req, res) => {
  // const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
  // let { id } = req.params;
  // if (id === undefined) {
  //   id = 0;
  // }
  // console.log(`ID: ${id}`);
  // // res.status(200);
  // let user = userModel.find({ _id: id });
  // userModel.find({}, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(docs);
  //   }
  // });

  // if (user) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "user with The ID Exists",
  //   });
  // }
  // userModel.insertMany([
  //   {
  //     // id,
  //     name: name,
  //     surname: surname,
  //     email: email,
  //     subscriptionType: subscriptionType,
  //     subscriptionDate: subscriptionDate,
  //   },
  // ]);
  let { data } = req.body;
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No object found....... bring bheja to head from knee",
    });
  }
  data.forEach(async (obj) => {
    await userModel.create(obj);
  });
  let docs = await userModel.find();
  return res.status(201).json({
    success: true,
    message: "Users Added Successfully",
    data: docs,
  });
};

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
exports.updateuserById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedUserData = await userModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "User Upadated !!",
    data: updatedUserData,
  });
};

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
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Deleted User..",
    data: user,
  });
};

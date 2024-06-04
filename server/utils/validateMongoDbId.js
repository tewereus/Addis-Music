import mongoose from "mongoose";

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Id is invalid or not found");
};

export default validateMongoDbId;

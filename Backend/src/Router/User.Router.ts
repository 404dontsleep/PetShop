import { Request, Response, Router } from "express";
import { UserModel } from "../Model/User.Model";
import { ResJSON } from "../Helper/Helper";

const UserRouter = Router();

async function GetUsers(req: Request, res: Response): Promise<void> {
  try {
    const Users = await UserModel.find({}).select("-__v -_id -Password");
    res.status(200).json({ Users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function GetUser(req: Request, res: Response): Promise<void> {
  try {
    const { UserID } = req.params;
    const User = await UserModel.findOne({ UserID }).select(
      "-__v -_id -Password"
    );
    if (User) {
      res.status(200).json({ User });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function UpdateUser(req: Request, res: Response): Promise<void> {
  try {
    const { UserID } = req.params;
    const { Role } = req.body;
    const User = await UserModel.findOneAndUpdate(
      { UserID },
      { Role },
      { new: true, runValidators: true }
    ).select("-__v -_id -Password");
    if (User) {
      res.status(200).json({
        message: "User updated successfully",
        User: ResJSON(User.toObject()),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

UserRouter.put("/:UserID", UpdateUser);
UserRouter.get("/:UserID", GetUser);
UserRouter.get("/", GetUsers);

export default UserRouter;

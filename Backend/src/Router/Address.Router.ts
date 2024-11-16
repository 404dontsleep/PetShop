import { Router, Request, Response } from "express";
import { IAuthRequest } from "../MiddleWare/Auth.MiddleWare";
import { AddressModel } from "../Model/Address.Model";
import { ResJSON } from "../Helper/Helper";

const AddressRouter = Router();

async function GetAddress(req: Request, res: Response): Promise<void> {
  try {
    const { UserID } = (req as IAuthRequest).User;
    const Address = await AddressModel.find({ UserID }).select("-__v -_id");
    res.status(200).json({ Address });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function AddAddress(req: Request, res: Response): Promise<void> {
  try {
    const { UserID } = (req as IAuthRequest).User;
    const { ContactNumber, City, State, Street } = req.body;

    const LastID = await AddressModel.findOne({})
      .sort({ AddressID: -1 })
      .exec();
    const AddressID = LastID ? LastID.AddressID + 1 : 1;

    const _AddressModel = new AddressModel({
      AddressID,
      UserID,
      ContactNumber,
      City,
      State,
      Street,
    });
    await _AddressModel.save();
    res.status(200).json({
      message: "Address added successfully",
      Address: ResJSON(_AddressModel.toObject()),
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function UpdateAddress(req: Request, res: Response): Promise<void> {
  try {
    const { AddressID } = req.params;
    const { UserID } = (req as IAuthRequest).User;
    const { ContactNumber, City, State, Street } = req.body;
    const Address = await AddressModel.findOneAndUpdate(
      { AddressID, UserID },
      { ContactNumber, City, State, Street },
      { new: true }
    );
    if (Address) {
      res.status(200).json({
        message: "Address updated successfully",
        Address: ResJSON(Address.toObject()),
      });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function DeleteAddress(req: Request, res: Response): Promise<void> {
  try {
    const { AddressID } = req.params;
    const { UserID } = (req as IAuthRequest).User;
    const Address = await AddressModel.findOneAndDelete({ AddressID, UserID });
    if (Address) {
      res.status(200).json({ message: "Address deleted successfully" });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

AddressRouter.get("/", GetAddress);
AddressRouter.post("/", AddAddress);
AddressRouter.put("/:AddressID", UpdateAddress);
AddressRouter.delete("/:AddressID", DeleteAddress);

export default AddressRouter;

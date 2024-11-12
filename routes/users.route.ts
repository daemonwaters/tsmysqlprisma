import { Router } from "express";
const router = Router();
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controller/users.controller";

//GET @ /users
router.get("/", getAll);

//GET @ /users/:id
router.get("/:id", getOne);

//POST @ /users
router.post("/", create);

//PUT @ /users/:id
router.put("/:id", update);

//DELETE @ /users/:id
router.delete("/:id", remove);

export default router;

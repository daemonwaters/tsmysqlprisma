type RequestBody = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  age: number;
};

type UpdateRequestBody = Omit<RequestBody,"user_id">

export { RequestBody, UpdateRequestBody };

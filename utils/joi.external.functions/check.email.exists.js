import UserModel from "../../modules/user/model/user.model.js";

const checkIfEmailExists = async (email, helper) => {
  try {
    if (email) {
      const emailExists = await UserModel.findOne({
        email: email,
      });

      if (emailExists) {
        // Throw an error with your custom message
        throw new Error(
          `Email is Already Associated with anathor Account ${email}`
        );
      }

      // Return the value if validation passes
      return email;
    }
  } catch (e) {
    // Throw the error to ensure it is propagated
    throw new Error(e.message);
  }
};

export default checkIfEmailExists;

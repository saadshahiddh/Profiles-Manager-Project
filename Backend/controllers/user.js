const { User, } = require("../database");
const password_hash = require("password-hash");
const { fileRemover, singleFileUploadManager } = require("../services/file");
const { StatusCodes } = require("http-status-codes");
const { generateApiResponse } = require("../services/utilities");
const { generateAuthUserToken } = require("../services/authentication");



module.exports = {



    /**
     * Create user
     */
    async createUser(req, res) {
        try {
            const {
                email,
                name,
                password,
                photo,
            } = req.body;

            if (!email) {
                return generateApiResponse(
                    res, StatusCodes.BAD_REQUEST, false,
                    "Email is required!"
                )
            }

            if (password.length < 6) {
                return generateApiResponse(
                    res, StatusCodes.BAD_REQUEST, false,
                    "Password must be minimum 6 characters long!"
                )
            }

            const isEmailUsedByUser = await User.countDocuments({ email });
            if (isEmailUsedByUser) {
                return generateApiResponse(
                    res, StatusCodes.CONFLICT, false,
                    "Email already used by another account!"
                )
            }

            const createUser = await User.create({
                email: email,
                name: name,
                password: password_hash.generate(password),
                photo: photo,
            });

            return generateApiResponse(
                res, StatusCodes.CREATED, true,
                "User created successfully!",
                { user: createUser }
            )
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in creating User!",
                { error }
            );
        }
    },



    /**
     * Update user
     */
    async updateUser(req, res) {
        try {
            const {
                _id,
                email,
                name,
                // password,
                photo,
            } = req.body;

            if (email) {
                const isEmailUsedByUser = await User.countDocuments({ _id: { $ne: _id }, email });
                if (isEmailUsedByUser) {
                    return generateApiResponse(
                        res, StatusCodes.CONFLICT, false,
                        "Email already used by another account!",
                        { error }
                    );
                }
            }

            const updatedUser = await User.findByIdAndUpdate(
                _id,
                {
                    email: email,
                    name: name,
                    // password: password,
                    // photo: photo,
                },
                { new: true },
            );

            const isUpdated = !!updatedUser;
            const token = await generateAuthUserToken(_id, updatedUser);
            return generateApiResponse(
                res, StatusCodes.OK, isUpdated,
                (isUpdated ? "User updated successfully!" : "No User data updated!"),
                { user: updatedUser, token }
            )
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in updating User!",
                { error }
            );
        }
    },



    /**
     * Update photo
     * @returns 
     */
    async updatePhoto(req, res, next) {
        try {
            const _id = req.params.userId;
            const file = req.file;

            const foundUser = await User.findById(_id);
            if (!foundUser) {
                return generateApiResponse(
                    res, StatusCodes.NOT_FOUND, false,
                    "User not found!",
                );
            }

            let photo = null;
            if (file) {
                photo = await singleFileUploadManager(file);
            }

            await fileRemover(foundUser?.photo);
            const updatedUser = await User.findByIdAndUpdate(_id, { photo }, { new: true });
            const token = await generateAuthUserToken(_id, updatedUser);
            return generateApiResponse(
                res, StatusCodes.OK, true,
                (photo ? "User photo updated successfully!" : "User photo removed successfully!"),
                { user: updatedUser, token }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in updating User photo!",
                { error }
            );
        }
    },



    /**
    * Delete user
    */
    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;

            const foundUser = await User.findById(userId, 'photo');
            const deletedUser = await User.findByIdAndDelete(userId);

            const isDeleted = !!deletedUser;
            await fileRemover(foundUser?.photo);

            return generateApiResponse(
                res, (isDeleted ? StatusCodes.OK : StatusCodes.NOT_FOUND), isDeleted,
                (isDeleted ? "User deleted successfully!" : "User not found!"),
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in deleting User!",
                { error }
            );
        }
    },



    /**
    * Get user
    */
    async getUser(req, res) {
        try {
            const userId = req.params.userId;
            const foundUser = await User.findById(userId);

            const isFound = !!foundUser;
            return generateApiResponse(
                res, (isFound ? StatusCodes.OK : StatusCodes.NOT_FOUND), isFound,
                (isFound ? "User fetched successfully!" : "User not found!"),
                { user: foundUser }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting User!",
                { error }
            );
        }
    },



    /**
    * Get all users
    */
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find().sort({ createdAt: -1 });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "All Users fetched successfully!",
                { users: allUsers }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting All Users!",
                { error }
            );
        }
    },



    /**
    * Login user
    */
    async loginUser(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;

            const foundUser = await User.findOne({ email: email });
            if (!foundUser) {
                return generateApiResponse(
                    res, StatusCodes.NOT_FOUND, false,
                    "No User found against this email!",
                );
            }

            const isPasswordValid = password_hash.verify(password, foundUser.password);
            if (!isPasswordValid) {
                return generateApiResponse(
                    res, StatusCodes.UNAUTHORIZED, false,
                    "Password is incorrect!",
                );
            }

            const token = await generateAuthUserToken(foundUser?._id, foundUser);
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "User logged in successfully!",
                { token }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in logging in User!",
                { error }
            );
        }
    },



    /**
    * Change password
    */
    async changePassword(req, res) {
        try {
            const {
                _id,
                oldPassword,
                newPassword,
            } = req.body;

            const foundUser = await User.findById(_id, 'password');
            if (!foundUser) {
                return generateApiResponse(
                    res, StatusCodes.NOT_FOUND, false,
                    "User not found!",
                );
            }

            if (newPassword.length < 6) {
                return generateApiResponse(
                    res, StatusCodes.CONFLICT, false,
                    "New Password must be minimum 6 characters long!",
                );
            }

            const verifyPassword = password_hash.verify(oldPassword, foundUser?.password);
            if (!verifyPassword) {
                return generateApiResponse(
                    res, StatusCodes.CONFLICT, false,
                    "Old Password is incorrect!",
                );
            }

            await User.findByIdAndUpdate(_id, { password: password_hash.generate(newPassword) });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "Password changed successfully!",
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in changing Password!",
                { error }
            );
        }
    },



    /**
    * Update password
    */
    async updatePassword(req, res) {
        try {
            const {
                _id,
                password,
            } = req.body;

            const usersCount = await User.countDocuments({ _id });
            if (!usersCount) {
                return generateApiResponse(
                    res, StatusCodes.NOT_FOUND, false,
                    "User not found!",
                );
            }

            if (password.length < 6) {
                return generateApiResponse(
                    res, StatusCodes.CONFLICT, false,
                    "Password must be minimum 6 characters long!",
                );
            }

            await User.findByIdAndUpdate(_id, { password: password_hash.generate(password) });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "Password updated successfully!",
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in updating Password!",
                { error }
            );
        }
    },




}
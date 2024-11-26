const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require('jsonwebtoken');
const { User } = require("../database");
const { generateApiResponse, getEnvVariable, formatMongooseData } = require("./utilities");
const moment = require("moment");




/**
 * Encode auth token
 * @param {*} user 
 * @returns 
 */
function encodeAuthToken(user) {
    const authUser = user;
    const token = jsonwebtoken.sign(
        authUser,
        getEnvVariable('JWT_KEY'),
        { expiresIn: '7d' }
    );
    return token;
}



/**
 * Decode auth token
 * @param {*} token 
 * @returns 
 */
function decodeAuthToken(token) {
    let decodedToken = null;
    try {
        decodedToken = jsonwebtoken.decode(token);
    } catch (err) {
    }
    return decodedToken;
}



/**
 * Check auth token
 */
async function checkAuthToken(req, res, next, isSkipExpired) {
    try {

        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return generateApiResponse(
                res, StatusCodes.UNAUTHORIZED, false,
                "No Authorization found!",
            );
        }

        const token = authHeader.split(' ')[1];
        const tokenValidationResult = await validateAuthToken(token, req, res, next, isSkipExpired);
        if (!tokenValidationResult.valid) {
            return generateApiResponse(res, tokenValidationResult.statusCode, tokenValidationResult.isSuccess, tokenValidationResult.message);
        }

        req.user = tokenValidationResult.authUser;
        next();
    } catch (error) {
        return generateApiResponse(
            res, StatusCodes.INTERNAL_SERVER_ERROR, false,
            "Error in checking auth token!",
            { error }
        );
    }
}



/**
 * Get auth user data
 * @param {*} _id 
 * @returns 
 */
async function getAuthUserData(_id) {
    const userData = await User.findById(_id);
    if (userData) {
        const authUserData = formatMongooseData(userData);
        return authUserData;
    } else {
        return null;
    }
}



/**
 * Generate auth user token
 * @param {*} userIdOrData 
 * @returns 
 */
async function generateAuthUserToken(userIdOrData) {
    const user = userIdOrData?._id ? formatMongooseData(userIdOrData) : (await getAuthUserData(userIdOrData));
    const token = encodeAuthToken(user);
    return token;
}



/**
 * Validate query token
 */
async function validateAuthToken(token, req, res, next, isSkipExpired) {
    try {

        if (!token) {
            return {
                valid: false, isSuccess: false,
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "Token does not exist!"
            };
        }

        const decodedToken = decodeAuthToken(token);
        if (!decodedToken) {
            return {
                valid: false, isSuccess: false,
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "Invalid token!"
            };
        }

        const expirationTime = moment.unix(decodedToken.exp);
        const currentTime = moment();

        if (!isSkipExpired && expirationTime.isBefore(currentTime)) {
            return {
                valid: false, isSuccess: false,
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "Token is expired!"
            };
        }

        const authUser = await getAuthUserData(decodedToken?.id, decodedToken?.roleId);
        if (!authUser) {
            return {
                valid: false, isSuccess: false,
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "Auth User does not exist!"
            };
        }

        // if (!authUser?.isEnabled) {
        //     return {
        //         valid: false, isSuccess: false,
        //         statusCode: StatusCodes.UNAUTHORIZED,
        //         message: "Auth User is disabled!"
        //     };
        // }

        return { valid: true, authUser };
    } catch (error) {
        return {
            valid: false, isSuccess: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Error in validating auth token!",
            error: { error }
        };
    }
}



const allowedUrls = ['/user/register'];
const allowedUrlWithParams = [];

/**
 * Token checker middle ware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function tokenCheckerMiddleWare(req, res, next) {
    if (req.url.startsWith("/file/") || allowedUrls.includes(req.url) || allowedUrlWithParams.some(element => req.url.startsWith(element))) {
        next();
    } else {
        await checkAuthToken(req, res, next);
    }
}




module.exports = {
    checkAuthToken,
    getAuthUserData,
    generateAuthUserToken,
    validateAuthToken,
    tokenCheckerMiddleWare,
};


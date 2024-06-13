import cryptoHash from 'crypto';
import Agent from '../models/agentModel.js';
import { signUpValidator, signInValidator } from '../validator/auth.validator.js';
import { formatZodError } from '../utils/errorMessage.js';
import generateTokenAndSetCookie from '../utils/generateTokensAndSetCookies.js';

function hashValue(value) {
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}
 
 function comparePasswords(inputPassword, hashedPassword) {
    return hashValue(inputPassword) === hashedPassword;
}

export const signUp = async (req, res) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if (!registerResults) {
        return res.status(400).json(formatZodError(registerResults.error.issues))
    }
    try {
        const {email} = req.body
        const agent = await Agent.findOne({email})
        if (agent) {
            res.status(409).json({messaage:'Agent already exists', agent})
        } else {
            const {
                // name,
                // AgentName,
                email,
                password,
                confirmPassword,
                // phoneNumber,
                // bio,
                // gender
            } = req.body

            if (password !== confirmPassword) {
                return res.status(403).json({ message: 'Password and confirmPassword do not match' });
             }   
             const encryption = hashValue(password)
             
            const newAgent = new Agent({
                // name,
                // AgentName,
                password: encryption,
                email,
                // phoneNumber,
                // bio,
                // gender
            })
            await newAgent.save()
            res.status(200).json({message: 'Agent registered succesfully',newAgent})
            console.log('Agent registered succesfully',newAgent);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const signIn = async (req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body)
    if (!loginResults) {
        return res.status(400).json(formatZodError(loginResults.error.issues))
    } try {
        const {email, password} = req.body
        const agent = await Agent.findOne({email})
        if (!agent) {
            return res.status(400).json({message:'Agent with email not found'})
        }
        const comparePass = comparePasswords(password,agent.password)
        if(!comparePass) {
           return res.status(400).json({message:'Password is incorrect'})
        }
        const accessToken = generateTokenAndSetCookie(agent._id, res)
        

        res.status(200).json({message:'Agent Login successful', accessToken})
        console.log('Agent Login successful', accessToken);
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const logout = async (req, res, next) => {

}

// A .-
// I ..
// R .-.
// D -..
// R .-.
// O ---
// P .--.


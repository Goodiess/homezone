import cryptoHash from 'crypto';
import Agent from '../models/agentModel.js';
import { signInValidator } from '../validator/auth.validator.js';
import { formatZodError } from '../utils/errorMessage.js';
import generateTokenAndSetCookie from '../utils/generateTokensAndSetCookies.js';
import Client from '../models/userMode.js';

function hashValue(value) {
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}
 
 function comparePasswords(inputPassword, hashedPassword) {
    return hashValue(inputPassword) === hashedPassword;
}

export const signUp = async (req, res) => {
    try {
        const {email} = req.body
        const agent = await Agent.findOne({email})
        if (agent) {
            res.status(409).json({messaage:'Agent already exists', agent})
        } else {
            const {
                name,
                email,
                password,
                confirmPassword,
            } = req.body

            if (password !== confirmPassword) {
                return res.status(403).json({ message: 'Password and confirmPassword do not match' });
             }   
             const encryption = hashValue(password)
             
            const newAgent = new Agent({
                name,
                password: encryption,
                email,
                // confirmPassword: encryption
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

export const register = async (req, res) => {
    try {
        const {email} = req.body
        const agent = await Client.findOne({email})
        if (agent) {
            res.status(409).json({messaage:'Agent already exists', agent})
        } else {
            const {
                name,
                email,
                password,
                confirmPassword,
            } = req.body

            if (password !== confirmPassword) {
                return res.status(403).json({ message: 'Password and confirmPassword do not match' });
             }   
             const encryption = hashValue(password)
             
            const newClient = new Client({
                name,
                password: encryption,
                email,
                // confirmPassword: encryption
            })
            await newClient.save()
            res.status(200).json({message: 'Agent registered succesfully',newClient})
            console.log('Agent registered succesfully',newClient);
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
        const accessToken = generateTokenAndSetCookie(agent._id, agent.role, res)
        

        res.status(200).json({message:'Agent Login successful', accessToken,agent})
        console.log('Agent Login successful', accessToken);
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const logout = async (req, res, next) => {

}

export const login = async (req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body)
    if (!loginResults) {
        return res.status(400).json(formatZodError(loginResults.error.issues))
    } try {
        const {email, password} = req.body
        const client = await Client.findOne({email})
        if (!client) {
            return res.status(400).json({message:'Client with email not found'})
        }
        const comparePass = comparePasswords(password,client.password)
        if(!comparePass) {
           return res.status(400).json({message:'Password is incorrect'})
        }
        const accessToken = generateTokenAndSetCookie(client._id, client.role,res)
        

        res.status(200).json({message:'Client Login successful', accessToken,client})
        console.log('Client Login successful', accessToken);
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}
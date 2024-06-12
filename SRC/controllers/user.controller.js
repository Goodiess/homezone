import User from "../models/user.model.js"
import cryptoHash from 'crypto';

export const getAllHouses = async (req, res) => {
    try {
        const getAllHouses = await User.find()
        if (!allHouses) {
        res.status(400).json({message: 'No house found in database'})
    }   else {
        res.status(200).json({message: 'house found successfully', allHouses})
    }
    }   catch (error) {
        console.error('Error while getting all houses:',error);
        res.status(500).json({message: error.messaage})
    }
}

export const getSingleHouse = async (req, res) => {
    try {
        const houseId = req.params.id
        const singleHouse = await User.findById(houseId)
        if (!singleHouse) {
        res.status(400).json({message: `No house with such id:${houseId} found`})
    }   else {
        res.status(200).json({message: 'house found successfully', singleHouse})
    }
    }   catch (error) {
        console.error('Error while getting house',error);
        res.status(500).json({message: error.messaage})
    }
}

export const deleteSingleHouse = async (req, res) => {
    try {
        const userId = req.params.id
        const userToDelete = await User.findByIdAndDelete(userId)
        if (!userToDelete) {
            res.status(400).json({message: `No user with such id:${userId} found`})
        } else {
            res.status(200).json({message: 'User deleted successfully', userToDelete})
        }
    } catch (error) {
        console.error('Error while deleting user:',error);
        res.status(500).json({message: error.messaage})
    }
}

export const deleteAllHouse = async (req, res) => {
    try {
        const allHouses = await House.deleteMany()
        if (!allHouses) {
            res.status(400).json({message: 'No users found in database'})
        }   else {
            res.status(200).json({message: 'Users deleted successfully', allHouses})
        }
        }   catch (error) {
            console.error('Error while deleting all users:', error);
            res.status(500).json({message: error.messaage})
        }
}


export const updateHouse = async (req, res) => {
  try {
    const userId = req.params.id;
    const { password, ...rest } = req.body;

    if (password) {
      const hashedPassword = cryptoHash.createHash('sha256').update(password).digest('hex');

      const updatedHouses = await User.findByIdAndUpdate(
        userId,
        { ...rest, password: hashedPassword },
        { new: true }
      );

      if (!updatedHouses) {
        return res.status(404).json({ message: `House with id: ${userId} not found` });
      }

      return res.status(200).json({ message: 'House updated successfully', updatedUser });
    } else {
      const updatedHouses = await User.findByIdAndUpdate(userId, rest, { new: true });

      if (!updatedHouses) {
        return res.status(404).json({ message: `House with id: ${userId} not found` });
      }

      return res.status(200).json({ message: 'house updated successfully', updatedHouses });
    }
  } catch (error) {
    console.error('Error while updating House:', error);
    res.status(400).json({ message: error.message });
  }
};

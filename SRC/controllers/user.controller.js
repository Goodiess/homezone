import Post from '../models/postModel.js';

export const getAllHouses = async (req, res) => {
    try {
        const allHouses = await Post.find()
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
        const singleHouse = await Post.findById(houseId)
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
        const userToDelete = await Post.findByIdAndDelete(userId)
        if (!userToDelete) {
            res.status(400).json({message: `No user with such id:${userId} found`})
        } else {
            res.status(200).json({message: 'Post deleted successfully', userToDelete})
        }
    } catch (error) {
        console.error('Error while deleting user:',error);
        res.status(500).json({message: error.messaage})
    }
}

export const deleteAllHouse = async (req, res) => {
    try {
        const allHouses = await Post.deleteMany()
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

      const updatedHouses = await Post.findByIdAndUpdate(
        userId,
        { ...rest, password: hashedPassword },
        { new: true }
      );

      if (!updatedHouses) {
        return res.status(404).json({ message: `Post with id: ${userId} not found` });
      }

      return res.status(200).json({ message: 'Post updated successfully', updatedUser });
    } else {
      const updatedHouses = await Post.findByIdAndUpdate(userId, rest, { new: true });

      if (!updatedHouses) {
        return res.status(404).json({ message: `Post with id: ${userId} not found` });
      }

      return res.status(200).json({ message: 'house updated successfully', updatedHouses });
    }
  } catch (error) {
    console.error('Error while updating Post:', error);
    res.status(400).json({ message: error.message });
  }
};

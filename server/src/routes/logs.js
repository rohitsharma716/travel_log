const {Router}  = require('express');
const LogEntry = require('../models/LogEntry');
const { errorHandler } = require('../middlewares');
const User = require('../models/User');


const router  = Router();
 
router.get('/' , async (req, res , next) =>{
     try{
        const entries = await LogEntry.find();
        res.json(entries);
     }catch(error){
        next(error);
     }
})

router.post('/' ,  async (req, res, next) =>{
     console.log(req.body);
     try{
        const logEntry = new LogEntry(req.body);
        const createdEntry = await  logEntry.save();
        res.json(createdEntry)

     }catch(error){
        next(error);
     }


     
})

router.post('/status', async (req, res, next) => {
    try {
        const { userId, placeId, status } = req.body; // status can be 'visited' or 'bucket'
        const user = await User.findOne({ userId });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (status === 'visited') {
            // Remove from bucket list if exists
            user.bucketList = user.bucketList.filter(id => id.toString() !== placeId);
            if (!user.visitedPlaces.includes(placeId)) {
                user.visitedPlaces.push(placeId);
            }
        } else if (status === 'bucket') {
            // Remove from visited if exists
            user.visitedPlaces = user.visitedPlaces.filter(id => id.toString() !== placeId);
            if (!user.bucketList.includes(placeId)) {
                user.bucketList.push(placeId);
            }
        }

        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:userId', async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.params.userId })
            .populate('visitedPlaces')
            .populate('bucketList');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            visitedPlaces: user.visitedPlaces,
            bucketList: user.bucketList
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;